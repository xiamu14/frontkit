import React from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    BuildOutlined,
} from '@ant-design/icons';
import {
    useHistory
} from "react-router-dom";

export default function SideMenu() {

    const history = useHistory();

    const handleSwitch = (path: string) => {
        history.push(path);
    }

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => handleSwitch('/')}>
                <AppstoreOutlined />
                <span >常用生成器</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleSwitch('/setup')}>
                <BuildOutlined />
                <span >配置生成器</span>
            </Menu.Item>
        </Menu>
    )
}

