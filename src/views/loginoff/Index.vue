<template>
  <div class="loginoff_box">
    <!-- 头部 -->
    <div class="loginoff_box_header">
      <div class="loginoff_box_header_back" @click="back">
        <van-icon name="arrow-left" size="25" />
      </div>
      <div class="loginoff_box_header_name">设置</div>
      <div></div>
    </div>
    <div class="login_trim"></div>
    <div class="loginoff_content">
      <div class="loginoff_content_szhi" @click="setup">
        <div class="loginoff_content_szhi_name">设置密码</div>
        <div class="loginoff_content_szhi_you">
          <van-icon name="arrow" size="20" />
        </div>
      </div>
      <!-- 退出登录 -->
      <div class="loginoff_box_button">
        <button @click="loginoff">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push({
        path: "/my"
      });
    },
    loginoff() {
      localStorage.removeItem("msmkToken");
      this.$router.push({
        path: "/"
      });
    },
    setup() {
      this.$router.push({
        path: "/set-new-pass"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.loginoff_box {
  width: 100%;
  background-color: #f0f2f5;
  height: 100vh;
  .loginoff_box_header {
    width: 100%;
    height: 90px;
    background-color: white;
    line-height: 90px;
    display: flex;
    justify-content: space-between;
    .loginoff_box_header_back {
      margin-left: 20px;
      color: #999;
      margin-top: 10px;
    }
    .loginoff_box_header_name {
      margin-left: -40px;
      font-size: 40px;
    }
  }
  .login_trim {
    width: 100%;
    height: 20px;
  }
  .loginoff_content {
    width: 100%;
    height: 400px;
    background-color: white;
    padding: 0 30px;
    box-sizing: border-box;
    .loginoff_content_szhi {
      width: 100%;
      height: 100px;
      line-height: 100px;
      display: flex;
      justify-content: space-between;
      .loginoff_content_szhi_name {
        font-size: 28px;
        color: #333;
      }
      .loginoff_content_szhi_you {
        color: #999;
        margin-top: 10px;
      }
    }
    .loginoff_box_button {
      width: 100%;
      height: 90px;
      background-color: #eb6100;
      border-radius: 10px;
      margin-top: 140px;
      button {
        width: 100%;
        height: 100%;
        background-color: #eb6100;
        color: white;
        text-align: center;
        align-items: center;
        border: none;
        border-radius: 10px;
        font-size: 35px;
      }
    }
  }
}
</style>
