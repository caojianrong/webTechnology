import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Badge } from '@/components';
import Filter from './Filter';
import stores from '../stores';

function WorkOrderQueryPage(props) {
  // 存储列表请求参数
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 10 },
    filters: null, // 标记查询条件还未初始化
    sorter: {},
  });

  const { workOrderStatus } = stores.useStore('config');

  const { workOrderList, fetchWorkOrderList } = stores.useStore('query');

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'workOrderNumber',
    },
    {
      title: '省份',
      dataIndex: 'province',
    },
    {
      title: '地市',
      dataIndex: 'city',
    },
    {
      title: '工单来源',
      dataIndex: 'workOrderSource',
    },
    {
      title: '工单分类',
      dataIndex: 'workOrderCategory',
    },
    {
      title: '工单类型',
      dataIndex: 'workOrderType',
    },
    {
      title: '工单标题',
      dataIndex: 'workOrderTitle',
    },
    {
      title: '发起人',
      dataIndex: 'initiator',
    },
    {
      title: '发起人联系方式',
      dataIndex: 'initiatorContact',
    },
    {
      title: '工单状态',
      dataIndex: 'workOrderStatus',
      render: value => {
        const { label, color } =
          workOrderStatus.find(item => item.value === value) || {};
        return <Badge color={color} text={label} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const { pathname } = props.location;
        return <Link to={`${pathname}/detail?id=${record.key}`}>查看详情</Link>;
      },
    },
  ];

  function handleFiltersSet(filters) {
    setTableParams({
      ...tableParams,
      filters,
    });
  }

  function handleTableChange(pagination, _, sorter) {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });
  }

  // 根据请求参数的变化，发送请求
  useEffect(() => {
    if (!tableParams.filters) return; // 等待查询条件加载完成后，再获取表格数据
    fetchWorkOrderList(tableParams);
  }, [tableParams]);

  return (
    <>
      <div style={{ marginBottom: 20 }}>工单管理 / 工单查询</div>
      <Card style={{ marginBottom: 20 }}>
        <Filter
          onInit={handleFiltersSet}
          onSearch={handleFiltersSet}
          onReset={handleFiltersSet}
        />
      </Card>
      <Card>
        <Table
          loading={fetchWorkOrderList.loading}
          style={{ margin: '0 -20px' }}
          columns={columns}
          pagination={{
            ...tableParams.pagination,
            total: workOrderList.total,
          }}
          dataSource={workOrderList.dataSource}
          onChange={handleTableChange}
        />
      </Card>
    </>
  );
}

export default WorkOrderQueryPage;
