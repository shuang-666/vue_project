<template>
  <div class="listone_box" @click="oneClick">
    <div class="listone_img">
      <img :src="img" alt />
    </div>
    <div class="listone_content">
      <div class="listone_content_name">
        {{ name }}
        <span>{{ level_name }}</span>
      </div>
      <div class="listone_content_title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      default: "",
      type: String
    },
    name: {
      default: "",
      type: String
    },
    title: {
      default: "",
      type: String
    },
    level_name: {
      default: "",
      type: String
    },
    id: {
      default: 0,
      type: Number
    }
  },
  methods: {
    oneClick() {
      this.$emit("oneClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.listone_box {
  width: 95%;
  height: 170px;
  background-color: white;
  border-radius: 20px;
  margin: 20px auto;
  display: flex;
  .listone_img {
    flex: 1;
    img {
      width: 58%;
      height: 48%;
      border-radius: 50%;
      margin: 39px 30px;
    }
  }
  .listone_content {
    flex: 4;
    .listone_content_name {
      font-size: 32px;
      margin-top: 40px;
      span {
        color: #eb6100;
        font-size: 28px;
        margin-left: 10px;
      }
    }
    .listone_content_title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 20px;
      color: #999;
      margin-top: 20px;
    }
  }
}
</style>
