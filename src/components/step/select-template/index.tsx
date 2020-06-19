import React, { useEffect } from 'react'
import { Button, message } from 'antd'

import { SchemaForm, SchemaField, SchemaMarkupField as Field, createFormActions, } from '@formily/antd'
import { ArrayList } from '@formily/react-shared-components'
import { toArr, FormPath } from '@formily/shared'
import { Input, ArrayCards } from '@formily/antd-components'
import SelectFile from '../../form-field/select-file';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import './index.scss';

const ArrayComponents = {
    CircleButton: (props) => <Button {...props} />,
    TextButton: (props) => <Button {...props} />,
    AdditionIcon: () => <PlusOutlined style={{ fontSize: "20px" }} />,
    RemoveIcon: () => <DeleteOutlined />
}

const ArrayCustom = (props) => {
    const { value, schema, editable, path, mutators } = props;
    const {
        renderAddition,
        renderRemove,
        renderEmpty,
        renderExtraOperations,
        ...componentProps
    } = schema.getExtendsComponentProps() || {}

    const onAdd = () => {
        const items = Array.isArray(schema.items)
            ? schema.items[schema.items.length - 1]
            : schema.items
        mutators.push(items.getEmptyValue())
    }

    return <ArrayList
        value={value}
        minItems={schema.minItems}
        maxItems={schema.maxItems}
        editable={editable}
        components={ArrayComponents}
        renders={{
            renderAddition,
            renderRemove,
            renderEmpty, // 允许开发者覆盖默认
        }}
    >
        {toArr(value).map((item, index) => {
            return (
                <div className="template-array-box" {...componentProps} key={index}>
                    <SchemaField path={FormPath.parse(path).concat(index)} />
                    <ArrayList.Remove index={index} onClick={() => mutators.remove(index)} />
                </div>
            )
        })}
        <ArrayList.Empty>
            {({ children }) => {
                return (
                    <div
                        {...componentProps}

                        onClick={onAdd}
                    >
                        <div>{children}</div>
                    </div>
                )
            }}
        </ArrayList.Empty>
        <ArrayList.Addition>
            {({ children, isEmpty }) => {
                if (!isEmpty) {
                    return (
                        <div className="array-cards-addition" onClick={onAdd}>
                            {children}
                        </div>
                    )
                }
            }}
        </ArrayList.Addition>
    </ArrayList>
}

ArrayCustom.isFieldComponent = true

const actions = createFormActions();

interface Props {
    isClickNext: boolean
    initialValue?: Record<string, any>
    onInput: (status: boolean, fieldData?: Record<string, any>) => void;
}

export default function SelectTemplate(props: Props) {
    const { isClickNext, onInput, initialValue } = props;

    useEffect(() => {
        type Values = { templateList: Record<string, string>[] };
        if (isClickNext) {
            actions.submit((values) => {
                const { templateList } = values as Values;
                const list = templateList.filter(item => Object.keys(item).length > 0);
                if (list.length > 0) {
                    onInput(true, values);
                } else {
                    onInput(false);
                    message.error('请添加模板文件！');
                }
            })
        }
    }, [isClickNext, onInput])

    return (
        <SchemaForm
            components={{
                ArrayCustom,
                Input,
                SelectFile,
                ArrayCards
            }}
            // initialValues={initialValue}
            actions={actions}
        >
            <Field
                title=""
                name="templateList"
                type="array"
                default={initialValue || [{}]}
                x-component="ArrayCustom"
                required={true}
            >
                <Field type="object">
                    <Field name="templateFilePath" x-component="SelectFile" title="模板文件" />

                    <Field name="targetFileName" x-component="Input" title="生成文件" />
                </Field>
            </Field>
        </SchemaForm>
    )
}
