<template>
  <div class="name_box">
    <!-- 头部 -->
    <div class="sex_header">
      <div class="sex_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="sex_header_name">修改个人信息</div>
      <div class="sex_header_cun" @click="preservation">保存</div>
    </div>
    <div class="sex_trim"></div>
    <!-- 内容 -->
    <div class="name_content">
      <input type="text" v-model="value" placeholder="最多可输入15个字" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.$route.query.value
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 保存数据
    preservation() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        this.$network
          .getSexUser(
            { nickname: this.value },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$router.push({
                path: "/info"
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.name_box {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .sex_header {
    width: 100%;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    line-height: 100px;
    .sex_header_back {
      margin-top: 10px;
      margin-left: 20px;
    }
    .sex_header_name {
      font-size: 35px;
      color: #333;
    }
    .sex_header_cun {
      font-size: 30px;
      color: #333;
      margin-right: 30px;
    }
  }
  .sex_trim {
    width: 100%;
    height: 20px;
  }
  .name_content {
    width: 100%;
    height: 100px;
    background-color: white;
    line-height: 100px;
    input {
      text-indent: 20px;
      border: none;
    }
  }
}
</style>