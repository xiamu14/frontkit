import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { useHistory } from "react-router-dom";
import uniqueId from 'lodash.uniqueid';
import './index.scss';
// @ts-ignore
const { ipcRenderer } = window;

export default function BuilderList() {

    const history = useHistory();
    const [builderList, setBuilderList] = useState<Record<string, any>[]>();

    useEffect(() => {
        ipcRenderer.send('read-builder');

        ipcRenderer.on('read-builder', (_, builderList) => {
            setBuilderList(builderList);
        });

        return () => ipcRenderer.removeAllListeners('read-builder');
    }, [])

    const handleClick = (builder: any) => {
        const id = uniqueId('builder_');
        history.push(`/building?id=${id}`);
        localStorage.setItem(id, JSON.stringify(builder));
    }

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {
                    builderList ? builderList.map((builder, index) => {
                        return (
                            <Col span={8} key={String(index)} onClick={() => handleClick(builder)}>
                                <Card title={builder.info.name} hoverable={true}>{builder.info.desc}</Card>
                            </Col>
                        )
                    }) : ""
                }

            </Row>
        </div>
    );
}
