<template>
  <div id="app">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left" size="25" color="#999" @click="go" />
      </div>
      <div class="name">我的学习</div>
      <img
        src="data:image/png;base64,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"
        alt
        @click="jumpCalendar"
      />
    </div>
    <van-tabs>
      <van-tab v-for="item in title" :title="item.name + '(' + item.num + ')'" :key="item.type">
        <div>
          <div
            class="content"
            v-for="itm in list"
            :key="itm.course_type"
            v-show="item.type === itm.course_type"
          >
            <p>{{ itm.title }}</p>
            <p>共{{ itm.is_buy_order }}课时</p>
            <div>
              <p
                :style="
                  itm.progress_rate == 100
                    ? 'background:#eb6100'
                    : 'background:#f5f5f5'
                "
              ></p>
              <p>已学习{{ itm.progress_rate }}%</p>
            </div>
          </div>
        </div>
        <div style="height:10px"></div>
        <div class="contenttow" v-show="item.num <= 0">
          <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" alt />
          <p>还没有课程,快去选择课程学习吧</p>
          <button @click="jumpCurriculum">选择课程</button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "",
  props: [],
  components: {},
  data() {
    return {
      title: [],
      list: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    go() {
      this.$router.go(-1);
    },
    jumpCalendar() {
      this.$router.push("/calendar");
    },
    jumpCurriculum() {
      this.$router.push("/Home/curriculum");
    }
  },
  created() {
    this.$network.getMyStudy().then(res => {
      console.log(res);
      this.title = res.data.data.typeNum;
      this.list = res.data.data.courseList;
      console.log(this.list);
    });
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped lang="scss">
/deep/.van-tabs__wrap {
  height: 92px !important;
  border-bottom: 1px solid #f1f1f1;
  //   .van-tabs__nav {
  //     height: 92px;
  //   }
  .van-tab {
    width: 22%;
  }
  .van-tab__text {
    font-size: 30px;
  }
}
.content {
  width: 689px;
  height: 276px;
  margin: 18px auto 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 41px 29px;
  & > p:nth-child(1) {
    line-height: 40px;
  }
  & > p:nth-child(2) {
    margin-top: 19px;
    color: #666;
    font-size: 15px;
  }
  & > div {
    display: flex;
    margin-top: 50px;
    align-items: center;
    p:nth-child(1) {
      width: 190px;
      height: 10px;
      background: #f5f5f5;
    }
    p:nth-child(2) {
      margin-left: 20px;
      color: #666;
      font-size: 15px;
    }
  }
}
/deep/.van-tab--active {
  color: #eb6100;
}
/deep/.van-tabs {
  margin-top: 96px;
}
.header {
  top: 0;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 96px;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  .left {
    margin-left: 20px;
  }
  .name {
    width: 567px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 36px;
    color: #676767;
    margin-left: -20px;
  }
  img {
    width: 35px;
    height: 35px;
    margin-right: 30px;
  }
  .van-icon {
    width: 22px;
    height: 34px;
  }
}
.contenttow {
  margin-top: 150px;
  text-align: center;
  img {
    width: 300px;
    height: 300px;
  }
  p {
    margin-top: 35px;
    color: #8c8c8c;
    font-size: 31px;
  }
  button {
    margin-top: 100px;
    width: 175px;
    height: 52px;
    border-radius: 10px;
    color: #fff;
    font-size: 26px;
    border: none;
    background: #eb6100;
  }
}
</style>
