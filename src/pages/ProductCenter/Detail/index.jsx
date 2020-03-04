import React, { useEffect } from 'react';
import { Table } from '@/components';
import { Breadcrumb } from '../components';
import stores from '../stores';
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
    title: '创建时间',
    dataIndex: 'creationTime',
    sorter: true,
  },
];

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
    name: '详情',
  },
];

const ProductDetail = props => {
  // store初始化
  const upperAndLowerStore = stores.useStore('upperAndLower');
  const productDetailStore = stores.useStore('productDetail');
  const {
    upperAndLowerList,
    current,
    totol,
    loading,
    getUpperAndLowerList,
  } = upperAndLowerStore;
  const { detail, getProductDetail } = productDetailStore;

  // 生命周期
  useEffect(() => {
    getUpperAndLowerList();
    getProductDetail();
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
        <div className={styles.infoBox}>
          <h5>产品信息</h5>
          <ul className={styles.detailBox}>
            {(detail || []).map((item, i) => (
              <li className={styles.detailItem} key={i}>
                <span className={styles.itemName}>{`${item.name}:`}</span>
                <span className={styles.itemContent}>{item.content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoBox}>
          <h5>销售策略</h5>
          <Table
            className={styles.table}
            loading={loading}
            columns={columnsTable}
            dataSource={upperAndLowerList}
            onChange={onTimeChange}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
