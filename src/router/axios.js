import axios from 'axios'
import store from '../store'
import router from './index'
import {getToken, setToken, removeToken} from '@/util/auth'
import {Message} from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({showSpinner: false})// NProgress Configuration

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  const accessToken = getToken()
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(data => {
  NProgress.done()
  return data
}, error => {
  NProgress.done()
  const errMsg = error.toString()
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: errorCode[code] || errorCode['default'],
    type: 'error'
  })

  if (parseInt(code) === 401) {
    store.dispatch('FedLogOut').then(() => {
      router.push({path: '/login'})
    })
  }

  return Promise.reject(new Error(error))
})

export default axios
