<template>
  <div class="there_content">
    <div class="there_box" @click="thereClick">
      <img :src="img" alt />
      <div class="there_name">{{ name }}</div>
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
    }
  },
  methods: {
    thereClick() {
      this.$emit("thereClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.there_content {
  width: 25%;
  height: 200px;
  background-color: white;
  border-radius: 20px;
}
.there_box {
  width: 100%;
  height: 60%;
  img {
    width: 30%;
    height: 35%;
    margin: 30% 34%;
  }
  .there_name {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 25px;
    color: #999;
    margin-top: -20%;
  }
}
</style>
