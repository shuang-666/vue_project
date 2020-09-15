<template>
  <div id="appointment">
    <!-- 顶部内容 -->
    <div class="wxw_top">
      <van-icon name="arrow-left" class="left" @click="back" color="#999" />
      <h3>一对一辅导</h3>
      <span @click="searchClick">
        <van-icon name="search" class="right" size="25" color="#999" />
      </span>
    </div>
    <!-- 顶部内容 -->

    <!-- 搜索内容 -->
    <div class="wxw_search">
      <div
        :class="{ active: activeIndex }"
        @click="(activeIndex = !activeIndex), (activeIndext = false)"
      >
        <font>选择上课时间</font>
        <div></div>
      </div>
      <div
        :class="{ active: activeIndext }"
        @click="(activeIndext = !activeIndext), (activeIndex = false)"
      >
        <font>选择老师条件</font>
        <div></div>
      </div>
    </div>
    <!-- 搜索内容 -->

    <!-- 内容 -->
    <div class="wxw_content">
      <!-- 教师信息 -->
      <div class="wxw_teacherInfo" v-if="activeIndex === false && activeIndext === false">
        <div class="ti-base" v-for="(item, index) in list" :key="index">
          <img alt :src="item.avatar" />
          <div>
            <p>
              <span>{{ item.real_name }}</span>
              <font>{{ item.is_collect == 1 ? "已关注" : "" }}</font>
            </p>
            <p>
              {{ item.sex != "0" ? "女" : "男" }}
              <font>{{ item.teach_age }}年教龄</font>
            </p>
          </div>
          <button @click="goDetails(item.teacher_id)">预约</button>
        </div>
      </div>
      <!-- 教师信息 -->

      <!-- 老师条件选择 -->
      <div class="wxw_teachselect" v-if="activeIndext">
        <!--  -->
        <div>
          <p>老师类型</p>
          <ul>
            <li
              @click="one = item.level_id"
              :class="{ active: one === item.level_id }"
              v-for="(item, index) in otoTeacherLevel"
              :key="index"
            >{{ item.level_name }}</li>
          </ul>
        </div>
        <!--  -->
        <div>
          <p>只看</p>
          <div>
            <input type="checkbox" v-model="two" /> 已关注
          </div>
          <div>
            <input type="checkbox" v-model="three" /> 上过课的
          </div>
        </div>
        <!--  -->
        <div>
          <p>性别</p>
          <ul>
            <li @click="four = 0" :class="{ active: four === 0 }">男</li>
            <li @click="four = 1" :class="{ active: four === 1 }">女</li>
          </ul>
        </div>
        <!--  -->
        <div>
          <p>{{ classs.attr_name }}</p>
          <ul>
            <li
              @click="five = item.attr_val_id"
              :class="{ active: five === item.attr_val_id }"
              v-for="(item, index) in classs.child"
              :key="index"
            >{{ item.attr_val_name }}</li>
          </ul>
        </div>
        <!--  -->
        <div>
          <p>{{ subject.attr_name }}</p>
          <ul>
            <li
              @click="six = item.attr_val_id"
              :class="{ active: six === item.attr_val_id }"
              v-for="(item, index) in subject.child"
              :key="index"
            >{{ item.attr_val_name }}</li>
          </ul>
        </div>
        <!--  -->
        <div class="wxw_button">
          <button @click="onConfirm(false)">重置</button>
          <button @click="onConfirm(true)">确认</button>
        </div>
      </div>
      <!-- 老师条件选择 -->
      <!-- 时间选择 -->
      <div class="wxw_time" v-if="activeIndex">
        <div class="wxw_time_top">
          <p>日期</p>
          <ul class="wxw_week">
            <li>周一</li>
            <li>周二</li>
            <li>周三</li>
            <li>周四</li>
            <li>周五</li>
            <li>周六</li>
            <li>周日</li>
          </ul>
          <ul class="wxw_day">
            <li>31</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <ul class="wxw_day">
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
          </ul>
        </div>
        <div class="wxw_time_bottom">
          <p>时段</p>
          <div>
            <!--  -->
            <div class="wxw_in">
              <input type="text" placeholder="开始时间" v-model="currentTime" />
              <i @click="showPopup"></i>
            </div>
            <font>-</font>
            <div class="wxw_in">
              <input type="text" placeholder="结束时间" v-model="currentTimet" />
              <i @click="showPopupt"></i>
            </div>

            <!--  -->
            <van-popup v-model="show" position="bottom" @confirm="showPopup" @cancel="close">
              <van-datetime-picker v-model="currentTime" type="time" :min-hour="10" :max-hour="20" />
            </van-popup>
            <van-popup v-model="showt" position="bottom">
              <van-datetime-picker v-model="currentTime" type="time" :min-hour="10" :max-hour="20" />
            </van-popup>
            <!--  -->
          </div>
        </div>
        <div class="wxw_button">
          <button @click="onConfirm(false)">重置</button>
          <button @click="onConfirm(true)">确认</button>
        </div>
      </div>
      <!-- 时间选择 -->
    </div>
    <!-- 内容 -->
  </div>
