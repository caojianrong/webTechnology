import React from 'react';
import { Form, Input, Select, Button, Upload, Icon } from '@wocloud/design';

import styles from './index.module.less';

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

const formData = [
  {
    key: 1,
    name: 'productMain',
    label: '产品大类',
    initialValue: 0,
    required: true,
    component: (
      <Select>
        <Select.Option value="0">基础产品</Select.Option>
        <Select.Option value="1">应用产品</Select.Option>
        <Select.Option value="2">安全产品</Select.Option>
      </Select>
    ),
  },
  {
    key: 2,
    name: 'productSmall',
    label: '产品小类',
    required: true,
    initialValue: 0,
    component: (
      <Select>
        <Select.Option value="0">计算</Select.Option>
        <Select.Option value="1">存储</Select.Option>
        <Select.Option value="2">网络</Select.Option>
      </Select>
    ),
  },
  {
    key: 3,
    name: 'productName',
    label: '产品名称',
    required: true,
    initialValue: '',
    component: <Input placeholder="请输入产品名称" />,
  },
  {
    key: 4,
    name: 'wocloud',
    label: '云商',
    required: true,
    initialValue: 0,
    component: (
      <Select>
        <Select.Option value="0">沃云</Select.Option>
      </Select>
    ),
  },
  {
    key: 5,
    name: 'detail',
    label: '产品介绍',
    required: false,
    initialValue: 0,
    component: <Input.TextArea rows={4} />,
  },
  {
    key: 6,
    name: 'msg',
    label: '产品说明',
    required: false,
    initialValue: 0,
    extra: '支持扩展名：.rar .zip .doc .docx .pdf .jpg...',
    component: (
      <Upload>
        <Button>
          <Icon type="upload" /> 上传文件
        </Button>
      </Upload>
    ),
  },
];

const ProductCategory = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <div className={styles.wrapperConfig}>
      <Form {...formItemLayout}>
        {(formData || []).map(item => (
          <Form.Item
            className={styles.formItem}
            label={item.label}
            key={item.key}
            extra={item.extra}
          >
            {getFieldDecorator(item.name, {
              initialValue: item.initialValue,
              rules: [{ required: item.required }],
            })(item.component)}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default Form.create()(ProductCategory);
