<template>
  <div class="box">
    <div class="box_top">
      <van-icon @click="back" name="arrow-left" size="22" />
      <div>初三物理</div>
      <div></div>
    </div>
    <div class="box_content">
      <div class="content_top">
        <div @click="changetiku">
          <van-icon name="todo-list" />题库选择
        </div>
        <van-icon name="setting-o" />
      </div>
      <div class="content_center">
        <div class="content_one" v-for="(item, index) in subde" :key="index">
          <div class="one_left">
            <div class="left_top">
              <div>{{ item.name }}</div>
              <div>{{ item.finished_amount }}/{{ item.question_amount }}</div>
            </div>
            <div class="left_bottom">
              <!-- <JDT :width="251*(item.finished_amount/item.question_amount)" /> -->
              <van-progress :percentage="100" stroke-width="8" :show-pivot="false" />
            </div>
          </div>
          <div class="one_right" @click="goshuati(item.id)">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import JDT from "../components/jindutiao";
// import {examPoint} from "../http/api"
export default {
  data() {
    return {
      subdetails: {},
      subde: []
    };
  },
  components: {
    // JDT
  },
  created() {
    //   if(!localStorage.subdetail){
    //       this.changetiku();
    //   }else{
    //       let a = localStorage.subdetail
    //       this.subdetails=JSON.parse(a)
    //       console.log(this.subdetails);
    //   }

    this.$network
      .getPoint({
        //   subClassifyId:this.subdetails.subClassifyId,
        //   bankId:this.subdetails.bankId
      })
      .then(res => {
        console.log(res);
        this.subde = res.data.data;
      });
  },
  methods: {
    back() {
      window.history.back();
    },
    goshuati() {
      console.log("1111");
      this.$router.push({
        // path: "/exercise"
        // query: {
        //   id
        // }
      });
    },
    changetiku() {
      //       this.$router.push({
      //           path:"/question"
      //       })
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
  .box_top {
    // border: 1px solid red;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    align-items: center;
    div {
      width: 150px;
      text-align: center;
    }
  }
  .box_content {
    margin-top: 30px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px 30px;
    .content_top {
      display: flex;
      justify-content: space-between;
      font-weight: 550;
    }
    .content_center {
      padding: 20px;
      .content_one {
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        .one_left {
          width: 80%;
          div {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .left_top {
            display: flex;
            font-size: 25px;
            justify-content: space-between;
          }
        }
        .one_right {
          width: 40px;
        }
      }
    }
  }
}
</style>
