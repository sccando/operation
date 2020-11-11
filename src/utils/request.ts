import axios from 'axios';
import {message} from 'ant-design-vue'

const webVersion = "v1.1";
let requestArr:any[] = [];

// 创建axios实例
const httpService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

function randomString(len: number = 32): string {
  let $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let maxPos = $chars.length;
  let pwd = "";
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return pwd;
}

// request 拦截器
httpService.interceptors.request.use(
  (config:any) => {
    // 判断是否重复调用
    if(requestArr.indexOf(config.headers.qid) > -1){
      message.error('请勿重复调用')
      return
    }
    if(config.method != 'get' && !config.data.sid){
      config.data.sid = localStorage.getItem('sid_str')
    }
    config.headers = {
      webver: webVersion,
      qid: randomString(32)
    }
    requestArr.push(config.headers.qid);
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
httpService.interceptors.response.use(
  (response:any) => {
    // 统一处理状态
    // console.log(response)
    let res = response.data;
    if(res.state != 0){
      message.error(res.msg)
      return
    }else{
      // 清除该请求在数组requestArr中的qid
      let ind = requestArr.indexOf(res.qid);
      requestArr.splice(ind,1);
      return response.data;
    }
  },
  error => {
    console.log(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    }else{
      error.message = '连接服务器失败'
    }
    return Promise.reject(error)
  }
)

export default httpService
