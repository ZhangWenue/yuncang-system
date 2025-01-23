import React, { useEffect, useState } from "react";
import './Login.scss';
import { Button, Checkbox, Form, Input, message } from 'antd';
import MyNotification from "../../components/MyNotification/MyNotification";
import { login } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

const Login = () =>  {
  const [notiMsg, setNotiMsg] = useState({type:'', description:''})
  const navigate = useNavigate()
  const [form] = Form.useForm()// 绑定表单

  const onFinish = async (values) => {// values即为表单结果（对象）
    try {
      const res = await login(values); // 接受登录请求传回的信息，状态码success
      if (res.data.success) { // 登录成功
        localStorage.setItem('token', res.data.token); // 在浏览器的 localStorage 里缓存 token
        message.success(res.data.msg); // 显示成功消息
        navigate('/layout'); // 跳转到首页
      } else {
        message.error(res.data.msg); // 显示错误消息
      }
    } catch (error) {
      message.error('登录失败，请重试！'); // 捕获并显示网络错误
      console.error('Login error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
   if(localStorage.getItem('token')){
    navigate('/layout')
   } 
  }, [])

  return (
    <div className="login">
      <div className="content">
      <Form
          name="basic"
          form={form}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2>云仓智能仓储管理系统</h2>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入登录密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住该用户</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button onClick={() => {
              form.resetFields()
            }} style={{marginLeft: '60px'}}>
              重新输入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login