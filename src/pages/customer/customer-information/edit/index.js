import React, {useState, useEffect} from 'react';
import {Form, Input, Icon, Cascader, Select, Row, Col, Button, AutoComplete, Upload} from '@wocloud/design';
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
    name: '客户资料',
  },
  {
    key: 3,
    name: '创建客户',
  },
];
const {Option} = Select;

const customerEditFrom = props => {
  const fileList = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
  ];

  const propsOne = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [...fileList],
  };

  const search= props.location.search;
  const id = search.slice(4);
  const title = id?'编辑客户':'新增客户';
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createCustomerCategory(values);
      }
    });
  };

  const {getFieldDecorator} = props.form;
  // store初始化
  const createCategory = stores.useStore('createCustomer');
  const {
    result,
    data,
    createCustomerCategory,
    getCustomerCategory,
  } = createCategory;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const formData = [
    {
      key: 1,
      label: '客户名称',
      required: true,
      name: 'customerName',
      initialValue: data.customerName ? data.customerName : null,
      rules: [{ required: true, message: '请输入客户名称' }],
      component: (
        <Input placeholder="请输入客户名称"/>
      ),
    },

    {
      key: 2,
      label: '客户类型',
      required: true,
      name: 'customerType',
      initialValue: data.customerType ? data.customerType : null,
      rules: [{ required: true, message: '请选择客户类型',},
      ],
      component: (
        <Select placeholder="请选择客户类型">
          <Option value="1">大客户</Option>
          <Option value="2">中小客户</Option>
        </Select>
      ),
    },
    {
      key: 3,
      label: '客户归属地',
      required: true,
      name: 'ownership',
      initialValue: data.ownership ? data.ownership : null,
      rules: [ {type: 'array', required: true, message: '请选择客户归属地'} ],
      component: (
        <Cascader options={residences}/>
      ),
    },
    {
      key: 4,
      label: '客户地址',
      required: true,
      name: 'customerAddress',
      initialValue: data.customerAddress ? data.customerAddress : null,
      rules: [{ required: true,message: '请输入客户地址'}],
      component: (
        <Input placeholder="请输入客户地址"/>
      ),
    },
    {
      key: 5,
      label: '联系人名称',
      required: true,
      name: 'contactName',
      initialValue: data.contactName ? data.contactName : null,
      rules: [{ required: true,message: '请输入联系人名称'}],
      component: (
        <Input placeholder="请输入联系人名称"/>
      ),
    },
    {
      key: 6,
      label: '联系人电话',
      required: true,
      name: 'contactPhone',
      initialValue: data.contactPhone ? data.contactPhone : null,
      rules: [{ required: true,message: '请输入联系人电话'}],
      component: (
        <Input style={{width: '100%'}}/>
      ),
    },
    {
      key: 7,
      label: '行业分类',
      required: true,
      name: 'category',
      initialValue: data.category ? data.category : null,
      rules: [{ required: true,message: '请选择行业分类'}],
      component: (
        <Select placeholder="请选择行业分类">
          <Option value="1">行业1</Option>
          <Option value="2">行业2</Option>
        </Select>
      ),
    },
    {
      key: 8,
      label: '证件归属人：',
      required: true,
      name: 'certificateOwner',
      initialValue: data.certificateOwner ? data.certificateOwner : null,
      rules: [{ required: true,message: '请选择行业归属人'}],
      component: (
        <Select placeholder="请选择行业归属人">
          <Option value="1">行业归属人1</Option>
          <Option value="2">行业归属人2</Option>
        </Select>
      ),
    },
    {
      key: 9,
      label: '证件人姓名',
      required: true,
      name: 'certificateName',
      initialValue: data.certificateName ? data.certificateName : null,
      rules: [{ required: true,message: '请输入证件人姓名'}],
      component: (
        <Input placeholder="请输入证件人姓名"/>
      ),
    },
    {
      key: 10,
      label: '证件人证件类型',
      required: true,
      name: 'certificateType',
      initialValue: data.certificateType ? data.certificateType : null,
      rules: [{ required: true,message: '请选择证件人证件类型'}],
      component: (
        <Select placeholder="请选择证件人证件类型">
          <Option value="1">身份证</Option>
          <Option value="2">护照</Option>
          <Option value="3">户口本</Option>
        </Select>
      ),
    },
    {
      key: 11,
      label: '证件人证件号码',
      required: true,
      name: 'certificateNumber',
      initialValue: data.certificateNumber ? data.certificateNumber : null,
      rules: [{ required: true,message: '请输入证件人证件号码'}],
      component: (
        <Input placeholder="请输入证件人证件号码"/>
      ),
    },
    {
      key: 12,
      label: '证件人证件地址',
      required: true,
      name: 'certificateAddress',
      initialValue: data.certificateAddress ? data.certificateAddress : null,
      rules: [{ required: true,message: '请输入证件人证件地址'}],
      component: (
        <Input placeholder="请输入证件人证件地址"/>
      ),
    },
    {
      key: 13,
      label: '客户子类型',
      required: true,
      name: 'customerSubtype',
      initialValue: data.customerSubtype ? data.customerSubtype : null,
      rules: [{ required: true,message: '请选择付费类型'}],
      component: (
        <Select placeholder="请选择付费类型">
          <Option value="1">正式</Option>
          <Option value="2">测试</Option>
          <Option value="3">内部</Option>
        </Select>
      ),
    },
    {
      key: 14,
      label: '证件人电话',
      required: true,
      name: 'certificatePhone',
      initialValue: data.certificatePhone ? data.certificatePhone : null,
      rules: [{ required: true,message: '请输入证件人电话'}],
      component: (
        <Input style={{width: '100%'}}/>
      ),
    },
    {
      key: 15,
      label: '纳税人识别号',
      required: true,
      name: 'taxpayerNumber',
      initialValue: data.taxpayerNumber ? data.taxpayerNumber : null,
      rules: [{ required: true,message: '请输入纳税人识别号'}],
      component: (
        <Input placeholder="请输入纳税人识别号："/>
      ),
    },
    {
      key: 16,
      label: '一般纳税人名称',
      required: true,
      name: 'taxpayerName',
      initialValue: data.taxpayerName ? data.taxpayerName : null,
      rules: [{ required: true,message: '请输入一般纳税人名称'}],
      component: (
        <Input placeholder="请输入一般纳税人名称："/>
      ),
    },
    {
      key: 17,
      label: '是否一般纳税人',
      required: true,
      name: 'isGeneralTaxpayer',
      initialValue: data.isGeneralTaxpayer ? data.isGeneralTaxpayer : null,
      rules: [{ required: true,message: '请选择是否一般纳税人'}],
      component: (
        <Select placeholder="请选择是否一般纳税人">
          <Option value="1">是</Option>
          <Option value="2">否</Option>
        </Select>
      ),
    },
    {
      key: 18,
      label: '开户银行',
      required: true,
      name: 'bankAccount',
      initialValue: data.bankAccount ? data.bankAccount : null,
      rules: [{ required: true,message: '请输入开户银行'}],
      component: (
        <Input placeholder="请输入开户银行"/>
      ),
    },
    {
      key: 19,
      label: '开户银行账号',
      required: true,
      name: 'bankAccountNumber',
      initialValue: data.bankAccountNumber ? data.bankAccountNumber : null,
      rules: [{ required: true,message: '请输入开户银行账号'}],
      component: (
        <Input placeholder="请输入开户银行账号"/>
      ),
    },
    {
      key: 20,
      label: '客户等级',
      required: true,
      name: 'customerLevel',
      initialValue: data.customerLevel ? data.customerLevel : null,
      rules: [{ required: true,message: '请选择客户等级'}],
      component: (
        <Select placeholder="customerLevel">
          <Option value="1">钻石</Option>
          <Option value="2">金卡</Option>
          <Option value="3">银卡</Option>
          <Option value="4">普通</Option>
        </Select>
      ),
    },
  ];
  useEffect(() => {
    if(id){
      getCustomerCategory(id);
    }else {
      createCustomerCategory();
    }
    console.log(data);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <h5>客户资料创建</h5>
        <div className={styles.formWrapper}>
          <Form hideRequiredMark={false} autoComplete="on"  {...formItemLayout} onSubmit={handleSubmit}>
            <Row>
                {(formData || []).map(item => (
                  <Col  md={11} xs={11}  key={item.key} offset={1}>
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
                  </Col>
                ))}
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={2}>
              </Col>
              <Col className="gutter-row" span={7}>
                <div className="gutter-box">
                  <Upload {...propsOne}>
                    营业执照：
                    <Button>
                      <Icon type="upload" /> 上传营业执照
                    </Button>
                  </Upload>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div className="gutter-box">
                  <Upload {...propsOne}>
                    授权书：
                    <Button>
                      <Icon type="upload" /> 上传授权书
                    </Button>
                  </Upload>
                </div>
              </Col>
              <Col className="gutter-row" span={7}>
                <div className="gutter-box">
                  <Upload {...propsOne}>
                    经办人（法人）证件：
                    <Button>
                      <Icon type="upload" /> 上传正反面
                    </Button>
                  </Upload>
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
              </Col>
            </Row>

          </Form>


          <div className={styles.formBtn}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              提交实名认证
            </Button>
            {/*<Button type="primary" htmlType="submit">创建</Button>*/}
          </div>
        </div>
      </div>
    </div>


  );
};

export default Form.create()(customerEditFrom);
