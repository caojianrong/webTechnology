import React, { useState, useEffect } from 'react';
import { Select, Input, Button} from '@wocloud/design';
import { Link } from 'react-router-dom';
import { SearchComponent, ListComponent ,Breadcrumb} from '../../components';
import styles from './index.module.less';
import stores from '../../stores';
const { Option } = Select;

const search = [
  {
    key: 1,
    label: '数据中心',
    attribute:'residence',
    component: <Select placeholder="请选择数据中心" className={styles.inputSearchWidth}>
      <Option value="china">全部</Option>
      <Option value="usa">北京</Option>
      <Option value="usa1">上海</Option>
    </Select>,
  },
  {
    key: 2,
    label: '登录账号',
    attribute:'pay-type',
    component: <Input placeholder="请输入登录账号" className={styles.inputSearchWidth}/>,
  },
  {
    key: 3,
    label: '客户名称',
    attribute:'account-name',
    component: <Input placeholder="请输入客户名称" className={styles.inputSearchWidth}/>,
  },
  {
    key: 4,
    label: '客户类型',
    attribute:'bank-account',
    component: <Input placeholder="请输入请输入客户名称" className={styles.inputSearchWidth}/>,
  },
];
const columns = [
  {
    title: '序号',
    dataIndex: 'number',
  },
  {
    title: '登录账户',
    dataIndex: 'account',
  },
  {
    title: '客户名称',
    dataIndex: 'name',
  },
  {
    title: '客户类型 ',
    dataIndex: 'type',
  },
  {
    title: '数据中心 ',
    dataIndex: 'dataCenter',
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
            pathname: '/quota/check',
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
    name: '配额管理',
  },
];
const scroll ={
  y: 450
};
const quota =(
  <div >
    <Link
      to={{
        pathname: '/quota/setting',
        search: '?id=',
        hash: '#the-hash',
        state: { fromDashboard: true },
      }}
    >
      <Button type="primary" >配额设置</Button>
    </Link>
    <Link
      to={{
        pathname: '/quota/center',
        search: '?id=',
        hash: '#the-hash',
        state: { fromDashboard: true },
      }}
    >
      <Button type="primary" >数据中心设置</Button>

    </Link>
  </div>
);

const userInformation = props => {
  const [searchData, setSearchData] = useState({});
  const attributeStore = stores.useStore('quotaAttribute');
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
        pathname={'/customer/edit'}
        quota={quota}
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

export default userInformation;

