// 主要的核心代码
import { GET, POST, PUT } from "./config";
import axios from "axios";
import { Loading, Message } from "element-ui";

// 创建配置axios实例
const instance = axios.create({
  baseURL: "https://www.365msmk.com/api/app",
  timeout: 1000000,
  //设置axios为form-data
  headers: {
    "content-type": "application/json",
    devicetype: "H5",
    authorization: "Bearer " + localStorage.msmkToken
  }
});
/*  */
// 拦截器
var loading = null;
// 添加请求拦截器（设置loading动画）
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    loading = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    return config;
  },
  function(error) {
    // 对请求错误做些什么   （返回错误的信息,比如，用户的网络信息状态，没有网，没有信号，手机飞行模式）
    Message({
      showClose: true,
      message: error.message,
      type: "error"
    });
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    setInterval(() => {
      loading.close();
    }, 1000);
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    Message({
      showClose: true,
      message: error.message,
      type: "error"
    });
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//抛出request   会返回promise对象，有三个状态（pending  未完成，resolved  成功，rejected   失败）
export function request(method, url, params) {
  switch (method) {
    case GET:
      return get(url, params);
    case POST:
      return post(url, params);
    case PUT:
      return put(url, params);
  }
}

// 封装请求方法
function get(url, params) {
  return instance.get(url, params);
}

function post(url, params) {
  return instance.post(url, params);
}

function put(url, params) {
  return instance.put(url, params);
}
