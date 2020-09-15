<template>
  <div>
    <!-- 头部 -->
    <div class="questCollect_box_header">
      <div class="questCollect_box_header_back" @click="back">
        <van-icon name="arrow-left" size="25" color="#999" />
      </div>
      <div class="questCollect_box_header_name">错题记录</div>
      <div class="questCollect_box_header_search" @click="goSearch">
        <van-icon name="search" size="25" color="#999" />
      </div>
    </div>

    <div class="cl">
      <div class="pick_o">
        <van-dropdown-menu>
          <van-dropdown-item title="类型不限" ref="item">
            <template>
              <div class="xxx" v-for="(item,index) in llst" :key="index">{{item}}</div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="pick_t">
        <span class="iconfont icon-cengci">巩固全部错题</span>
      </div>
      <div class="pick_s">
        <span class="iconfont icon-yichu">移除错题</span>
      </div>
    </div>
    <!-- 空状态 -->
    <div data-v-2823b9d6 data-v-29f4e046 class="pack-card">
      <div data-v-2823b9d6 class="empty">
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" />
        <p>暂无错题记录</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      llst: ["全部", "套卷练习", "考点专练", "仿真模考"]
    };
  },
  methods: {
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.questCollect_box_header {
  width: 100%;
  height: 90px;
  background-color: white;
  border-bottom: 1px solid #eeee;
  display: flex;
  justify-content: space-between;
  line-height: 90px;
  .questCollect_box_header_back {
    margin-top: 15px;
    margin-left: 10px;
  }
  .questCollect_box_header_name {
    font-size: 40px;
  }
  .questCollect_box_header_search {
    margin-top: 15px;
    margin-right: 10px;
  }
}
.xxx {
  width: 100%;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #eee;
  color: #8c8c8c;
  font-size: 25px;
}
.pack-card {
  width: 80%;
  height: 150px;
  margin: 0 auto;
  text-align: center;
  p {
    font-size: 28px;
    color: rgb(190, 190, 190);
  }
  img {
    width: 300px;
    height: 300px;
  }
}
.cl {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #eee;
  display: flex;
  text-align: center;
  line-height: 80px;
  justify-content: space-around;
  .pick_o {
    width: 260px;
    height: 80px;
  }
  .pick_t {
    width: 300px;
    height: 80px;
    // background: gold;
    font-size: 30px;
    span {
      color: #8c8c8c;
    }
  }
  .pick_s {
    width: 220px;
    height: 80px;
    // background: gold;
    font-size: 30px;
    span {
      color: #8c8c8c;
    }
  }
}
/deep/.van-dropdown-menu {
  height: 80px;
}
/deep/.van-dropdown-menu__bar {
  height: 80px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0.02rem 0.12rem rgba(100, 101, 102, 0.12);
  box-shadow: 0 0.26667vw 1.6vw rgba(100, 101, 102, 0.12);
}
/deep/.van-dropdown-menu__title {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0.46667vw 0vw;
  color: #323233;
  font-size: 0.25rem;
  font-size: 4vw;
  line-height: 0.22rem;
  line-height: 2.93333vw;
}
/deep/.van-ellipsis {
  padding: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/.van-dropdown-menu__title::after {
  border-color: transparent transparent currentColor currentColor;
  border-width: 0.06rem;
  border-width: 0.8vw;
  top: 44%;
  right: -0.24rem;
  right: -3.2vw;
}
</style>
