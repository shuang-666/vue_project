// 登录的验证
const rigertise = {
  vetifyPhotoNumber(photo) {
    // 验证手机号
    let reg = /^1[345678]\d{9}$/;
    return reg.test(photo);
  },
  vetifyPhotoPassword(pass) {
    // 验证密码
    let reg = /^\w{6,18}$/;
    return reg.test(pass);
  }
};
export default rigertise;
