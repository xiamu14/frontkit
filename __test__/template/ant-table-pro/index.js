module.exports = function indexTpl(data) {
    const { ItemInterface, columns, title, tableProps } = data[0].object;
    const tpl = `
    import React, { useRef, useCallback } from "react";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { useChiliReq } from "chili-request";
import Matcher from "data-matcher";

import { getList } from "./apis/list(get)";
import setColumnCenter from "../../../util/set_column_center";

interface Item ${ItemInterface}

const columns: ProColumns<Item>[] = setColumnCenter(${JSON.stringify(columns)});

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
        rowKey="${tableProps.rowKey || "id"}"
        dateFormatter="string"
        headerTitle="${title}"
      />
    </>
  );
};

    `;

    return tpl;
};
