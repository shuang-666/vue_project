<template>
  <div class="money_container">
    <div class="money_nav">
      <van-icon name="arrow-left" @click="back" />
      <p>我的余额</p>
      <span @click="goBalance">余额明细</span>
    </div>

    <div class="money_tab">
      <p>
        我的余额
        <span>{{moneyInfo.coin_icon}}{{moneyInfo.coin_name}}</span>
      </p>
    </div>

    <div class="money_wrapper">
      <div class="money_card" v-for="(item,index) in moneyList" :key="index">
        <p>
          <span>{{item.coin | coin}}学习币</span>
          <span>￥{{item.coin | coin}}</span>
        </p>
      </div>
    </div>

    <button class="btn">立即充值</button>

    <div class="money_cons">
      <p>充值说明:</p>
      <div v-html="moneyInfo.agreement"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moneyInfo: {},
      moneyList: [],
      coin: ""
    };
  },
  created() {
    this.getData();
  },

  filters: {
    coin(type) {
      let coin = type / 100;
      return coin.toFixed(2);
    }
  },

  methods: {
    back() {
      window.history.back();
    },
    getData() {
      this.$network.getMoney({}).then(res => {
        console.log(res.data.data);
        this.moneyInfo = res.data.data.coinInfo;
        this.moneyList = res.data.data.list;
      });
    },

    //点击去到余额明细页面
    goBalance() {
      console.log(1111);
      this.$router.push({
        path: "/balance"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.money_container {
  width: 100%;
  //   height: 100vh;
  background-color: #f0f2f5;
  .money_nav {
    width: 100%;
    height: 88px;
    background-color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 36px;
    box-sizing: border-box;
    padding: 0px 20px;
    color: #595959;
    p {
      margin-left: 30px;
    }
    span {
      font-size: 28px;
    }
  }
  .money_tab {
    width: 100%;
    height: 115px;
    margin-top: 88px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0px 30px;
    display: flex;
    align-items: center;
    p {
      font-size: 32px;
      span {
        color: #eb6100;
        margin-left: 20px;
      }
    }
  }
  .money_wrapper {
    width: 100%;
    background-color: #eee;
    box-sizing: border-box;
    padding: 5px 40px;
    .money_card {
      width: 100%;
      height: 116px;
      background-color: #fff;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 0px 30px;
      margin: 30px 0px;
      p {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(2) {
          color: #e90000;
          font-size: 28px;
        }
      }
    }
  }
  .btn {
    background-color: #cccccc;
    color: #fff;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0px;
    border: 0;
  }
  .money_cons {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 30px;
    margin-bottom: 100px;
    p {
      margin: 10px 0px;
    }
    div {
      font-size: 24px;
      color: #666666;
    }
  }
}
</style>