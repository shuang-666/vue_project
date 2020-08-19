<template>
  <div class="index_box">
    <swiper :list="banner"></swiper>
  </div>
</template>

<script>
import swiper from "../../components/swiper/Index";
export default {
  components: {
    swiper
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("BANNER_LIST");
  },
  computed: {
    banner() {
      console.log(this.$store.state.banner);
      return this.$store.state.banner;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
