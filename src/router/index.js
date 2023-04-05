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
          permissions: ['admin'],
        },
      },
      {
        path: 'purchase',
        name: 'Purchase',
        component: () => import('@/views/feature/purchase/index'),
        meta: {
          title: '用户购买版本',
          badge: 'New',
          permissions: ['admin'],
        },
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/feature/video/index'),
        meta: {
          title: '视频查询',
          badge: 'New',
          permissions: ['admin'],
        },
      },
      {
        path: 'book',
        name: 'Book',
        component: () => import('@/views/feature/book/index'),
        meta: { title: '书本版号', badge: 'New', permissions: ['admin'] },
      },
      {
        path: 'review',
        name: 'Rook',
        component: () => import('@/views/feature/review/index'),
        meta: { title: '用户评论', badge: 'New', permissions: ['admin'] },
      },
      {
        path: 'agent',
        name: 'Agent',
        component: () => import('@/views/feature/agent/index'),
        meta: { title: '代理审批', badge: 'New', permissions: ['admin'] },
      },
      // {
      //   path: 'buy',
      //   component: () => import('@/views/feature/total/index'),
      //   name: 'Buy',
      //   meta: {
      //     title: '绘本新购买总数',
      //     permissions: ['admin'],
      //   },
      // },
      // {
      //   path: 'cloud',
      //   name: 'Cloud',
      //   component: () => import('@/views/feature/cloud/index'),
      //   meta: { title: '智慧云', permissions: ['admin'] },
      // },
      // {
      //   path: 'duplication',
      //   name: 'Duplication',
      //   component: () => import('@/views/feature/duplication/index'),
      //   meta: { title: '重复数据查询', permissions: ['admin'] },
      // },
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
