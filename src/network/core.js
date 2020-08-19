// 主要的核心代码
import {
    GET,
    POST
} from './config'
import axios from 'axios'

// 创建配置axios实例
const instance = axios.create({
    baseURL: "https://www.365msmk.com/api/app",
    timeout: 1000000,
    //设置axios为form-data
    headers: {
        "content-type": "application/json",
        "devicetype": "H5"
    },

    transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]

})

// 拦截器


// 添加请求拦截器（设置loading动画）
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么   （返回错误的信息,比如，用户的网络信息状态，没有网，没有信号，手机飞行模式）
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


//抛出request   会返回promise对象，有三个状态（pending  未完成，resolved  成功，rejected   失败）
export function request(method, url, params) {
    switch (method) {
        case GET:
            return get(url, params);
        case POST:
            return post(url, params);
    }
}

// 封装请求方法
function get(url, params) {
    return instance.get(url, params)
}

function post(url, params) {
    return instance.post(url, params)
}