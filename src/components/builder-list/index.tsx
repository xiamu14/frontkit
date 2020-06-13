import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Empty, Modal, Descriptions, List } from 'antd';
import { EditOutlined, DeleteOutlined, ReadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import uniqueId from 'lodash.uniqueid';
import { css } from 'linaria';
import './index.scss';
// @ts-ignore
const { ipcRenderer } = window;

export default function BuilderList() {

    const history = useHistory();
    const [builderList, setBuilderList] = useState<Record<string, any>[]>();
    const [visible, setVisible] = useState(false);
    const [detail, setDetail] = useState<any>();
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

    const handleClickRead = (builder: any) => {
        setVisible(true);
        setDetail(builder);
    }

    return (
        <>
            <div className="builder-card-wrapper">
                <Row gutter={24}>
                    {
                        builderList && builderList.length > 0 ? builderList.map((builder, index) => {
                            return (
                                <Col span={8} key={String(index)}>
                                    <Card title={builder.info.name} hoverable={true}
                                        actions={[
                                            <ReadOutlined key="read" onClick={() => handleClickRead(builder)} />,
                                            <EditOutlined key="edit" onClick={() => handleClickEdit(builder.id)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleClickDel(builder.id)} />,
                                        ]}>
                                        <div onClick={() => handleClick(builder)} className="card-body">
                                            <span>
                                                {builder.info.desc}
                                            </span>
                                            <span className={css`color: #1890ff;`}>
                                                {`(${builder.dataPath ? '专用' : "通用"})`}
                                            </span>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        }) : <Empty description="暂无生成器" />
                    }
                </Row>
            </div>
            <Modal width={600} footer={false} title="生成器详情" visible={visible} onCancel={() => setVisible(false)} >
                {detail ? <Descriptions bordered column={1}>
                    {detail.targetPath ? <Descriptions.Item label="数据源目录">{detail.targetPath}</Descriptions.Item> : null}
                    <Descriptions.Item label="解析器类型">{detail.parse.type}</Descriptions.Item>
                    <Descriptions.Item label="代码模板">
                        <List grid={{ gutter: 6, column: 2 }}
                            dataSource={detail.templateList}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Card title={item.targetFileName}>{
                                        item.templateFilePath
                                    }</Card>
                                </List.Item>
                            )}></List>
                    </Descriptions.Item>
                    {detail.dataPath ? <Descriptions.Item label="生成代码目录">{detail.dataPath}</Descriptions.Item> : null}
                </Descriptions> : null}
            </Modal>
        </>
    );
}
