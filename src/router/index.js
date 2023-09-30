import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */

  {
    path: '/feature',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Feature',
    alwaysShow: true,
    meta: { title: '功能', icon: 'box-open' },
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/feature/register/index'),
        meta: { title: '注册查询', permissions: ['admin'] },
      },
      {
        path: 'active',
        name: 'Active',
        component: () => import('@/views/feature/active/index'),
        meta: { title: '活跃查询', permissions: ['admin'] },
      },
      {
        path: 'daily',
        component: () => import('@/views/feature/daily/index'),
        name: 'Daily',
        meta: {
          title: '绘本每日数据',
          badge: 'New',
          permissions: ['admin'],
        },
      },
      {
        path: 'version',
        name: 'Version',
        component: () => import('@/views/feature/version/index'),
        meta: {
          title: '特定版本购买',
          badge: 'New',
          permissions: ['admin'] },
      },
      {
        path: 'purchase',
        name: 'Purchase',
        component: () => import('@/views/feature/purchase/index'),
        meta: {
          title: '用户购买版本',
          badge: 'New',
          permissions: ['admin','customer'] },
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/feature/video/index'),
        meta: {
          title: '视频查询',
          badge: 'New',
          permissions: ['admin'] },
      },
      {
        path: 'book',
        name: 'Book',
        component: () => import('@/views/feature/book/index'),
        meta: { title: '书本版号', badge: 'New',permissions: ['admin','customer'] },
      },
      {
        path: 'review',
        name: 'Rook',
        component: () => import('@/views/feature/review/index'),
        meta: { title: '用户评论', badge: 'New',permissions: ['admin','customer'] },
      },
      {
        path: 'funcVersion',
        name: 'FuncVersion',
        component: () => import('@/views/feature/funcVersion/index'),
        meta: { title: '功能版号', badge: 'New',permissions: ['admin','customer'] },
      },
      {
        path: 'eventTrackLog',
        name: 'EventTrackLog',
        component: () => import('@/views/feature/eventTrackLog/index'),
        meta: { title: '埋点记录', badge: 'New',permissions: ['admin'] },
      },
      {
        path: 'queryRecharge',
        name: 'QueryRecharge',
        component: () => import('@/views/feature/queryRecharge/index'),
        meta: { title: '查询充值', badge: 'New',permissions: ['admin'] },
      },
      {
        path: '/record',
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'Record',
        alwaysShow: true,
        meta: { title: '操作记录', badge: 'New', permissions: ['admin']},
        children: [
          {
            path: 'changeregister',
            name: 'Changeregister',
            component: () => import('@/views/feature/record/change/index'),
            meta: { title: '转移记录', badge: 'New', permissions: ['admin'] },
          },]
      }
    ],
  },
  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () =>
          import('@/views/personnelManagement/userManagement/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () =>
          import('@/views/personnelManagement/roleManagement/index'),
        meta: { title: '角色管理' },
      },
      // {
      //   path: 'themeManagement',
      //   name: 'themeManagement',
      //   component: () =>
      //     import('@/layouts/components/VabThemeBar/index'),
      //   meta: { title: '主题管理' },
      // },
      // {
      //   path: 'menuManagement',
      //   name: 'MenuManagement',
      //   component: () =>
      //     import('@/views/personnelManagement/menuManagement/index'),
      //   meta: { title: '菜单管理', badge: 'New' },
      // },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
