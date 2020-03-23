import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';

// @ts-ignore
const { ipcRenderer } = window;

export default function BuilderList() {

    useEffect(() => {
        ipcRenderer.send('read-builder');

        ipcRenderer.on('read-builder', (_, builderList) => {
            console.log('查看所有的生成器配置', builderList);
        });

        return () => ipcRenderer.removeAllListeners('read-builder');
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="图标组件生成器" >Card content</Card>
                </Col>
                <Col span={8}>
                    <Card title="路由组件生成器" >Card content</Card>
                </Col>
                <Col span={8}>
                    <Card title="Remax - H5 组件生成器" >Card content</Card>
                </Col>
            </Row>
        </div>
    );
}
