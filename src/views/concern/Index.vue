<template>
  <div class="concern_box">
    <!-- 头部 -->
    <div class="concern_header">
      <div class="concern_header_back" @click="back">
        <van-icon name="arrow-left" size="25" />
      </div>
      <div class="concern_header_name">我的关注</div>
      <div></div>
    </div>
    <!-- 内容 -->
    <div class="concern_content" v-if="info.length != 0">
      <div class="concern_content_box">
        <div class="item" v-for="(item, index) in info" :key="index">
          <img :src="item.avatar" alt />
          <div class="info">
            <p class="name">
              <span class="span1">{{ item.teacher_name }}</span>
              <span class="span2">{{ item.level_name }}</span>
            </p>
            <p class="introduction">{{ item.introduction }}</p>
          </div>
          <p class="btn" @click="cancel(item.collect_id)">取消关注</p>
        </div>
        <div class="van-list__finished-text">没有更多了</div>
      </div>
    </div>
    <!-- 没有关注显示的内容 -->
    <div class="concern_show" v-if="info.length == 0">
      <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
      <p>暂无关注</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: []
    };
  },
  created() {
    this.concernInfo();
  },
  methods: {
    cancel(id) {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .put(
            `https://www.365msmk.com/api/app/collect/cancel/${id}/2`,
            {},
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("点击取消的接口", res);
            if (res.data.data == 1) {
              this.$toast("取消关注");
              this.concernInfo();
            }
          });
      }
    },
    back() {
      this.$router.go(-1);
    },
    concernInfo() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        this.$network
          .getconcernInfo(
            {
              params: {
                page: 1,
                limit: 10,
                type: 2
              }
            },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("我的页面的我的关注", res);
            this.info = res.data.data.list;
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.concern_box {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .concern_header {
    width: 100%;
    height: 90px;
    line-height: 90px;
    display: flex;
    justify-content: space-between;
    background-color: white;
    .concern_header_back {
      margin-top: 15px;
      margin-left: 20px;
    }
    .concern_header_name {
      margin-left: -50px;
      font-size: 40px;
      color: #333;
    }
  }
  .concern_content {
    width: 100%;
    padding: 4vw 2.66667vw;
    .concern_content_box {
      width: 94%;
      .van-list__finished-text {
        color: #969799;
        font-size: 1.86667vw;
        line-height: 6.66667vw;
        text-align: center;
      }
      .item {
        background-color: #fff;
        padding: 2.66667vw;
        margin-bottom: 2.66667vw;
        border-radius: 1.33333vw;
        position: relative;
        display: flex;
        align-items: center;
        img {
          width: 10.66667vw;
          height: 10.66667vw;
        }
        .info {
          margin-left: 2.66667vw;
          line-height: 6.66667vw;
          .name {
            .span1 {
              font-size: 4vw;
              color: #595959;
            }
            .span2 {
              margin-left: 1.6vw;
              font-size: 2.93333vw;
              color: #ea7a2f;
            }
          }
          .introduction {
            font-size: 3.2vw;
            color: #b7b7b7;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 53.33333vw;
          }
        }
        .btn {
          position: absolute;
          top: 50%;
          right: 4vw;
          transform: translateY(-50%);
          font-size: 3.46667vw;
          color: #eb6100;
          text-align: center;
          width: 20.26667vw;
          height: 7.46667vw;
          line-height: 7.46667vw;
          background: rgba(235, 97, 0, 0.1);
          border-radius: 4.13333vw;
        }
      }
    }
  }
  .concern_show {
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20vw;
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
