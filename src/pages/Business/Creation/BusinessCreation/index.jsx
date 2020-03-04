import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, DatePicker, Radio } from '@/components';
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

const BusinessCreation = ({ form, match }) => {
  // 初始化State等数据
  const { getFieldDecorator } = form;
  // store初始化
  const businessCreationStore = stores.useStore('businessCreation');
  const {
    result,
    data,
    createMyBusiness,
    getMyBusiness,
  } = businessCreationStore;

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
      name: `我的商机${match.params.id ? '修改' : '创建'}`,
    },
  ];
  const formData = [
    {
      key: 1,
      label: '商机名称',
      required: true,
      name: 'businessName',
      initialValue: data.businessName ? data.businessName : null,
      component: <Input placeholder="省+地市+项目名称" />,
    },
    {
      key: 2,
      label: '商机来源',
      required: true,
      name: 'businessSource',
      initialValue: data.businessSource ? data.businessSource : null,
      component: (
        <Select>
          <Select.Option value="0">集团内部客户</Select.Option>
          <Select.Option value="1">省份分公司</Select.Option>
        </Select>
      ),
    },
    {
      key: 3,
      label: '来源省份',
      required: true,
      name: 'sourceArea',
      initialValue: data.sourceArea ? data.sourceArea : null,
      component: (
        <Select>
          <Select.Option value="0">云公司</Select.Option>
          <Select.Option value="1">山东</Select.Option>
        </Select>
      ),
    },
    {
      key: 4,
      label: '商机所在地',
      required: true,
      name: 'location',
      initialValue: data.location ? data.location : null,
      component: (
        <div>
          <Select className={styles.twoflex}>
            <Select.Option value="0">山东</Select.Option>
          </Select>
          <Select className={styles.twoflexother}>
            <Select.Option value="0">济南</Select.Option>
          </Select>
        </div>
      ),
    },
    {
      key: 5,
      label: '业务类型',
      required: true,
      name: 'businessType',
      initialValue: data.businessType ? data.businessType : null,
      component: (
        <Select>
          <Select.Option value="0">IDC</Select.Option>
          <Select.Option value="1">公有云</Select.Option>
        </Select>
      ),
    },
    {
      key: 6,
      label: '参与方式',
      required: true,
      name: 'joinType',
      initialValue: data.joinType ? data.joinType : null,
      component: (
        <Select>
          <Select.Option value="0">投标</Select.Option>
          <Select.Option value="1">谈判</Select.Option>
          <Select.Option value="1">其他</Select.Option>
        </Select>
      ),
    },
    {
      key: 7,
      label: '商机内容',
      required: false,
      name: 'msg',
      initialValue: data.msg ? data.msg : null,
      component: <Input.TextArea rows={4} />,
    },
    {
      key: 8,
      label: '预计招标时间',
      required: true,
      name: 'TenderTime',
      initialValue: data.TenderTime ? data.TenderTime : null,
      component: <DatePicker />,
    },
    {
      key: 9,
      label: '预计计收时间',
      required: true,
      name: 'incomeTime',
      initialValue: data.incomeTime ? data.incomeTime : null,
      component: <DatePicker />,
    },
    {
      key: 10,
      label: '预计年收入',
      required: true,
      name: 'annualIncome',
      initialValue: data.annualIncome ? data.annualIncome : null,
      component: <Input />,
    },
    {
      key: 11,
      label: '客户名称',
      required: true,
      name: 'customerName',
      initialValue: data.customerName ? data.customerName : null,
      component: <Input />,
    },
    {
      key: 12,
      label: '所属行业',
      required: true,
      name: 'industry',
      initialValue: data.industry ? data.industry : null,
      component: (
        <Select>
          <Select.Option value="0">金融</Select.Option>
          <Select.Option value="1">医疗</Select.Option>
        </Select>
      ),
    },
    {
      key: 13,
      label: '是否存量客户',
      required: true,
      name: 'isStock',
      initialValue: data.isStock ? data.isStock : null,
      component: (
        <Radio.Group>
          <Radio value={1}>立即发布</Radio>
          <Radio value={2}>定时发布</Radio>
        </Radio.Group>
      ),
    },
    {
      key: 14,
      label: '客户联系人姓名',
      required: true,
      name: 'customerContacts',
      initialValue: data.customerContacts ? data.customerContacts : null,
      component: <Input />,
    },
    {
      key: 15,
      label: '客户联系人电话',
      required: true,
      name: 'customerPhone',
      initialValue: data.customerPhone ? data.customerPhone : null,
      component: <Input />,
    },
    {
      key: 16,
      label: '商机录入人',
      required: true,
      name: 'businessInput',
      initialValue: data.businessInput ? data.businessInput : null,
      component: <Input />,
    },
    {
      key: 17,
      label: '录入人电话',
      required: true,
      name: 'inputPhone',
      initialValue: data.inputPhone ? data.inputPhone : null,
      component: <Input />,
    },
  ];

  useEffect(() => {
    getMyBusiness(match.params.id);
  }, []);

  // 创建或者修改
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createMyBusiness(values);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>{`我的商机${match.params.id ? '修改' : '创建'}`}</h5>
        <div className={styles.formWrapper}>
          <Form {...formItemLayout}>
            {(formData || []).map(item => (
              <Form.Item
                label={item.label}
                key={item.key}
                className={styles.formItem}
              >
                {getFieldDecorator(item.name, {
                  initialValue: item.initialValue,
                  rules: [{ required: item.required }],
                })(item.component)}
              </Form.Item>
            ))}
          </Form>
          <div className={styles.formBtns}>
            <Button type="primary" onClick={onSubmit}>
              {`${match.params.id ? '修改' : '创建'}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(BusinessCreation);
