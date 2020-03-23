import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';

// @ts-ignore
const { ipcRenderer } = window;

export default function BuilderList() {

    const [builderList, setBuilderList] = useState<Record<string, any>[]>();

    useEffect(() => {
        ipcRenderer.send('read-builder');

        ipcRenderer.on('read-builder', (_, builderList) => {
            setBuilderList(builderList);
        });

        return () => ipcRenderer.removeAllListeners('read-builder');
    }, [])

    const handleClick = () => {
        console.log('运行此生成器');
    }

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {
                    builderList ? builderList.map((builder, index) => {
                        return (
                            <Col span={8} key={String(index)} onClick={() => handleClick()}>
                                <Card title={builder.info.name} hoverable={true}>{builder.info.desc}</Card>
                            </Col>
                        )
                    }) : ""
                }

            </Row>
        </div>
    );
}
