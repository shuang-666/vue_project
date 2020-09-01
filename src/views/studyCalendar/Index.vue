<template>
  <div id="calendar">
    <!-- 头部 -->
    <div class="sex_header">
      <div class="sex_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="sex_header_name">学习日历</div>
      <div class="sex_header_cun"></div>
    </div>
    <calendars></calendars>
  </div>
</template>

<script>
import calendars from "../../components/calendars";
export default {
  data() {
    return {};
  },
  // 侦听器
  watch: {},
  created() {},
  mounted() {},
  // 组件方法
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  // 计算属性
  computed: {},
  components: {
    calendars
  }
};
</script>

<style lang="scss" scoped>
#calendar {
  //顶部导航样式

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
}
</style>
