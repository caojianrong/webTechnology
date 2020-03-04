import React, { useState, useEffect } from 'react';
import { Select, Input,Cascader} from '@wocloud/design';
// import { Link } from 'react-router-dom';
import residences from  '@/common/area';
import { SearchComponent, ListComponent ,Breadcrumb} from '../../components';
import styles from './index.module.less';
import stores from '../../stores';

const { Option } = Select;
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
    label: '认证状态',
    attribute:'residence',
    component: <Select placeholder="请选择客户类型" className={styles.inputSearchWidth}>
      <Option value="china">全部</Option>
      <Option value="usa">已认证</Option>
      <Option value="usa1">未认证</Option>
    </Select>,
  },
  {
    key: 3,
    label: '客户名称',
    attribute:'pay-type',
    component: <Input placeholder="请输入客户名称" className={styles.inputSearchWidth}/>,
  },
  {
    key: 4,
    label: '客户来源',
    attribute:'account-name',
    component: <Select placeholder="请选择客户类型" className={styles.inputSearchWidth}>
      <Option value="china">云策</Option>
      <Option value="usa">云径</Option>
    </Select>,
  },

];
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
    title: '行业类型',
    dataIndex: 'industryType',
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
    title: '认证人',
    dataIndex: 'certifier',
  },
  {
    title: '认证时间',
    dataIndex: 'time',
  },


];
const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '实名认证查询',
  },
];
const scroll ={
  y: 450
};
const showVerified =true;

const verified = props => {
  const [searchData, setSearchData] = useState({});
  const attributeStore = stores.useStore('verifiedAttribute');
  const {
    attributeList,
    current,
    totol,
    loading,
    getAttributeList,
  } = attributeStore;
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
        quota={false}
        showVerified={showVerified}
        pathname={'/customer/edit'}
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
  export default  verified;
