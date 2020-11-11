import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: '运营中心',
    perms: [],
    isCollapse: false,//菜单折叠
    doctitle: {
      title: ''
    },//页面title
    loading: false,//页面请求数据
  },
  mutations: {
    isLoading(state:any, bool){
      state.loading = bool
    },
    collapse(state:any){
      state.isCollapse = !state.isCollapse;
    },
    changeTitle(state:any, titleInfo:any){
      state.doctitle = {
        ...titleInfo,
      }
    },
    getPerms(state:any, perms:any){
      state.perms = perms
    }
  },
  actions: {
  },
  modules: {
  }
})
