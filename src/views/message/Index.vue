<template>
  <!-- 留言内容 -->
  <div class="liuyan">
    <div class="liuyantitle">
      <p>给我们留言</p>
      <p @click="back">
        <van-icon name="arrow-down" size="25" />
      </p>
    </div>
    <div class="help" v-if="show">
      <p>您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</p>
    </div>
    <div class="liuyannum" v-if="show">
      <p>手机</p>
      <input type="number" placeholder="请输入" v-model="number" />
    </div>
    <div class="liuyancont" v-if="show">
      <p>
        留言内容
        <span>*</span>
      </p>
      <textarea name id cols="30" rows="10" placeholder="请输入" v-model="content"></textarea>
    </div>
    <div class="tijiao" v-if="show">
      <button @click="tijiao">提 交</button>
    </div>
    <!-- 留言成功 -->
    <div class="message" v-if="!show">
      <h2>留言成功</h2>
      <div>我们会尽快联系你</div>
      <div class="button" @click="base">
        <button>关闭</button>
      </div>
      <div class="liuyan_back" @click="message_new">
        <a>再次留言</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "liuyan",
  data() {
    return {
      number: "",
      content: "",
      show: false
    };
  },
  created() {},
  methods: {
    base() {
      this.$router.go(-1);
    },
    message_new() {
      this.show = true;
    },
    back() {
      this.$router.go(-1);
    },
    tijiao() {
      if (this.number == "" || this.content == "") {
        Toast("至少填写一项联系方式");
      }
      axios
        .post(`https://new-api.meiqia.com/client/tickets_v2?ent_id=149768`, {
          channel: "widget",
          client_info: { tel: this.number },
          content: this.content,
          enterprise_id: 149768,
          reserve_token: null,
          track_id: "1UokRlEUbHZn8WCMcSxkMvx1OGK",
          visit_id: "1gxbDWJxILmBBpqwzkwUFXM2o5l"
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.liuyan {
  width: 100%;
  height: 100vh;
  margin-top: -30px;
  background: #f3f3f3;
  .liuyantitle {
    background: #007aff;
    width: 100%;
    height: 120px;
    position: relative;
    color: whitesmoke;
    p {
      padding-top: 40px;
      margin-left: 30px;
      font-size: 27px;
    }
    i {
      position: absolute;
      width: 40px;
      top: 40px;
      right: 25px;
    }
  }
  .help {
    width: 90%;
    margin: 0 auto;
    font-size: 22px;
    color: #666666;
  }
  .liuyannum {
    font-size: 23px;
    p {
      margin-left: 40px;
      margin-top: 40px;
    }
    input {
      width: 100%;
      height: 80px;
      border: none;
      padding-left: 30px;
    }
  }
  .liuyancont {
    font-size: 23px;
    p {
      margin-left: 40px;
      span {
        color: rgb(255, 92, 94);
        margin-left: 10px;
      }
    }
    textarea {
      width: 95%;
      height: 180px;
      border: none;
      padding-left: 30px;
      padding-top: 20px;
    }
  }
  .tijiao {
    width: 90%;
    height: 110px;
    margin: 0 auto;
    button {
      color: white;
      width: 100%;
      height: 80px;
      border: none;
      margin-top: 20px;
      border-radius: 10px;
      background: #007aff;
    }
  }
}
.message {
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  h2 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  div {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    margin-top: -10px;
  }
  .button {
    width: 100%;
    button {
      width: 40%;
      height: 70px;
      background-color: #007aff;
      margin: 50px auto;
      border: none;
      border-radius: 10px;
      color: white;
    }
  }
  .liuyan_back {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 100px;
    a {
      border-bottom: 1px solid #000;
    }
  }
}
</style>
