import React from 'react';
import { Transfer, Table, Form, Select, Button, Input } from 'antd';

import styles from './index.module.less';

const treeData = [
  {
    key: 1,
    title: 'dasfda1',
    description: '1111',
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const columns = [
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
    title: '型号',
    dataIndex: 'model',
  },
  {
    title: '架构',
    dataIndex: 'framework',
  },
  {
    title: '区域',
    dataIndex: 'area',
  },
  {
    title: '可用区',
    dataIndex: 'usableArea',
  },
  {
    title: '创建时间',
    sorter: (a, b) => a.age - b.age,
    dataIndex: 'creationTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => (
      <span>
        <a>删除</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    instanceId: 'i-8vbdvvvp9su27ykfoopc',
    productName: '云主机',
    instanceNorms: '1核1G',
    countType: '包年包月',
    countUnit: '年',
    price: '100',
    model: '默认',
    framework: '默认',
    area: '海口、西宁',
    usableArea: '海口一区',
    creationTime: '2016-09-21  08:50:08',
  },
  {
    key: '2',
    instanceId: 'i-8vbdvvvp9su27ykfoopc',
    productName: '云主机',
    instanceNorms: '1核1G',
    countType: '包年包月',
    countUnit: '年',
    price: '100',
    model: '默认',
    framework: '默认',
    area: '海口、西宁',
    usableArea: '海口一区',
    creationTime: '2016-09-21  08:50:08',
  },
];

const CountCreate = [
  {
    key: 1,
    label: '实例规格组合',
    required: true,
    component: (
      <Transfer
        titles={['属性表', '已选列表']}
        operations={['选择', '删除']}
        dataSource={treeData}
        targetKeys={[]}
        render={item => item.title}
      />
    ),
  },
  {
    key: 2,
    label: '计费类型',
    required: true,
    initialValue: '1',
    component: (
      <Select>
        <Select.Option value="1">包年包月</Select.Option>
        <Select.Option value="2">按量</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '计费单位',
    required: true,
    initialValue: '1',
    component: (
      <Select>
        <Select.Option value="1">年</Select.Option>
        <Select.Option value="2">月</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '输入价格',
    required: true,
    component: <Input placeholder="请输入价格" />,
  },
  {
    key: 3,
    label: '实例类型',
    required: true,
    initialValue: '1',
    component: (
      <Select>
        <Select.Option value="1">标准型</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '型号',
    required: true,
    initialValue: '1',
    component: (
      <Select>
        <Select.Option value="1">默认</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '架构',
    initialValue: '1',
    required: true,
    component: (
      <Select>
        <Select.Option value="1">默认</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    label: '地域/可用区',
    required: true,
    initialValue: '1',
    component: (
      <Select>
        <Select.Option value="1">年</Select.Option>
      </Select>
    ),
  },
];

const SaleRuleConfigPage = props => {
  return (
    <div className={styles.saleWrapper}>
      <div className={styles.formWrapper}>
        <Form {...formItemLayout}>
          {CountCreate.map(item => (
            <Form.Item label={item.label} key={item.key}>
              {props.form.getFieldDecorator(item.label, {
                rules: [
                  {
                    required: item.required,
                    initialValue: item.initialValue,
                  },
                ],
              })(item.component)}
            </Form.Item>
          ))}
          <div className={styles.saleBtnGroup}>
            <Button type="primary">添加至列表</Button>
            <Button className={styles.saleBtnSpace}>重置</Button>
          </div>
        </Form>
      </div>
      <div className={styles.tableWrapper}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

const SaleRuleConfig = Form.create()(SaleRuleConfigPage);
export default SaleRuleConfig;
