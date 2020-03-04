import React, {useState, useEffect} from 'react';
import {Form, Input, Icon, Cascader, Select, Col, Button, AutoComplete,} from '@wocloud/design';
import residences from  '@/common/area';
import {Breadcrumb} from "../../components";
import stores from '../../stores';
import styles from './index.module.less';
const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '账户资料',
  },
  {
    key: 3,
    name: '创建账户',
  },
];
const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;

const accountEditFrom = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const search= props.location.search;
  const id = search.slice(4);
  const title = id?'编辑账户':'新增账户';

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createAccountCategory(values);
      }
    });
  };

  const handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    setAutoCompleteResult(autoCompleteResult);
    // this.setState({ autoCompleteResult });
  };

  const {getFieldDecorator} = props.form;
  // store初始化
  const createCategory = stores.useStore('createAccount');
  const {
    result,
    data,
    createAccountCategory,
    getAccountCategory,
  } = createCategory;
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

  const websiteOptions = autoCompleteResult.map(website => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));


  const formData = [
    {
      key: 1,
      label: '客户名称',
      required: true,
      name: 'name',
      initialValue: data.name ? data.name : null,
      rules: [{required: true, message: '请输入客户名称'}],
      component: (
        <AutoComplete
          dataSource={websiteOptions}
          onChange={handleWebsiteChange}
          placeholder="请输入客户名称"
        >
          <Input/>
        </AutoComplete>
      ),
    },
    {
      key: 2,
      label: '客户归属地',
      required: true,
      name: 'ownership',
      initialValue: data.ownership ? data.ownership : null,
      rules: [ {type: 'array', required: true, message: '请选择客户归属地'}],
      component: (
        <Cascader options={residences}/>
      ),
    },
    {
      key: 3,
      label: '账户名称',
      required: true,
      name: 'account',
      initialValue: data.account ? data.account : null,
      rules: [{ required: true, message: '请输入账户名称' }],
      component: (
        <Input placeholder="请输入账户名称"/>
      ),
    },

    {
      key: 5,
      label: '付费类型',
      required: true,
      name: 'type',
      initialValue: data.type ? data.type : null,
      rules: [{ required: true, message: '请选择付费类型',},
      ],
      component: (
        <Select placeholder="请选择付费类型">
          <Option value="1">后付费</Option>
          <Option value="2">预付费</Option>
        </Select>
      ),
    },
    {
      key: 7,
      label: '开户银行',
      required: true,
      name: 'bank',
      initialValue: data.bank ? data.bank : null,
      rules: [{ required: true,message: '请输入开户银行'}],
      component: (
        <Input placeholder="请输入开户银行"/>      ),
    },
    {
      key: 8,
      label: '开户支行名称',
      required: true,
      name: 'branch',
      initialValue: data.branch ? data.branch : null,
      rules: [{ required: true,message: '请输入开户支行名称'}],
      component: (
        <Input placeholder="请输入开户支行名称"/>      ),
    },
  ];
  useEffect(() => {
    if(id){
      getAccountCategory(id);
    }else {
      createAccountCategory();
    }
    console.log(data);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />

      <div className={styles.content}>
        <h5>账户资料创建</h5>
        <div className={styles.formWrapper}>
          <Form hideRequiredMark={false} autoComplete="on"  {...formItemLayout} onSubmit={handleSubmit}>
            {(formData || []).map(item => (
              <Form.Item
                label={item.label}
                key={item.key}
                className={styles.formItem}
              >
                {getFieldDecorator(item.name, {
                  initialValue: item.initialValue,
                  rules: item.rules,
                })(item.component)}
              </Form.Item>
            ))}
          </Form>
          <div className={styles.formBtns}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              创建
            </Button>
            {/*<Button type="primary" htmlType="submit">创建</Button>*/}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Form.create()(accountEditFrom);
