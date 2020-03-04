import React, { useState } from 'react';
import {
  DatePicker,
  Input,
  Table,
  Modal,
  Row,
  Col,
  Divider,
  InputNumber,
  Icon,
  Checkbox,
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
    label: '工单编号',
    field: 'orderNumber',
    options: {},
    component: <Input style={{ width: 100 }} />,
  },
  {
    label: '发起人',
    field: 'creator',
    options: {},
    component: <Input style={{ width: 100 }} />,
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
    orderSource: '客户工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: 'XXX公司',
    result: '通过',
    createTime: '2016-09-21 08:50:08',
    updateTime: '2016-09-21 08:50:08',
  },
];

function ClosedList() {
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: '工单编号',
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
      title: '工单类型',
      dataIndex: 'orderType',
    },
    {
      title: '工单标题',
      dataIndex: 'orderTitle',
    },
    {
      title: '发起人',
      dataIndex: 'creator',
    },
    {
      title: '处理结果',
      dataIndex: 'result',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: () => <a onClick={() => setVisible(true)}>查看</a>,
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
        okText="回复工单"
        cancelText="返回"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Row>
          <Col span={8}>工单编号：78945</Col>
          <Col span={8}>工单分类：审批工单</Col>
          <Col span={8}>工单类型：账务审批</Col>
        </Row>
        <Row>
          <Col span={8}>工单内容：调账审批</Col>
          <Col span={8}>创建人：admin</Col>
          <Col span={8}>创建时间：2016-09-21 08:50:08</Col>
        </Row>
        <Divider />
        <Row>
          <Col span={4}>省份：河北省</Col>
          <Col span={4}>地市：保定市</Col>
          <Col span={4}>账期：12月</Col>
          <Col span={6}>业务号码：346TXY000025</Col>
          <Col span={6}>客户名称：保定XX科技公司</Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>应出账金额（元）：</span>
            <InputNumber value={132000} disabled />
          </Col>
          <Col span={12}>
            <span>拟调整金额（元）：</span>
            <InputNumber value={666} disabled />
            <Icon type="question-circle" theme="filled" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>调整类别：</span>
            <StandardSelect
              disabled
              style={{ width: 200 }}
              value={1}
              options={[{ label: 'CB资料问题，导致未出账', value: 1 }]}
            />
          </Col>
          <Col span={12}>
            <span>订单发生月份：</span>
            <Input style={{ width: 200 }} value="2019-12" disabled />
          </Col>
        </Row>
        <Row>
          <Col>
            <span>详细描述：</span>
            <Input.TextArea disabled />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 style={{ textAlign: 'center' }}>流程记录</h3>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <span>沟通记录：</span>
            <Input.TextArea disabled value="问题描述：如何调整云服务器规格？" />
          </Col>
          <Col>
            <span>指派给：</span>
            <StandardSelect
              disabled
              style={{ width: 200 }}
              value={1}
              options={[
                { label: '创建人', value: 1 },
                { label: '省分运营', value: 2 },
                { label: '云公司运营', value: 3 },
                { label: '省支撑经理', value: 4 },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <span>审核理由：</span>
            <Input.TextArea disabled />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ClosedList;
