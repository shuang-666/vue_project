<template>
  <div class="record">
    <!-- 头部 -->
    <div class="record_header">
      <div>约课记录</div>
    </div>
    <!-- 内容 -->
    <div class="record_content">
      <div :class="selIndex == '0' ? 'active' : ''" @click="select('0')">待上课</div>
      <div :class="selIndex == '1' ? 'active' : ''" @click="select('1')">已上课</div>
      <div :class="selIndex == '2' ? 'active' : ''" @click="select('2')">已取消</div>
    </div>
    <!-- //////////////////////////////////////////////////////////////////// -->

    <!-- 具体的内容 -->
    <div class="van-pull-refresh" v-if="selIndex == '0'">
      <div class="van-pull-refresh__track" style="transition: all 0ms ease 0s;">
        <div class="van-pull-refresh__head"></div>
        <div class="van-list" role="feed">
          <section class="record-list"></section>
          <div class="van-list__placeholder"></div>
        </div>
        <div class="rp-empty">
          <img src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p>还没有待上课记录哦</p>
          <button class="van-button van-button--default van-button--normal" @click="recordClick">
            <span>立即约课</span>
          </button>
        </div>
      </div>
    </div>
    <!-- //////////////////////////////////////////////////////////////////// -->

    <div class="van-pull-refresh" v-if="selIndex == '1'">
      <div class="van-pull-refresh__track" style="transition: all 0ms ease 0s;">
        <div class="van-pull-refresh__head"></div>
        <div class="van-list" role="feed">
          <section class="record-list"></section>
          <div class="van-list__placeholder"></div>
        </div>
        <div class="rp-empty">
          <img src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p>还没有上课记录哦</p>
          <button class="van-button van-button--default van-button--normal" @click="recordClick">
            <span>立即约课</span>
          </button>
        </div>
      </div>
    </div>
    <!-- //////////////////////////////////////////////////////////////////// -->

    <div class="van-pull-refresh" v-if="selIndex == '2'">
      <div class="van-pull-refresh__track" style="transition: all 0ms ease 0s;">
        <div class="van-pull-refresh__head"></div>
        <div class="van-list" role="feed">
          <section class="record-list"></section>
          <div class="van-list__placeholder"></div>
        </div>
        <div class="rp-empty">
          <img src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" alt />
          <p>还没有取消上课记录哦</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selIndex: 0
    };
  },
  methods: {
    select(index) {
      this.selIndex = index;
    },
    recordClick() {
      this.$router.push({
        path: "/oto"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: #eb6100;
  border-bottom: 4px solid #eb6100;
}
.record {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .record_header {
    width: 100%;
    height: 90px;
    background-color: white;
    line-height: 90px;
    div {
      text-align: center;
      font-size: 40px;
      color: #333;
    }
  }
  .record_content {
    width: 100%;
    height: 80px;
    background-color: white;
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    color: #7d7e80;
    font-size: 30px;
  }
  .van-pull-refresh {
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
    .van-pull-refresh__track {
      position: relative;
      .van-pull-refresh__head {
        position: absolute;
        top: -6.66667vw;
        left: 0;
        width: 100%;
        height: 6.66667vw;
        overflow: hidden;
        color: #969799;
        line-height: 6.66667vw;
      }
      .van-list {
        .record-list {
          padding: 0 2.66667vw;
        }
        .van-list__placeholder {
          height: 0;
          pointer-events: none;
        }
      }
      .rp-empty {
        img {
          display: block;
          width: 47.73333vw;
          height: 34.4vw;
          margin: 26.66667vw auto 2.66667vw;
        }
        p {
          font-size: 3.73333vw;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #b7b7b7;
          line-height: 5.33333vw;
          margin-bottom: 6.66667vw;
          text-align: center;
        }
        button {
          margin: 0 auto;
          display: block;
          width: 23.46667vw;
          height: 7.46667vw;
          font-size: 3.46667vw;
          color: #fff;
          background: #eb6100;
          border-radius: 0.66667vw;
        }
        .van-button--normal {
          padding: 0 2vw;
          font-size: 1.86667vw;
        }
      }
    }
  }
}
</style>
