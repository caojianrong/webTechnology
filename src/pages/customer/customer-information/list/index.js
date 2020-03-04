import React, { useState, useEffect } from 'react';
import { Divider, Select, Input, Cascader} from '@wocloud/design';
import { Link } from 'react-router-dom';
import residences from  '@/common/area';
import {Breadcrumb, SearchComponent, ListComponent } from '../../components';
import styles from './index.module.less';
import stores from '../../stores';
const { Option } = Select;

const columns = [
  {
    title: '地址',
    dataIndex: 'address',
    render: text => <a>{text}</a>,
  },
  {
    title: '客户名称',
    dataIndex: 'name',
  },
  {
    title: '客户类型',
    dataIndex: 'type',
  },
  {
    title: '认证状态',
    dataIndex: 'status',
  },
  {
    title: '客户来源',
    dataIndex: 'source',
  },
  {
    title: '创建时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
         <Link
           to={{
             pathname: '/customer/edit',
             search: '?id=' + record.key,
             hash: '#the-hash',
             state: {fromDashboard: true},
           }}
         >修改
        </Link>
        <Divider type="vertical"/>
        <Link
          to={{
            pathname: '/customer/check',
            search: '?id=' + record.key,
            hash: '#the-hash',
            state: {fromDashboard: true},
          }}
        >
        360画像
        </Link>
      </span>
    ),
  },

];
const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '客户资料管理',
  },
];

const scroll ={
   y: 450
};
const customerInformation = props => {
  const [searchData, setSearchData] = useState({});
  const attributeStore = stores.useStore('customerAttribute');
  const {
    attributeList,
    current,
    totol,
    loading,
    getAttributeList,
  } = attributeStore;
  const search = [
    {
      key: 1,
      label: '地址',
      attribute:'residence',
      component:
        <Cascader options={residences} placeholder="请选择地址" className={styles.inputSearchWidth}/>,
    },
    {
      key: 2,
      label: '客户类型',
      attribute:'residence',
      component: <Select placeholder="请选择客户类型" className={styles.inputSearchWidth}>
        <Option value="china">全部</Option>
        <Option value="usa">大客户</Option>
        <Option value="usa1">小客户</Option>
      </Select>,
    },
    {
      key: 3,
      label: '客户名称',
      attribute:'pay-type',
      component: <Input placeholder="请输入客户名称"/>,
    },
    {
      key: 4,
      label: '行业类型',
      attribute:'account-name',
      component:
        <Select placeholder="请选择客户类型" className={styles.inputSearchWidth}>
          <Option value="china">全部</Option>
          <Option value="usa">金融</Option>
          <Option value="usa1">医疗</Option>
        </Select>,
    },

  ];

  // 生命周期
  useEffect(() => {
    getAttributeList();
  }, []);

  const submit =  (value)=>{
    console.log('查询表单数据', value);
    setSearchData(value);
    getAttributeList(value);
  };
  const clear =  ()=>{
    console.log(12);
    getAttributeList();
  };
  // 分页，过滤，筛选变化函数
  const onTimeChange = (page, filter, sorter) => {
    // 分页信息
    console.log(page);
    // 过滤信息
    console.log(filter);
    // 筛选信息
    console.log(sorter);
    // 页面数据并入searchData中
    getAttributeList(searchData);
  };

  const pagination = {
    defaultCurrent: current,
    total: totol,
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <SearchComponent  submit={submit}  clear={clear} search={search}  />
      <ListComponent
        columns={columns}
        scroll={scroll}
        pathname={'/customer/edit'}
        loading={loading}
        data={attributeList}
        onChange={onTimeChange}
        pagination={pagination}
      />
    </div>
  );
};

export default customerInformation;

