import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Form, Row, Col, Select, Input, Button } from 'antd';

import styles from './less/detail.module.less';

const formItemLayout = {
  labelCol: { span: 9 },
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
const gMessage = `您的用户账号123ALY33243在沃云购买的'XX产品-实例名称'，因系统漏洞被攻击，建议立即登录控制台查看。
感谢您对沃云的支持，我们将竭诚为您服务。

联通云数据有限公司`;

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [isVisible, setVisible] = useState(false);

  function handleOk() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  return (
    <div>
      <span onClick={() => setVisible(true)}>{props.children}</span>
      <div>
        <Modal
          title="消息详情"
          width={800}
          visible={isVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              确定
            </Button>,
          ]}
        >
          <div className={styles.messgeDetail}>
            <Form {...formItemLayout}>
              <div className={styles.firstLine}>
              <Row gutter={24} >
                <Col span={8}>
                  <Form.Item label="消息模块">
                    {getFieldDecorator('module', {})(<span>sss</span>)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="消息类型">
                    {getFieldDecorator('type')(<span>ddd</span>)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="推送方式">
                    {getFieldDecorator('type1')(<span>sss</span>)}
                  </Form.Item>
                </Col>
              </Row>
             
              </div>
             <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="推送对象">
                    {getFieldDecorator('obj', {})(<span>客户</span>)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="用户账号">
                    {getFieldDecorator('account')(<span>sss</span>)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="创建事件">
                    {getFieldDecorator('time')(<span>sss</span>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Form.Item label="消息内容" {...tailFormItemLayout}>
                  {getFieldDecorator(
                    'message',
                    {},
                  )(<TextArea disabled placeholder={gMessage} rows={5} />)}
                </Form.Item>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const PublishModal = Form.create({ name: 'modal_Form' })(modalForm);

export default PublishModal;
