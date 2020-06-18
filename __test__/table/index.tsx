
    import React, { useRef, useState, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import ProTable, { ProColumns, ActionType } from "../../builder/ant-curd/node_modules/@ant-design/pro-table";
import { useChiliReq } from "../../builder/ant-curd/node_modules/chili-request";
import Matcher from "data-matcher";

import { getList } from "./apis/list(get)";
import PreviewImg from "../../preview_img";
import setColumnCenter from "../../../util/set_column_center";

interface Item {id: string, nickname: string }

const columns: ProColumns<Item>[] = setColumnCenter([{"title":"用户ID","dataIndex":"uid","width":100}]);

export default () => {
  const actionRef = useRef<ActionType>();
  const fetch = useCallback(useChiliReq(), []);
  const handleRequest = async (params: any) => {
    const matcher = new Matcher(params);
    matcher.transformKey({
      current: "page",
      pageSize: "limit",
    });
    const response = await fetch()<any>(getList(matcher.data));
    return {
      data: response.data.list,
      page: params.current,
      success: true,
      total: parseInt(response.data.total, 10),
    };
  };
  return (
    <>
      <ProTable<Item>
        columns={columns}
        bordered
        actionRef={actionRef}
        request={handleRequest}
        rowKey="uid"
        dateFormatter="string"
        headerTitle="测试表格"
      />
    </>
  );
};

    