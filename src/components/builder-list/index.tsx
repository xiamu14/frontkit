import React from 'react';
import { Row, Col, Card } from 'antd';

export default function BuilderList() {
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