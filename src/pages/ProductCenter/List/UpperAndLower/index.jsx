import React, { useState, useEffect } from 'react';
import { Table } from '@/components';
import { Breadcrumb } from '../../components';
import stores from '../../stores';
import styles from './index.module.less';

const columnsTable = [
  {
    title: '实例ID',
    dataIndex: 'instanceId',
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    title: '实例规格',
    dataIndex: 'instanceNorms',
  },
  {
    title: '计费类型',
    dataIndex: 'countType',
  },
  {
    title: '计费单位',
    dataIndex: 'countUnit',
  },
  {
    title: '价格（元）',
    dataIndex: 'price',
  },
  {
    title: '实例类型',
    dataIndex: 'instanceType',
  },
  {
    title: '型号',
    dataIndex: 'model',
  },
  {
    title: '架构',
    dataIndex: 'framework',
  },
  {
    title: '地域',
    dataIndex: 'area',
  },
  {
    title: '可用区',
    dataIndex: 'useArea',
  },
  {
    title: '上架状态',
    dataIndex: 'upperStatus',
    sorter: true,
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

const Operation = props => (
  <span onClick={props.onClick}>
    {props.upperStatus === '上架' ? <a>下架申请</a> : <a>上架申请</a>}
  </span>
);

const breadcrumbName = [
  {
    key: 1,
    name: '产品中心',
  },
  {
    key: 2,
    name: '产品管理',
  },
  {
    key: 3,
    name: '上下架管理',
  },
];

const UpperAndLower = () => {
  const [columns, setColumns] = useState(columnsTable);
  // store初始化
  const upperAndLowerStore = stores.useStore('upperAndLower');
  const {
    upperAndLowerList,
    current,
    totol,
    item,
    loading,
    getUpperAndLowerList,
    changeStatus,
  } = upperAndLowerStore;

  // 生命周期
  useEffect(() => {
    getUpperAndLowerList();
    const nColumns = columnsTable.map(item => {
      if (item.dataIndex === 'operation') {
        return {
          ...item,
          render: (v, data) => (
            <Operation
              key={item.key}
              onClick={() => changeStatus(data.instanceId, data.upperStatus)}
              {...data}
            />
          ),
        };
      } else {
        return { ...item };
      }
    });
    setColumns(nColumns);
  }, []);
  // 分页，过滤，筛选变化函数
  const onTimeChange = (page, filter, sorter) => {
    // 分页信息
    console.log(page);
    // 过滤信息
    console.log(filter);
    // 筛选信息
    console.log(sorter);
    // 页面数据并入searchData中
    getProductList(searchData);
  };
  const pagination = {
    defaultCurrent: current,
    total: totol,
  };
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} back />
      <div className={styles.content}>
        <ul className={styles.detailWrapper}>
          {(item || []).map(item => (
            <li className={styles.detailItem} key={item.id}>
              <span className={styles.itemName}>{item.name}</span>:
              <span className={styles.itemContent}>{item.content}</span>
            </li>
          ))}
        </ul>
        <Table
          className={styles.table}
          loading={loading}
          columns={columns}
          dataSource={upperAndLowerList}
          onChange={onTimeChange}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default UpperAndLower;
