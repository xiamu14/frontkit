import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

        return () => ipcRenderer.removeAllListeners();
    }, []);


    const handleClick = (builder: any) => {
        const id = uniqueId('builder_');
        history.push(`/building?id=${id}`);
        localStorage.setItem(id, JSON.stringify(builder));
    }

    const handleClickDel = (id: string) => {
        ipcRenderer.send('del-builder', id);
    }

    const handleClickEdit = (id: string) => {
        history.push(`/setup?id=${id}`);
    }

    return (
        <div className="builder-card-wrapper">
            <Row gutter={16}>
                {
                    builderList && builderList.length > 0 ? builderList.map((builder, index) => {
                        return (
                            <Col span={8} key={String(index)}>
                                <Card title={builder.info.name} hoverable={true}
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => handleClickEdit(builder.id)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleClickDel(builder.id)} />,
                                    ]}>
                                    <div onClick={() => handleClick(builder)} className="card-body">
                                        {builder.info.desc}
                                    </div></Card>
                            </Col>
                        )
                    }) : <Empty description="暂无生成器" />
                }
            </Row>
        </div>
    );
}
