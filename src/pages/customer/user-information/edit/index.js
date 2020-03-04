import React, {useState, useEffect} from 'react';
import {Form, Input, Cascader, Select, Button, AutoComplete,} from '@wocloud/design';
import residences from  '@/common/area';
import {Breadcrumb} from '../../components';
import stores from '../../stores';
import styles from './index.module.less';

const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '用户资料',
  },
  {
    key: 3,
    name: '创建用户',
  },
];

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;
const userEditFrom = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const search= props.location.search;
  const id = search.slice(4);
  const title = id?'编辑用户':'新增用户';
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createUserCategory(values);

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
  const createCategory = stores.useStore('createUser');
  const {
    result,
    data,
    createUserCategory,
    getUserCategory,
  } = createCategory;

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 150 }}>
      <Option value="86">市场部</Option>
      <Option value="87">运营部</Option>
    </Select>,
  );
  const websiteOptions = autoCompleteResult.map(website => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));
  const formData = [
    {
      key: 1,
      label: '客户归属地',
      required: true,
      name: 'ownership',
      initialValue: data.ownership ? data.ownership : null,
      rules:[
        {type: 'array', required: true, message: '请选择客户归属地'},
      ],
      component: (
        <Cascader options={residences} placeholder="请选择地址" />    ),
    },
    {
      key: 2,
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
      key: 3,
      label: '业务类型',
      required: true,
      name: 'type',
      initialValue: data.type ? data.type : null,
      rules: [{ required: true, message: '请选择业务类型型' }],
      component: (
        <Select placeholder="请选择业务类型">
          <Option value="china">合作公有云</Option>
          <Option value="usa">私有云</Option>
          <Option value="usa1">行业云</Option>
        </Select>
      ),
    },
    {
      key: 4,
      label: '发展人',
      required: true,
      name: 'developer',
      initialValue: data.developer ? data.developer : null,
      rules: [{ required: true, message: '请输入发展人名称!' }],
      component: (
        <Input placeholder="请输入发展人名称" addonBefore={prefixSelector} style={{ width: '100%' }} />
      ),
    },
    {
      key: 5,
      label: '发展人编码',
      required: true,
      name: 'number',
      initialValue: data.number ? data.number : null,
      rules: [{ required: true, message: '请输入发展人编码',},
      ],
      component: (
        <Input placeholder="请输入发展人编码"/>
      ),
    },
    {
      key: 6,
      label: '电话',
      required: true,
      name: 'phone',
      initialValue: data.phone ? data.phone : null,
      rules: [{ required: true, message: '请输入电话!' }],
      component: (
        <Input placeholder="请输入电话"  style={{ width: '100%' }} />
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
        <Input placeholder="请输入开户银行"/>
      ),
    },
  ];
  useEffect(() => {
    if(id){
      getUserCategory(id);
    }else {
      createUserCategory();
    }
    console.log(data);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>用户资料创建</h5>
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
  )
};

export default Form.create()(userEditFrom);
