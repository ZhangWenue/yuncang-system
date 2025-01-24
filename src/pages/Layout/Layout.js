import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import logo from '../Layout/logo.png';
import './Layout.scss';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import MyModal from '../../components/MyModal/MyModal';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const menuItems = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: '用户管理',
            key: 'admin',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: '角色管理',
            key: 'role',
          },
          {
            label: '退出登录',
            key: 'exit',
          },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState('mail');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!localStorage.getItem('token')){
  //     navigate('/login')
  //   }
  // }, [])

  const onClickMenu = (e) => {
    setCurrent(e.key);
    switch(e.key) {
      case 'exit':
        setIsModalOpen(true); // 打开 Modal 确认退出
        break
      
      case 'role':
        navigate('role')
        break
      
      case 'admin': 
        navigate('admin')
        break
      
      default:
        break
    }

  };

  const handleModalClose = (confirm) => {
    setIsModalOpen(false); // 关闭 Modal
    
    if (confirm) {
      // 如果确认退出
      localStorage.clear();
      sessionStorage.clear(); // 清空缓存
      navigate('/login'); // 跳转到登录页
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="demo-logo-vertical">
          <span style={{ textOverflow: 'ellipsis' }}>
            {collapsed ? '云仓' : '云仓智能仓储管理系统'}
          </span>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          style={{ width: '100%' }}
        />
      </Sider>

      <Layout>
        <Header
          className="header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Menu
            onClick={onClickMenu}
            className="header-menu"
            selectedKeys={[current]}
            mode="horizontal"
            items={menuItems}
          />
          <MyModal
            title="对话框"
            content="是否要退出登录？"
            isModalOpen={isModalOpen}
            sendChildMsg={handleModalClose} // 将 handleModalClose 作为参数传给 MyModal
          />
        </Header>

        <Content
          theme="light"
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet>

            </Outlet>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;