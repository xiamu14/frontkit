import React from 'react';
import {
    SchemaForm,
    SchemaMarkupField as Field,
    createFormActions,
    FormEffectHooks,
} from '@formily/antd'
import { Input, Select } from '@formily/antd-components';

const { onFieldValueChange$ } = FormEffectHooks

const oneToManyEffects = () => {
    const { setFieldState } = createFormActions()
    onFieldValueChange$('type').subscribe(({ value }) => {
        setFieldState('*(filterVolume)', state => {
            state.visible = value === 'picture'
        })
        setFieldState('parseFile', state => {
            state.visible = value === 'custom'
        })
    })
}

export default function SelectParse() {

    return (
        <div className="select-parse-box">
            <SchemaForm
                components={{ Input, Select }}
                onSubmit={values => {
                    console.log(values)
                }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                effects={() => {
                    oneToManyEffects()
                }}
            >
                <Field
                    type="string"
                    enum={[
                        { label: '图片解析器', value: 'picture' },
                        { label: '自定义解析器', value: 'custom' }
                    ]}
                    default={'picture'}
                    name="type"
                    title="解析器"
                    x-component="Select"
                />
                <Field type="string" name="filterVolume" title="过滤大小(M)" x-component="Input" description="" x-component-props={{
                    placeholder: "过滤大于此值的文件"
                }} />
                <Field type="string" name="parseFile" title="解析器文件" x-component="Input" />
            </SchemaForm>
        </div>
    )
}