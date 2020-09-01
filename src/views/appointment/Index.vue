<template>
  <div id="subscribe">
    <!-- 顶部样式 -->
    <div class="wdw_top">
      <header>
        <span class="back" @click="back">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAA/ElEQVQoU33RsUvWYRTF8c8hQmgIE4e2IFDQIfCPcHGIlBpqcWtPcFHBFgWdHGxykURxUtfWZkfHtkZBCBzcrjzxe+P9ha/P9sD33nPuOfHIq6pJnOBZRnFVNYdzvML+g2BVfcIBnuJLkm89sKqeYAcruMaHJD+b6j+wqiZwinlcYinJ74G1v2BVven8vMYRPie5G/afqnqPQ4xhNcneQwc28AYvsJ1kfVQKDVzAMZ5jE1tJ6v+BgcdpXGAGZ1hOctvzOPhUVdvYDnmLKywm+dW7eghuCl+xgT/4mORHL8dhmap6h++tY6wl2X2s69nO91SLbyTYFTHebX55D93jTsSH0JDDAAAAAElFTkSuQmCC"
          />
        </span>
        <h3>预约课程</h3>
      </header>
    </div>
    <!-- 顶部样式 -->

    <!-- 教师信息 -->
    <div class="wdw_teacherInfo">
      <div class="ti-base">
        <img alt :src="teachInfo.avatar" />
        <div>
          <p>
            <span>{{ teachInfo.teacher_name }}</span>
            <font>{{ teachInfo.level_name }}</font>
          </p>
          <p>
            {{ teachInfo.sex != "0" ? "女" : "男" }}
            <font>{{ teachInfo.teach_age }}年教龄</font>
          </p>
        </div>
        <button @click="goDetails">查看详情</button>
      </div>
    </div>
    <!-- 教师信息 -->
    <div class="wdw_content">
      <p>
        选择时间
        <span>(北京时间)</span>
      </p>

      <div class="wdw_check">
        <ul>
          <li
            v-for="(item, index) in days"
            :key="index"
            :class="[{ disbad: index < 3 }]"
            @click="change(index)"
          >
            <span :class="[{ active: activeIndex === index }]">
              {{
              item.week
              }}
            </span>
            <span :class="[{ active: activeIndex === index }]">
              {{
              item.day
              }}
            </span>
            <i :class="[{ isShow: activeIndex === index }]"></i>
          </li>
        </ul>
      </div>

      <div class="empty">
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" />
        <p>暂无信息</p>
      </div>
    </div>
    <van-button type="danger" @click="dian()">立即预约</van-button>
  </div>
</template>

