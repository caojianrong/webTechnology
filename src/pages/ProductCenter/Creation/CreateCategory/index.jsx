import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber } from '@/components';
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

const CreateCategory = ({ form, match }) => {
  // 初始化State等数据
  const { getFieldDecorator } = form;
  const [fatherNameSelect, setFatherNameSelect] = useState(true);
  // store初始化
  const createCategory = stores.useStore('createCategory');
  const {
    result,
    data,
    createProductCategory,
    getProductCategory,
  } = createCategory;

  const selectChange = v => {
    if (v === '0') {
      setFatherNameSelect(true);
      form.setFieldsValue({ fatherName: '无' });
    }
    if (v === '1') {
      setFatherNameSelect(false);
      form.setFieldsValue({ fatherName: '0' });
    }
  };

  const breadcrumbName = [
    {
      key: 1,
      name: '产品中心',
    },
    {
      key: 2,
      name: '产品类别管理',
    },
    {
      key: 3,
      name: `产品类别${match.params.id ? '修改' : '创建'}`,
    },
  ];
  const formData = [
    {
      key: 1,
      label: '系统类型',
      required: true,
      name: 'systemType',
      initialValue: data.systemType ? data.systemType : null,
      component: (
        <Select>
          <Select.Option value="0">沃云</Select.Option>
        </Select>
      ),
    },
    {
      key: 2,
      label: '目录名称',
      required: true,
      name: 'directoryName',
      initialValue: data.directoryName ? data.directoryName : null,
      component: <Input placeholder="输入名称" />,
    },
    {
      key: 3,
      label: '目录层级',
      required: true,
      name: 'directoryHierarchy',
      initialValue: data.directoryHierarchy ? data.directoryHierarchy : null,
      component: (
        <Select onChange={selectChange}>
          <Select.Option value="0">产品大类</Select.Option>
          <Select.Option value="1">产品小类</Select.Option>
        </Select>
      ),
    },
    {
      key: 4,
      label: '父级名称',
      required: true,
      name: 'fatherName',
      initialValue: data.fatherName ? data.fatherName : null,
      component: (
        <Select disabled={fatherNameSelect}>
          <Select.Option value="0">基础产品</Select.Option>
          <Select.Option value="1">应用产品</Select.Option>
          <Select.Option value="2">安全产品</Select.Option>
        </Select>
      ),
    },
    {
      key: 5,
      label: '目录在同级中排序',
      required: true,
      name: 'sort',
      initialValue: data.sort ? data.sort : null,
      component: <InputNumber min={1} />,
    },
    {
      key: 6,
      label: '描述',
      required: false,
      name: 'msg',
      initialValue: data.msg ? data.msg : null,
      component: <Input.TextArea rows={4} />,
    },
  ];

  useEffect(() => {
    getProductCategory(match.params.id);
  }, []);

  // 创建或者修改
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        createProductCategory(values);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>{`产品类别${match.params.id ? '修改' : '创建'}`}</h5>
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

export default Form.create()(CreateCategory);
