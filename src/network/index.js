// 封装具体的业务请求
import {
    request
} from "./core";
import {
    GET,
    POST,
    path
} from './config'

const network = {
    getBanner() {
        // 返回promise对象（三个参数）
        return request(GET, path.Banner)
    },
}

export default network;