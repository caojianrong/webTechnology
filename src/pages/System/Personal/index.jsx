import React, { useState } from 'react';
import {
  Form,
  Input,
  Cascader,
  Card,
} from '@/components';

import cities from './json/city.json';

//form表单的样式
const formItemLayout = {
  labelCol: { span: 3 },
  labelAlign: 'right',
  wrapperCol: { span: 18 },
};

function PersionalForm(props) {
  const { getFieldDecorator } = props.form;
  return (
    <Card>
      <Form {...formItemLayout}>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            // rules: [
            //   {
            //     type: 'email',
            //     message: '请输入正确格式的邮箱!',
            //   },
            //   {
            //     required: true,
            //     message: '请输入邮箱!',
            //   },
            // ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item disabled label="用户名">
          {getFieldDecorator('username', {
            // rules: [
            //   { required: true, message: '请输入用户名' }
            // ],
          })(<Input disabled placeholder="用户名" />)}
        </Form.Item>
        <Form.Item label="所在省市">
          {getFieldDecorator('city')(
            <Cascader
              disabled
              fieldNames={{ label: 'cname', value: 'name', children: 'children' }}
              options={cities.children}
              // onChange={onChange}
            />,
          )}
        </Form.Item>
        <Form.Item label="街道地址">
          {getFieldDecorator('adress', {
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
          })(<Input disabled />)}
        </Form.Item>
      </Form>
    </Card>
  );
}

const WrapPersionalForm = Form.create({ name: 'horizontal_login' })(PersionalForm);

export default WrapPersionalForm;



