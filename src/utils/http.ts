import request from './request'

const http = {
  get(url:string, param:any){
    const config:any = {
      url: url,
      method: "get"
    }
    if(param) config.params = param
    return request(config)
  },

  post(url:string, param:any){
    const config:any = {
      url: url,
      method: "post",
      data: param,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8;'
      }
    }
    return request(config)
  },

  // 文件上传下载
  fileUpDown(url:string, param:any){
    const config:any = {
      url: url,
      method: "post",
      data: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return request(config)
  },
}

export default http
