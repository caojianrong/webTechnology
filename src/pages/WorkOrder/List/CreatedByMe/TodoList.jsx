import React, { useState } from 'react';
import {
  DatePicker,
  Input,
  Table,
  Checkbox,
  Modal,
  Row,
  Col,
  Divider,
} from '@/components';
import TableFilter from '../../components/TableFilter';
import StandardSelect from '../../components/StandardSelect';

const filterItems = [
  {
    label: '创建时间',
    field: 'createTime',
    options: {},
    component: <DatePicker.RangePicker style={{ width: 200 }} />,
  },
  {
    label: '工单类型',
    field: 'orderType',
    options: {},
    component: (
      <StandardSelect
        style={{ width: 100 }}
        options={[
          { label: '技术支撑', value: 'technicalSupport' },
          { label: '产品咨询', value: 'productConsultation' },
          { label: '账务咨询', value: 'accountingConsultation' },
        ]}
      />
    ),
  },
  {
    label: '工单标题',
    field: 'orderTitle',
    options: {},
    component: <Input style={{ width: 100 }} />,
  },
  {
    label: '工单编号',
    field: 'orderNumber',
    options: {},
    component: <Input style={{ width: 100 }} />,
  },
  {
    label: '工单分类',
    field: 'orderCategory',
    options: { initialValue: ['technology'] },
    component: (
      <Checkbox.Group
        options={[
          { label: '业务类', value: 'business' },
          { label: '技术类', value: 'technology' },
        ]}
      />
    ),
  },
];

const dataSource = [
  {
    key: '78945',
    orderNumber: '78945',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    createTime: '2016-09-21 08:50:08',
  },
];

function TodoList() {
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'orderNumber',
    },
    {
      title: '工单分类',
      dataIndex: 'orderCategory',
    },
    {
      title: '工单类型',
      dataIndex: 'orderType',
    },
    {
      title: '工单标题',
      dataIndex: 'orderTitle',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: () => <a onClick={() => setVisible(true)}>查看详情</a>,
    },
  ];

  return (
    <>
      <TableFilter items={filterItems} />
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        width={1000}
        title="工单详情"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Row>
          <Col span={6}>工单编号：78945</Col>
          <Col span={6}>工单来源：客户工单</Col>
          <Col span={6}>工单编号：技术类</Col>
          <Col span={6}>工单编号：技术支持</Col>
        </Row>
        <Row>
          <Col span={8}>创建人：admain</Col>
          <Col span={8}>创建人联系方式：13544543347</Col>
          <Col span={8}>创建时间：2016-09-21 08:50:08</Col>
        </Row>
        <Divider />
        <Row>
          <Col span={4}>沟通记录</Col>
          <Col span={20}>
            <Input.TextArea
              disabled
              defaultValue="问题描述：开通云服务器时遇到闪退  2016-09-21 08:50:08 客户经理 admain：请更换浏览器重试一下 2016-09-21 08:50:08"
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default TodoList;
