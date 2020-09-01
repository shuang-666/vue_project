<template>
  <div class="teacher-page">
    <!-- 头部 -->
    <div class="header">
      <header>
        <span class="back" @click="back">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAA/ElEQVQoU33RsUvWYRTF8c8hQmgIE4e2IFDQIfCPcHGIlBpqcWtPcFHBFgWdHGxykURxUtfWZkfHtkZBCBzcrjzxe+P9ha/P9sD33nPuOfHIq6pJnOBZRnFVNYdzvML+g2BVfcIBnuJLkm89sKqeYAcruMaHJD+b6j+wqiZwinlcYinJ74G1v2BVven8vMYRPie5G/afqnqPQ4xhNcneQwc28AYvsJ1kfVQKDVzAMZ5jE1tJ6v+BgcdpXGAGZ1hOctvzOPhUVdvYDnmLKywm+dW7eghuCl+xgT/4mORHL8dhmap6h++tY6wl2X2s69nO91SLbyTYFTHebX55D93jTsSH0JDDAAAAAElFTkSuQmCC"
            alt
          />
        </span>
        <h3>讲师详情</h3>
      </header>
    </div>
    <!-- 内容 -->
    <div class="teacher-info">
      <div class="ti-base">
        <img :src="detailsItem.avatar" alt />
        <div class="teacher_name">
          <p class="teacher_p1">
            <span>{{ detailsItem.teacher_name }}</span>
            <font>{{ detailsItem.level_name }}</font>
          </p>
          <p class="teacher_p2">
            {{ detailsItem.sex != "0" ? "女" : "男" }}
            <font>{{ detailsItem.teach_age }}年教龄</font>
          </p>
        </div>
        <button v-show="flag" class="button" @click="follow">关注</button>
        <p v-show="guanzhu" @click="cancel">已关注</p>
      </div>
      <div class="ti-label"></div>
    </div>
    <div class="com-box">
      <div class="com-tab">
        <div class="com_content_header">
          <div :class="selIndex == '0' ? 'active' : 'noative'" @click="selectClick('0')">讲师介绍</div>
          <div :class="selIndex == '1' ? 'active' : 'noative'" @click="selectClick('1')">主讲课程</div>
          <div :class="selIndex == '2' ? 'active' : 'noative'" @click="selectClick('2')">学员评价</div>
        </div>
        <div class="com_content_cont">
          <div v-if="selIndex == '0'">
            <ul class="teacher-tro">
              <li v-for="(items, index) in jianjItem.attr" :key="index">
                <span>{{ items.attr_name }}</span>
                <font
                  v-for="(itemss, index) in items.attr_value"
                  :key="index"
                >{{ itemss.attr_value_name }}</font>
              </li>
              <li>
                <span>老师简介</span>
                <font style="text-indent:20px">{{ jianjItem.intro }}</font>
              </li>
            </ul>
          </div>
          <div v-else-if="selIndex == '1'">
            <ListTwo
              v-for="(ele, index) in litsItem"
              :key="index"
              :id="ele.id"
              :title="ele.title"
              :num="ele.total_periods"
              :toux="ele.teachers_list"
              :count="ele.sales_num"
              :price="ele.price"
            ></ListTwo>
          </div>
          <div v-else-if="selIndex == '2'">
            <div v-if="this.commentList.length == 0" class="comment_box">
              <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
              <p>暂无评论</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="teacher-button" @click="appointment">
      <button>立即预约</button>
    </div>
  </div>
</template>