</template>

<script>
// import { otoCourse, otoCourseOptions } from "../../http/api";
export default {
  data() {
    return {
      activeIndex: false,
      activeIndext: false,
      list: [],
      otoTeacherLevel: "",
      classs: "",
      subject: "",
      //选择
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      //时间
      currentTime: "",
      show: false,
      showt: false,
      currentTimet: ""
    };
  },
  // 侦听器
  watch: {},
  created() {
    this.getData();
    this.getselect();
  },
  mounted() {},
  // 组件方法
  methods: {
    searchClick() {
      this.$router.push({
        path: "/search"
      });
    },
    //获取数据
    getData(data) {
      console.log(data);
      if (!data) {
        data = {
          page: 1,
          limit: 10,
          start_time: "",
          end_time: "",
          level_id: "",
          is_collect: 0,
          is_attended: 0,
          sex: "",
          attr_val_id: ""
        };
      }

      this.$network
        .otoCourse({
          params: data
        })
        .then(res => {
          // console.log("预约教师信息", res);
          this.list = res.data.data;
        });
    },
    //跳到预约页
    goDetails(id) {
      console.log(id);
      this.$router.push({
        path: "/appointment",
        query: {
          id
        }
      });
    },
    //获取搜索列表
    getselect() {
      this.$network.getotoCourseOptions().then(res => {
        // console.log("选择", res);
        this.otoTeacherLevel = res.data.data.otoTeacherLevel;
        // console.log("等级", this.otoTeacherLevel);
        this.classs = res.data.data.attrList[0];
        // console.log("课程", this.classs);
        this.subject = res.data.data.attrList[1];
        // console.log("科目", this.subject);
      });
    },
    // 回到上一页
    back() {
      this.$router.go(-1);
    },
    //搜索后重新加载页面
    onConfirm(str) {
      if (str) {
        //已关注
        let ttwo = "";
        if (this.two) {
          ttwo = 1;
        }
        //已看完
        let tthree = "";
        if (this.three) {
          tthree = 1;
        }
        let val = "";
        if (this.five === "") {
          console.log("只选了科目");
          val = this.six;
        } else if (this.six == "") {
          console.log("只选了年级");
          val = this.five;
        } else {
          console.log("全选");
          val = this.five + "," + this.six;
        }

        let data = {
          page: 1,
          limit: 10,
          start_time: "",
          end_time: "",
          level_id: this.one,
          is_collect: ttwo,
          is_attended: tthree,
          sex: this.four,
          attr_val_id: val
        };
        this.getData(data);
        // console.log(data);
        this.activeIndext = false;
      } else {
        (this.one = ""),
          (this.two = ""),
          (this.three = ""),
          (this.four = ""),
          (this.five = ""),
          (this.six = "");
        this.getData();
        this.activeIndext = false;
      }
    },
    //显示弹出层
    showPopup() {
      this.show = true;
    },
    //第二个弹出层
    showPopupt() {
      this.showt = true;
    },
    // 离开
    close() {
      this.show = true;
      this.showt = true;
    },
    //到搜索
    goSearch() {}
  },
  // 计算属性
  computed: {}
};
</script>

