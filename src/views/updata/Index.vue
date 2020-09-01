<template>
  <div class="userInfo_box">
    <!-- 头部 -->
    <div class="userInfo_header">
      <div class="userInfo_header_back" @click="back">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="userInfo_header_name">个人信息</div>
      <div></div>
    </div>
    <div class="userInfo_trim"></div>
    <!-- 内容 -->
    <div class="userInfo_content">
      <div class="userInfo_content_box">
        <!-- 头像 -->
        <div class="userInfo_content_box_name" @click="photo">
          <div class="userInfo_content_box_name_title">头像</div>
          <div class="userInfo_content_box_name_right">
            <div class="userInfo_content_box_name_right_one">
              <img :src="userInfo.avatar" alt />
            </div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 昵称 -->
        <div class="userInfo_content_box_name" @click="name(userInfo.nickname)">
          <div class="userInfo_content_box_name_title">昵称</div>
          <div class="userInfo_content_box_name_right">
            <div class="userInfo_content_box_name_right_one">{{ userInfo.nickname }}</div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 手机号 -->
        <div class="userInfo_content_box_name">
          <div class="userInfo_content_box_name_title">手机号</div>
          <div class="userInfo_content_box_name_right">
            <div class="userInfo_content_box_name_right_one">{{ userInfo.mobile }}</div>
          </div>
        </div>
        <!-- 性别 -->
        <div class="userInfo_content_box_name" @click="sexClick(userInfo.sex)">
          <div class="userInfo_content_box_name_title">性别</div>
          <div class="userInfo_content_box_name_right">
            <div class="userInfo_content_box_name_right_one" v-html="sexs(userInfo.sex)"></div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 出生日期 -->
        <div class="userInfo_content_box_name" @click="showPopup">
          <div class="userInfo_content_box_name_title">出生日期</div>
          <div class="userInfo_content_box_name_right">
            <div class="userInfo_content_box_name_right_one" v-html="birthdays(userInfo.birthday)"></div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 所在城市 -->
        <div class="userInfo_content_box_name" @click="selectCity">
          <div class="userInfo_content_box_name_title">所在城市</div>
          <div class="userInfo_content_box_name_right">
            <div
              v-if="this.userInfo.province_name != ''"
              class="userInfo_content_box_name_right_one"
            >
              {{ userInfo.province_name }},{{ userInfo.city_name }},{{
              userInfo.district_name
              }}
            </div>
            <div
              class="userInfo_content_box_name_right_one"
              v-if="this.userInfo.province_name == ''"
            >请选择</div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 学科 -->
        <div class="userInfo_content_box_name">
          <div class="userInfo_content_box_name_title">学科</div>
          <div class="userInfo_content_box_name_right">
            <div
              class="userInfo_content_box_name_right_one"
              v-for="(item, index) in attrUser"
              :key="index"
              @click="sunject(item.attr_id)"
              v-if="item.attr_id == '2'"
            >{{ item.attr_value }}</div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
        <!-- 年级 -->
        <div class="userInfo_content_box_name" @click="classClick">
          <div class="userInfo_content_box_name_title">年级</div>
          <div class="userInfo_content_box_name_right">
            <div
              class="userInfo_content_box_name_right_one"
              v-for="(item, index) in attrUser"
              :key="index"
              v-if="item.attr_id == '1'"
            >{{ item.attr_value }}</div>
            <div class="userInfo_content_box_name_right_two">
              <van-icon name="arrow" size="25" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 出生日期的选择 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="datacancel"
        @confirm="dataconfirm"
      />
    </van-popup>
    <!-- 点击城市 -->
    <van-popup v-model="cityShow" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList" @cancel="cancels" @confirm="confirms" />
    </van-popup>
    <!-- 点击年级 -->
    <van-popup v-model="classShow" position="bottom" :style="{ height: '40%' }">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"></van-picker>
    </van-popup>

    <!-- 头像 -->
    <van-popup v-model="photoShow" position="bottom">
      <div class="popup">
        <div>
          拍照
          <input type="file" accept="image/*" capture="camera" @change="paishe($event)" />
        </div>
        <div>
          用手机相册
          <input type="file" accept="image/*" @change="paishe($event)" />
        </div>
        <div @click="cancel">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [], //用户信息
      minDate: "", //最小日历
      maxDate: "", //最大期限
      currentDate: new Date(),
      show: false, //出生日期的显示和隐藏
      areaList: [], //所有城市的接口数据
      cityShow: false, // 控制城市的遮罩层的出现
      columns: [], //所有的年级信息
      subject: [], //所有的学科的信息
      classShow: false, // 年级的选择
      photoShow: false, // 控制照片的遮罩层出现
      attrUser: [], // 用户的学科和年级
      classId: 0 //选中的id
    };
  },
  mounted() {
    this.getinfo(); //获取个人信息
    this.Datetype(); //出生日历的更新
    this.city(); //所有的城市
    this.getClassBan();
  },
  methods: {
    paishe(e) {
      console.log(e);
      let token = localStorage.getItem("msmkToken");
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      console.log(formData);
      if (token) {
        this.$network
          .getPhoto(formData, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$network
                .getSexUser(
                  { avatar: res.data.data.path },
                  {
                    headers: {
                      authorization: `Bearer ${token}`
                    }
                  }
                )
                .then(res => {
                  console.log(res);
                  this.photoShow = false;
                  this.getinfo();
                });
            }
          });
      }
    },
    // 上传头像
    photo() {
      this.photoShow = true;
    },
    // 点击取消
    cancel() {
      this.photoShow = false;
    },
    // 修改昵称
    name(name) {
      this.$router.push({
        path: "/set_name",
        query: {
          // eslint-disable-next-line no-undef
          tag: "nickname",
          value: name
        }
      });
    },
    // 点击确定
    onConfirm(value) {
      console.log(value);
      this.classShow = false;
      this.$network.getClass().then(res => {
        res.data.data[0].value.forEach(ele => {
          if (ele.name == value) {
            this.classId = ele.id;
          }
        });
        let obj = [
          {
            attr_id: 1,
            attr_val_id: this.classId
          },
          {
            attr_id: 2,
            attr_val_id: 7
          }
        ];
        this.$network
          .getSexUser({
            user_attr: JSON.stringify(obj)
          })
          .then(res => {
            console.log(res);
            this.getinfo();
          });
      });
    },
    // 点击取消
    onCancel() {
      this.classShow = false;
    },
    // 拿到所有学科的数据
    getClassBan() {
      this.$network.getClass().then(res => {
        console.log("所有的学科数据", res);
        this.subject = res.data.data[1].value;
        res.data.data[0].value.forEach(ele => {
          this.columns.push(ele.name);
        });
      });
    },
    // 修改学科
    classClick() {
      this.classShow = !this.classShow;
    },
    // 修改学科
    sunject(id) {
      this.$router.push({
        path: "/translate",
        query: {
          id,
          value: this.subject
        }
      });
    },
    //地址取消按钮
    cancels() {
      this.cityShow = false;
    },
    //更新地址
    confirms(val) {
      this.cityShow = false;
      (this.userInfo.province_id = Number(val[0].code)),
        (this.userInfo.city_id = Number(val[1].code)),
        (this.userInfo.district_id = Number(val[2].code)),
        (this.userInfo.province_name = val[0].name),
        (this.userInfo.city_name = val[1].name),
        (this.userInfo.district_name = val[2].name);
    },
    // 控制城市的出现
    selectCity() {
      this.cityShow = !this.cityShow;
    },
    // 获取所有的城市数据
    city() {
      let list = require("../../assets/json/city.json");
      this.areaList = list.areaList;
    },
    // 生日的判断
    birthdays() {
      if (this.userInfo.birthday == "0") {
        return "请选择";
      } else {
        return this.userInfo.birthday;
      }
    },
    // 点击生日日期的确定
    dataconfirm(value) {
      this.show = false;
      let year = value.getFullYear(); //获取年四位
      let month = value.getMonth() + 1; //获取月份要+1
      let day = value.getDate(); //当前日
      let date = String(year + "-" + month + "-" + day);
      this.userInfo.birthday = date;
    },
    // 日历取消的事件
    datacancel() {
      this.show = false;
      console.log("取消事件");
    },
    //出生日期范围
    Datetype() {
      let date = new Date();
      let year = date.getFullYear(); //获取年四位
      let month = date.getMonth(); //获取月份
      let day = date.getDate(); //日
      this.minDate = new Date(1970, 0, 1); //最小日历
      this.maxDate = new Date(year, month, day - 1); //最大期限为现在时间的前一天
    },
    // 点击弹出
    showPopup() {
      this.show = !this.show;
    },
    // 获取用户信息
    getinfo() {
      let token = localStorage.getItem("msmkToken");
      if (token) {
        this.$network.getUserInfo(token).then(res => {
          console.log("用户的数据", res);
          this.userInfo = res.data.data;
          this.attrUser = res.data.data.attr;
        });
      }
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 性别选择
    sexClick(e) {
      this.$router.push({
        path: "/set-info",
        query: {
          tag: "sex",
          value: e
        }
      });
    },
    //判断性别
    sexs(sex) {
      if (sex == 0) {
        return "男";
      } else if (sex == 1) {
        return "女";
      } else {
        return "保密";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.userInfo_box {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .userInfo_header {
    width: 100%;
    height: 100px;
    background-color: white;
    line-height: 100px;
    display: flex;
    justify-content: space-between;
    .userInfo_header_back {
      margin-left: 20px;
      margin-top: 10px;
    }
    .userInfo_header_name {
      font-size: 35px;
      margin-left: -40px;
    }
  }
  .userInfo_trim {
    width: 100%;
    height: 20px;
  }
  .userInfo_content {
    width: 100%;
    background-color: white;
    .userInfo_content_box {
      width: 95%;
      margin: 0 auto;
      .userInfo_content_box_name {
        width: 100%;
        height: 110px;
        line-height: 110px;
        background-color: white;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        .userInfo_content_box_name_title {
          font-size: 30px;
          color: #999999;
        }
        .userInfo_content_box_name_right {
          color: #999999;
          display: flex;
          .userInfo_content_box_name_right_one {
            color: #999999;
            margin-right: 20px;
            font-size: 25px;
            img {
              width: 75px;
              height: 75px;
              margin-top: 20px;
              border-radius: 50%;
            }
          }
          .userInfo_content_box_name_right_two {
            margin-top: 15px;
          }
        }
      }
    }
  }
  .popup {
    background: #fff;
    padding: 1.33333vw 4vw;
    div {
      height: 12.26667vw;
      line-height: 12.26667vw;
      font-size: 4.53333vw;
      font-weight: 300;
      color: #030303;
      text-align: center;
      display: block;
      position: relative;
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
    > div::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 1px;
      background-color: #f5f5f5;
    }
  }
}
</style>
