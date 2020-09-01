<template>
  <div id="collect">
    <!-- 头部 -->
    <div class="concern_header">
      <div class="concern_header_back" @click="onClickLeft">
        <van-icon name="arrow-left" size="25" />
      </div>
      <div class="concern_header_name">我的收藏</div>
      <div></div>
    </div>
    <!-- 内容 -->
    <div class="wdw_content">
      <ul class="wdw_storTwo" v-if="list.length != 0">
        <li
          v-for="(itemChild, indexChild) in list"
          :key="indexChild"
          @click="goDetailsClass(itemChild.course_id, itemChild.course_type)"
        >
          <div>{{ itemChild.title }}</div>
          <p>共{{ itemChild.section_num }}课时</p>
          <i class="info-collect ic-active" @click.stop="cancelCollect(itemChild.collect_id)"></i>
          <div>
            <img :src="itemChild.teachersAvatar" alt />
            <span>{{ itemChild.teachers }}</span>
          </div>
          <p>
            <span>{{ itemChild.sales_num }}人已报名</span>
            <font class="wdw_free" v-if="itemChild.price == 0">免费</font>
            <font v-else>
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              {{ itemChild.price }}
            </font>
          </p>
        </li>
      </ul>

      <div class="empty" v-else>
        <img src="https://wap.365msmk.com/img/empty.0d284c2e.png" />
        <p>暂无关注</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  // 侦听器
  watch: {},
  created() {
    this.concernInfo();
  },
  mounted() {},
  // 组件方法
  methods: {
    //返回
    onClickLeft() {
      this.$toast("返回");
      this.$router.go(-1);
    },
    // 获取数据
    concernInfo() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        this.$network
          .getconcernInfo(
            {
              params: {
                page: 1,
                limit: 10,
                type: 1
              }
            },
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("我的页面的我的关注", res);
            this.list = res.data.data.list;
          });
      }
    },
    // 取消收藏
    cancelCollect(id) {
      console.log(id);
      let token = localStorage.getItem("msmkToken");
      if (token) {
        axios
          .put(
            `https://www.365msmk.com/api/app/collect/cancel/${id}/1`,
            {},
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            console.log("点击取消的接口", res);
            if (res.data.data == 1) {
              this.$toast("取消关注");
              this.Collect = true; 
              this.concernInfo();
            }
          });
      }
    },
    //跳到课程详情页
    goDetailsClass(id, course_type) {
      this.$router.push({
        path: "/course-detail",
        query: {
          id,
          course_type
        }
      });
    }
  },
  // 计算属性
  computed: {}
};
</script>

