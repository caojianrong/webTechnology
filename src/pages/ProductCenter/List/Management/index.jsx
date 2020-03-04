import React, { useState, useEffect } from 'react';
import { Select, Modal, Input } from '@/components';
import { Link } from 'react-router-dom';
import { Breadcrumb, SearchComponent, ListComponent } from '../../components';
import Operation from './Operation';
import stores from '../../stores';
import styles from './index.module.less';

const columnsTable = [
  {
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    title: '云商',
    dataIndex: 'cloudTraded',
  },
  {
    title: '产品大类',
    dataIndex: 'productLargeClass',
  },
  {
    title: '产品主类',
    dataIndex: 'productMainClass',
  },
  {
    title: '产品编码',
    dataIndex: 'productCode',
  },
  {
    title: '状态',
    dataIndex: 'status',
    sorter: true,
  },
  {
    title: '版本号',
    dataIndex: 'version',
  },
  {
    title: '创建时间',
    dataIndex: 'CreationTime',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

const search = [
  {
    key: 1,
    label: '产品大类',
    component: (
      <Select className={styles.inputSearchWidth}>
        <Select.Option value="1">全部</Select.Option>
        <Select.Option value="2">基础产品</Select.Option>
        <Select.Option value="3">安全产品</Select.Option>
        <Select.Option value="4">应用产品</Select.Option>
      </Select>
    ),
  },
  {
    key: 2,
    label: '类别名称',
    component: <Input placeholder="类别名称" />,
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
];

const ProductManagement = () => {
  // 页面State
  const [searchData, setSearchData] = useState({});
  const [columns, setColumns] = useState(columnsTable);

  // store初始化
  const productStore = stores.useStore('productManagement');
  const {
    productList,
    current,
    totol,
    loading,
    getProductList,
    deleteProducty,
  } = productStore;

  // 生命周期
  useEffect(() => {
    getProductList();
    const nColumns = columnsTable.map(item => {
      if (item.dataIndex === 'operation') {
        return {
          ...item,
          render: (v, data) => (
            <Operation
              key={item.key}
              {...data}
              deleteFn={() => deleteProductyFn(v, data)}
            />
          ),
        };
      } else if (item.dataIndex === 'productName') {
        return {
          ...item,
          render: (text, data) => (
            <Link key={item.key} to={`/product/detail/${data.key}`}>
              {text}
            </Link>
          ),
        };
      } else {
        return { ...item };
      }
    });
    setColumns(nColumns);
  }, []);

  // 列表删除函数
  const deleteProductyFn = (v, data) => {
    Modal.confirm({
      centered: true,
      title: '确认要删除选中的产品类别吗？',
      content: ' ',
      okText: '确认删除',
      cancelText: '取消',
      onOk: () => deleteProducty(data.key),
    });
  };
  // 根据查询数据查询列表
  const onSubmit = value => {
    console.log('查询表单数据', value);
    setSearchData(value);
    getProductList(value);
  };

  // 重置查询数据
  const onReset = () => {
    getProductList();
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
    getProductList(searchData);
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
        columns={columns}
        data={productList}
        onChange={onTimeChange}
        pagination={pagination}
        router={'/product/config'}
      />
    </div>
  );
};

export default ProductManagement;
