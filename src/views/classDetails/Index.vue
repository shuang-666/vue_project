<template>
  <div class="classDetails_box">
    <!-- 头部 -->
    <div class="classDetails_box_header">
      <div class="classDetails_box_header_back" @click="back">
        <van-icon name="arrow-left" size="25" />
      </div>
      <div class="classDetails_box_header_name">课程详情</div>
      <div class="classDetails_box_header_img" @click="share">
        <img
          src="data:image/png;base64,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"
          alt
        />
      </div>
    </div>
    <!-- 内容 -->
    <div class="classDetails_box_content">
      <!-- 第一部分 -->
      <div class="classDetails_box_content_one">
        <p class="classDetails_box_content_one_p1">{{ info.title }}</p>
        <div v-if="star" @click="starClick">
          <van-icon name="star-o" size="25" />
        </div>
        <div v-if="starback" @click="starClickBack">
          <van-icon name="star" size="25" color="#FC5500" />
        </div>
        <p class="classDetails_box_content_one_p2">免费</p>
        <div class="classDetails_box_content_one_div">
          共{{ info.total_periods }}课时 |
          <span>{{ info.sales_num }}</span>人已报名
        </div>
      </div>
      <!-- 教学团队 -->
      <div class="classDetails_box_content_two">
        <p class="classDetails_box_content_two_p1">教学团队</p>
        <div
          class="classDetails_box_content_two_div"
          v-for="(item, index) in list.teachers"
          :key="index"
          @click="goTeacher(item.teacher_id)"
        >
          <img :src="item.avatar" alt />
          <div>{{ item.teacher_name }}</div>
        </div>
      </div>
      <!-- 课程介绍 -->
      <div class="classDetails_box_content_there">
        <p>课程介绍</p>
        <div v-html="info.course_details"></div>
      </div>
      <!-- 课程大纲 -->
      <div class="classDetails_box_content_si">
        <p>课程大纲</p>
        <div class="charpter">
          <div v-for="(item, index) in chapter" :key="index">
            <section class="period">
              <div class="charp-title">
                <span>回放</span>
                {{ item.periods_title }}
              </div>
              <p class="charp-time" v-for="(items, index) in item.teachers" :key="index">
                {{ items.teacher_name }}
                <span>{{ item.total_start_play }} - {{ item.total_end_play }}</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <!-- 课程评论 -->
      <div class="classDetails_box_content_comment">
        <p>课程评论</p>
        <div
          class="classDetails_box_content_comment_box"
          v-for="(item, index) in comment.list"
          :key="index"
        >
          <div class="classDetails_box_content_comment_box_img">
            <img :src="item.avatar" alt />
          </div>
          <div class="classDetails_box_content_comment_box_name">
            <div>{{ item.nickname }}</div>
            <p>{{ item.content }}</p>
          </div>
          <div class="classDetails_box_content_comment_box_start">
            <van-rate
              v-model="item.grade"
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="classDetails_box_content_comment_box_sj">
            <div>{{ item.created_at | classTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="teacher-button" v-show="!msg" @click="order">
      <button>立即报名</button>
    </div>
    <div class="teacher-button" v-show="msg" @click="study">
      <button>立即学习</button>
    </div>
    <!-- 二维码 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <p>分享</p>
          <div>
            <img :src="imrUrl" />
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import QRCode from "qrcode";
export default {
  data() {
    return {
      id: this.$route.query.id, //前面传过来的id
      course_type: this.$route.query.course_type, //前面传来的course_type
      info: [],
      list: [],
      comment: [],
      star: true,
      starback: false,
      collect_id: 0,
      is_collect: 0,
      show: false,
      imrUrl: "",
      chapter: [], //课程大纲的数据
      msg: false
    };
  },
  created() {
    this.classDetails();
    this.commentClass();
    this.getChapter(); //课程大纲的信息
    // 当进入页面的时候，判断用户是否是已经收藏过
    let token = localStorage.getItem("msmkToken");
    if (token) {
      axios
        .get(
          `https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then(res => {
          console.log("进入页面是需要判断用户是否已经收藏过的接口", res);
          if (res.data.code == 200) {
            this.collect_id = res.data.data.info.collect_id;
            this.is_collect = res.data.data.info.is_collect;
            if (res.data.data.info.is_collect == "0") {
              //已关注
              this.star = true;
              this.starback = false;
            } else if (res.data.data.info.is_collect == "1") {
              //取消关注
              this.star = false;
              this.starback = true;
            } else {
              this.star = true;
              this.starback = false;
            }

            if (res.data.data.info.is_buy == "1") {
              this.msg = true;
            }
          } else {
            return;
          }
        });
    }
  },
  methods: {
    // 点击立即学习
    study() {
      this.$router.push({
        path: "/study-detail",
        query: {
          course_id: this.id
        }
      });
    },
    // 点击立即报名的按钮
    order() {
      this.msg = true;
      this.$network
        .getOrder({
          shop_id: this.id,
          type: this.course_type
        })
        .then(res => {
          console.log("立即学习的接口", res);
          if (res.data.data.is_zero_buy == 1) {
            let token = localStorage.getItem("msmkToken");
            if (token) {
              axios
                .get(
                  `https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`,
                  {
                    headers: {
                      authorization: `Bearer ${token}`
                    }
                  }
                )
                .then(res => {
                  console.log("买过的商品后刷新页面", res);
                });
            }
          }
        });
    },
    // 点击课程详情页面的教师团队，查看老师详情
    goTeacher(id) {
      console.log(id);
      this.$router.push({
        path: "/teacher",
        query: {
          id
        }
      });
    },
    // 点击分享
    share() {
      this.show = true;
      let url = location.href;
      console.log(url);
      QRCode.toDataURL(url)
        .then(tpian => {
          console.log(tpian);
          this.imrUrl = tpian;
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 点击没有颜色的收藏的接口
    starClick() {
      // 获取token值
      let token = localStorage.getItem("msmkToken");
      // 如果有token值的时候，就调用收藏的接口
      if (token) {
        // collect的接口
        this.$network
          .getclassDetails(
            // 传递参数
            { course_basis_id: this.id, type: 1 },
            // 设置请求头
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("点击收藏的图标", res);
            // 如果返回的状态码是200的话，就证明用户已经收藏成功
            if (res.data.code == 200) {
              Toast.success("收藏成功");
              // 判断样式
              this.star = false;
              this.starback = true;
              this.collect_id = res.data.data;
              axios
                .get(
                  `https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`,
                  {
                    headers: {
                      authorization: `Bearer ${token}`
                    }
                  }
                )
                .then(res => {
                  console.log("收藏的接口", res);
                  if (res.data.code == 200) {
                    this.collect_id = res.data.data.info.collect_id;
                    this.is_collect = res.data.data.info.is_collect;
                  }
                });
            }
          });
        // 就是用户没有注册的时候，请用户先要注册
      } else {
        this.$toast("您还没有注册，请先注册");
      }
    },
    // 点击有颜色的收藏的图标(取消收藏)
    starClickBack() {
      // 也是先要判断用户是否已经登录
      let token = localStorage.getItem("msmkToken");
      // 如果
      if (token) {
        // 这个是点击取消是调的接口
        axios
          .put(
            `https://www.365msmk.com/api/app/collect/cancel/${this.collect_id}/${this.is_collect}`,
            {},
            // 设置请求头
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("收藏的接口1111", res);
            if (res.data.code == 200) {
              this.star = true;
              this.starback = false;
              this.$toast("取消收藏");
              // 点击取消后的要调的接口
              axios
                .get(
                  `https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`,
                  {
                    headers: {
                      authorization: `Bearer ${token}`
                    }
                  }
                )
                .then(res => {
                  console.log("取消收藏的接口", res);
                });
            }
          });
      } else {
        this.$toast("您还没有注册，请先注册");
      }
    },
    back() {
      this.$router.go(-1);
    },
    classDetails() {
      // let token = localStorage.getItem("msmkToken");
      // if (token) {
      axios
        .get(`https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`)
        .then(res => {
          console.log("商品详情的数据", res);
          this.list = res.data.data;
          this.info = res.data.data.info;
        });
      // }
    },
    commentClass() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        this.$network
          .getCommentClass(
            {
              id: this.id,
              limit: 10,
              page: 1
            },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log(res.data.data);
            this.comment = res.data.data;
          });
      }
    },
    // 课程大纲的信息
    getChapter() {
      this.$network
        .getChapter({
          id: this.id
        })
        .then(res => {
          console.log("课程大纲的信息", res);
          if (res.data.code == 200) {
            this.chapter = res.data.data;
          } else {
            this.$toast("请重新登录");
          }
        })
        .catch(err => {
          console.log("网络异常", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  p {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    line-height: 70px;
  }
  div {
    width: 80%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      margin-left: 10%;
    }
  }
}
.classDetails_box {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .classDetails_box_header {
    width: 100%;
    height: 90px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    line-height: 90px;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .classDetails_box_header_back {
      margin-top: 12px;
      margin-left: 10px;
    }
    .classDetails_box_header_name {
      font-size: 35px;
      color: #333;
    }
    .classDetails_box_header_img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .classDetails_box_content {
    width: 100%;
    height: 90vh;
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 90px;
    .classDetails_box_content_one {
      padding: 0 30px;
      box-sizing: border-box;
      width: 100%;
      height: 280px;
      background-color: white;
      overflow: hidden;
      .classDetails_box_content_one_p1 {
        width: 89%;
        margin-top: 50px;
      }
      div {
        i {
          float: right;
          margin-top: -80px;
          color: #999;
        }
      }

      .classDetails_box_content_one_p2 {
        font-size: 35px;
        color: red;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .classDetails_box_content_one_div {
        font-size: 30px;
        color: #999;
        span {
          font-size: 33px;
        }
      }
    }
    .classDetails_box_content_two {
      width: 100%;
      height: 280px;
      margin-top: 30px;
      background-color: white;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
      .classDetails_box_content_two_p1 {
        margin-top: 30px;
        font-size: 31px;
        color: #333;
      }
      .classDetails_box_content_two_div {
        width: 100px;
        height: 130px;
        margin-left: 20px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-top: 30px;
          margin-left: 15px;
        }
        div {
          text-align: center;
          font-size: 25px;
          color: #999;
        }
      }
    }
    .classDetails_box_content_there {
      width: 100%;
      height: 180px;
      margin-top: 30px;
      background-color: white;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
      p {
        font-size: 31px;
        color: #333;
        margin-top: 20px;
      }
      div {
        margin-top: 20px;
        margin-left: 20px;
        font-size: 27px;
      }
    }
    .classDetails_box_content_si {
      width: 100%;
      margin-top: 30px;
      background-color: white;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
      p {
        font-size: 31px;
        color: #333;
        margin-top: 20px;
      }
      .charpter {
        padding: 0 4vw 2.66667vw;
        div {
          .period {
            padding: 2.66667vw 0 0 0;
            .charp-title {
              position: relative;
              padding-left: 4vw;
              line-height: 8vw;
              font-size: 3.2vw;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #595959;
              span {
                display: inline-block;
                margin-right: 1.33333vw;
                padding: 0 1.33333vw;
                height: 4.8vw;
                border-radius: 0.53333vw;
                font-size: 3.2vw;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: hsla(0, 0%, 100%, 0.85);
                line-height: 4.8vw;
                text-align: center;
                background: #ea7a2f;
              }
            }
            .charp-time {
              font-size: 3.2vw;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #8c8c8c;
              padding-bottom: 1.33333vw;
              padding-left: 6.66667vw;
            }
          }
        }
      }
    }
    .classDetails_box_content_comment {
      width: 100%;
      background-color: white;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
      margin-top: 30px;
      p {
        font-size: 31px;
        color: #333;
        margin-top: 20px;
      }
      .classDetails_box_content_comment_box {
        width: 100%;
        height: 100px;
        display: flex;
        margin-top: 20px;
        .classDetails_box_content_comment_box_img {
          width: 90px;
          height: 70px;
          border-radius: 50%;
          margin-top: 20px;
          margin-left: 15px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .classDetails_box_content_comment_box_name {
          width: 50%;
          div {
            font-size: 26px;
            color: #333;
            margin-top: 20px;
            margin-left: 15px;
          }
          p {
            color: #999;
            font-size: 20px;
            margin-left: 20px;
            margin-top: 10px;
          }
        }
        .classDetails_box_content_comment_box_start {
          width: 50%;
          margin-top: 15px;
        }
        .classDetails_box_content_comment_box_sj {
          width: 50%;
          div {
            font-size: 25px;
            color: #999;
            margin-top: 25px;
          }
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
