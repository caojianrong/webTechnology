import React, { useState, useEffect } from 'react';
import { Table, Divider, Tabs, Form, Select, Input, Button, Card } from '@wocloud/design';
import { Link } from 'react-router-dom';
// import { request } from '@wocloud/utils';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import SearchLine from '@/components/SearchLine';

import { data } from '../mock';

// import styles from './index.module.scss';
const { TabPane } = Tabs;
const { Option } = Select;

const searchList = [
  {
    type: 'text',
    id: 'productName',
    label: '产品名称',
  },
  {
    type: 'text',
    id: 'supplierName',
    label: '服务商名称'
  },
  {
    type: 'select',
    id: 'orderType',
    label: '订单类型',
    optionList: [
      {
        id: '',
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
    id: 'orderId',
    label: '订单编号'
  },
  {
    type: 'text',
    id: 'serialNumber',
    label: '用户账号'
  },
  {
    type: 'select',
    id: 'suppState',
    label: '服务商确认结果',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 0,
        value: '待处理'
      },
      {
        id: 1,
        value: '确认'
      },
      {
        id: 2,
        value: '疑问'
      },
    ]
  },
  {
    type: 'dateRange',
    id: 'date', // billStartDate billEndDate
    label: '消费时间'
  },
  {
    type: 'select',
    id: 'woclState1', // TODO
    label: '账单来源',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 0,
        value: '云径'
      },
      {
        id: 1,
        value: '云策'
      },
      {
        id: 2,
        value: '政企中台'
      },
      {
        id: 3,
        value: '合营云'
      },
    ]
  },
  {
    type: 'select',
    id: 'woclState',
    label: '云市场一级审核员确认状态',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 0,
        value: '待处理'
      },
      {
        id: 1,
        value: '确认'
      },
      {
        id: 2,
        value: '疑问'
      },
    ]
  },
]

const columns = [
  {
    title: '月份',
    dataIndex: 'monthId',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'provinceCode',
    dataIndex: 'provinceCode',
  },
  {
    title: '省份',
    dataIndex: 'provinceName',
  },
  {
    title: 'eparchyCode',
    dataIndex: 'cityCode',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
  },
  {
    title: '发展人编码',
    dataIndex: 'developerStaffId',
  },
  {
    title: '发展人',
    dataIndex: 'developerStaffName',
  },
  {
    title: '客户名称',
    dataIndex: 'custName',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '用户账号',
    dataIndex: 'serialNumber',
  },
  {
    title: '消费时间',
    dataIndex: 'billDateStr', // TODO
  },
  {
    title: '消费类型',
    dataIndex: 'userPayType',
  },
  {
    title: '订单类型',
    dataIndex: 'billTypeName',
  },
  {
    title: '订单编码',
    dataIndex: 'orderId',
  },
  {
    title: '产品',
    dataIndex: 'productName',
  },

  {
    title: '产品id',
    dataIndex: 'productId',
  },
  {
    title: '服务开始时间',
    dataIndex: 'openDateStr',
  },
  {
    title: '服务结束时间',
    dataIndex: 'expiredDateStr',
  },
  {
    title: '服务时长',
    dataIndex: 'period',
  },
  {
    title: '实例id',
    dataIndex: 'instanceId',
  },
  {
    title: '订购数量',
    dataIndex: 'commCount',
  },
  {
    title: '原价（元）',
    dataIndex: 'originalPrice',
  },
  {
    title: '订单金额（元）',
    dataIndex: 'commPrice',
  },
  {
    title: '订购折扣（%）',
    dataIndex: 'discountRatio',
  },
  {
    title: '结算比例（%）',
    dataIndex: 'settlementRatio',
  },
  {
    title: '服务商名称',
    dataIndex: 'supplierName',
  },
  {
    title: '服务商电话',
    dataIndex: 'supplierPhone',
  },
  {
    title: '云市场一级审核员确认状态',
    dataIndex: 'woclState',
  },
  {
    title: '服务商确认状态',
    dataIndex: 'suppState',
  },

];
// const data = [
//   {
//     key: '1',
//     address: '6456456345',
//     name: 'John Brown',
//     number: '云主机ECS',
//     type: '新购',
//     developer: '完成',
//     developNumber: '预付费',
//     developPhone: '客户经理',
//     time: '2019-02-08',
//   },
//   {
//     key: '2',
//     address: '6456456356',
//     name: 'John Brown',
//     number: '云主机ECS',
//     type: '新购',
//     developer: '完成',
//     developNumber: '预付费',
//     developPhone: '客户经理',
//     time: '2019-02-08',
//   },
//   {
//     key: '3',
//     address: '6456456388',
//     name: 'John Brown',
//     number: '云主机ECS',
//     type: '新购',
//     developer: '完成',
//     developNumber: '预付费',
//     developPhone: '客户',
//     time: '2019-02-08',
//   },
//   {
//     key: '4',
//     address: '6456456354',
//     name: 'John Brown',
//     number: '云主机ECS',
//     type: '升起',
//     developer: '完成',
//     developNumber: '预付费',
//     developPhone: '客户',
//     time: '2019-02-08',
//   },
//   {
//     key: '5',
//     address: '6456456387',
//     name: 'John Brown',
//     number: '云主机ECS',
//     type: '新购',
//     developer: '完成',
//     developNumber: '后付费',
//     developPhone: '客户经理',
//     time: '2019-02-08',
//   },
// ];

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

export default function BillManagement() {

  const [searchValue, setSearchValue] = useState({ 
    orderType: '',
    suppState: '',
    woclState: '',
  });
  const onSearch = (data) => {
    console.log(data)
  }

  return (
    <div className={commomStyles.IceContainer}>
      {/* <Button onClick={()=>{ setSearchValue({text2: searchValue.text2 + 'default' })}}> test Effect </Button>  */}
      <PageTitle title="账单查询" />
      <SearchLine value={searchValue} searchList={searchList} onSubmit={onSearch} />
      <Table
        scroll={{ x: 3500 }}
        rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

