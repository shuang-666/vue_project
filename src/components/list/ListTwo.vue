<template>
  <div class="listtwo_box" @click="twoClick">
    <div class="listtwo_box_one">{{ title }}</div>
    <div class="listtwo_box_two">{{ time | dateTime }} ~ {{ endTime | dateTime }} | 共{{ num }}课时</div>
    <div class="listtwo_box_there" v-for="(item, index) in toux" :key="index">
      <div class="listtwo_box_there_img">
        <img :src="item.teacher_avatar" alt />
      </div>
      <div class="listtwo_box_there_name">{{ item.teacher_name }}</div>
    </div>
    <div class="listtwo_box_si">
      <div class="listtwo_box_si_name">{{ count }}人已报名</div>
      <div class="listtwo_box_si_price">{{ priceNum | price }}</div>
    </div>
    <i class="has-buy" v-if="buy == 1"></i>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "",
      type: String
    },
    num: {
      default: 0,
      type: Number
    },
    toux: Array,
    count: {
      default: 0,
      type: Number
    },
    price: {
      default: 0,
      type: Number
    },
    time: {
      default: 0,
      type: Number
    },
    endTime: {
      default: 0,
      type: Number
    },
    buy: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      priceNum: this.price
    };
  },
  methods: {
    twoClick() {
      this.$emit("twoClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.listtwo_box {
  width: 95%;
  height: 400px;
  background-color: white;
  margin: 20px auto;
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 30px 30px;
  position: relative;
  .listtwo_box_one {
    font-size: 32px;
    color: #333;
  }
  .listtwo_box_two {
    font-size: 24px;
    color: #333;
    margin-top: 10px;
  }
  .listtwo_box_there {
    width: 100%;
    height: 140px;
    line-height: 140px;
    display: flex;
    border-bottom: 1px solid #eee;
    .listtwo_box_there_img {
      width: 9%;
      height: 45%;
      margin-top: 20px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .listtwo_box_there_name {
      font-size: 20px;
      color: #999;
      text-indent: 20px;
      margin-top: 5px;
    }
  }
  .listtwo_box_si {
    width: 100%;
    height: 100px;
    line-height: 100px;
    display: flex;
    justify-content: space-between;
    .listtwo_box_si_name {
      font-size: 28px;
      color: #ccc;
    }
    .listtwo_box_si_price {
      color: #ee1f1f;
    }
  }
  .has-buy {
    position: absolute;
    right: 4vw;
    top: 17.33333vw;
    background: url(https://wap.365msmk.com/img/has-buy.6cfbd83d.png) no-repeat;
    background-size: 100% 100%;
    width: 15.73333vw;
    height: 12.8vw;
  }
}
</style>
