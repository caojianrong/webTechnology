import React, { useState, useEffect, Fragment } from 'react';
import {
  Modal,
  Form,
  Row,
  Col,
  Select,
  Input,
  Button,
  Checkbox,
  Card,
} from 'antd';

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
const gMessage = `
   新的学期总有新的惊喜和机遇--沃云倾心打造，助力学子成长！为鼎力支持芊芊学子，推出“校园成长计划”，详情可查看官网活动页！
   感谢您对沃云的支持，我们将竭诚为您服务。

联通云数据有限公司`;

// 消息模块和消息类型的对应关系的改变
const moduleToType = {
  huodong: '1',
  xitong: '2',
  qita: '3',
};

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [loading, setLoading] = useState(false);

  function handleOk() {
    setLoading(true);

    //  发送发布数据
    setVisible(false);

    // 成功或失败loading都是false
    setLoading(false);
  }

  function handleCancel(e) {
    // setVisible(false);
  }

  // 消息模块改变事件
  function handleModuleChange(value) {
    const { form } = props;
    form.setFieldsValue({ type: moduleToType[value] });
  }

  return (
    <Card>
      <h1>消息发布</h1>
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="消息模块">
              {getFieldDecorator('module', {
                initialValue: 'huodong',
              })(
                <Select onChange={handleModuleChange}>
                  <Option value="huodong">活动类</Option>
                  <Option value="xitong">系统类</Option>
                  <Option value="qita">其他类</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="消息类型">
              {getFieldDecorator('type', {
                initialValue: '1',
              })(
                <Select disabled>
                  <Option value="1">相关活动通知</Option>
                  <Option value="2">系统通知</Option>
                  <Option value="3">其他类通知</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="推送组别">
              {getFieldDecorator(
                'obj',
                {},
              )(
                <Select>
                  <Option value="weibo">客户</Option>
                  <Option value="lucy">客户经理</Option>
                  <Option value="ding">运营人员</Option>
                  <Option value="yunying">运维人员</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="推送方式">
              {getFieldDecorator(
                'type1',
                {},
              )(
                <Checkbox.Group
                  style={{
                    width: '100%',
                  }}
                >
                  <Checkbox value="zhanneixin">站内信</Checkbox>
                  <Checkbox value="email">邮件</Checkbox>
                  <Checkbox value="message">短信</Checkbox>
                </Checkbox.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Form.Item label="消息内容" {...tailFormItemLayout}>
            {getFieldDecorator(
              'message',
              {},
            )(<TextArea placeholder={gMessage} rows={5} />)}
          </Form.Item>
        </Row>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Row>
            <Col
              style={{
                marginTop: 26,
              }}
              span={23}
            >
              <div style={{ textAlign: 'center', paddingTop: 10 }}>
                <Button type="primary" style={{ marginRight: 20 }}>
                  确定
                </Button>

                <Button  type="cancel" onClick={() => props.history.goBack()}>取消</Button>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

const PublishModal = Form.create({ name: 'modal_Form' })(modalForm);

export default PublishModal;
