import React from 'react';
import { Form, Input, Select, Button } from '@/components';
import { Breadcrumb } from '../../components';
import stores from '../../stores';
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
    label: '系统类型',
    required: true,
    name: 'systemType',
    initialValue: '',
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
    label: '产品小类',
    required: true,
    name: 'directoryName',
    initialValue: '',
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
    label: '属性名称',
    required: true,
    name: 'attributeName',
    initialValue: '',
    component: <Input placeholder="输入属性名称" />,
  },
  {
    key: 4,
    label: '计量单位',
    required: true,
    name: 'unit',
    initialValue: '',
    component: (
      <Select>
        <Select.Option value="0">核</Select.Option>
        <Select.Option value="1">G</Select.Option>
        <Select.Option value="2">GB</Select.Option>
        <Select.Option value="3">MB</Select.Option>
        <Select.Option value="4">无（个）</Select.Option>
      </Select>
    ),
  },
  {
    key: 5,
    label: '属性类型',
    required: true,
    name: 'attributeType',
    initialValue: '',
    component: (
      <Select>
        <Select.Option value="0">枚举</Select.Option>
        <Select.Option value="1">阶梯</Select.Option>
        <Select.Option value="2">输入</Select.Option>
      </Select>
    ),
  },
  {
    key: 6,
    label: '内容',
    required: false,
    name: 'content',
    initialValue: '',
    component: <Input.TextArea rows={4} />,
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
  {
    key: 3,
    name: '产品属性创建',
  },
];

const CreateAttribute = ({ form }) => {
  const { getFieldDecorator } = form;

  // store初始化
  const createAttribute = stores.useStore('createAttribute');
  const { createProductAttribute } = createAttribute;

  // 创建
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createProductAttribute(values);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>产品属性创建</h5>
        <div className={styles.formWrapper}>
          <Form {...formItemLayout}>
            {(formData || []).map(item => (
              <Form.Item
                label={item.label}
                key={item.key}
                className={styles.formItem}
              >
                {getFieldDecorator(item.name, {
                  rules: [{ required: item.required }],
                })(item.component)}
              </Form.Item>
            ))}
          </Form>
          <div className={styles.formBtns}>
            <Button type="primary" onClick={onSubmit}>
              创建
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(CreateAttribute);
