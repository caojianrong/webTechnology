import React, { useState, useEffect } from 'react';
import { Input, DatePicker } from '@/components';
import { Breadcrumb, SearchComponent, ListComponent } from '../../components';
import moment from 'moment';
import stores from '../../stores';
import styles from './index.module.less';

const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
  },
  {
    title: '属性名称',
    dataIndex: 'attributeName',
  },
  {
    title: '属性编码',
    dataIndex: 'attributeCode',
  },
  {
    title: '属性单位',
    dataIndex: 'attributeUnit',
  },
  {
    title: '属性类型',
    dataIndex: 'attributeType',
  },
  {
    title: '内容',
    dataIndex: 'content',
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
    name: '产品属性管理',
  },
];

const AttributeList = () => {
  // 页面State
  const [searchData, setSearchData] = useState({});
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  // store初始化
  const attributeStore = stores.useStore('productAttribute');
  const {
    attributeList,
    current,
    totol,
    loading,
    getAttributeList,
  } = attributeStore;

  const disabledStartDate = startValue => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  const onChange = (field, value) => {
    if (field === 'startValue') {
      setStartValue(value);
    } else {
      setEndValue(value);
    }
  };

  const onStartChange = value => {
    onChange('startValue', value);
  };

  const onEndChange = value => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };

  const search = [
    {
      key: 1,
      label: '属性名称',
      component: <Input placeholder="支持模糊查询" />,
    },
    {
      key: 2,
      label: '属性编码',
      component: <Input placeholder="支持模糊查询" />,
    },
    {
      key: 3,
      label: '创建时间',
      component: (
        <div>
          <DatePicker
            disabledDate={disabledStartDate}
            format="YYYY-MM-DD"
            value={startValue}
            placeholder="开始时间"
            onChange={onStartChange}
            onOpenChange={handleStartOpenChange}
          />
          <span className={styles.datePickerRangeSpan}>至</span>
          <DatePicker
            disabledDate={disabledEndDate}
            format="YYYY-MM-DD"
            value={endValue}
            placeholder="结束时间"
            onChange={onEndChange}
            open={endOpen}
            onOpenChange={handleEndOpenChange}
          />
        </div>
      ),
    },
  ];

  // 生命周期
  useEffect(() => {
    getAttributeList();
  }, []);

  // 根据查询数据查询列表
  const onSubmit = value => {
    console.log('查询表单数据', value);
    console.log('时间开始', moment(startValue).format('YYYY-MM-DD'));
    console.log('时间结束', moment(endValue).format('YYYY-MM-DD'));
    setSearchData(value);
    getAttributeList(value);
  };

  // 重置查询数据
  const onReset = () => {
    setEndValue(null);
    setStartValue(null);
    setEndOpen(false);
    getAttributeList();
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
    getAttributeList(searchData);
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
        data={attributeList}
        onChange={onTimeChange}
        pagination={pagination}
        router={'/product/create-attribute'}
      />
    </div>
  );
};
export default AttributeList;
