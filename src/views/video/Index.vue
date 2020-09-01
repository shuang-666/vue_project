<template>
  <div class="video_box">
    <!-- 头部 -->
    <div class="video_box_header">
      <div class="video_box_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="name">{{ $route.query.title }}</div>
      <div></div>
    </div>
    <!-- 视频 -->
    <div class="wdw_box">
      <div id="wdw_video_play"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getVideo();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getVideo() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .get(
            `https://www.365msmk.com/api/app/getPlayToken/video_id=${this.$route.query.video_id}/course_id=${this.$route.query.id}?`,
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("获取视频数据", res);
            // eslint-disable-next-line no-undef
            var player = new bjcPlayer("#wdw_video_play", {
              token: res.data.data.token,
              definition: "low", // hign 高清 low 低清
              media: "video"
            });
            player.play(res.data.data.video_id);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.video_box {
  width: 100%;
  height: 100vh;
  background-color: white;
  .video_box_header {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 40px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .video_box_header_back {
      margin-top: 5px;
      margin-left: 10px;
      color: #999;
    }
    .name {
      font-size: 4.8vw;
      color: #595959;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 66.66667vw;
      margin-left: 10px;
    }
  }
  .wdw_box {
      margin-top: 100px;
    > div {
      width: 100%;
      height: 500px;
      z-index: 10000;
    }
  }
}
</style>
