/**
 * 参数说明：
 * method: get获取，set存入，clean清除
 * name: 关键词
 * obj: 存入的内容，可以是任意类型
 */

const storage = {
  // localStorage
  ls(method:string, name:string, obj:any){
    switch (method) {
      case 'get':
        if(localStorage.getItem(name + '_obj')){
          return JSON.parse(localStorage.getItem(name + '_obj'))
        }else if(localStorage.getItem(name + '_str')){
          return localStorage.getItem(name + '_str')
        }else{
          return null
        }
      case 'set':
        storage.ls('clean', name, '');
        if(typeof obj == 'object'){
          localStorage.setItem(name + '_obj', JSON.stringify(obj))
        }else{
          localStorage.setItem(name + '_str', obj)
        }
        return true;
      case 'clean':
        localStorage.removeItem(name + '_obj');
        localStorage.removeItem(name + '_str')
        return true;
    }
  },

  // sessionStorage
  ss(method:string, name:string, obj:any){
    switch (method) {
      case 'get':
        if(sessionStorage.getItem(name + '_obj')){
          return JSON.parse(sessionStorage.getItem(name + '_obj'))
        }else if(sessionStorage.getItem(name + '_str')){
          return sessionStorage.getItem(name + '_str')
        }else{
          return null
        }
      case 'set':
        storage.ss('clean', name, '');
        if(typeof obj == 'object'){
          sessionStorage.setItem(name + '_obj', JSON.stringify(obj))
        }else{
          sessionStorage.setItem(name + '_str', obj)
        }
        return true;
      case 'clean':
        sessionStorage.removeItem(name + '_obj');
        sessionStorage.removeItem(name + '_str')
        return true;
    }
  }

}

export default storage