<script>
// import { teachDetails, day } from "../http/api";
import axios from "axios";
export default {
  data() {
    return {
      teachInfo: "",
      days: [],
      activeIndex: 3
    };
  },
  // 侦听器
  watch: {},
  created() {
    this.getDetail();
    this.getDay();
  },
  mounted() {},
  // 组件方法
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    //讲师信息
    getDetail() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .get(
            `https://www.365msmk.com/api/app/teacher/${this.$route.query.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("课程预约的数据", res);
            this.teachInfo = res.data.data.teacher;
          });
      }
    },
    //获取日期
    getDay() {
      // 获取token值
      let token = localStorage.getItem("msmkToken");
      let data = {
        is_next: 0,
        teacher_id: this.$route.query.id,
        week_day: 7
      };
      //   请求数据
      this.$network.getInvite(data, { token }).then(res => {
        console.log("日期", res);
        this.days = res.data.data.weekDateList;

        var myDate = new Date();
        // console.log(myDate)
        var year = myDate.getFullYear(); //年
        // console.log("年", year);
        // console.log(this.days)

        let nextweek = [];
        for (let i = 0; i < 7; i++) {
          let datez = new Date(myDate.getTime() + (i + 4) * 24 * 3600 * 1000);
          let monthz = datez.getMonth() + 1;
          let dayz = datez.getDate();
          if (monthz < 10) {
            monthz = "0" + monthz;
          }
          if (dayz < 10) {
            dayz = "0" + dayz;
          }
          nextweek.push(`${monthz}月${dayz}日`);
        }

        this.days = this.days.concat(nextweek);

        let arr2 = this.days.map(item => {
          let dar = `${item.replace("月", "/").replace("日", "")}`;
          return dar;
        });

        let arr = this.days.map(item => {
          let date = new Date(
            `${year}-${item.replace("月", "-").replace("日", "")}`
          );
          let week = date.getDay();
          switch (week) {
            case 1:
              week = "周一";

              break;

            case 2:
              week = "周二";

              break;

            case 3:
              week = "周三";

              break;

            case 4:
              week = "周四";

              break;

            case 5:
              week = "周五";

              break;

            case 6:
              week = "周六";

              break;

            case 0:
              week = "周日";

              break;
          }
          return week;
        });

        let over = [];
        arr.forEach((item, index) => {
          let obj = {
            week: item,
            day: arr2[index]
          };
          over.push(obj);
        });
        //  console.log(over)
        this.days = over;
      });
    },
    //改变样式
    change(i) {
      if (i < 3) {
        return;
      }
      this.activeIndex = i;
    },
    dian() {
      this.$toast("请选择预约时间");
    },
    //跳到详情页
    goDetails() {
      this.$router.push({
        path: "/teacher",
        query: {
          id: this.$route.query.id
        }
      });
    }
  },
  // 计算属性
  computed: {}
};
</script>

<style lang="scss" scoped>
#subscribe {
  min-height: 100vh;
  background: #f0f2f5;
  padding-bottom: 1.6rem;
  padding-bottom: 16vw;
  box-sizing: border-box;
  /deep/.van-button {
    width: 100%;
    line-height: 88px;
    height: 88px;
    background: #eb6100;
    font-size: 34px;
    color: #fff;
  }
  /deep/.van-button--normal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  //顶部样式
  .wdw_top .back,
  .wdw_top header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wdw_top {
    height: 2.66667rem;
    height: 26.66667vw;

    line-height: 88px;
    background: linear-gradient(180deg, #63b7fe, #4e7de3);
    > header {
      height: 88px;
      width: 100%;
      padding-right: 0.66667rem;
      padding-right: 6.66667vw;
      box-sizing: border-box;
      > .back {
        width: 0.66667rem;
        width: 6.66667vw;
        height: 100%;
        padding-left: 0.26667rem;
        padding-left: 2.66667vw;
        > img {
          width: 0.24rem;
          width: 2.4vw;
          height: 0.42667rem;
          height: 4.26667vw;
        }
      }
      h3 {
        flex: 2;
        text-align: center;
        font-size: 0.48rem;
        font-size: 4.8vw;
        color: #fff;
      }
    }
  }
  //顶部样式

  //教师信息
  .wdw_teacherInfo {
    margin: -1.52rem auto 0;
    margin: -15.2vw auto 0;
    width: 9.46667rem;
    width: 94.66667vw;
    padding: 0 0.4rem;
    padding: 0 4vw;
    background: #fff;
    border-radius: 0.10667rem;
    border-radius: 1.06667vw;
    box-sizing: border-box;
    padding-bottom: 0.4rem;
    padding-bottom: 4vw;
    > .ti-base {
      height: 2.02667rem;
      height: 20.26667vw;
      display: flex;
      align-items: center;
      > img {
        width: 1.06667rem;
        width: 10.66667vw;
        height: 1.06667rem;
        height: 10.66667vw;
        margin-right: 0.32rem;
        margin-right: 3.2vw;
        border-radius: 50%;
        flex: none;
      }
      > div {
        flex: 1;
        > p {
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
        > p:first-child {
          padding-bottom: 0.08rem;
          padding-bottom: 0.8vw;
          > span {
            font-size: 0.4rem;
            font-size: 4vw;
            color: #595959;
            line-height: 0.56rem;
            line-height: 5.6vw;
            padding-right: 0.13333rem;
            padding-right: 1.33333vw;
          }
          > font {
            font-size: 0.29333rem;
            font-size: 2.93333vw;
            color: #ea7a2f;
          }
        }
        > p:nth-child(2) {
          font-size: 0.32rem;
          font-size: 3.2vw;
          color: #b7b7b7;
          line-height: 0.45333rem;
          line-height: 4.53333vw;
        }
      }
      > button {
        width: 156px;
        height: 60px;
        line-height: 60px;
        background: #ffff;
        font-size: 26px;
        color: #eb6100;
        border: 1px solid #eb6100;
        font-weight: 400;
        border-radius: 32px;
      }
      > span {
        font-size: 30px;
        color: #b7b7b7;
      }
    }
  }
  //教师信息

  //内容
  .wdw_content {
    > p {
      position: relative;
      font-size: 30px;
      font-weight: 400;
      color: #595959;
      line-height: 100px;
      padding-left: 50px;
      height: 100px;
      > span {
        font-size: 24px;
      }
    }
    > p::after {
      content: "";
      position: absolute;
      left: 25px;
      top: 30px;
      width: 6px;
      height: 34px;
      background: #eb6100;
    }
    .wdw_check {
      background: #ffff;
      margin: 0 auto;
      padding: 0 20px;
      width: 94%;
      box-sizing: border-box;
      overflow: auto;
      height: 140px;
      display: flex;
      > ul {
        display: flex;
        justify-content: space-around;
        height: 110px;
        border-bottom: 1px solid #f5f5f5;
        > li {
          width: 112px;
          flex-direction: column;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 10px;
          box-sizing: border-box;
          font-size: 26px;
          position: relative;
          > span:nth-of-type(1) {
            margin-bottom: 12px;
            display: block;
          }
          > i {
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -20%;
            height: 8px;
            background: #63b7fe;
            width: 42px;
            border-radius: 20px;
            display: none;
          }
        }
        .disbad {
          color: #b7b7b7;
        }
        .isShow {
          display: block;
        }
        .active {
          color: #eb6100;
        }
      }
    }
    > .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > img {
        width: 4rem;
        width: 40vw;
        height: 4rem;
        height: 40vw;
      }
      > p {
        font-size: 0.4rem;
        font-size: 4vw;
        color: #8c8c8c;
        margin-top: 0.53333rem;
        margin-top: 5.33333vw;
      }
    }
  }
  //内容
}
</style>
