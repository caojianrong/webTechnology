import React, { useRef, useEffect } from 'react';
import { DatePicker, Cascader, Input } from '@/components';
import { TableFilter, StandardSelect } from '../components';
import stores from '../stores';

function CustomizedTableFilter(props) {
  const { onInit, ...restProps } = props;

  const formRef = useRef(null);

  const {
    regionTree,
    fetchRegionTree,
    workOrderTypeTree,
    fetchWorkOrderTypeTree,
    workOrderStatus,
  } = stores.useStore('config');

  const filterItems = [
    {
      label: '创建时间',
      field: 'creationTime',
      options: { initialValue: [] },
      component: <DatePicker.RangePicker style={{ width: 224 }} />,
    },
    {
      label: '省市',
      field: 'region',
      options: { initialValue: [] },
      component: (
        <Cascader
          style={{ width: 224 }}
          changeOnSelect
          expandTrigger="hover"
          options={regionTree}
        />
      ),
    },
    {
      label: '工单类型',
      field: 'workOrderType',
      options: { initialValue: [] },
      component: (
        <Cascader
          style={{ width: 224 }}
          changeOnSelect
          expandTrigger="hover"
          options={workOrderTypeTree}
        />
      ),
    },
    {
      label: '工单标题',
      field: 'workOrderTitle',
      options: { initialValue: '' },
      component: <Input style={{ width: 224 }} allowClear />,
    },
    {
      label: '工单编号',
      field: 'workOrderNumber',
      options: { initialValue: '' },
      component: <Input style={{ width: 224 }} allowClear />,
    },
    {
      label: '工单状态',
      field: 'workOrderStatus',
      options: { initialValue: '' },
      component: (
        <StandardSelect
          style={{ width: 224 }}
          allowClear
          options={workOrderStatus}
        />
      ),
    },
    {
      label: '发起人',
      field: 'initiator',
      options: { initialValue: '' },
      component: <Input style={{ width: 224 }} allowClear />,
    },
  ];

  // 初始化一些请求
  useEffect(() => {
    // 初始化完成后，可在此处再次设置表单项初始值
    Promise.all([fetchRegionTree(), fetchWorkOrderTypeTree()]).then(() => {
      const { form } = formRef.current.props;
      // form.setFieldsValue();
      onInit(form.getFieldsValue());
    });
  }, []);

  return (
    <TableFilter
      {...restProps}
      wrappedComponentRef={form => (formRef.current = form)}
      items={filterItems}
    />
  );
}

export default CustomizedTableFilter;
