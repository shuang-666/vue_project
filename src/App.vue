<template>
  <div>
    <router-view></router-view>

    <float-icons scoller="loadmore" padding="10 10 60 10" class="icons-warp">
      <span @click="liuyan">
        <img src="./assets/xinxi.png" alt />
      </span>
    </float-icons>
  </div>
</template>

<script>
import floatIcons from "./components/s-icons";
export default {
  components: {
    "float-icons": floatIcons
  },
  created() {
    this.$toast.setDefaultOptions({ duration: 1000 });
  },
  methods: {
    liuyan() {
      this.$router.push({
        path: "/message"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.icons-warp {
  width: 124px;
  height: 124px;
  background-color: rgb(0, 122, 255);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 14px;
  border-radius: 50%;
  span {
    width: 44px;
    height: 44px;
    img {
      height: 44px;
      height: 44px;
    }
  }
}
</style>
