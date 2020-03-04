import React, {useState, useEffect} from 'react';
import {
  RangePicker,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from '@wocloud/design';
import commomStyles from '@/common/index.module.less';
import {Link} from 'react-router-dom';

const {Option} = Select;

const userEditFrom = props => {

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        props.submit(values);
      }
    });
  };
  const clear = e => {
    props.form.resetFields();
  };
  const {getFieldDecorator} = props.form;
  const {search} =props;

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

;

  return (
    <div >
      <Form hideRequiredMark autoComplete="on" {...formItemLayout} onSubmit={handleSubmit}>
        <Row>
          {search.map(item => (
            <Col md={6} xs={6} key={item.key}>
              <Form.Item label={item.label}>
                {getFieldDecorator(item.attribute, {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!',
                    },
                  ],
                })(item.component)}
              </Form.Item>
            </Col>
          ))}

          {/* <Col  md={6} xs={6} > */}
          {/*  <Form.Item label="客户归属地"> */}
          {/*    {getFieldDecorator('residence', { */}

          {/*    })(<Cascader options={residences}  placeholder="请选择客户归属地"/>)} */}
          {/*  </Form.Item> */}
          {/* </Col> */}
        
        </Row>
        <div className={commomStyles.buttonGroup}>
          <Link
            to={{
              pathname: '/user/edit',
              search: '?id=',
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            <Button type="primary" >+ 用户创建</Button>

          </Link>
          <Button type="primary" onClick={handleSubmit}>查询</Button>
          <Button onClick={clear}>重置</Button>
        </div>
      </Form>
    </div>
  );
};

export default Form.create()(userEditFrom);