<style lang="scss" scoped>
#appointment {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40px;
  > .wxw_top {
    height: 87px;
    width: 100%;
    background: #fff;
    position: relative;
    text-align: center;
    line-height: 87px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    h3 {
      color: #595959;
      height: 100%;
      margin-top: 8px;
      font-weight: 500;
      margin-left: -20px;
    }
    span {
      position: absolute;
      right: 20px;
      top: 16px;
      > .right {
        font-size: 60px;
      }
    }
    > .left {
      position: absolute;
      left: 25px;
      top: 28px;
      font-size: 40px;
    }
  }
  > .wxw_search {
    height: 84px;
    background: #fff;
    display: flex;
    line-height: 84px;
    text-align: center;
    margin-top: 87px;
    > div {
      width: 50%;
      position: relative;
      font-size: 30px;

      > div {
        position: absolute;
        right: 64px;
        top: 34px;
        width: 20px;
        height: 16px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAAXNSR0IArs4c6QAAAU1JREFUSA3lk71qAkEQx++2zttYBoQ092GVBxFSGBJCFAySIKIpAmnzBqnS3B0EAmlS+jTayG3+/8WBPZU9L3FtHJDZ+fzdzqxBcGoSyoXzPG+XZXkZhuGZ1lpBK8QYV7R5Xvu2bMakBtrkrW3bv1RKvcdx/IZ80zgoiuIc0G8W0elZLtI0/eJNAkA7R4JybC0yDRjGDw3fAs4K4/4kx4Ax9w+cpz7BgGKouhtF0Zycyk6zLJsi2PPxAQB3kyR5ld7mxmIgcI2EmdgH1Fc2lH0rYDo8wHt4xS/sbcsWmMEDwm8AfbaBcq7sWJyi/7NzvN47PNqx9NrUO28sSX+9OaB9F5T9nWAmNIUDOgT0kbUuqQWzeF84/hEjQB9cQIk5dyxJol07B/QJH3gvuXW6EZjNdsEBnQB6Wwez43uN2i7g2LlHwDT8C/wGTaHs9wsfI3k1vlOHEgAAAABJRU5ErkJggg==)
          no-repeat;
        background-size: 100% 100%;
      }
    }
    > .active {
      color: #ed6100;
      > div {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBDMUJFQTRCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ0RDlCOUNCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MEMxQkVBMkI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MEMxQkVBM0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prbv5ocAAAD7SURBVHjaYvz//z8DqeBvGGMNkKoEYk4gbmRe9b+RVDMYSbUYaGkHkCpHE+4FWl5CijlMJFraisVSECgGyvXQxGKgwU1AqgqPEpIsZyLS0nogVUuEUqItJxjHQIOqgVQLiWmHYJwzEbC0ggxLifI5Ex5LS4FUOwP5AK/lWIMaqKEQSPUxUAdgDXYmLJbmUdFSnD5nQrM0G0hNZKA+wLCcCcnSdCA1mYF2AGR5N0ocAwUMgOwzQMzMQHvgB4zzzTAfO9PJUhCwQA7qs3SyFJSFtqFkJ2BwJwGpYGhVBxL8B8XI7H945AixvwDxemAwHyKrWqQWYGIYIAAQYADdQHEe2IBzhgAAAABJRU5ErkJggg==)
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .wxw_content {
    padding-top: 20px;
  }
  //教师信息
  .wxw_teacherInfo {
    margin: 0px auto;
    width: 9.46667rem;
    width: 94.66667vw;
    width: 710px;
    border-radius: 10px;
    box-sizing: border-box;
    > .ti-base {
      height: 162px;
      display: flex;
      padding: 0 30px;
      align-items: center;
      background: #fff;
      margin-top: 20px;
      > img {
        width: 1.06667rem;
        width: 10.66667vw;
        height: 1.06667rem;
        height: 10.66667vw;
        margin-right: 0.32rem;
        margin-right: 3.2vw;
        border-radius: 50%;
        flex: none;
      }
      > div {
        flex: 1;
        > p {
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
        > p:first-child {
          padding-bottom: 0.8vw;
          > span {
            font-size: 0.4rem;
            font-size: 4vw;
            color: #595959;
            line-height: 0.56rem;
            line-height: 5.6vw;
            padding-right: 0.13333rem;
            padding-right: 1.33333vw;
          }
          > font {
            font-size: 0.29333rem;
            font-size: 2.93333vw;
            color: #ea7a2f;
          }
        }
        > p:nth-child(2) {
          font-size: 0.32rem;
          font-size: 3.2vw;
          color: #b7b7b7;
          line-height: 0.45333rem;
          line-height: 4.53333vw;
        }
      }
      > button {
        width: 1.65333rem;
        width: 16.53333vw;
        height: 0.74667rem;
        height: 7.46667vw;
        background: #ebeefe;
        border-radius: 0.41333rem;
        border-radius: 4.13333vw;
        font-size: 0.34667rem;
        font-size: 3.46667vw;
        font-weight: 400;
        color: #4169ff;
        color: #eb6100;
        border: 0;
      }
    }
  }
  .wxw_teachselect {
    width: 100%;
    background: #fff;
    padding: 0 30px 80px;
    > div {
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
      font-size: 24px;
      > p {
        padding: 32px 0 20px;
        width: 100%;
        height: 60px;
        font-size: 24px;
        color: #595959;
        margin-bottom: -30px;
      }
      > ul {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        > li {
          width: 138px;
          height: 66px;
          background: #f5f5f5;
          color: #646464;
          font-size: 26px;
          text-align: center;
          line-height: 66px;
          margin: 0 46px 14px 0;
        }
        > li:nth-of-type(4n) {
          margin-right: 0;
        }
        > .active {
          color: #eb6100;
          background: #ebeefe;
        }
      }
      > div {
        float: left;
      }
    }
    > div:after {
      visibility: hidden;
      content: "";
      display: block;
      font-size: 0;
      clear: both;
      height: 0;
    }
    .wxw_button {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border: none;
      padding: 0;
      button:nth-of-type(1) {
        background: #fff;
        color: #eb6100;
      }
      button:nth-of-type(2) {
        background: #eb6100;
        color: #fff;
      }
      button {
        font-size: 34px;
        width: 50%;
        height: 88px;
        border: none;
      }
    }
  }
  .wxw_time {
    margin: 20px;
    > .wxw_time_top {
      background: #fff;
      > p {
        padding: 30px 0 20px 20px;
        height: 74px;
        font-size: 24px;
        margin-bottom: -30px;
      }
      > ul {
        display: flex;
        > li {
          width: 14%;
          text-align: center;
        }
      }
      > .wxw_week {
        font-size: 24px;
      }
      > .wxw_day {
        font-size: 38px;
        padding-top: 20px;
        > li {
          height: 120px;
          line-height: 120px;
        }
      }
    }
    > .wxw_time_bottom {
      background: #fff;
      margin-top: 20px;
      padding-bottom: 40px;
      > p {
        padding: 30px 0 20px 20px;
        height: 74px;
        font-size: 24px;
      }
      > div {
        display: flex;
        justify-content: center;
        margin-top: -65px;
        > font {
          width: 9.06667vw;
          text-align: center;
          height: 8.93333vw;
          line-height: 8.93333vw;
        }
        > .wxw_in {
          width: 294px;
          height: 67px;
          border: 1px solid #bfbfbf;
          position: relative;
          border-radius: 10px;
          > input {
            width: 220px;
            height: 54px;
            background: rgba(239, 239, 239, 0.3);
            padding: 2px 0 2px 20px;
            border: none;
            // margin: auto 0;
            margin: 2px 0;
            font-size: 25px;
          }
          > i {
            position: absolute;
            top: 34%;
            right: 4%;
            width: 24px;
            height: 24px;
            background: url(data:image/png;base64,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)
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      /deep/.van-picker__confirm {
        font-size: 28px;
      }
      /deep/.van-picker__cancel {
        font-size: 28px;
      }
    }
    .wxw_button {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border: none;
      padding: 0;
      button:nth-of-type(1) {
        background: #fff;
        color: #eb6100;
      }
      button:nth-of-type(2) {
        background: #eb6100;
        color: #fff;
      }
      button {
        font-size: 34px;
        width: 50%;
        height: 88px;
        border: none;
      }
    }
  }

  //教师信息
}
</style>