<script>
import ListTwo from "../../components/list/ListTwo";
import axios from "axios";
import { Toast } from "vant";
export default {
  components: {
    ListTwo
  },
  data() {
    return {
      selIndex: 0,
      litsItem: [],
      id: 0,
      commentList: [],
      detailsItem: [],
      jianjItem: [],
      guanzhu: false, //关注
      flag: true //已关注
    };
  },
  created() {
    this.id = this.$route.query.id;
    let token = localStorage.getItem("msmkToken");
    this.$network
      .getListItem({
        limit: 10,
        page: 1,
        teacher_id: this.id
      })
      .then(res => {
        console.log("获取当前老师的课程大纲", res);
        this.litsItem = res.data.data.list;
      });
    this.getcomment(); //获取老师的评价
    //获取关于老师的详情
    if (token) {
      axios
        .get(`https://www.365msmk.com/api/app/teacher/${this.id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log("获取关于老师的信息", res);
          if (res.data.code == 200) {
            this.detailsItem = res.data.data.teacher;
            if (res.data.data.flag == "1") {
              console.log("用户已经关注");
              //已关注
              this.guanzhu = true;
              this.flag = false;
            } else if (res.data.data.flag == "2") {
              console.log("用户没有关注");
              //取消关注
              this.guanzhu = false;
              this.flag = true;
            }
          } else {
            this.$toast("请先注册");
          }
        });
      //获取关于老师的简介的相关的内容
      axios
        .get(`https://www.365msmk.com/api/app/teacher/info/${this.id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log("获取老师的简介的相关的内容", res);
          this.jianjItem = res.data.data;
        });
    }
  },
  methods: {
    appointment() {
      this.$router.push({
        path: "/appointment",
        query: {
          id: this.id
        }
      });
    },
    // 点击已关注的时候,就是取消的时候
    cancel() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .get(`https://www.365msmk.com/api/app/teacher/collect/${this.id}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.guanzhu = false;
              this.flag = true;
            } else {
              return;
            }
          });
      }
    },
    // 点击关注的时候
    follow() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .get(`https://www.365msmk.com/api/app/teacher/collect/${this.id}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.guanzhu = true;
              this.flag = false;
            } else {
              return;
            }
          });
      } else {
        this.$toast("您还没有注册，请先注册");
      }
    },
    back() {
      this.$router.go(-1);
    },
    selectClick(index) {
      this.selIndex = index;
    },
    getcomment() {
      this.$network
        .getComment({
          limit: 10,
          page: 1,
          teacher_id: this.id
        })
        .then(res => {
          console.log(res);
          if (res.data.code != 200) {
            Toast("请先登录，才可以评价老师~");
          } else {
            this.commentList = res.data.data.comment.list;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  color: red;
  border-bottom: 4px solid red;
}
.noative {
  color: #999;
  border: none;
}
.teacher-page {
  min-height: 100vh;
  background: #f0f2f5;
  padding-bottom: 16vw;
  box-sizing: border-box;
  .header {
    height: 26.66667vw;
    line-height: 11.73333vw;
    background: linear-gradient(180deg, #63b7fe, #4e7de3);
    header {
      height: 11.73333vw;
      width: 100%;
      padding-right: 6.66667vw;
      box-sizing: border-box;
      display: flex;
      .back {
        width: 6.66667vw;
        height: 100%;
        padding-left: 2.66667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 2.4vw;
          height: 4.26667vw;
        }
      }
      h3 {
        flex: 2;
        text-align: center;
        font-size: 4.8vw;
        color: #fff;
        margin-top: -1px;
      }
    }
  }
  .teacher-info {
    margin: -15.2vw auto 0;
    width: 94.66667vw;
    padding: 0 4vw;
    background: #fff;
    border-radius: 1.06667vw;
    box-sizing: border-box;
    .ti-base {
      height: 2.02667rem;
      height: 20.26667vw;
      display: flex;
      align-items: center;
      img {
        width: 1.06667rem;
        width: 10.66667vw;
        height: 1.06667rem;
        height: 10.66667vw;
        margin-right: 0.32rem;
        margin-right: 3.2vw;
        border-radius: 50%;
        flex: none;
      }
      .teacher_name {
        flex: 1;
        p {
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
        .teacher_p1 {
          padding-bottom: 0.8vw;
          span {
            font-size: 4vw;
            color: #595959;
            line-height: 5.6vw;
            padding-right: 1.33333vw;
          }
          font {
            font-size: 2.93333vw;
            color: #ea7a2f;
          }
        }
        .teacher_p2 {
          font-size: 3.2vw;
          color: #b7b7b7;
          line-height: 4.53333vw;
          font {
            font-size: 3.2vw;
            color: #b7b7b7;
            line-height: 4.53333vw;
          }
        }
      }
      .button {
        width: 16.53333vw;
        height: 7.46667vw;
        background: #ebeefe;
        border-radius: 4.13333vw;
        font-size: 3.46667vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #4169ff;
        color: #eb6100;
        border: 0;
      }
      p {
        font-size: 4vw;
        color: #b7b7b7;
      }
    }
    .ti-label {
      padding-bottom: 4vw;
    }
  }
  .com-box {
    margin-top: 2.66667vw;
    background: #fff;
    .com-tab {
      position: relative;
      .com_content_header {
        width: 100%;
        height: 95px;
        border-bottom: 1px solid #eee;
        line-height: 95px;
        display: flex;
        justify-content: space-around;
        font-size: 30px;
      }
      .com_content_cont {
        width: 100%;
        .teacher-tro {
          padding: 0 4vw;
          li {
            display: flex;
            line-height: 10.66667vw;
            font-size: 3.46667vw;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #8c8c8c;
            padding-top: 2.66667vw;
            span {
              margin-left: 1.33333vw;
              margin-right: 5.33333vw;
            }
            font {
              padding-top: 1.33333vw;
              line-height: 0.8rem;
              line-height: 8vw;
              flex: 1;
            }
          }
        }
      }
      .comment_box {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
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
  }
  .teacher-button {
    width: 100%;
    height: 90px;
    line-height: 90px;
    color: white;
    text-align: center;
    font-size: 35px;
    position: fixed;
    bottom: 0;
    left: 0;
    button {
      width: 100%;
      height: 100%;
      background-color: #eb6100;
      border: none;
    }
  }
}
</style>
