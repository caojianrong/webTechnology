import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Form, Row, Col, Select, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  labelAlign: 'right',
  wrapperCol: { span: 14 },
};

const tailFormItemLayout = {
  labelCol: { span: 3 },
  labelAlign: 'right',
  wrapperCol: { span: 19 },
};

const { Option } = Select;
const { TextArea } = Input;
const gMessage = `客户您好，您的账号XXX购买的'产品-实例名称'，因系统漏洞被攻击，建议立即登录控制台查看。
感谢您对沃云的支持，我们将竭诚为您服务。

联通云数据有限公司`;

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [isVisible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleOk() {
    setLoading(true);
    setVisible(false);
    setLoading(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  return (
    <>
      <span onClick={() => setVisible(true)}>{props.children}</span>
      <Modal
        title="消息配置"
        width={800}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            提交
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="消息模块">
                {getFieldDecorator(
                  'module',
                  {},
                )(
                  <Select placeholder="请选择消息模块">
                    <Option value="weibo">安全</Option>
                    <Option value="lucy">资源</Option>
                    <Option value="ding">活动</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="消息类型">
                {getFieldDecorator('type')(
                  <Select placeholder="请选择消息类型">
                    <Option value="1">异常登录提醒</Option>
                    <Option value="2">漏洞周报</Option>
                    <Option value="2">安全事件提醒</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Form.Item label="消息内容模板" {...tailFormItemLayout}>
              {getFieldDecorator(
                'message',
                {},
              )(<TextArea placeholder={gMessage} rows={5} />)}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

const PublishModal = Form.create({ name: 'modal_Form' })(modalForm);

export default PublishModal;
