import PassportLayout from '@/layout/passport/Passport.vue'

const router = {
  path: '/passport',
  component: PassportLayout,
  name: '/passport',
  redirect: '/passport/login',
  meta: {
    title: '登录页'
  },
  children: [
    {
      path: 'login',
      name: '/passport/login',
      component: () => import('@/views/passport/login.vue'),
      meta: {
        title: '登录'
      }
    }
  ]
}

export default router
