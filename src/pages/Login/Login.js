import React, { useState } from "react";
import './Login.scss'
import { Button, Checkbox, Form, Input, message } from 'antd';
import MyNotification from "../../components/MyNotification/MyNotification";
import { login } from "../../api/adminApi";
import { type } from "@testing-library/user-event/dist/type";

const onFinish = async (values) => {
  // values即为表单结果（对象）
  const {msg, res} = await login(values)
  if(res) {
    setNotiMsg({type:'success', description:msg})
  } else {
    setNotiMsg({type:'error', description:msg})
  }
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const Login = () =>  {
  const [notiMsg, setNotiMsg] = useState({type:'', description:''})

  let [form] = Form.useForm()// 绑定表单
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