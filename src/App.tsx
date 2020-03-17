import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import './App.scss';

const { Header, Sider, Content } = Layout;

export default function App() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <AppstoreOutlined />
            <span>常用生成器</span>
          </Menu.Item>
          <Menu.Item key="2">
            <BuildOutlined />
            <span>配置生成器</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: "0" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => { setCollapsed(!collapsed) },
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
          </Content>
      </Layout>
    </Layout>
  );
}