import React, { useState } from 'react';
import { Button, Card, Empty, Modal } from 'antd';
import { css } from 'linaria';
import { DownloadOutlined, ReadOutlined } from "@ant-design/icons";
import { SchemaForm, SchemaMarkupField as Field, FormButtonGroup, Submit } from '@formily/antd'
import { Input, Select } from '@formily/antd-components'
import useSWR, { mutate } from 'swr';
import Matcher, { matcher } from 'data-matcher';
import { builderSelect } from '../../helper/select';
import SelectFile from '../form-field/select-file';
import { fetcher, create } from '../../fetch/client';

export default function BuilderMarket() {
    const { data } = useSWR<Record<string, any>>('/builders', fetcher, { revalidateOnFocus: false });

    const handleSubmit = async (data) => {
        let result: null | Matcher = matcher({ ...data }).part('type', value => {
            const item = builderSelect.item('desc', value);
            return item?.value
        });
        await create('/builders', result.data);
        mutate('/builders');
        result = null // 清除引用
        setVisible(false);
    }

    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className={
                css`
                height: 100%;
                display: flex;
                flex-direction: column;
            `
            }>
                <Button
                    shape="round"
                    type="primary"
                    onClick={() => setVisible(true)}
                    className={
                        css`
                    min-width: 100px;
                    height: 36px;
                    align-self:baseline;
                    `
                    }>发布新函数</Button>
                <div className={
                    css`
                margin-top: 20px;
                flex-grow: 1;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
            `
                }>
                    {
                        data && data.length ? data.map((item, index) => {
                            return (
                                <div
                                    key={index.toString()}
                                    className={css`
                                        width: 260px;
                                        margin-left: 8px;
                                        margin-right: 8px;
                                        margin-bottom: 16px;
                                    `}
                                >

                                    <Card
                                        title={item.name}
                                        bodyStyle={{
                                            height: '100px'
                                        }}
                                        hoverable
                                        actions={[
                                            <ReadOutlined key="read" />,
                                            <DownloadOutlined key="download" />,
                                        ]}>
                                        {item.desc}
                                    </Card>
                                </div>
                            )
                        }) : <div className={
                            css`
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `
                        }>
                                <Empty description="暂无生成器" />
                            </div>
                    }
                </div>
            </div>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                title="发布新的生成器函数"
                footer={false}
            >
                <SchemaForm
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    components={{
                        Input,
                        Select,
                        SelectFile,
                        TextArea: Input.TextArea,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Field
                        required
                        title="函数名称"
                        name="name"
                        x-component='Input'
                    />
                    <Field
                        required
                        title="函数简介"
                        name="desc"
                        x-component='textarea'
                        x-props={{
                            rows: "4"
                        }}
                    />
                    <Field
                        required
                        title="函数类型"
                        name="type"
                        x-component='Select'
                        enum={builderSelect.vals('desc')}
                    />
                    <Field
                        required
                        title="选择函数文件"
                        name="functionFile"
                        x-component="SelectFile"
                        x-props={{
                            style: {
                                width: "100%"
                            },
                            channel: "selectedFnFile"
                        }}
                    />
                    <Field
                        required
                        title="选择描述文件"
                        name="aboutFile"
                        x-component="SelectFile"
                        x-props={{
                            style: {
                                width: "100%"
                            },
                            channel: "selectedAboutFile"
                        }}
                    />
                    <FormButtonGroup offset={6}>
                        <Submit shape="round" className={
                            css`
                                min-width: 100px;
                                height: 36px;`
                        }>提交</Submit>
                    </FormButtonGroup>
                </SchemaForm>
            </Modal>
        </>
    )
}
