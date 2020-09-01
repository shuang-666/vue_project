<template>
  <div class="sex_box">
    <!-- 头部 -->
    <div class="sex_header">
      <div class="sex_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="sex_header_name">修改个人信息</div>
      <div class="sex_header_cun" @click="btninfo">保存</div>
    </div>
    <div class="sex_trim"></div>
    <!-- 内容 -->
    <div class="sex_content">
      <div
        v-for="(item, index) in sex"
        :key="index"
        @click="selclick(index)"
        :class="selindex == index ? 'selli' : ''"
      >
        {{ item.sex }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // info: [], //存放请求的用户信息
      tag: this.$route.query.tag, //type类型
      value: this.$route.query.value, //内容
      sex: [
        {
          sex: "男"
        },
        {
          sex: "女"
        }
      ], //性别选项
      selindex: 0 //默认选中下标
    };
  },
  created() {
    // this.getinfo(); //请求用户信息
    this.sextype(); //用户性别选中
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //请求用户信息
    // getinfo() {
    //   this.$network.getUserInfo().then(res => {
    //     console.log("用户的数据", res);
    //     console.log(res.data.data);
    //     this.info = res.data.data;
    //   });
    // },
    //默认用户性别选中下标
    sextype() {
      if (this.value == 3) {
        this.selindex = 2;
      } else {
        this.selindex = this.value;
      }
    },
    //性别选中切换样式
    selclick(index) {
      this.selindex = index;
    },
    //提交修改的性别(保存性别)
    btninfo() {
      // if (this.selindex != 2) {
      //   this.info.sex = this.selindex;
      // }
      let sex = this.selindex;
      this.$network
        .getSexUser({
          sex
        })
        .then(res => {
          console.log("已修改用户信息", res);
          this.$router.go(-1);
        });
      //   let url = "/api/app/user";
      //   if (this.tag == "nickname") {
      //     this.info.nickname = this.value;
      //   } //判断是否更新名字
      //   if (this.tag == "sex") {
      //     if (this.selindex != 2) {
      //       this.info.sex = this.selindex;
      //     } else {
      //       this.info.sex = 3;
      //     }
      //   } //判断是否要更新性别
      //   Http.put(url, this.info).then(e => {
      //     console.log("已修改用户信息", e);
      //     this.$router.go(-1);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
.sex_box {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
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
  .sex_trim {
    width: 100%;
    height: 20px;
  }
  .sex_content {
    width: 100%;
    background-color: white;
    padding: 0 20px;
    div {
      width: 95%;
      height: 110px;
      line-height: 110px;
      text-indent: 20px;
      color: #333;
      background-color: white;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
.selli {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTRCNDA2MzU1QUE1MTFFQUIzQzNDMEVBNEQ3QkEyNEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTRCNDA2MzQ1QUE1MTFFQUIzQzNDMEVBNEQ3QkEyNEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNkY0RjZGRjVBODExMUVBQjNDM0MwRUE0RDdCQTI0QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNkY0RjcwMDVBODExMUVBQjNDM0MwRUE0RDdCQTI0QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm+dv/4AAAHSSURBVHjaxJc7SANBFEVnYxARRdRGG4mVoih2FoqiiIUIilEsYmGTSgs/2FlZWVgIdqKpbPyW/hpBRG20EMTWD5gu2ogRxPU+mIVh2MnsZjObB4ewd9m8m8fMnY1l2zYrZkXTVm3YPRtBHLyC/WjIzZvBNajm122REJtXgEOhOVVvmAa2QIukbYZlYA5MSto22LHeWY3p5t3ggha8oN2DLpA1PYE6sCc1z/BdkKULkwao6S6oFzQKnSnw7AgmDayCHklbASeiYMrAOFiUtFNugJk20ARSkkYjT4A/0wYobI5ApaD98Ilk3B6IhBA2s+BO9QAZ6ACP4AtsgNIChk2Km1IWBdEZPgcFjUJjDHwWKmxyPUgTSEtaH7gCDQHC5kMMG52BBXAj6a3gFrTnGTYJMWx0Bmh19vPVKxZ96aVLmPgOG50Bxkc1Adal+1WA1shokLDxYoDxkJgHS3yMTpWBA5DUhM2LKmy8GnBqDUyDX0EroZcHsJwjbOKqsNFtQ9W9IXppBOUusRqTtKRuv/uZgFPHYMDlV8X8hk2+BhjfnhQyb4r7FDYzQbLby1nwxBNNzvMHMOIlbHRB4qVoAp1gmIcUnR3n4Dvo6WUV+6/ZvwADADeFZAXzcIq6AAAAAElFTkSuQmCC)
    no-repeat 100%;
  background-size: 0.4rem 0.4rem;
  background-size: 4vw 4vw;
}
</style>
