import React from 'react';
import {
    SchemaForm,
    SchemaMarkupField as Field,
    createFormActions,
    Submit,
    FormButtonGroup,
} from '@formily/antd'
import { Input } from '@formily/antd-components'

const actions = createFormActions();

interface Props {
    onOk: (data: Record<'info', any>) => void,
    initialValues?: Record<string, any>
}

export default function InfoForm(props: Props) {

    const { onOk, initialValues } = props;

    const handleSubmit = (data: Record<'name' | 'desc', string>) => {
        onOk({ info: data });
    }

    return (
        <div>
            <SchemaForm
                actions={actions}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                components={{
                    Input,
                    TextArea: Input.TextArea
                }}
            >
                <Field
                    required
                    title="生成器名称"
                    name="name"
                    x-component="Input"
                />
                <Field
                    required
                    title="描述信息"
                    name="desc"
                    x-component="TextArea"
                    x-props={{
                        rows: 4
                    }}
                />
                <FormButtonGroup offset={6}>
                    <Submit shape="round">确认</Submit>
                </FormButtonGroup>
            </SchemaForm>
        </div>
    )

}
