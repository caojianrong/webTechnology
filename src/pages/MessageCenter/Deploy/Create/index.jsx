import React, { useState, useEffect } from 'react';
import { Card } from '@/components';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import stores from '../../stores';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 3 },
  labelAlign: 'right',
  wrapperCol: { span: 18 },
};

const messageType = {
  gaojing: [{ value: '1', text: '安全告警消息' }],
  chanpin: [
    { value: '1', text: '资源到期提醒' },
    { value: '2', text: '资源回收提醒' },
    { value: '3', text: '产品服务通知' },
  ],
  caiwu: [
    { value: '1', text: '欠费通知' },
    { value: '2', text: '账单推送' },
  ],
  huodong: [{ value: '1', text: '相关活动通知' }],
  xitong: [{ value: '1', text: '系统通知' }],
  qita: [{ value: '1', text: '其他类通知' }],
};

function Create(props) {
  const { getFieldDecorator } = props.form;

  // 创建内容
  const [detailValue, setDetail] = useState('1');

  // 消息类型
  const [messageTypeSelect, setMessageTypeSelect] = useState(
    messageType.gaojing,
  );

  const deploy = stores.useStore('deploy');
  console.log(deploy);

  function handleSubmit() {}

  // 创建内容下拉框选值发生改变
  function handleDetailChange(value) {
    setDetail(value);
  }

  // 消息模块下拉框发生改变，修改消息类型的值
  function handleModuleChange(value) {
    setMessageTypeSelect(messageType[value]);
  }

  return (
    <Card>
      <h1>消息中心 - 消息配置 - 创建</h1>
      <Form {...formItemLayout} autoComplete="off" onSubmit={handleSubmit}>
        <Form.Item label="创建内容">
          {getFieldDecorator('detail', {
            initialValue: '1',
          })(
            <Select placeholder="请选择创建内容" onChange={handleDetailChange}>
              <Option value="1">消息模块</Option>
              <Option value="2">消息类型</Option>
              <Option value="3">消息模版</Option>
            </Select>,
          )}
        </Form.Item>
        {detailValue === '1' ? (
          ''
        ) : (
          <Form.Item label="隶属消息模块">
            {getFieldDecorator('module', {
              initialValue: 'gaojing',
            })(
              <Select
                placeholder="请选择隶属消息模块"
                onChange={handleModuleChange}
              >
                <Option value="gaojing">告警类</Option>
                <Option value="chanpin">产品类</Option>
                <Option value="caiwu">财务类</Option>
                <Option value="huodong">活动类</Option>
                <Option value="xitong">系统类</Option>
                <Option value="qita">其他类</Option>
              </Select>,
            )}
          </Form.Item>
        )}

        {detailValue !== '1' ? (
          ''
        ) : (
          <Form.Item label="消息模版名称">
            {getFieldDecorator('moduleName')(
              <Input placeholder="请输入消息模版名称" />,
            )}
          </Form.Item>
        )}

        {detailValue !== '2' ? (
          ''
        ) : (
          <Form.Item label="消息类型名称">
            {getFieldDecorator('typeName')(
              <Input placeholder="请输入消息类型名称" />,
            )}
          </Form.Item>
        )}

        {detailValue !== '3' ? (
          ''
        ) : (
          <Form.Item label="隶属消息类型">
            {getFieldDecorator('massageType')(
              <Select placeholder="请选择隶属消息类型">
                {messageTypeSelect.map((v, i) => {
                  return (
                    <Option key={i} value={v.value}>
                      {' '}
                      {v.text}{' '}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
        )}

        {detailValue !== '3' ? (
          ''
        ) : (
          <Form.Item label="消息模版内容">
            {getFieldDecorator('messagemodule')(<TextArea />)}
          </Form.Item>
        )}

        {detailValue !== '3' ? (
          ''
        ) : (
          <Form.Item label="需要替换的字符">
            {getFieldDecorator('repalce', {
              rules: [
                {
                  pattern: /^[A-Za-z,]+$/,
                  message: '只允许输入英文和英文逗号',
                },
              ],
            })(<Input />)}
          </Form.Item>
        )}
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

                <Button type="cancel" onClick={() => props.history.goBack()}>
                  取消
                </Button>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

const DeployCreate = Form.create({ name: 'create' })(Create);

export default DeployCreate;
