// 封装具体的业务请求
import {
  request
} from "./core";
import {
  GET,
  POST,
  PUT,
  path
} from "./config";

const network = {
  getBanner() {
    // 返回promise对象（三个参数）
    return request(GET, path.Banner);
  },
  // 首页的数据
  getIndexList() {
    return request(GET, path.Index_list);
  },
  // 获取验证码
  getAuthCode(params) {
    return request(POST, path.AuthCode, params);
  },
  // 注册的接口
  getLogin(params) {
    return request(POST, path.login, params);
  },
  // 密码
  getPassword(params) {
    return request(POST, path.password, params);
  },
  // 用户信息
  getUserInfo(token) {
    return request(GET, path.userinfo, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  },
  // 性别的选择
  getSexUser(params) {
    return request(PUT, path.sexUser, params);
  },
  // 所有的城市
  getCity() {
    return request(GET, path.city);
  },
  // 提交信息
  getMy(token) {
    return request(GET, path.user, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  },
  getList(params) {
    return request(GET, path.list, params);
  },
  getListItem(params) {
    return request(POST, path.listItem, params);
  },
  getComment(params) {
    return request(POST, path.comment, params);
  },
  getDetails(params) {
    return request(GET, path.detail, params);
  },
  getCourseClass() {
    return request(GET, path.banji);
  },
  getClass() {
    return request(GET, path.class);
  },
  getCommentClass(params) {
    return request(POST, path.commentClass, params);
  },
  getclassDetails(params) {
    return request(POST, path.classDetails, params);
  },
  getconcernInfo(params) {
    return request(GET, path.concernInfo, params);
  },
  // 课程大纲的信息
  getChapter(params) {
    return request(POST, path.chapter, params);
  },
  // 点击立即报名的接口
  getOrder(params) {
    return request(POST, path.order, params);
  },
  // 一周的课程数据
  getInvite(params) {
    return request(POST, path.invite, params)
  },
  // 得到图片
  getPhoto(params) {
    return request(POST, path.photo, params)
  }
};

export default network;