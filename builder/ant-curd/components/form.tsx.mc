import React from "react";
import {
  SchemaForm,
  Submit,
  FormButtonGroup,
  createFormActions,
  FormEffectHooks,
  LifeCycleTypes,
} from "@formily/antd";
import { Input, Radio, Select } from "@formily/antd-components";
import CustomUpload from "../../../form/custom_upload";
import { typeSelect } from "../../select";
import { buttonStyle } from "../../../../style/css";

const actions = createFormActions();

interface Props {
  initialValues: Record<string, any> | undefined;
  onFinished: () => void;
}

const schema = {
  type: "object",
  properties: {
    parent: {
      key: "parent",
      type: "string",
      title: "所属分类",
      required: true,
      enum: ["——", "水果"],
      "x-component": "select",
      "x-props": {
        defaultValue: "——",
      },
    },
    name: {
      key: "name",
      type: "string",
      title: "分类名称",
      required: true,
      name: "string",
      "x-component": "input",
    },
    type: {
      key: "type",
      type: "string",
      title: "商品类型",
      required: true,
      enum: typeSelect.vals("val"),
      "x-component": "radio",
      "x-props": {
        defaultValue: typeSelect.vals("val")[0],
      },
    },
    picture: {
      key: "picture",
      type: "string",
      title: "分类图片",
      required: true,
      "x-component": "customUpload",
      "x-props": {
        limit: 1,
      },
    },
  },
};

const components = {
  Input,
  Select,
  CustomUpload,
  Radio: Radio.Group,
};

const formEffects = ($, { setFieldState }) => {
  $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
    setFieldState("type", state => {
      // eslint-disable-next-line no-param-reassign
      state.visible = false;
    });
  });
  FormEffectHooks.onFieldValueChange$("parent").subscribe(({ value }) => {
    setFieldState("type", state => {
      // eslint-disable-next-line no-param-reassign
      state.visible = value !== "——";
    });
  });
};

export default function Form(props: Props) {
  const { initialValues, onFinished } = props;

  const handleSubmit = (data: Record<string, any>) => {
    onFinished();
    actions.reset({ forceClear: true, validate: false });
  };

  return (
    <SchemaForm
      components={components}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      schema={schema}
      effects={formEffects}
      wrapperCol={16}
      labelCol={6}
    >
      <FormButtonGroup offset={6}>
        <Submit style={buttonStyle}>确认</Submit>
      </FormButtonGroup>
    </SchemaForm>
  );
}
