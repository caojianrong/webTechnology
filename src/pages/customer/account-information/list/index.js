import React, {useState, useEffect} from 'react';
import { Divider, Select, Input, Cascader} from '@wocloud/design';
import {Link} from 'react-router-dom';
import {Breadcrumb, SearchComponent, ListComponent } from '../../components';
import residences from '@/common/area';
import axios from "axios";
import {customer,mockData} from "@/mock/index"
import styles from './index.module.less';
import stores from '../../stores';
const {Option} = Select;

const columns = [
  {
    title: '地址',
    dataIndex: 'address',
    render: text => <a>{text}</a>,
  },
  {
    title: '账户名称',
    dataIndex: 'name',
  },
  {
    title: '账户标识',
    dataIndex: 'mark',
  },
  {
    title: '付费类型',
    dataIndex: 'type',
  },
  {
    title: '银行账户',
    dataIndex: 'account',
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
            pathname: '/account/edit',
            search: '?id=' + record.key,
            hash: '#the-hash',
            state: {fromDashboard: true},
          }}
        >修改
        </Link>
        <Divider type="vertical"/>
        <Link
          to={{
            pathname: '/account/check',
            search: '?id=' + record.key,
            hash: '#the-hash',
            state: {fromDashboard: true},
          }}
        >
        详情
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
    name: '账户资料管理',
  },
];
const scroll ={
  y: 450
};
const search = [
  {
    key: 1,
    label: '地址',
    attribute: 'residence',
    component:
      <Cascader options={residences} placeholder="请选择地址"/>,
  },

  {
    key: 2,
    label: '账户名称',
    attribute: 'pay-type',
    component: <Input placeholder="请输入账户名称"/>,
  },

  {
    key: 3,
    label: '账户标识',
    attribute: 'pay-type1',
    component: <Input placeholder="请输入账户标识"/>,
  },


];

const accountInformation = props => {
  const [searchData, setSearchData] = useState({});
  const attributeStore = stores.useStore('accountAttribute');
  const {
    attributeList,
    current,
    totol,
    loading,
    getAttributeList,
  } = attributeStore;
  // 生命周期
  useEffect(() => {
    mockApi();
    console.log('customer',customer);
    getAttributeList();
  }, []);
  const submit = (value) => {
    console.log('查询表单数据', value);
    setSearchData(value);
    getAttributeList(value);
  };
  const clear = () => {
    console.log(12);
    getAttributeList();
  };

  const mockApi= () =>{
    axios.get('/customer/mock', {dataType:'json'}) //这列的'/mock'与mock.js文件里的地址一致
      .then(res=>{
        console.log(res.data.userinfo);
        console.log('mockData',mockData)
      })
  };
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
        pathname={'/account/edit'}
        columns={columns}
        scroll={scroll}
        loading={loading}
        data={attributeList}
        onChange={onTimeChange}
        pagination={pagination}
      />
    </div>

  );
};
export default accountInformation;

