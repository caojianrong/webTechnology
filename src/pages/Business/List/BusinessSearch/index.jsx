import React, { useState, useEffect } from 'react';
import { Input, Select, Divider, Button } from '@/components';
import { Link } from 'react-router-dom';
import { Breadcrumb, SearchComponent, ListComponent } from '../../components';
import stores from '../../stores';
import styles from './index.module.less';

const columnsTable = [
  {
    title: '商机编码',
    dataIndex: 'businessCode',
  },
  {
    title: '商机名称',
    dataIndex: 'businessName',
  },
  {
    title: '商机来源',
    dataIndex: 'businessSource',
  },
  {
    title: '来源省份',
    dataIndex: 'sourceArea',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
  },
  {
    title: '是否存量用户',
    dataIndex: 'isStock',
  },
  {
    title: '商机状态',
    dataIndex: 'businessStatus',
  },
  {
    title: '商机录入人',
    dataIndex: 'businessInput',
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

const breadcrumbName = [
  {
    key: 1,
    name: '商机管理',
  },
  {
    key: 2,
    name: '商机查询',
  },
];

const search = [
  {
    key: 1,
    label: '商机名称',
    component: <Input placeholder="支持模糊查询" />,
  },
  {
    key: 2,
    label: '商机来源',
    component: (
      <Select className={styles.inputSearchWidth}>
        <Select.Option value="1">集团内部客户</Select.Option>
        <Select.Option value="2">省份公司</Select.Option>
        <Select.Option value="3">安全产品</Select.Option>
        <Select.Option value="4">存量客户</Select.Option>
        <Select.Option value="5">新签外部客户</Select.Option>
        <Select.Option value="6">策反客户</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '来源省份',
    component: (
      <Select className={styles.inputSearchWidth}>
        <Select.Option value="1">云公司</Select.Option>
        <Select.Option value="2">山东</Select.Option>
      </Select>
    ),
  },
  {
    key: 4,
    label: '商机状态',
    component: (
      <Select className={styles.inputSearchWidth}>
        <Select.Option value="1">商机发布</Select.Option>
        <Select.Option value="2">评审通过</Select.Option>
        <Select.Option value="3">未通过商机评审</Select.Option>
        <Select.Option value="4">已中标</Select.Option>
        <Select.Option value="5">合同签署</Select.Option>
        <Select.Option value="6">商机流失</Select.Option>
      </Select>
    ),
  },
];

const BusinessSearch = () => {
  // 页面State
  const [searchData, setSearchData] = useState({});
  const [columns, setColumns] = useState(columnsTable);
  // store初始化
  const businessSearchStore = stores.useStore('businessSearch');
  const {
    businessList,
    current,
    totol,
    loading,
    getBusinessList,
  } = businessSearchStore;

  // 生命周期
  useEffect(() => {
    getBusinessList();
    const nColumns = columnsTable.map(item => {
      if (item.dataIndex === 'operation') {
        return {
          ...item,
          render: (v, data) => (
            <span>
              <Link to="">查看拜访记录</Link>
              <Divider type="vertical" />
              <Link to="">详情</Link>
            </span>
          ),
        };
      } else {
        return { ...item };
      }
    });
    setColumns(nColumns);
  }, []);

  // 根据查询数据查询列表
  const onSubmit = value => {
    console.log('查询表单数据', value);
    setSearchData(value);
    getBusinessList(value);
  };

  // 重置查询数据
  const onReset = () => {
    getBusinessList();
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
    getBusinessList(searchData);
  };

  const pagination = {
    defaultCurrent: current,
    total: totol,
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <SearchComponent search={search} onSubmit={onSubmit} onReset={onReset} />
      <ListComponent
        loading={loading}
        rightComponent={<Button>下载</Button>}
        columns={columns}
        data={businessList}
        onChange={onTimeChange}
        pagination={pagination}
      />
    </div>
  );
};
export default BusinessSearch;
