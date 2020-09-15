<template>
  <div class="questCollect_box">
    <!-- 头部 -->
    <div class="questCollect_box_header">
      <div class="questCollect_box_header_back" @click="back">
        <van-icon name="arrow-left" size="25" color="#999" />
      </div>
      <div class="questCollect_box_header_name">习题收藏</div>
      <div class="questCollect_box_header_search" @click="goSearch">
        <van-icon name="search" size="25" color="#999" />
      </div>
    </div>
    <!-- 收藏习题的下拉菜单 -->
    <div class="course-fitler">
      <van-dropdown-menu>
        <van-dropdown-item title="题目类型">
          <div class="xps_box">
            <div
              v-for="(item, index) in option1"
              :key="index"
              @click="selectIndex(item.value, item.text)"
              :class="selIndex == item.value ? 'active' : ''"
            >{{ item.text }}</div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 暂无数据 -->
    <div class="empty" v-if="list.length == 0">
      <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p>暂无收藏记录</p>
    </div>
    <!-- 有收藏的数据 -->
    <!-- <van-swipe-cell>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="取消收藏" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      option1: [
        { text: "单选", value: 0 },
        { text: "多选", value: 1 },
        { text: "判断", value: 2 },
        { text: "连线", value: 3 }
      ],
      selIndex: -1,
      text: "",
      list: [] // 练习的收藏
    };
  },
  created() {
    this.collect();
  },
  methods: {
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    back() {
      this.$router.go(-1);
    },
    collect() {
      this.$network
        .getconcernInfo({
          params: {
            page: 1,
            limit: 10,
            type: 3,
            ques_type: "",
            mix_keyword: ""
          }
        })
        .then(res => {
          console.log(res);
          this.list = res.data.data.list;
        });
    },
    selectIndex(value, text) {
      this.selIndex = value;
      this.text = text;
      this.collect();
    }
  }
};
</script>

<style scoped lang="scss">
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.active {
  color: #eb6100;
}
.questCollect_box {
  width: 100%;
  min-height: 10vh;
  background-color: white;
  .questCollect_box_header {
    width: 100%;
    height: 90px;
    background-color: white;
    border-bottom: 1px solid #eeee;
    display: flex;
    justify-content: space-between;
    line-height: 90px;
    .questCollect_box_header_back {
      margin-top: 15px;
      margin-left: 10px;
    }
    .questCollect_box_header_name {
      font-size: 40px;
    }
    .questCollect_box_header_search {
      margin-top: 15px;
      margin-right: 10px;
    }
  }
  .course-fitler {
    width: 100%;
    height: 11.2vw;
    border-bottom: 1px solid #eee;
    z-index: 1000;
    /deep/.van-dropdown-menu {
      height: 11.2vw;
      width: 100%;
      position: fixed;
      //   z-index: 999;
      .van-dropdown-menu__bar {
        width: 100%;
        height: 100%;
        .van-dropdown-menu__item {
          width: 33.3%;
          flex: none;
          .van-dropdown-menu__title {
            font-size: 4vw;
            line-height: 11.2vw;
            position: relative;
            box-sizing: border-box;
            padding: 0 1.06667vw;
            color: #323233;
            font-size: 2vw;
            line-height: 11.2vw;
            height: 11.2vw;
            .van-ellipsis {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 30px;
            }
            .van-dropdown-menu__title::after {
              border-color: transparent transparent currentColor currentColor;
              border-width: 6px;
              top: 44%;
              right: -24px;
            }
          }
        }
      }
    }
  }
  .xps_box {
    width: 100%;
    background-color: white;
    div {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #eeee;
      text-align: center;
      line-height: 100px;
      font-size: 30px;
    }
  }
  .empty {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40vw;
      height: 40vw;
    }
    p {
      font-size: 4vw;
      color: #8c8c8c;
      margin-top: 5.33333vw;
    }
  }
}
</style>
