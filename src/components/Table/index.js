import React from 'react';
import { Table } from 'antd';
import { isUndefined, isPlainObject } from 'lodash';
import './index.less';

function CustomizedTable(props) {
  const { pagination, onChange, ...restTableProps } = props;

  // 处理分页属性
  let newPagination = false;

  if (isPlainObject(pagination) || isUndefined(pagination)) {
    newPagination = {
      showQuickJumper: true, // 支持跳页
      showSizeChanger: false, // 支持改变每页显示条数
      ...pagination,
    };
  }

  // 处理表格回调
  const newOnChange = ({ current, pageSize }, _, sorter, extra) => {
    const newSorter = sorter.order
      ? {
          field: sorter.field,
          order: sorter.order.replace('end', ''),
        }
      : {};
    onChange({ current, pageSize }, _, newSorter, extra);
  };

  return (
    <Table
      {...restTableProps}
      pagination={newPagination}
      onChange={newOnChange}
    />
  );
}

export default CustomizedTable;
