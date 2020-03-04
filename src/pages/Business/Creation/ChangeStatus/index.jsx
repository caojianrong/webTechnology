import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Upload, Icon } from '@/components';
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
    name: '商机状态变更',
  },
];

const ChangeStatus = ({ form, match }) => {
  const { getFieldDecorator } = form;

  // store初始化
  const changeStatusStore = stores.useStore('changeStatus');
  const { data, createChangeStatus, getChangeStatus } = changeStatusStore;

  useEffect(() => {
    getChangeStatus(match.params.id);
  }, []);

  const formData = [
    {
      key: 1,
      label: '商机名称',
      required: false,
      name: 'businessName',
      initialValue: '',
      component: <span>{data.businessName ? data.businessName : null}</span>,
    },
    {
      key: 2,
      label: '客户名称',
      required: false,
      name: 'customerName',
      initialValue: '',
      component: <span>{data.customerName ? data.customerName : null}</span>,
    },
    {
      key: 3,
      label: '商机状态',
      required: false,
      name: 'businessType',
      initialValue: '',
      component: <span>{data.businessType ? data.businessType : null}</span>,
    },
    {
      key: 4,
      label: '变更状态',
      required: true,
      name: 'changeStatus',
      initialValue: '',
      component: (
        <Select>
          <Select.Option value="0">已中标</Select.Option>
          <Select.Option value="1">合同签署</Select.Option>
          <Select.Option value="2">商机流失</Select.Option>
        </Select>
      ),
    },
    {
      key: 5,
      label: '说明',
      required: false,
      name: 'msg',
      initialValue: '',
      component: <Input.TextArea rows={4} />,
    },
    {
      key: 6,
      name: 'enclosure',
      label: '上传附件',
      required: false,
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

  // 创建
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createChangeStatus(values);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>商机状态变更</h5>
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

export default Form.create()(ChangeStatus);
