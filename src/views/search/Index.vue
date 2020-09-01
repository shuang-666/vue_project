<template>
  <div class="search_box">
    <!-- 头部 -->
    <div class="search_header">
      <span class="search_header_one">
        <van-icon name="arrow-left" size="22" />
      </span>
      <span class="search_header_two">
        <input type="text" v-model="value" placeholder="请输入内容" @input="inputClick" />
      </span>
      <span class="search_header_there" v-show="cancelShow" @click="cancelClick">取消</span>
      <span
        class="search_header_there"
        style="color: rgb(0, 0, 0)"
        v-show="searchShow"
        @click="searchClick"
      >搜索</span>
    </div>
    <!-- 历史搜索 -->
    <section class="history-search" v-show="isShow">
      <header class="his-header">
        <p>
          <span class="history">历史搜索</span>
          <span @click="deleteData">
            <van-icon name="delete" color="#999" />
          </span>
        </p>
        <div class="history_show">
          <span v-for="(item, index) in hotHistroy" :key="index" @click="goInput(item)">{{ item }}</span>
        </div>
      </header>
    </section>
    <!-- 自动补全 -->
    <div class="search_automatic" v-show="show">
      <div class="search_automatic_box" v-show="listShow">
        <div v-for="(ele, index) in automatic" class="search_automatic_wrapper" :key="index">
          <ListTwo
            :id="ele.id"
            :title="ele.title"
            :num="ele.total_periods"
            :toux="ele.teachers_list"
            :count="ele.sales_num"
            :price="ele.price"
            :buy="ele.has_buy"
            @twoClick="twoClick(ele.id, ele.course_type)"
          ></ListTwo>
        </div>
      </div>
    </div>
    <!-- 暂无搜索记录 -->
    <div class="empty" v-if="this.automatic.length == 0 ? photoShow : !photoShow">
      <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p>暂无搜索结果</p>
    </div>
  </div>
</template>

<script>
import ListTwo from "../../components/list/ListTwo";
export default {
  components: {
    ListTwo
  },
  data() {
    return {
      value: "", //输入框的值
      show: false, //判断自动补全是否出现
      isShow: true, //判断搜索历史的出现
      searchShow: false, // 控制搜索的按钮
      cancelShow: true, // 控制取消的按钮
      automatic: [], //自动补全的数据
      listShow: false, //控制数据的出现
      hotHistroy: [], //搜索历史
      photoShow: false
    };
  },
  created() {
    this.show = false;
    this.isShow = true;
    this.searchShow = false;
    this.cancelShow = true;

    let hotHistroy = localStorage.hotHistroy;
    if (hotHistroy != null || hotHistroy != undefined) {
      this.hotHistroy = JSON.parse(hotHistroy);
    }
  },
  methods: {
    deleteData() {
      this.hotHistroy = [];
      localStorage.setItem("hotHistroy", JSON.stringify(this.hotHistroy));
    },
    //   点击回到输入框
    goInput(item) {
      console.log(item);
      this.value = item;
      this.searchShow = true;
      this.cancelShow = false;
      this.show = true;
      this.isShow = false;
      this.photoShow = false;
    },
    //   输入框改变事件
    inputClick() {
      this.automatic = [];
      if (this.value.length != 0) {
        this.show = true;
        this.isShow = false;
        this.searchShow = true;
        this.cancelShow = false;
      } else {
        this.show = false;
        this.isShow = true;
        this.searchShow = false;
        this.cancelShow = true;
        this.photoShow = false;
      }
    },
    // 取消搜索
    cancelClick() {
      this.$router.push({
        path: "/class"
      });
    },
    // 点击跳转到课程详情
    twoClick(id, course_type) {
      this.$router.push({
        path: "/course-detail",
        query: {
          id,
          course_type
        }
      });
    },
    // 确认搜索
    searchClick() {
      this.listShow = true;
      var i = this.hotHistroy.findIndex(ele => {
        return ele == this.value;
      });
      if (i != -1) {
        this.hotHistroy.splice(i, 1);
      }
      this.hotHistroy.unshift(this.value);
      localStorage.setItem("hotHistroy", JSON.stringify(this.hotHistroy));
      this.$network
        .getList({
          params: {
            limit: 10,
            page: 1,
            course_type: 0,
            keywords: this.value
          }
        })
        .then(res => {
          console.log("符合输入框的数据", res);
          this.automatic = res.data.data.list;
          if (res.data.data.list == 0) {
            this.photoShow = true;
          } else {
            this.photoShow = false;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.search_box {
  width: 100%;
  height: 100vh;
  .search_header {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #eee;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .search_header_one {
      flex: 1;
      color: #999;
      i {
        margin-left: 30px;
      }
    }
    .search_header_two {
      flex: 6;
      input {
        height: 8vw;
        padding-left: 7.46667vw;
        border: none;
        background: #e4e7ed;
        border-radius: 4vw;
        font-size: 4vw;
        width: 86%;
      }
    }
    .search_header_there {
      flex: 1;
      font-size: 3.73333vw;
      color: #d2d2d1;
    }
  }
  .history-search {
    margin: 4vw 4.53333vw;
    .his-header {
      height: 10.66667vw;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .history {
          font-size: 4.5vw;
          color: #333;
          font-weight: 700;
        }
      }
      .history_show {
        span {
          display: inline-block;
          height: 25px;
          line-height: 25px;
          text-align: center;
          padding: 10px 30px;
          margin-bottom: 20px;
          margin-right: 30px;
          border-radius: 40px;
          background-color: #f7f7f7;
          font-size: 25px;
        }
      }
    }
  }
  .search_automatic {
    width: 100%;
    background-color: white;
    margin-top: -20px;
    .search_automatic_box {
      width: 100%;
      height: 100%;
      background-color: #f8f8f8;
      margin: 0 auto;
      .search_automatic_wrapper {
        width: 100%;
      }
    }
  }
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
