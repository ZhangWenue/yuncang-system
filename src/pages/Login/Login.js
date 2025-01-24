import React, { useEffect, useState } from "react";
import './Login.scss';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // 绑定表单
  const [loading, setLoading] = useState(false); // 状态管理：加载中
  const [messageApi, contextHolder] = message.useMessage();// 控制message组件的显隐
  const onFinish = async (values) => {
    setLoading(true); // 开始登录
    try {
      const res = await login(values); // 接受登录请求传回的信息
      console.log('API Response:', res); // 检查 API 响应
      setLoading(false); // 登录结束
      if (res.data.success) { // 登录成功
        localStorage.setItem('token', res.data.token); // 缓存 token
        messageApi.open({
          type: 'success',
          content: res.data.msg
        }); // 显示成功消息
        navigate('/layout'); // 跳转到首页
      } else {
        messageApi.open({
          type: 'error',
          content: res.data.msg
        });// 显示错误消息
      }
    } catch (error) {
      setLoading(false); // 登录结束
      console.error('Login error:', error); // 打印错误以调试
      messageApi.open({
        type: 'error',
        content: '登录失败，请重试！'
      });// 显示错误消息
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('表单提交失败:', errorInfo);
    messageApi.open({
      type: 'warning',
      content: '请完善表单信息！'
    });// 显示错误消息
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/layout');
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="content">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2>云仓智能仓储管理系统</h2>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="password"
            rules={[{ required: true, message: '请输入登录密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住该用户</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
            <Button
              onClick={() => form.resetFields()}
              style={{ marginLeft: '60px' }}
            >
              重新输入
            </Button>
          </Form.Item>
        </Form>
        {contextHolder}
      </div>
    </div>
  );
};

export default Login;