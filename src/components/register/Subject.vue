<template>
  <div class="subject_box">
    <!-- 头部 -->
    <div class="sex_header">
      <div class="sex_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="sex_header_name">修改个人信息</div>
      <div class="sex_header_cun" @click="preservation">保存</div>
    </div>
    <div class="subject_trim"></div>
    <!-- 内容 -->
    <div class="subject_content">
      <div class="subject_content_list" v-for="(item, index) in subject" :key="index">
        <input type="checkbox" class="input" :checked="checkedSelect" @change="select(item.id)" />
        <div class="subject_content_name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subject: [],
      id: [],
      checkedSelect: false
    };
  },
  created() {
    this.subject = this.$route.query.value;
    // this.getinfo();
  },
  methods: {
    // // 获取用户信息
    // getinfo() {
    //   let token = localStorage.getItem("msmkToken");
    //   if (token) {
    //     this.$network.getUserInfo(token).then(res => {
    //       console.log("学科页面的数据", res);
    //       res.data.data.attr.forEach(ele => {
    //         console.log(ele);
    //         if (ele.attr_id == "2") {
    //           console.log(ele.attr_val_id);
    //           this.checkedSelect = this.$route.query.value.some(elem => {
    //             console.log(elem.id);
    //             return elem.id == ele.attr_val_id;
    //           });
    //         }
    //       });
    //     });
    //   }
    // },
    // 选中
    back() {
      this.$router.go(-1);
    },
    // 选择的下标
    select(id) {
      if (event.target.checked) {
        let obj = {
          attr_id: this.$route.query.id,
          attr_val_id: id
        };
        this.id.push(obj);
      }
    },
    // 保存
    preservation() {
      this.$network
        .getSexUser({
          user_attr: JSON.stringify(this.id)
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              path: "/info"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.subject_box {
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
  .subject_trim {
    width: 100%;
    height: 20px;
  }
  .subject_content {
    width: 100%;
    background-color: white;
    padding: 0 40px;
    box-sizing: border-box;
    .subject_content_list {
      width: 100%;
      height: 110px;
      border-bottom: 1px solid #eee;
      line-height: 110px;
      color: #999;
      display: flex;
      .input {
        width: 60px;
        height: 60px;
        margin-top: 25px;
      }
      .subject_content_name {
        margin-left: 20px;
      }
    }
  }
}
</style>
