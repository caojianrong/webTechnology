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
    type: 'select',
    id: 'text1',
    label: '省份',
    optionList: [
      {
        id: 'id1',
        value: '云公司'
      },
      {
        id: 'id2',
        value: '河北'
      },
      {
        id: 'id3',
        value: '北京'
      },
      {
        id: 'id4',
        value: '天津'
      },
      {
        id: 'id5',
        value: '上线'
      },
    ]
  },
  {
    type: 'select',
    id: 'text2',
    label: '地市',
    optionList: [
      {
        id: 'id1',
        value: '云公司'
      },
      {
        id: 'id2',
        value: '保定'
      },
      {
        id: 'id3',
        value: '廊坊'
      },
      {
        id: 'id4',
        value: '唐山'
      },
    ]
  },
  {
    type: 'select',
    id: 'text3',
    label: '订单类型',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 'id2',
        value: '开通'
      },
      {
        id: 'id3',
        value: '变更'
      },
      {
        id: 'id4',
        value: '续费'
      },
    ]
  },
  {
    type: 'text',
    id: 'text4',
    label: '客户名称'
  },
  {
    type: 'select',
    id: 'text5',
    label: '订单来源',
    optionList: [
      {
        id: 'id1',
        value: '云径'
      },
      {
        id: 'id2',
        value: '云策'
      },
      {
        id: 'id3',
        value: '政企中台'
      },
    ]
  },
  {
    type: 'dateRange',
    id: 'text6',
    label: '日期'
  },
]

const columns = [
  {
    title: '省份',
    dataIndex: 'address',
  },
  {
    title: '地市',
    dataIndex: 'name',
  },
  {
    title: '订单编号',
    dataIndex: 'masterOrderId',
  },
  {
    title: '客户名称',
    dataIndex: 'name',
  },
  {
    title: '账号',
    dataIndex: 'name',
  },
  {
    title: '产品名称',
    dataIndex: 'number',
  },
  {
    title: '订单类型',
    dataIndex: 'type',
  },
  {
    title: '状态',
    dataIndex: 'developer',
  },
  {
    title: '付费类型',
    dataIndex: 'developNumber',
  },
  {
    title: '提单人',
    dataIndex: 'developPhone',
  },
  {
    title: '订单来源',
    dataIndex: 'developNumber',
  },
  {
    title: '订单费用（元）',
    dataIndex: 'developPhone',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>详情</a>
        {/* <Divider type="vertical" />

        <a>用户控制平台</a>
                  <Divider type="vertical" />

        <a>详情</a> */}

      </span>
    ),
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

  const [searchValue, setSearchValue] = useState(
    { text1: 'id1', text2: 'id1', text3: '', text5: 'id1' }
  );
  const onSearch = (data) => {
    console.log(data)
  }

  return (
    <div className={commomStyles.IceContainer}>
      {/* <Button onClick={()=>{ setSearchValue({text2: searchValue.text2 + 'default' })}}> test Effect </Button>  */}
      {/* <PageTitle title="订单列表" /> */}
      <SearchLine
        type='search'
        value={searchValue}
        searchList={searchList}
        onSubmit={onSearch}
      />
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

