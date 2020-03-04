import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Form, Row, Col, Select, Input, Button, TreeSelect } from 'antd';

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
const gMessage = `您的客户XXX（账号XXX）在沃云购买的'XX产品-实例名称'，因系统漏洞被攻击，建议立即登录控制台查看。
感谢您对沃云的支持，我们将竭诚为您服务。

联通云数据有限公司`;


const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
];

// 推送组别  树形下拉框的配置项
const { SHOW_PARENT } = TreeSelect;
const tProps = {
  treeData,
  // value: this.state.value,
  // onChange: this.onChange,
  treeCheckable: true,
  showCheckedStrategy: SHOW_PARENT,
  searchPlaceholder: 'Please select',
  style: {
    width: '100%',
  },
};

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [isVisible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleOk() {
    setLoading(true); 

    //  发送发布数据
    setVisible(false);

    // 成功或失败loading都是false
    setLoading(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  return (
    <>
      <span onClick={() => setVisible(true)}>{props.children}</span>
      <Modal
        title="消息发布"
        width={1000}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
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
                  <Select>
                    <Option value="weibo">安全</Option>
                    <Option value="lucy">资源</Option>
                    <Option value="ding">活动</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="消息类型">
                {getFieldDecorator(
                  'type',
                  {},
                )(
                  <Select>
                    <Option value="1">安全告警消息</Option>
                    <Option value="2">资源到期提醒</Option>
                    <Option value="3">资源回收提醒</Option>
                    <Option value="4">产品服务通知</Option>
                    <Option value="5">欠费通知</Option>
                    <Option value="6">账单推送</Option>
                    <Option value="7">余额预警通知</Option>
                    <Option value="8">相关活动通知</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="发布至">
                {getFieldDecorator(
                  'to',
                  {},
                )(
                  <Select>
                    <Option value="yunjing">云径</Option>
                    <Option value="yunce">云策</Option>
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
                  <Select>
                    <Option value="1">短信</Option>
                    <Option value="2">邮件</Option>
                    <Option value="3">站内信</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="推送对象">
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
              <Form.Item label="推送组别">
                {getFieldDecorator(
                  'group',
                  {},
                )(
                  <TreeSelect
                  showSearch
                  allowClear
                  // style={{ width: '100%' }}
                  // value={undefined}
                  // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  // treeData={treeData}
                  // placeholder="Please select"
                  treeDefaultExpandAll
                  // onChange={this.onChange}
                  {...tProps}
                />,
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
        </Form>
      </Modal>
    </>
  );
}

const PublishModal = Form.create({ name: 'modal_Form' })(modalForm);

export default PublishModal;
