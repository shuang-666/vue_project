<template>
  <div class="class_box">
    <!-- 头部 -->
    <div class="class_header">
      <div></div>
      <div class="class_header_name">特色课</div>
      <div class="class_header_search" @click="searchClick">
        <van-icon name="search" size="30" />
      </div>
    </div>
    <!-- 三个排序 -->
    <div class="class_sort">
      <van-dropdown-menu>
        <!-- 分类的筛选 -->
        <van-dropdown-item title="分类" ref="item">
          <div class="wdw_checked">
            <div class="wdw_classname" v-for="(item, index) in classList" :key="index" ref="one">
              <p>{{ item.name }}</p>
              <ul>
                <li
                  v-for="(itemChild, index) in item.child"
                  :key="index"
                  :class="
                    changedone == itemChild.id || changedtwo == itemChild.id
                      ? 'active'
                      : ''
                  "
                  @click="change(item.id, itemChild.id)"
                >{{ itemChild.name }}</li>
              </ul>
            </div>
            <div class="wdw_button">
              <button @click="onConfirm">重置</button>
              <button @click="onConfirm">确认</button>
            </div>
          </div>
        </van-dropdown-item>
        <!-- 排序 -->
        <van-dropdown-item title="排序" ref="option2">
          <div
            v-for="(item, index) in option2"
            :key="index"
            class="option2_one"
            @click="changeoption2(index)"
          >{{ item.text }}</div>
        </van-dropdown-item>
        <!-- 筛选 -->
        <van-dropdown-item title="筛选" ref="option3">
          <div class="nav_right">
            <div data-v-63930790 class="tmk-item">
              <div
                v-for="(item, index) in option3"
                :key="index"
                @click="changeoption3(index)"
              >{{ item.title }}</div>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 具体的内容 -->
    <div class="class_cont">
      <ListTwo
        v-for="(ele, index) in list"
        :key="index"
        :title="ele.title"
        :num="ele.total_periods"
        :toux="ele.teachers_list"
        :count="ele.sales_num"
        :price="ele.price"
        :time="ele.start_play_date"
        :endTime="ele.end_play_date"
        :buy="ele.has_buy"
        @twoClick="twoClick(ele.id, ele.course_type)"
      ></ListTwo>
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
      //班级数据
      classList: "",
      //班级和年级的选中的id
      changedone: "",
      changedtwo: "",
      option3: [
        { title: "全部" },
        { title: "大课班" },
        { title: "小课班" },
        { title: "公开课" },
        { title: "点播课" },
        { title: "面授课" },
        { title: "音频课" },
        { title: "系统课" },
        { title: "图文课" },
        { title: "会员课" },
        { title: "" },
        { title: "" }
      ],
      value1: 0,
      option2: [
        { text: "综合排序", value: 0 },
        { text: "最新", value: 1 },
        { text: "最热", value: 2 },
        { text: "价格从低到高", value: 3 },
        { text: "价格从高到低", value: 4 }
      ],
      list: [] //所有的数据
    };
  },
  created() {
    this.class();
    this.getClass();
    this.event();
  },
  methods: {
    searchClick() {
      this.$router.push({
        path: "/search"
      });
    },
    twoClick(id, course_type) {
      console.log(id, course_type);
      this.$router.push({
        path: "/course-detail",
        query: {
          id,
          course_type
        }
      });
    },
    event() {
      window.addEventListener("scroll", () => {
        /* 计算滑动到底部 整个文档的高度  = 可视区域高度 + 滚动的距离*/
        // 获取滚动的距离
        let scrollHeight = document.documentElement.scrollTop;
        //获取整个文档的高度
        let docHeight = document.documentElement.scrollHeight;
        //可视区域高度
        let seeHeight = document.documentElement.clientHeight;
        if (docHeight - seeHeight - scrollHeight == 0) {
          console.log("到底部了");
          window.setTimeout(() => {
            this.$network
              .getList({
                params: {
                  page: +1,
                  limit: 10
                }
              })
              .then(res => {
                console.log("课程的所有数据", res.data.data);
                this.list = [...this.list, ...res.data.data.list];
              });
          }, 1000);
        }
      });
    },
    // 获取班级的数据
    getClass() {
      this.$network.getCourseClass().then(res => {
        console.log("年级的所有数据", res.data.data.attrclassify);
        this.classList = res.data.data.attrclassify;
      });
    },
    // 所有的数据
    class() {
      this.$network
        .getList({
          params: {
            page: 1,
            limit: 10
          }
        })
        .then(res => {
          console.log("课程的所有数据", res.data.data);
          this.list = res.data.data.list;
        });
    },
    // 点击每一项
    change(itemid, itemchildid) {
      if (itemid == 1) {
        this.changedone = itemchildid;
      }
      if (itemid == 2) {
        this.changedtwo = itemchildid;
      }
      console.log(this.changedone, this.changedtwo);
    },
    // 改变第二个
    changeoption2(index) {
      this.$network
        .getList({
          params: {
            page: +1,
            limit: 10,
            order_by: index
          }
        })
        .then(res => {
          this.list = res.data.data.list;
        });
      this.$refs.option2.toggle();
    },
    // 改变第三个option
    changeoption3(index) {
      if (index == 0) {
        this.$network
          .getList({
            params: {
              page: +1,
              limit: 10,
              order_by: index
            }
          })
          .then(res => {
            this.list = res.data.data.list;
          });
      } else {
        var course_type = index + 1;
        this.$network
          .getList({
            params: {
              page: +1,
              limit: 10,
              course_type
            }
          })
          .then(res => {
            this.list = res.data.data.list;
          });
        this.$refs.option3.toggle();
      }
    },
    // 点击确定
    onConfirm() {
      this.$network
        .getList({
          params: {
            page: +1,
            limit: 10,
            attr_val_id: this.changedone + "," + this.changedtwo
          }
        })
        .then(res => {
          this.list = [];
          this.list = res.data.data.list;
        });
      this.$refs.item.toggle();
    }
  }
};
</script>

