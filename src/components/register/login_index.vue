<template>
  <div class="lodin_wrapper">
    <div class="login_container">
      <div class="login_icon">
        <img
          src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
          alt
        />
      </div>
      <div class="Resiger_item_container">
        <div class="home_login_mobel">
          <input type="text" placeholder="请输入手机号" v-model="photo" />
          <button
            :class="!enable ? 'resg-right-two' : 'resg-right-two-enable'"
            @click="getSmsCode"
          >{{ msg }}</button>
        </div>
        <input type="text" placeholder="获取短信验证码" v-model="pwd" />
        <div class="yanzhengma">
          <div>*未注册的手机号将自动注册</div>
          <button @click="backLogin">使用密码登录</button>
        </div>
      </div>
    </div>
    <!-- button按钮 -->
    <div class="login">
      <span @click="clickRegister">登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: "", //手机号
      pwd: "", //验证码
      msg: "获取验证码",
      enable: false //样式的改变
    };
  },
  methods: {
    backLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 获取验证码
    getSmsCode() {
      this.enable = !this.enable;
      let mobile = this.photo;
      this.$network
        .getAuthCode({
          mobile,
          sms_type: "login"
        })
        .then(res => {
          this.time();
          if (res.data.code == 200) {
            this.$toast("获取验证码成功!!");
          } else {
            this.$toast("获取验证码失败!!!");
          }
        });
    },
    // 倒计时
    time() {
      var count = 60;
      var timer = setInterval(() => {
        count--;
        this.msg = `获取验证码(${count})`;
        if (count == 0) {
          this.enable = !this.enable;
          this.msg = "获取验证码";
          window.clearInterval(timer);
        }
      }, 1000); // // 如果enable是false，即变颜色的时候  直接终止
    },
    // 点击登录
    clickRegister() {
      this.$network
        .getLogin({
          mobile: this.photo,
          sms_code: this.pwd,
          type: 2
        })
        .then(res => {
          console.log("使用验证码来登录获取的数据", res);
          if (res.data.code == 200) {
            // 获取后台返回的token值
            window.localStorage.setItem(
              "msmkToken",
              res.data.data.remember_token
            );
            if (res.data.data.is_new == 2) {
              this.$router.push({
                path: "/my"
              });
            } else if (res.data.data.is_new == 1) {
              this.$router.push({
                path: "/set-pass",
                query: {
                  mobile: this.photo,
                  sms_code: this.pwd
                }
              });
            }
          } else {
            //判断返回数据的smg，跳转不同的页面
            if (this.photo == "") {
              this.$toast("请输入您的手机号!!");
            } else if (this.photo.length != "11") {
              this.toast("您输入的手机号码格式不对！");
            } else if (this.pwd.length != 6) {
              this.toast("您输入的验证码码格式不对！");
            } else {
              this.$toast(res.data.msg);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 80%;
  /* height: 100vh; */
  margin: 100px 10%;
}
.lodin_wrapper {
  width: 100%;
  /* height: 100vh; */
}
.login_icon {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-self: start;
  margin-bottom: 100px;
  img {
    width: 465px;
    height: 105px;
    border-radius: 0px;
  }
}
.Resiger_item_container {
  width: 100%;
  color: #999;
  margin-top: 50px;
}
.Resiger_item_container input {
  border-style: none;
  border-bottom: 1px solid #eee;
  width: 100%;
  height: 100px;
  outline: none;
  color: #eee;
}
.Resiger_item_container input::placeholder {
  color: #ccc;
  font-size: 31px;
}
.home_login_mobel {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.home_login_mobel input {
  width: 80%;
  border-style: none;
}

.Resiger_item_container .yanzhengma {
  font-size: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.Resiger_item_container .yanzhengma div {
  color: #ccc;
  font-size: 25px;
}
.Resiger_item_container .yanzhengma button {
  color: #333;
  border: 0px;
  background-color: #fff;
  height: 60px;
  font-size: 25px;
}
.login {
  width: 81.73333vw;
  height: 12vw;
  margin: 15.73333vw auto 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAsAAACECAYAAAD2k6KpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTA4NTY0QkFCNzM3MTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTA4NTY0QkJCNzM3MTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNzRCQjQyN0I3MzIxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNzRCQjQyOEI3MzIxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu/n5g8AAAwlSURBVHja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);
  background-size: 100% 100%;
  font-size: 3.73333vw;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #fff;
  letter-spacing: 0.53333vw;
  span {
    display: inline-block;
    width: 74.66667vw;
    height: 12vw;
    line-height: 12vw;
  }
}
.resg-right-two {
  color: red;
  font-size: 24px;
  background-color: #fff;
  border-style: none;
  outline: none;
  margin-left: -50px;
}
.resg-right-two-enable {
  color: #999;
  font-size: 24px;
  background-color: #fff;
  border-style: none;
  outline: none;
  margin-left: -90px;
}
</style>
