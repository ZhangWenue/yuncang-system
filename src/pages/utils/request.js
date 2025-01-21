import axios from 'axios';

// 基本配置
const instance = axios.create({
  baseURL: 'http://localhost:3000/', // 根据实际情况修改API地址
  timeout: 3000 // 设置超时时间，单位为ms
});
 
// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token'); 
  // 设置请求头部分，这里举例使用了localStorage存储的token作为身份标识
  // 如果后端不好写直接删掉就好了QwQ
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});
 
// 响应拦截器
instance.interceptors.response.use(response => {
  const data = response.data;
  if (data && data.code !== 200) { // 根据接口返回的状态码判断是否有错误
      // 自定义错误提示
      return Promise.reject(new Error(data.message));
  } else {
      return data; 
  }
}, error => {
  console.log(error);
  return Promise.reject(error);
});
 
export default instance;
 