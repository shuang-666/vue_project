// 导出GET和POST，以及路径的方法     统一管理请求方式
export const GET = "get";
export const POST = "post";

export const path = {
  Banner: "/banner", //轮播图的数据
  Index_list: "/recommend/appIndex", //三个下面的数据
  login: "/login", //注册接口
  AuthCode: "/smsCode", //获取验证码
  password: "/password", //密码
  userinfo: "/userInfo", //用户的信息
  sexUser: "/user", //选择性别
  city: "/sonArea/0", //所有的城市
  user: "/getUCenterInfo",
  list: "/courseBasis?",
  listItem: "/teacher/mainCourse",
  comment: "/teacher/comment",
  detail: "/teacher",
  banji: "/courseClassify",
  class: "/module/attribute/1?",
  commentClass: "/courseComment",
  classDetails: "/collect",
  concernInfo: "/collect?",
  chapter: "/courseChapter", //课程大纲
  order: "/order/downOrder", //点击立即报名的接口
  invite: "/teacher/invite", //一周数据
  photo: "/public/img" // 图片
};