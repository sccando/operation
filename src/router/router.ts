import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import passportRouter from './passport.router'
import mainLayoutRouter from './mainLayout.router'
import { permissionGuard } from "@/utils/permissionGuard";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    passportRouter,
    mainLayoutRouter
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const sid = store.state.userInfo.sid;
  // 有权限无sid或无权限跳转到登录页
  if((sid && to.meta && permissionGuard(to.meta.routerGuard)) || to.name === '/passport/login'){
    next()
  }else{
    next('/passport')
  }
})

router.afterEach((to, from) => {
  const tabInfo = {
    name: to.name,
    path: to.name,
    title: to.meta.title,
    activeName: from.name
  }

  // 设置标题
  store.commit('changeTitle', {
    title: tabInfo.title,
  })
})

export default router
