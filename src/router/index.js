import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Layout from '@/layout/index'

import {formatRoutes} from '@/util/util'

Vue.use(VueRouter)

const baseRouter = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: '首页',
        component: () => import('@/views/index')
      }
    ]
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/views/login/index')
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [
      {
        path: 'index',
        name: '修改信息',
        component: () => import('@/views/admin/user/info')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/error-page/404')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/error-page/403')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/error-page/500')
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    meta: {
      keepAlive: true
    },
    children: [{
      path: ':routerPath',
      name: 'iframe',
      props: true,
      component: () => import('@/components/iframe/main')
    }]
  },
  {
    path: '/caseInfo',
    name: 'caseInfo',
    component: () => import('@/views/admin/caseInfo/caseInfo')
  },
  {
    path: '/caseDetail/:cid',
    component: Layout,
    children: [{
      path: '/',
      meta: {
        keepAlive: true
      },
      name: '',
      component: () => import('@/views/admin/caseInfo/caseDetail')
    }]
  },
]

export default new VueRouter({
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [].concat(...formatRoutes(store.state.user.menu), baseRouter)
})
