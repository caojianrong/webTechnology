import React from 'react';
import { Form, Input, Radio, DatePicker, TimePicker } from '@/components';

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
    required: false,
    label: '产品名称',
    initialValue: '',
    name: 'name',
    component: <span>云主机ECS</span>,
  },
  {
    key: 2,
    required: false,
    label: '版本',
    initialValue: '',
    name: 'version',
    component: <Input />,
  },
  {
    key: 3,
    required: true,
    label: '产品生效日期',
    initialValue: '',
    name: 'productShowTime',
    component: <DatePicker />,
  },
  {
    key: 4,
    required: true,
    label: '发布选项',
    initialValue: '',
    name: 'releaseItem',
    component: (
      <Radio.Group>
        <Radio value={1}>立即发布</Radio>
        <Radio value={2}>定时发布</Radio>
      </Radio.Group>
    ),
  },
  {
    key: 5,
    required: true,
    label: '发布日期',
    initialValue: '',
    name: 'showTime',
    component: (
      <div>
        <DatePicker />
        <TimePicker className={styles.timePicker} disabled />
      </div>
    ),
  },
  {
    key: 6,
    required: true,
    label: '是否定时下架',
    initialValue: '',
    name: 'isUpper',
    component: (
      <Radio.Group>
        <Radio value={1}>否</Radio>
        <Radio value={2}>是</Radio>
      </Radio.Group>
    ),
  },
  {
    key: 7,
    required: true,
    label: '下架日期',
    initialValue: '',
    name: 'upperTime',
    component: (
      <div>
        <DatePicker />
        <TimePicker className={styles.timePicker} disabled />
      </div>
    ),
  },
  {
    key: 8,
    required: false,
    label: '备注',
    initialValue: '',
    name: 'msg',
    component: <Input.TextArea rows={4} />,
  },
];
const ApplyRelease = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <div className={styles.wrapperConfig}>
      <Form {...formItemLayout}>
        {(formData || []).map(item => (
          <Form.Item
            className={styles.formItem}
            label={item.label}
            key={item.key}
          >
            {getFieldDecorator(item.name, {
              rules: [{ required: item.required }],
            })(item.component)}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default Form.create()(ApplyRelease);
