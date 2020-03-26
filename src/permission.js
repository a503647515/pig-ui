
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {setTitle} from '@/util/util'

NProgress.configure({
  showSpinner: false
})

function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/404', '/401', '/lock', '/admin/yzafFunctionList_','/admin/yzafIpaList_']
const lockPage = '/lock'

router.beforeEach((to, from, next) => {

  // start progress bar
  NProgress.start()
  const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : to.name

  if (whiteList.indexOf(value) === -1) {
    const route = {
      label: label,
      value: value,
      query: to.query,
    }
    if(to.path === '/'){
      route.close = false
    }
    store.commit('ADD_TAG', route)
  }
  if (store.getters.access_token) { // determine if there has token
    /* has token*/
    if (store.getters.isLock && to.path !== lockPage) {
      next({
        path: lockPage
      })
      NProgress.done()
    } else if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done()
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = []
  const menu = store.getters.menu
  tagCurrent.push(tag)
  return tagCurrent
}

router.afterEach((to, from) => {
  NProgress.done()
  setTimeout(() => {
    const tag = store.getters.tag
    setTitle(tag.label)
    store.commit('SET_TAG_CURRENT', findMenuParent(tag))
  }, 0)
})
