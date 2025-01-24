import request from '../pages/utils/request'
import md5 from 'md5' // 使用md5进行加密

// 注册接口
export function register(data) {
  return request({
    url:'',
    method: 'post',
    data
  })
}

// 登录接口
export function login(data) {
  const password = md5(md5(data.password).split('').reverse().join(''))
  // 加密策略为：对原密码进行md5加密后，翻转后再次进行md5加密，杜绝暴力穷举md5的可能性
  const params = {
    username: data.username,
    password
  }
  // console.log(params)
  return request({
    url:'users',// 写对应接口的api
    method: 'get',
    params
  })
}