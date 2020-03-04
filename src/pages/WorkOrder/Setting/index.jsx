import React, { useState } from 'react';
import { Button, Table, Modal } from '@/components';

const columns = [
  {
    title: '序号',
    dataIndex: 'orderNumber',
  },
  {
    title: '工单来源',
    dataIndex: 'orderSource',
  },
  {
    title: '工单分类',
    dataIndex: 'orderCategory',
  },
  {
    title: '工单名称',
    dataIndex: 'orderName',
  },
  {
    title: '工单代码',
    dataIndex: 'orderCode',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => (
      <>
        <a>修改</a> <a>删除</a>
      </>
    ),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

const dataSource = [
  {
    key: '01',
    orderNumber: '01',
    orderSource: '客户工单',
    orderCategory: '业务类',
    orderName: '工单名称',
    orderType: '产品咨询',
    orderCode: '111',
    updateTime: '2016-09-21  08:50:08',
  },
];

function BindingProcess() {
  return (
    <Table
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'KEY',
          dataIndex: 'key',
        },
        {
          title: '名称',
          dataIndex: 'name',
        },
      ]}
    />
  );
}

function WorkOrderSetting() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <h1>工单管理-工单配置</h1>
      <div>
        <Button icon="plus" type="primary">
          新建
        </Button>
        <Button onClick={() => setVisible(true)}>绑定流程</Button>
        <Button>解绑流程</Button>
      </div>

      <Table columns={columns} dataSource={dataSource} />
      <Modal
        width={1000}
        title="绑定流程"
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <BindingProcess />
      </Modal>
    </>
  );
}

export default WorkOrderSetting;
