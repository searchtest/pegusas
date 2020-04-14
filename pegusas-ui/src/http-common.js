import axios from 'axios'
import router from './router'
import {Notification, Message} from 'element-ui'

axios.defaults.timeout = 20000

axios.interceptors.request.use(function (config) {
  console.log('发送请求:', config)
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.config.method === 'put' || response.config.method === 'post' || response.config.method === 'patch') {
    Message.success({
      type: 'success',
      message: '操作成功'
    })
  }
  return response
}, function (error) {
  if (error.config.method === 'put' || error.config.method === 'post' || error.config.method === 'patch') {
    Message.error({
      type: 'error',
      message: '操作失败'
    })
  }
  if (error.config.url === '/api/v2/me/') {
    router.push('/login')
    return
  }

  if (error.response.status === 401) {
    router.push('/login')
    return
  } else if (error.response.status >= 400) {
    let msg = ''
    if (error.response.data.msg) {
      msg = error.response.data.msg
    } else if (error.response.data.detail) {
      msg = error.response.data.detail
    } else if (error.response.status === 400) {
      msg = error.response.data
    } else {
      msg = error.message
    }
    Notification.error({
      title: '错误',
      message: msg,
      duration: 5000,
      position: 'bottom-right'
    })
  }
  return Promise.reject(error.response)
})

export default axios
