import React, { useState, useEffect } from 'react';
import { Divider, Select, Input,Cascader} from '@wocloud/design';
import { Link } from 'react-router-dom';
import {Breadcrumb, SearchComponent, ListComponent } from '../../components';
import residences from  '@/common/area';
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
    title: '业务号码',
    dataIndex: 'number',
  },
  {
    title: '云业务类型',
    dataIndex: 'type',
  },
  {
    title: '发展人',
    dataIndex: 'developer',
  },
  {
    title: '发展人编码',
    dataIndex: 'developNumber',
  },
  {
    title: '发展人电话',
    dataIndex: 'developPhone',
  },
  {
    title: '创建时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    key: 'action',
    width:220,
    render: (text, record) => (
      <span>
          <Link
            to={{
              pathname: '/user/edit',
              search: '?id=' + record.key,
              hash: '#the-hash',
              state: {fromDashboard: true},
            }}
          >修改
        </Link>
        <Divider type="vertical" />

        <a>用户控制平台</a>
        <Divider type="vertical"/>
        <Link
          to={{
            pathname: '/user/check',
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

// export default function userInformation() {
const userInformation = props => {
  const [searchData, setSearchData] = useState({});
  const attributeStore = stores.useStore('userAttribute');
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
      component: <Select placeholder="请选择客户类型"  className={styles.inputSearchWidth}>
        <Option value="china">全部</Option>
        <Option value="usa">大客户</Option>
        <Option value="usa1">小客户</Option>
      </Select>,
    },
    {
      key: 3,
      label: '客户名称',
      attribute:'pay-type',
      component: <Input placeholder="请输入客户名称"  className={styles.inputSearchWidth}/>,
    },
    {
      key: 4,
      label: '业务号码',
      attribute:'account-name',
      component:
        <Input placeholder="请输入业务号码" className={styles.inputSearchWidth}/>,
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
        pathname={'/user/edit'}
        loading={loading}
        data={attributeList}
        onChange={onTimeChange}
        pagination={pagination}
      />

    </div>
  );
};
export default  userInformation;
