import React from 'react';
import { Link } from 'react-router-dom';
import {
  DatePicker,
  Input,
  Checkbox,
  Button,
  Dropdown,
  Menu,
  Table,
} from '@/components';
import TableFilter from '../components/TableFilter';
import StandardSelect from '../components/StandardSelect';

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
    title: '发起人联系方式',
    dataIndex: 'creatorPhone',
  },
  {
    title: '工单状态',
    dataIndex: 'orderStatus',
    render: text => {
      const statusAndText = {
        closed: '已关闭',
        resolved: '已解决',
        processing: '处理中',
        pending: <span style={{ color: 'red' }}>待处理</span>,
      };
      return statusAndText[text];
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => <a>查看详情</a>,
  },
];

const dataSource = [
  {
    key: '1',
    orderNumber: '78945',
    orderSource: '客户工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: 'XXX公司',
    creatorPhone: '13355667743',
    orderStatus: 'closed',
    createTime: '2016-09-21 08:50:08',
  },
  {
    key: '2',
    orderNumber: '55687',
    orderSource: '客户工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: 'XXX公司',
    creatorPhone: '13355667743',
    orderStatus: 'resolved',
    createTime: '2016-09-21 08:50:08',
  },
  {
    key: '3',
    orderNumber: '78945',
    orderSource: '内部工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: '客户经理XXX',
    creatorPhone: '13355667743',
    orderStatus: 'processing',
    createTime: '2016-09-21 08:50:08',
  },
  {
    key: '4',
    orderNumber: '55687',
    orderSource: '内部工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: '客户经理XXX',
    creatorPhone: '12325665556',
    orderStatus: 'pending',
    createTime: '2016-09-21 08:50:08',
  },
  {
    key: '5',
    orderNumber: '55687',
    orderSource: '内部工单',
    orderCategory: '技术类',
    orderType: '技术支持',
    orderTitle: '开通问题',
    creator: '客户经理XXX',
    creatorPhone: '12325665556',
    orderStatus: 'pending',
    createTime: '2016-09-21 08:50:08',
  },
];

function List(props) {
  const { location } = props;

  return (
    <>
      <h1>工单管理 - 我的工单 - 全部工单</h1>
      <TableFilter items={filterItems} />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Link to={`${location.pathname}/create-customer-work-order`}>
                创建客户订单
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`${location.pathname}/create-personal-work-order`}>
                创建个人订单
              </Link>
            </Menu.Item>
          </Menu>
        }
      >
        <Button icon="plus" type="primary">
          新建工单
        </Button>
      </Dropdown>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}

export default List;
