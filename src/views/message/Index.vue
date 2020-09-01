<template>
  <div class="liuyan">
    <div class="liuyantitle">
      <p>给我们留言</p>
      <p>
        <van-icon name="arrow-down" size="25" />
      </p>
    </div>
    <div class="help">
      <p>
        您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题
      </p>
    </div>
    <div class="liuyannum">
      <p>手机</p>
      <input type="number" placeholder="请输入" v-model="number" />
    </div>
    <div class="liuyancont">
      <p>留言内容</p>
      <textarea
        name
        id
        cols="30"
        rows="10"
        placeholder="请输入"
        v-model="content"
      ></textarea>
    </div>
    <div class="tijiao">
      <button @click="tijiao">提 交</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import { liuyan } from "../http/api";
// import axios from "axios";
export default {
  name: "liuyan",
  data() {
    return {
      number: "",
      content: ""
    };
  },
  created() {},
  methods: {
    tijiao() {
      if (this.number == "" || this.content == "") {
        Toast.fail("至少填写一项联系方式");
      }
      // this.$axios
      //   .post("https://new-api.meiqia.com/client", {})
      //   .then(res => {
      //     console.log(res);
      //   });
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
    font-size: 24px;
    color: #666666;
  }
  .liuyannum {
    font-size: 26px;
    p {
      margin-left: 30px;
    }
    input {
      width: 100%;
      height: 80px;
      border: none;
      padding-left: 30px;
    }
  }
  .liuyancont {
    font-size: 26px;
    p {
      margin-left: 30px;
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
</style>
