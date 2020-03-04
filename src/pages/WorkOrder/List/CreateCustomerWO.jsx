import React from 'react';
import { Form, Input, Button, Upload } from '@/components';
import { StandardSelect } from '../components';
import ChooseCustomerInput from './ChooseCustomerInput';

const CustomerForm = Form.create()(props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  return (
    <Form {...formItemLayout} noValidate autoComplete="off">
      <Form.Item label="工单类型">
        {getFieldDecorator('orderCategory', {
          initialValue: '1',
        })(
          <StandardSelect
            options={[{ label: '客户配额申请（代理客户）', value: '1' }]}
          />,
        )}
      </Form.Item>
      <Form.Item label="登录账号">
        {getFieldDecorator(
          'loginAccount',
          {},
        )(<ChooseCustomerInput form={form} />)}
      </Form.Item>
      <Form.Item label="技术问题类型">
        {getFieldDecorator('technicalIssueType', {
          initialValue: '1',
        })(<StandardSelect options={[{ label: '其他问题', value: '1' }]} />)}
      </Form.Item>
      <Form.Item label="工单标题">
        {getFieldDecorator('orderTitle', {})(<Input />)}
      </Form.Item>
      <Form.Item label="工单内容">
        {getFieldDecorator('orderContent', {})(<Input.TextArea />)}
      </Form.Item>
      <Form.Item
        label="上传附件"
        extra="支持扩展名：.rar .zip .doc .docx .pdf .jpg..."
      >
        {getFieldDecorator('upload', {
          valuePropName: 'fileList',
        })(
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon="upload">上传文件</Button>
          </Upload>,
        )}
      </Form.Item>
      <Form.Item label="负责人联系电话">
        {getFieldDecorator('principalPhone', {})(<Input />)}
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button>返回</Button>
      </Form.Item>
    </Form>
  );
});

function CreateCustomerWO() {
  return (
    <>
      <h1>提交工单 - 代客户提交工单</h1>
      <CustomerForm />
    </>
  );
}

export default CreateCustomerWO;
