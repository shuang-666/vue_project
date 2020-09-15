<template>
  <div>
    <!-- 头部 -->
    <div class="questCollect_box_header">
      <div class="questCollect_box_header_back" @click="back">
        <van-icon name="arrow-left" size="25" color="#999" />
      </div>
      <div class="questCollect_box_header_name">套卷练习</div>
      <div class="questCollect_box_header_search" @click="goSearch">
        <van-icon name="search" size="25" color="#999" />
      </div>
    </div>
    <!-- 筛选 -->
    <van-dropdown-menu>
      <van-dropdown-item title="套卷分类" ref="items">
        <template>
          <div class="xcc">
            <van-tree-select
              height="80vw"
              :items="items"
              :active-id.sync="active"
              :main-active-index.sync="active"
              @click-nav="leftClick"
            >
              <template #content>
                <div v-if="active === 0" :class="active == items.index ? 'sel' : ''"></div>
                <div v-if="active === 1" class="lx">数学</div>
                <div v-if="active === 2" class="lx">初三化学</div>
                <div v-if="active === 3" class="lx">小学英语</div>
              </template>
            </van-tree-select>
          </div>
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="套卷状态" ref="item">
        <template>
          <div
            class="lx1"
            v-for="(item, index) in option"
            :key="index"
            :class="see === index ? 'act' : ''"
            @click="dd(index)"
          >{{ item.text }}</div>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- //空状态 -->
    <div data-v-2823b9d6 data-v-29f4e046 class="pack-card">
      <div data-v-2823b9d6 class="empty">
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" />
        <p>请稍候，套卷正在赶来的路上啦</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: "全部", id: 0 },
        { text: "中考真题", id: 1 },
        { text: "数学", id: 2 },
        { text: "英语", id: 3 }
      ],
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: "全部", value: 0 },
        { text: "已做", value: 1 },
        { text: "未做", value: 2 }
      ],
      see: 0,
      list: []
    };
  },
  created() {
    // this.classify();
  },
  methods: {
    classify() {
      this.$network.getClassify().then(res => {
        console.log(res.data.rows);
        let item = {
          name: "全部"
        };
        this.items = [item, ...res.data.rows];
        console.log(this.items);
      });
    },
    leftClick(id) {
      console.log(id);
      if (id == "0") {
        this.$network
          .getExam({
            params: {
              page: 1,
              limit: 10,
              done_status: 0,
              classify_id: "",
              name: "",
              init: function() {
                (this.done_status = 0), (this.classify_id = 0);
              }
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.list = res.data.data.list;
            }
          });
      }
    },
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    back() {
      this.$router.go(-1);
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    dd(index) {
      this.see = index;
    }
  }
};
</script>
<style lang="scss" scoped>
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
.xcc {
  width: 100%;
  height: 600px;
}
.pack-card {
  width: 80%;
  height: 150px;
  margin: 0 auto;
  text-align: center;
  p {
    font-size: 28px;
    color: rgb(190, 190, 190);
  }
  img {
    width: 300px;
    height: 300px;
  }
}
.custom-image .van-empty__image {
  width: 190px;
  height: 190px;
}
.act {
  color: goldenrod;
}
.lx1 {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #f5f5f5;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
}
.lx {
  width: 100%;
  height: 100px;
  font-size: 32px;
  text-align: left;
  line-height: 100px;
  color: goldenrod;
  padding-left: 20px;
}
/deep/.van-sidebar-item__text {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 28px;
}
/deep/.van-dropdown-menu {
  background: gainsboro;
  // padding:20px  0px ;
}
/deep/.van-dropdown-menu__bar {
  width: 100%;
  height: 80px;
}
/deep/.van-ellipsis {
  padding: 20px 0px;
}
/deep/.van-dropdown-menu__title {
  font-size: 30px;
}
/deep/.van-dropdown-menu__bar .van-dropdown-menu__title::after {
  border-color: transparent transparent currentColor currentColor;
  border-width: 0.06rem;
  border-width: 0.8vw;
  top: 44%;
  right: -0.24rem;
  right: -3.2vw;
}
/deep/.van-tree-select__nav-item {
  padding: 3.16667vw 7.6vw;
}

/deep/.van-sidebar-item {
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 0.2rem 0.12rem;
  padding: 3.26vw 8.6vw;
  overflow: hidden;
  color: #323233;
  font-size: 0.14rem;
  font-size: 4.86667vw;
  line-height: 0.2rem;
  line-height: 2.66667vw;
  word-wrap: break-word;
  background-color: #f7f8fa;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
/deep/.van-sidebar-item--select::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0.04rem;
  width: 0.53333vw;
  height: 0.16rem;
  height: 5.13333vw;
  background-color: #ee0a24;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: "";
}
/deep/.van-tree-select__nav-item--active {
  border: none;
  color: #eb6100;
  font-weight: 400;
  position: relative;
}
/deep/element.style {
  height: 69vw;
}
/deep/.van-tree-select {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  font-size: 0.14rem;
  font-size: 1.86667vw;
  -webkit-user-select: none;
  user-select: none;
}
</style>
