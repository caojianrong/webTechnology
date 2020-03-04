import React, { useState, useEffect } from 'react';
import { Table, Divider, Tabs, Form, Select, Input, Button, Card } from '@wocloud/design';
import { Link } from 'react-router-dom';
// import { request } from '@wocloud/utils';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import SearchLine from '@/components/SearchLine';


// import styles from './index.module.scss';
const { TabPane } = Tabs;
const { Option } = Select;

const searchList = [
  {
    type: 'text',
    id: 'text1',
    label: '订单编号',
  },
  {
    type: 'text',
    id: 'text2',
    label: '登录账号'
  },
  {
    type: 'text',
    id: 'text3',
    label: '客户名称'
  },
  {
    type: 'text',
    id: 'text4',
    label: '订单类型'
  },
  {
    type: 'select',
    id: 'text5',
    label: '订单状态',
    optionList: [
      {
        id: 'id1',
        value: '全部'
      },
      {
        id: 'id2',
        value: '待处理'
      },
      {
        id: 'id3',
        value: '确认'
      },
      {
        id: 'id4',
        value: '疑问'
      },
    ]
  },
  {
    type: 'text',
    id: 'text6',
    label: '订单来源',
    optionList: [
      {
        id: 'id1',
        value: '全部'
      },
      {
        id: 'id2',
        value: '新购'
      },
      {
        id: 'id3',
        value: '续费'
      },
    ]
  },
  {
    type: 'text',
    id: 'text7',
    label: '服务类型'
  },
  {
    type: 'dateRange',
    id: 'text8',
    label: '创建时间',
    itemProps: {
      // mode: ['month', 'month'],
      // format: "YYYY-MM"
    }
  },
]

const columns = [
  {
    title: '订单编号',
    dataIndex: 'address',
    render: text => <a>{text}</a>,
  },
  {
    title: '登录账号',
    dataIndex: 'name',
  },
  {
    title: '客户名称',
    dataIndex: 'number',
  },
  {
    title: '来源',
    dataIndex: 'type',
  },
  {
    title: '订单类型',
    dataIndex: 'developer',
  },
  {
    title: '金额（元）',
    dataIndex: 'developNumber',
  },
  {
    title: '订单状态',
    dataIndex: 'developPhone',
  },
  {
    title: '创建时间',
    dataIndex: 'time',
  },
];
const data = [
  {
    key: '1',
    address: '6456456345',
    name: 'John Brown',
    number: '云主机ECS',
    type: '新购',
    developer: '完成',
    developNumber: '预付费',
    developPhone: '客户经理',
    time: '2019-02-08',
  },
  {
    key: '2',
    address: '6456456356',
    name: 'John Brown',
    number: '云主机ECS',
    type: '新购',
    developer: '完成',
    developNumber: '预付费',
    developPhone: '客户经理',
    time: '2019-02-08',
  },
  {
    key: '3',
    address: '6456456388',
    name: 'John Brown',
    number: '云主机ECS',
    type: '新购',
    developer: '完成',
    developNumber: '预付费',
    developPhone: '客户',
    time: '2019-02-08',
  },
  {
    key: '4',
    address: '6456456354',
    name: 'John Brown',
    number: '云主机ECS',
    type: '升起',
    developer: '完成',
    developNumber: '预付费',
    developPhone: '客户',
    time: '2019-02-08',
  },
  {
    key: '5',
    address: '6456456387',
    name: 'John Brown',
    number: '云主机ECS',
    type: '新购',
    developer: '完成',
    developNumber: '后付费',
    developPhone: '客户经理',
    time: '2019-02-08',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default function Orderlist() {

  const [searchValue, setSearchValue] = useState({ text2: 'default' });
  const onSearch = (data) => {
    console.log(data)
  }

  return (
    <div className={commomStyles.IceContainer}>
      {/* <Button onClick={()=>{ setSearchValue({text2: searchValue.text2 + 'default' })}}> test Effect </Button>  */}
      <PageTitle title="订单管理" />
      <SearchLine value={searchValue} searchList={searchList} onSubmit={onSearch} />
      <Table
        // scroll={{ x: 3500 }}
        rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

