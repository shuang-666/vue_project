<template>
  <div class="study_box">
    <!-- 头部 -->
    <div class="study_box_header">
      <div class="study_box_header_back" @click="back">
        <van-icon name="arrow-left" size="22" color="#999" />
      </div>
      <div class="study_box_header_name">{{ study.title }}</div>
      <div class="study_box_header_right">
        <div class="calendar"></div>
      </div>
    </div>
    <!-- 学习详情 -->
    <div class="info">
      <span>共{{ study.section_num }}课时</span>
      <div class="my-progress" style="width: 56vw; height: 1.06667vw;">
        <span style="width: 0%;" v-if="study.progress_rate < 0"></span>
        <span style="width: 100%;" v-if="study.progress_rate > 0"></span>
      </div>
      <span>已学习{{ study.progress_rate }}%</span>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="periods">
        <div
          v-for="(item, index) in periods"
          :key="index"
          class="my-study-detail-cell"
          @click="curriculum(item.video_id,item.periods_title)"
        >
          <div class="title">
            <span class="play-type play-type-playback">[回放]</span>
            <span class="name">{{ item.periods_title }}</span>
          </div>
          <div class="teacher">
            <span
              class="name"
              v-for="(items, index) in item.teachers"
              :key="index"
            >{{ items.teacher_name }}</span>
            <span class="time">{{ item.start_play }} - {{ item.end_play }}</span>
          </div>
          <div class="progress-info">
            <div class="my-progress" style="width: 75%; height: 1.06667vw;">
              <span style="width: 0%;" v-if="item.progress_rate < 0"></span>
              <span style="width: 100%;" v-if="item.progress_rate > 0"></span>
            </div>
            <span>已观看{{ item.progress_rate }}%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <p class="btn">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAhCAYAAACxzQkrAAAE30lEQVRYR7WYXYwTVRTH/+e22x2g0yVoVh9IRGNCiIkPCEGjxkQe/ODFlzUQMDyoaNiklum0sismoyjJMjOdZj8wRCNqDApVNCEGkn3QIMFoEBXF+KIh6wcmfC2702W77dxjLtndlNpu26Xc13s+fnPuOeeeO4SbtCzLiui6voKZtwN4EEBARMeFEN6VK1dOW5ZVquaabgaPZVmarutJZk4AuHXGBxExM/8thOgfGxvzqkHdFCDXdV9n5m0AojU+OE9EO5LJZLZyv+VAjuNsAPA+gLa5os/M50Oh0FrDMH4ul2sZUH9/f7vv+zFN03wppcobY44IKYYiEW1LJpNDLQeyLCus6/oeAAsKhUJC07QJKeUOZjaISKsRKQngVdM0d7UUyPO8xVLKAWbeNG34YKlU2jI5OXlV13WbmV8A0F4JxcyTALamUql9LQMaHBy8pVAoZKWUTxNRpMzwESnlSx0dHWfHx8dVcvcAWFwB9X0kEnkqHo//1RIg27YXAfiIiB4DUA6j7AcAjkopn9M07XKhUFBH9woApaPWBSHEOsMwvmtJlQ0NDd0+MTGxj4gen6uSiGi4vb19Q2dn5+jIyIilckoI8U8oFNqUSCS+bUlj7OvrWxoKhfYw8xNEFK7XWInoaynl1nw+/2s0Gt0opfwjlUqdUE3yhoGy2extpVLpEwD3A6gLoxwysySiY+FweHMikfhzGqIqjNpruA9lMpm7pJT7AaypF5WKfeX8jBBivWEYZ+rpNgTU19e3XAixl4geAhCqZ7R8n5lPEdGLpmmeVAGrp1sXKJPJ3C2lPATgHgCinsHrSpjoZBAE69Pp9O+N6s0FRK7r3qtKm5lXNGpwWk514RPhcHhjIpEYaUa3JpDjOKsBvAVgZTO5Nu18GEDcNM3fmoGpmdTZbHZNEAT7mfnOecAcllJuSafT/zYLUxXIcZz7AHwK4I4mDarufHhqampLb2/v+SZ1Z8X/d2Se560MgmAQwAONGp2eBD8mopeTyeRMr2lU/Tq564Bs296Uz+f3x2KxZcx8gJlXNWBVlfLeYrHY29PTc7kB+TlFZoEymcwqKeUxAKbv++8sXLhwiRDic2ZeTURVy52ZS0T0biQSScXj8bEbhSnPIVXibzPzswAuAnB833disdgKKaUHYG0VZwpG3Wk7TdO80AqYWSDP85YFQXAUwPJpw2oI3xuNRrfn8/lOKeUHAB4tc6rGz51Sykwqlcq3CmYWyHGcZwCoRI7NGGfmKeVUCOHGYrEFo6OjOQCPAFDvKVcI8YZhGFdbCXMNSD3ootHoAIDnq/QcH8AeXddf831/KTO/SUSnNU3zuru71V7LF2UymSXM/AUzq5Gi2ioQ0QE10xSLRe3cuXP+wMBAoVLQtu11RKSeQE3dd2V21JhykBzHUQ3wJwAdFU5UOZeYeUwI8UsQBIl0Ov1jrZC4rqtGC/V0rnth17BxbUwh27bVgH6gQmiciL4BMMzMX/q+/4NlWerCrLl27979ZDgcflhKOe8IMfNxFaH3AGwGoEJ2ipk/UyCRSOTspUuXLtYDKSfs6uoKdXV1zSuvcrkccrlcoIByau5ta2s7VPkkqZIni4ho9ufBvDzPoVQsFseaOm/XdXcxc6rZqbFBcJVDXzUL1M3M6o9FQwN+gyAzYiplPvwPh2MJ5xnUb/8AAAAASUVORK5CYII="
          alt
          class="icon"
        />
        <span class="name">写评论</span>
      </p>
      <p class="btn">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAACi0lEQVRYR+1Yv4sTURD+Ztc1WbN7igimEsFC8aorhPSCxXGFIIk/GuUUm5w27xASVLaxSG436J6oEfUfSKeFfSoRbSzEKld6FuYsRJOV3ZEniZx4Sd7eu4ND3G553zf7zbw3M2+WgiA4CeAxMx8GYGD08x3Ac9u2r5TL5a9DmO/7x4noFDNnx3BVlhIArygIgpWBGBUSiEgIIRoSHIZhJoqiRwAuKZEng76Q7/tSGU3G/kYsLy4uXpdvnuftcV33GTOfTcEfC5WCOI0xIrovhLgmOY1Gw2bmJwDOM3Map0Z98oeWIM/zDMdxThPRGWbelcaxDbBsGMY7LUHSaLFYNKenp3PZbFY7Qp1O55u2IM2o/EXXFiQjNDMzs8+yLFNHXCaT4W63u6YlSJ6hXC63QERXAWgJks4Q0ZvUaU9Ey0KIbU37VQAHVcNNRDeFEHe2rQ4FQTDPzHcBuAqi3tq2PVcul6UTw0r9AMC8AlcF0v2Vqs1mc2+/3z9gmubI1I3juJfP5z+WSqV4vWXf948R0exW9DIiamvXDhW302D+C5oUrZ0ZoTAMp+I43s/MIy9olmX12u32p1ar9cehnuRx2nVaWlq6YBjGQ2aeUiC/jqJotlqtfh7UIcN13QVmvgVA68ZIRAkzv5CVWqswOo7zFMA5BWdUIMmObB2bvjHKO3W/378H4CIR6SaI1NHV6vZyD2q12lHTNAsALJU9GYVhZinovbYgHREbcf89QfV6/QgRnSAi7S1LkuSDVoQ8z9vtOE59MCiOm3pVdlaeodXUaQ9g2wfFFQByrld61o/ScnLd8sIYBMGc9JqZD4372cDMPcMwXkZRdLlSqawNZ7JCoXCDmW/rtg4AibT/E2rjPaJgEXouAAAAAElFTkSuQmCC"
          alt
          class="icon"
        />
        <span class="name">课程详情</span>
      </p>
      <p class="btn">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAeCAYAAADdGWXmAAADAUlEQVRIS+2WTWgTQRTH/y9pajWV4geIHsxBUUE96EEUFQ96EvHrUJEq4kFKrZQmO6tCUVcFRXd2EgJVgigi+EFA9KAeRBBF0CIVBLUF8VAselAQ29RYTebJlE1pobXbNsfuaffte++3Mzsz/z8h4CWlnAvgGhFtY2YiItZaPyWiPUKI70HaUJAkk5NMJtcXi8UsgAWlGmb+QUTbhRAvgvShTCYzI5fLrQMwbYyCKDM3ANg0MCxmBtBGREkAfWPU9kcikdfked4TZt4c5MsmmfOcXNdtJ6LVk2wUpPwtKaUWM/OGANMYpOFoOf3M/CrwApkMqVQ7CMtms+Gurq4q8yIWi/2ura0tThQwWq9BmOu6W/yVBSI6ZlnWo4nClFIbtdaXTH04HD4ej8cfmvtBmJRyN4C7JsjMdbZt3yrB0un0tEKhsEZr/U0I0VmKm/8NYH5PT0+74zi/SnHP87Yy8wAAwD4hxM3AMKXULq31bQA/ASw3J4ZSarbW+h2AOUR0yLKsG2WBSSmPArhgmoVCoRWJROJ9KpVaWigUSqM8I4Q4VS7YcQDn/Sleadv2OynlMgAdfuysbdsnp2D432qUUk5N48AamdQ+m5rGsuwzpZSttb7ou4EVQogPnuctAdBpzA8zn7Zt2ykLTEppxPU6EX2pqqra2tjYmPO9ywNmXhgKhQ4nEonHZYEZferu7o7l8/l8S0vL11LTVCo1T2sdjUajn+vr6/8Ghrmuu4OI7g9IAdGBoaf4eHVNSrkTwD3/3Nxr2/adYRLjed4qZn7jN74uhDg4XsiQkV3ybR8qKirWNjc3tw2DZTKZSG9v70fjCowPZOZ4X1/fVcdxdFCo4zihmpqaumKxaFS6GkB3Lpdb5DjOn2Ew8yCl3A/giu+0jAfpYOZPRBTEj4QAGOU20lMBoJ+I4pZlXS597DB3pZSazswnmPkIgJlBRzRCXp6I0pFI5FxTU1PPiDATbG1trc7n8+uJqMH3k7OMQAcAGzv+A8DLcDh8ubKy8pnZIkPr/gEjO6imaFb4ZAAAAABJRU5ErkJggg=="
          alt
          class="icon"
        />
        <span class="name">移出列表</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.query.course_id,
      study: [], //讲师的信息
      periods: [], //所有的课程
      token: localStorage.getItem("msmkToken")
    };
  },
  created() {
    this.studyDetails();
  },
  methods: {
    // 获取课程数据
    curriculum(video_id, periods_title) {
      this.$router.push({
        path: "/video",
        query: {
          id: this.id,
          video_id,
          title: periods_title
        }
      });
    },
    studyDetails() {
      if (this.token) {
        axios
          .get(`https://www.365msmk.com/api/app/myStudy/course/${this.id}?`, {
            headers: {
              authorization: `Bearer ${this.token}`
            }
          })
          .then(res => {
            console.log("学习课程的详情", res);
            if (res.data.code == 200) {
              this.study = res.data.data.course;
              this.periods = res.data.data.periods;
            }
          })
          .catch(err => {
            console.log("网络异常", err);
          });
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.study_box {
  width: 100%;
  height: 100vh;
  background-color: white;
  .study_box_header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    font-size: 35px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: white;
    border-bottom: 1px solid #eee;
    .study_box_header_back {
      margin-top: 10px;
      margin-left: 20px;
    }
    .study_box_header_name {
      font-size: 4.8vw;
      color: #595959;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 66.66667vw;
    }
    .study_box_header_right {
      height: 100%;
      float: right;
      font-size: 4vw;
      color: #595959;
      padding: 0 2.66667vw;
      .calendar {
        width: 13.33333vw;
        height: 100%;
        background: url(data:image/png;base64,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)
          no-repeat 100%;
        background-size: 4.26667vw 4.26667vw;
      }
    }
  }
  .info {
    font-size: 3.46667vw;
    color: #595959;
    height: 13.86667vw;
    line-height: 13.86667vw;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 80px;
    .my-progress {
      display: inline-block;
      border-radius: 0.66667vw;
      background-color: #f5f5f5;
      position: relative;
      span {
        position: absolute;
        left: 0;
        height: 100%;
        background-color: #eb6100;
      }
    }
  }
  .content {
    .periods {
      .my-study-detail-cell {
        margin: 4vw;
        border: 0.53333vw solid #e9e9e9;
        border-radius: 1.06667vw;
        padding: 4vw;
        margin-bottom: 4vw;
        .title {
          padding-left: 4vw;
          position: relative;
          .play-type {
            margin-right: 1.33333vw;
            font-size: 3.2vw;
          }
          .play-type-playback {
            color: #ea7a2f;
          }
          .name {
            font-size: 3.2vw;
            color: #595959;
          }
        }
        .teacher {
          padding-left: 4vw;
          margin-top: 2vw;
          font-size: 3.2vw;
          color: #8c8c8c;
          .time {
            margin-left: 2.66667vw;
          }
        }
        .progress-info {
          margin-top: 2.66667vw;
          font-size: 3.2vw;
          color: #8c8c8c;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .my-progress {
            display: inline-block;
            border-radius: 0.66667vw;
            background-color: #f5f5f5;
            position: relative;
            span {
              position: absolute;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #eb6100;
              display: inline-block;
              border-radius: 0.66667vw;
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 9.86667vw;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #f5f5f5;
    z-index: 99;
    .btn {
      float: left;
      width: 33.3%;
      height: 100%;
      text-align: center;
      margin-top: 20px;
      .icon {
        width: 3.2vw;
        height: 3.2vw;
        vertical-align: middle;
      }
      .name {
        font-size: 3.2vw;
        color: #8c8c8c;
        vertical-align: middle;
        margin-left: 1.33333vw;
      }
    }
  }
}
</style>
