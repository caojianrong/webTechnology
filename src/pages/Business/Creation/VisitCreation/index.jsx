import React from 'react';
import { Form, Input, Button, DatePicker } from '@/components';
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
    label: '拜访日期',
    required: true,
    name: 'visitTime',
    initialValue: '',
    component: <DatePicker showTime />,
  },
  {
    key: 2,
    label: '拜访人',
    required: true,
    name: 'visiter',
    initialValue: '',
    component: <Input />,
  },
  {
    key: 3,
    label: '拜访人职位',
    required: true,
    name: 'visiterJob',
    initialValue: '',
    component: <Input />,
  },
  {
    key: 4,
    label: '拜访人联系方式',
    required: true,
    name: 'visiterPhone',
    initialValue: '',
    component: <Input />,
  },
  {
    key: 5,
    label: '客户经理',
    required: true,
    name: 'accountManager',
    initialValue: '',
    component: <Input />,
  },
  {
    key: 6,
    label: '陪同人',
    required: true,
    name: 'companions',
    initialValue: '',
    component: <Input />,
  },
  {
    key: 7,
    label: '沟通事项',
    required: true,
    name: 'communicate',
    initialValue: '',
    component: <Input.TextArea rows={4} />,
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
  {
    key: 4,
    name: '拜访记录创建',
  },
];

const VisitCreation = ({ form }) => {
  const { getFieldDecorator } = form;

  // store初始化
  const visitCreationStore = stores.useStore('visitCreation');
  const { createVisit } = visitCreationStore;

  // 创建
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createVisit(values);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>拜访记录创建</h5>
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

export default Form.create()(VisitCreation);