<style lang="scss" scoped>
#collect {
  background: #f0f2f5;
  min-height: 100vh;
  .concern_header {
    width: 100%;
    height: 90px;
    line-height: 90px;
    display: flex;
    justify-content: space-between;
    background-color: white;
    .concern_header_back {
      margin-top: 15px;
      margin-left: 20px;
    }
    .concern_header_name {
      margin-left: -50px;
      font-size: 40px;
      color: #333;
    }
  }
  .wdw_content {
    padding: 0px 20px;
    .wdw_storTwo {
      padding: 30px 0px;
      li {
        margin-bottom: 30px;
        padding: 0 20px;
        background: #fff;
        position: relative;
        border-radius: 20px;
        > .info-collect {
          position: absolute;
          right: 0.26667rem;
          right: 2.66667vw;
          top: 0.13333rem;
          top: 1.33333vw;
          width: 0.66667rem;
          width: 6.66667vw;
          height: 0.66667rem;
          height: 6.66667vw;
          background: url(data:image/png;base64,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)
            no-repeat 50%;
          background-size: 0.48rem 0.48rem;
          background-size: 4.8vw 4.8vw;
        }
        > .ic-active {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQ0RDlCOUZCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ0RDlCQTBCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDREOUI5REI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDREOUI5RUI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtJNOngAAAP1SURBVHja3JpbSFRRFIb3TJpmecvISosSDLLSFLtQUQRFEaWEZEWRRUEX8aELFEX4Ej3UU9hL9BT2UAk9FhURUdDFwtBuD/USkZCZdvFSXqZ/df4JkRnneM4+zh4XfDDMuf57r733WmsfX+9m5aX5QQZYSJLBS/AIfAZ/3D5gzPVAyP/jPBQ1DmwHlWC+vMOAYyKqDpzlb+3mlTAfqABnQHqI49PAQTAWHAc/vHAVL0xevCqMqKDFg91ghVdjwAs7APJsnJfIXh0fC8Kms7fs2lyw03Rhcr8jIGWY1xyK4LZRF5YPSh1cl83rfCYK8/PlshxcK2NtE5hoorBJFBbvcHlYA+aZKKyUruhmQT85aCGPujCZrk9peKlVYK1JwvZxmtcRCUkDJZggrAjs1+jSMs62uA33nFycwkV1DsfUepCjUZi49TmwDtSD1+AN+DSs2ShE2pLImydypstjdF7A1pyhomMSKDeCJtJIsV2gA3QihQmEEiaRdgnYyJ7I5rriV+ZaB9Me6dWH4ArEfRkobAI4z0UyTWcEMILWDV6AXRD33s8p+jCTwvQYFRUcQkvB6b5yX5qfuVOFjinWAPNxKK32sxYxU40eSwJbRdhiwycIJ7ZIBAXU6LN+EfZqFAp7J8LuKY9KYFGyXlArwlrBJa7gMe+C4Ca4I8KkGlvDP2LdJMSqxgLdEgyCW7lAJzD4jIsxQQGK2gBRTYPTlt/KKoNdUxpq6iMsSrKAsqCoUPlYGzgKbsWQMJn4qhgnDpm2BOsPNyQ0MdgtAxS1ET3VYDeD7uKYqzPULQPsobJQoiKVBr4pq6p710BhzXS/eqc1D7lBORdxU0KvFmWV+p5w3XJczOlUVhWq2RAXlDr/80gn2o3q24ZbTPHIeljvULqExSmNdXUXJnWZTJ3CpCaSZcgYW6BTWC5rCiZYvk5hhcqcIk+BTmHFBq1hs5WNPWu7wooMEiYZSJ4OYalglmGRR5EOYYUGhlTFOoTlGyiscLQKy4wUMNgRlmugMIlAJrsVlqzhRb6DCyw93FdWicyN+ZkMuxLmNPiVSPwneKCsTXPJn2qVtXm+F3xgncVJOtTDwNyVsDoHD+7mdTuU9f1Gw6CXugyWgGN2UpAQJh9zfhzqBJ+NL0xl9+I2WG7zoZLVVoPHoD3CubI3N1VZG44nwBSbjSYbKY3/bhDmC1O7ieYe8HaIjLWXLShJ4EplVbnabdy7j65ew4a7ShfrD+PacqwyKMptjw1cO2RslLCVpbV/gWesi9Rx3LgxCbSXgW104Rw2vhR0n4KL9J7/BaZwPeYb5sfOSczLMhizfR1An8bpPIlumcrZr421jtbBk004YX8FGABRbtJaWBD0xgAAAABJRU5ErkJggg==)
            no-repeat 50%;
          background-size: 0.48rem 0.48rem;
          background-size: 4.8vw 4.8vw;
        }
        div:nth-of-type(1) {
          padding-top: 30px;
          font-size: 30px;
          height: 94px;
          width: 89%;
        }
        p:nth-of-type(1) {
          font-size: 24px;
          height: 50px;
          line-height: 50px;
          margin-top: -10px;
          color: #999;
        }
        div:nth-of-type(2) {
          height: 128px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f5f5f5;
          margin-top: -20px;
          img {
            width: 54px;
            height: 54px;
            border-radius: 50%;
          }
          span {
            font-size: 24px;
            margin-left: 26px;
            color: rgba(0, 0, 0, 0.45);
          }
        }
        p:nth-of-type(2) {
          height: 80px;
          line-height: 80px;
          display: flex;
          justify-content: space-between;
          margin-top: 0px;
          span {
            flex: 1;
            color: rgba(0, 0, 0, 0.45);
            font-size: 26px;
          }
          .wdw_free {
            color: #44a426;
          }
          font {
            flex: none;
            color: #ee1f1f;
            img {
              width: 24px;
              height: 26px;
            }
          }
        }
      }
    }

    > .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > img {
        width: 4rem;
        width: 40vw;
        height: 4rem;
        height: 40vw;
      }
      > p {
        font-size: 0.4rem;
        font-size: 4vw;
        color: #8c8c8c;
        margin-top: 0.53333rem;
        margin-top: 5.33333vw;
      }
    }
  }
}
</style>
