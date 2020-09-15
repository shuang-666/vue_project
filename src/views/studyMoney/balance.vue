<template>
  <div>
    <div class="balance_nav">
      <van-icon @click="back" size="24" class="icon_back" name="arrow-left" />
      <p>余额明细</p>
    </div>

    <div class="balance_wrapper">
      <div class="wrapper_card" v-for="(item,index) in list" :key="index">
        <p>
          <span class="card_name">{{item.shop_name}}</span>
          <span>-{{item.change_price}}</span>
        </p>
        <p>
          <span>{{item.remaining_sum}}</span>
          <span>{{item.created_at}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    back() {
      window.history.back();
    },

    //获取余额明细数据
    getData() {
      this.$network
        .getBalance({
          page: 2
        })
        .then(res => {
          console.log(res.data.data.list);
          this.list = res.data.data.list;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.balance_nav {
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  border-bottom: 1px solid #eee;
  .icon_back {
    position: absolute;
    top: 20px;
    left: 10px;
  }
}
.balance_wrapper {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 30px;
  .wrapper_card {
    width: 100%;
    height: 115px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0px 20px;
    margin-top: 10px;
    p {
      display: flex;
      justify-content: space-between;
    }
    p:nth-child(1) {
      margin: 10px 0px 5px 0px;
      .card_name {
        width: 65%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    p:nth-child(2) {
      font-size: 24px;
      color: #999;
    }
  }
}
</style>