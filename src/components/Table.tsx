import { Table as AntdTable, TableProps } from "antd";
import React from "react";
import RightIcon from "./icons/RightIcon";
import LeftIcon from "./icons/LeftIcon";

const Table: React.FC<TableProps<any>> = (props) => {
  return (
    <AntdTable
      rowKey={(record) => record.id}
      scroll={{ x: "800px" }}
      {...props}
      pagination={{
        ...props.pagination,
        hideOnSinglePage: true,
        position: ["bottomCenter"],
        showSizeChanger: false,
        nextIcon: <RightIcon width={22} height={22} />,
        prevIcon: <LeftIcon width={22} height={22} />,
      }}
    />
  );
};
export default Table;
