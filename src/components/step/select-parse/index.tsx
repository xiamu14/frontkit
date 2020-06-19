import React, { useEffect } from 'react';
import {
    SchemaForm,
    SchemaMarkupField as Field,
    createFormActions,
    FormEffectHooks,
} from '@formily/antd'
import { Input, Select } from '@formily/antd-components';

const { onFieldValueChange$ } = FormEffectHooks;

const actions = createFormActions();

const oneToManyEffects = () => {
    onFieldValueChange$('type').subscribe(({ value }) => {
        actions.setFieldState('*(filterVolume)', state => {
            state.visible = value === 'picture'
        })
        actions.setFieldState('parseFile', state => {
            state.visible = value === 'custom'
        })
    })
}

interface Props {
    isClickNext: boolean
    initialValue?: Record<string, any>
    onInput: (status: boolean, fieldData?: Record<string, any>) => void;
}

export default function SelectParse(props: Props) {
    const { isClickNext, onInput, initialValue } = props;
    useEffect(() => {
        if (isClickNext) {
            actions.submit((values) => {
                onInput(true, { parse: values });
            })
        }
    }, [isClickNext, onInput])

    return (
        <div className="select-parse-box">
            <SchemaForm
                components={{ Input, Select }}
                initialValues={initialValue}
                actions={actions}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                effects={() => {
                    oneToManyEffects()
                }}
            >
                <Field
                    type="string"
                    enum={[
                        { label: "--", value: "--" },
                        { label: '图片解析器', value: 'picture' },
                        { label: "JSON 解析器", value: "json" },
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
