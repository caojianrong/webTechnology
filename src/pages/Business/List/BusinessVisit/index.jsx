import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { Breadcrumb, ListComponent } from '../../components';
import stores from '../../stores';
import styles from './index.module.less';

const columnsTable = [
  {
    title: '序号',
    dataIndex: 'code',
  },
  {
    title: '拜访人',
    dataIndex: 'visiter',
  },
  {
    title: '拜访人职位',
    dataIndex: 'visiterJob',
  },
  {
    title: '拜访人联系方式',
    dataIndex: 'visiterPhone',
  },
  {
    title: '客户经理',
    dataIndex: 'accountManager',
  },
  {
    title: '陪同人',
    dataIndex: 'companions',
  },
  {
    title: '沟通事项',
    dataIndex: 'communicate',
  },
  {
    title: '拜访日期',
    dataIndex: 'visitTime',
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
    name: '我的商机',
  },
  {
    key: 3,
    name: '拜访记录',
  },
];

const BusinessVisit = () => {
  // 页面State
  const [columns, setColumns] = useState(columnsTable);
  // store初始化
  const businessVisitStore = stores.useStore('businessVisit');
  const {
    businessVisitList,
    current,
    totol,
    loading,
    getBusinessVisitList,
    deleteBusinessVisit,
  } = businessVisitStore;

  // 列表删除函数
  const deleteProductyFn = (v, data) => {
    Modal.confirm({
      centered: true,
      title: '确认要删除选中的拜访记录吗？',
      content: ' ',
      okText: '确认删除',
      cancelText: '取消',
      onOk: () => deleteBusinessVisit(data.key),
    });
  };
  // 生命周期
  useEffect(() => {
    getBusinessVisitList();
    const nColumns = columnsTable.map(item => {
      if (item.dataIndex === 'operation') {
        return {
          ...item,
          render: (v, data) => (
            <a onClick={() => deleteProductyFn(v, data)}>删除</a>
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
    getBusinessVisitList(searchData);
  };

  const pagination = {
    defaultCurrent: current,
    total: totol,
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <ListComponent
        loading={loading}
        columns={columns}
        data={businessVisitList}
        onChange={onTimeChange}
        pagination={pagination}
        router={'/business/visit-creation'}
      />
    </div>
  );
};
export default BusinessVisit;