<style lang="scss" scoped>
.class_box {
  width: 100%;
  // height: 92vh;
  overflow: hidden;
  overflow-y: scroll;
  .class_header {
    width: 100%;
    height: 100px;
    background-color: white;
    line-height: 100px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .class_header_name {
      font-size: 35px;
      color: #333;
      margin-left: 60px;
    }
    .class_header_search {
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  .class_sort {
    width: 100%;
    height: 90px;
    background-color: white;
    border-top: 1px solid #eee;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10000;
    .option2_one {
      padding: 20px;
      text-align: center;
    }
    /deep/.van-dropdown-menu__bar {
      height: 84px;
      .van-dropdown-menu__title {
        font-size: 30px;
        line-height: 84px;
        color: #323233;
      }
      .van-dropdown-menu__title::after {
        border-color: transparent transparent currentColor currentColor;
        border-width: 6px;
        top: 44%;
        right: -24px;
      }
    }
    .nav_right {
      width: 100%;
      .tmk-item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          display: inline-block;
          width: 130px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          padding: 10px;
          margin-top: 20px;
          margin-left: 20px;
          margin-bottom: 10px;
          background-color: #f5f5f5;
        }
        div:nth-last-child(2) {
          border: none;
          background-color: white;
        }
        div:nth-last-child(1) {
          border: none;
          background-color: white;
        }
      }
    }
    .wdw_checked {
      padding: 0 0 20px 30px;
      .wdw_classname {
        padding-bottom: 20px;
        border-bottom: 1px solid #f1f1f1;
        .active {
          color: blue;
        }
        .noactive {
          color: black;
        }
        p {
          width: 100%;
          height: 76px;
          padding: 32px 0 20px;
          font-size: 24px;
        }
        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          li {
            font-size: 26px;
            width: 138px;
            height: 66px;
            line-height: 66px;
            text-align: center;
            color: #646464;
            background: #f5f5f5;
            margin: 0 40px 14px 0;
          }
        }
      }
      .wdw_button {
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button:nth-of-type(1) {
          background: #fff;
          border: 1px solid #d9d9d9;
        }
        button:nth-of-type(2) {
          background: #eb6100;
          color: #fff;
          margin-right: 26px;
        }
        button {
          font-size: 26px;
          width: 339px;
          height: 66px;
          border: none;
          border-radius: 8px;
        }
      }
    }
  }
  .class_cont {
    width: 100%;
    height: 100vh;
    margin-top: 220px;
  }
}
</style>
