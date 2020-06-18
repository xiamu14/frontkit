import React, { useRef, useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Switch, Popconfirm } from "antd";
import { matcher } from "data-matcher";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { useChiliReq } from "chili-request";
import PreviewImg from "@redchili/preview-image";
import DescriptionsPro, { ItemType } from "@redchili/descriptions-pro";
import Form from "./components/form";
import setColumnCenter from "../../../util/set_column_center";
import { getList } from "./apis/list(get)";
import { typeSelect } from "../select";
import { buttonGroup } from "../../../style/linaria";

type Item = Record<string, any>;

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const fetch = useCallback(useChiliReq(), []);

  const handleRequest = async (params: Record<string, any>) => {
    const result = matcher({ ...params }).transformKey({
      current: "page",
      pageSize: "limit",
    });
    const response = await fetch()<any>(getList(result.data as any));
    return {
      data: response.data.list,
      page: params.current,
      success: true,
      total: parseInt(response.data.total, 10),
    };
  };

  const [formData, setFormData] = useState<Record<string, any>>();

  const [detailData, setDetailData] = useState<ItemType[]>([]);

  const handleAdd = () => {
    setVisible(!visible);
    setFormData({ clearTag: Date.now() });
  };

  const handleDel = (id: string) => {
    console.log("删除", id);
  };

  const handleEdit = (item: Record<string, any>) => {
    setVisible(!visible);
    const result = matcher({ ...item }).part("picture", (src: string) => [
      {
        type: "input",
        src,
      },
    ]);
    setFormData(result.data);
  };

  const handleFinished = () => {
    setVisible(!visible);
    // 刷新页面
    // @ts-ignore
    actionRef.current.reload();
  };

  const handleSwitchShow = (checked: boolean) => {
    console.log("是否显示", checked);
  };

  const schema = [
    { label: "商品编号", dataIndex: "id" },
    {
      label: "商品图片",
      dataIndex: "picture",
      render: (src: string) => {
        return <PreviewImg src={src} />;
      },
    },
    {
      label: "商品名称",
      dataIndex: "name",
    },
    {
      label: "商品价格(￥)",
      dataIndex: "sale",
    },
    {
      label: "商品分类",
      dataIndex: "category",
    },
    {
      label: "所属商家",
      dataIndex: "business",
    },
    {
      label: "商品类型",
      dataIndex: "type",
      render: (type: string) => {
        const item = typeSelect.item("id", type);
        return item?.val;
      },
    },
    {
      label: "是否在售",
      dataIndex: "isOnSale",
      render: (isOnSale: boolean) => {
        return (
          <Switch
            checkedChildren="上架"
            unCheckedChildren="下架"
            defaultChecked={isOnSale}
            onChange={handleSwitchShow}
          />
        );
      },
    },
  ];

  const handleRead = (item: Record<string, any>) => {
    setDetailVisible(true);
    const result = matcher(schema).addKeyFn("content", val => {
      if (Object.prototype.hasOwnProperty.call(val, "render")) {
        return val.render(item[val.dataIndex]);
      }
      return item[val.dataIndex];
    });
    setDetailData(result.data as ItemType[]);
  };

  const columns: ProColumns<Item>[] = setColumnCenter([
    { title: "商品编号", dataIndex: "id", width: 120 },
    {
      title: "商品图片",
      dataIndex: "picture",
      width: 120,
      render: (src: string) => {
        return <PreviewImg src={src} />;
      },
      hideInSearch: true,
    },
    {
      title: "商品名称",
      dataIndex: "name",
      copyable: true,
      width: 200,
    },
    {
      title: "商品价格(￥)",
      dataIndex: "sale",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "商品分类",
      dataIndex: "category",
      width: 120,
    },
    {
      title: "所属商家",
      dataIndex: "business",
      width: 120,
    },
    {
      title: "商品类型",
      dataIndex: "type",
      width: 100,
      render: (type: string) => {
        const item = typeSelect.item("id", type);
        return item?.val;
      },
    },
    {
      title: "是否在售",
      dataIndex: "isOnSale",
      width: 160,
      hideInSearch: true,
      render: (isOnSale: boolean) => {
        return (
          <Switch
            checkedChildren="上架"
            unCheckedChildren="下架"
            defaultChecked={isOnSale}
            onChange={handleSwitchShow}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "status",
      hideInSearch: true,
      render: (_, record: Item) => {
        return (
          <div className={buttonGroup}>
            <Button onClick={() => handleRead(record)}>详情</Button>
            <Button type="primary" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            {/* <Popconfirm
              title="你确定要删除这个商品分类吗？"
              onConfirm={() => handleDel(record.id)}
              okText="确认"
              cancelText="放弃"
            >
              <Button type="danger">删除</Button>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ]);

  return (
    <>
      <ProTable<Item>
        columns={columns}
        bordered
        actionRef={actionRef}
        request={handleRequest}
        rowKey="id"
        dateFormatter="string"
        headerTitle="商品列表"
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={handleAdd}>
            <PlusOutlined />
            添加商品
          </Button>,
        ]}
      />
      <Modal
        visible={visible}
        title="添加商品"
        footer={false}
        onCancel={() => setVisible(!visible)}
      >
        <Form onFinished={handleFinished} initialValues={formData} />
      </Modal>
      <Modal
        visible={detailVisible}
        title="商品详情"
        footer={false}
        width={880}
        onCancel={() => setDetailVisible(!detailVisible)}
      >
        <DescriptionsPro data={detailData} />
      </Modal>
    </>
  );
};
