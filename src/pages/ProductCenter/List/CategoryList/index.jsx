import React, { useState, useEffect } from 'react';
import { Input, Divider, Select, Modal } from '@/components';
import { Link } from 'react-router-dom';
import { Breadcrumb, SearchComponent, ListComponent } from '../../components';
import stores from '../../stores';
import styles from './index.module.less';

const search = [
  {
    key: 1,
    label: '产品大类',
    initialValue: '1',
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
    label: '产品小类',
    component: <Input placeholder="支持模糊查询" />,
  },
];

const breadcrumbName = [
  {
    key: 1,
    name: '产品中心',
  },
  {
    key: 2,
    name: '产品类别管理',
  },
];

// 列表表头数据
const columnsTable = [
  {
    title: '类别编码',
    dataIndex: 'categoryCode',
  },
  {
    title: '产品大类',
    dataIndex: 'productLargeClass',
  },
  {
    title: '产品小类',
    dataIndex: 'productSmallClass',
  },
  {
    title: '描述',
    dataIndex: 'describe',
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

const CategoryList = () => {
  // 页面State
  const [searchData, setSearchData] = useState({});
  const [columns, setColumns] = useState(columnsTable);

  // store初始化
  const categoryStore = stores.useStore('productCategory');
  const {
    categoryList,
    current,
    totol,
    loading,
    getCategoryList,
    deleteCategory,
  } = categoryStore;

  // 生命周期
  useEffect(() => {
    getCategoryList();
    const nColumns = columnsTable.map(item => {
      if (item.dataIndex === 'operation') {
        return {
          ...item,
          render: (v, data) => (
            <span>
              <Link to={`/product/create-category/${data.categoryCode}`}>
                修改
              </Link>
              <Divider type="vertical" />
              <a onClick={() => deleteCategoryFn(v, data)}>删除</a>
            </span>
          ),
        };
      } else {
        return { ...item };
      }
    });
    setColumns(nColumns);
  }, []);

  // 列表删除函数
  const deleteCategoryFn = (v, data) => {
    Modal.confirm({
      centered: true,
      title: '确认要删除选中的产品类别吗？',
      content: ' ',
      okText: '确认删除',
      cancelText: '取消',
      onOk: () => deleteCategory(data.categoryCode),
    });
  };

  // 根据查询数据查询列表
  const onSubmit = value => {
    console.log('查询表单数据', value);
    setSearchData(value);
    getCategoryList(value);
  };

  // 重置查询数据
  const onReset = () => {
    getCategoryList();
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
    getCategoryList(searchData);
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
        data={categoryList}
        onChange={onTimeChange}
        pagination={pagination}
        router={'/product/create-category'}
      />
    </div>
  );
};

export default CategoryList;
