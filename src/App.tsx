import React, { useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
    BrowserRouter as Router,
    // HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import "./App.scss";
import Image from "./pages/image";
import SideMenu from "./components/side-menu";
import Setup from "./components/setup";
import BuilderList from "./components/builder-list";
import Building from "./components/building";
import Logo from "./assets/logo.svg";
const { Header, Sider, Content } = Layout;

export default function App() {
    const [collapsed] = useState(false);

    return (
        <ConfigProvider locale={zhCN}>
            <Router>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <SideMenu />
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                            style={{ padding: "0" }}
                        >
                            {React.createElement(
                                collapsed
                                    ? MenuUnfoldOutlined
                                    : MenuFoldOutlined,
                                {
                                    className: "trigger",
                                    //   onClick: () => { setCollapsed(!collapsed) },
                                }
                            )}
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path="/" exact>
                                    <BuilderList />
                                </Route>
                                <Route path="/image" exact>
                                    <Image />
                                </Route>
                                <Route path="/setup" exact>
                                    <Setup />
                                </Route>
                                <Route path="/building" exact>
                                    <Building />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </ConfigProvider>
    );
}
