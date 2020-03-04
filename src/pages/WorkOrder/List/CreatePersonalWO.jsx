import React from 'react';
import { Form, Input, Button, Upload } from '@/components';
import StandardSelect from '../components/StandardSelect';

const PersonalForm = Form.create()(props => {
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
        })(<StandardSelect options={[{ label: '资源开通', value: '1' }]} />)}
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
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button>返回</Button>
      </Form.Item>
    </Form>
  );
});

function CreatePersonalWO() {
  return (
    <>
      <h1>提交工单 - 提交个人工单</h1>
      <PersonalForm />
    </>
  );
}

export default CreatePersonalWO;
