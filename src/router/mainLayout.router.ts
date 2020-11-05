import MainLayout from '@/layout/main/MainLayout.vue';

const router = {
  path: "",
  component: MainLayout,
  redirect: "/analysis",
  name: "/",
  meta: {
    title: "运营平台",
    icon: "dashboard",
    routerGuard: "e902b516c0ab47138479cb2294d4295a"
  },
  children: [
    {
      path: "/analysis",
      name: "/analysis",
      component: () => import("@/views/Analysis.vue"),
      meta: {
        title: "项目报告",
        routerGuard: "db51de8754e04490a1d98c41b9349802"
      }
    }
  ]
};

export default router
