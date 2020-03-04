import React, { useState } from 'react';
import { Form, Select, Button, Table, Modal, Checkbox } from '@/components';

const TableFilter = Form.create()(props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  return (
    <Form layout="inline" noValidate autoComplete="off">
      <Form.Item label="消息模块">
        {getFieldDecorator('messageModule', {
          initialValue: 'all',
        })(
          <Select style={{ width: 100 }}>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="alert">告警类</Select.Option>
            <Select.Option value="product">产品类</Select.Option>
            <Select.Option value="finance">财务类</Select.Option>
            <Select.Option value="activity">活动类</Select.Option>
            <Select.Option value="other">其他类</Select.Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="消息类型">
        {getFieldDecorator(
          'messageType',
          {},
        )(<Select style={{ width: 100 }} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary">查询</Button>
      </Form.Item>
    </Form>
  );
});

const SubscribeSettingForm = Form.create()(props => {
  const { form, record } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <Form {...formItemLayout} noValidate autoComplete="off">
      <Form.Item label="消息模块">{record.messageModule}</Form.Item>
      <Form.Item label="消息类型">{record.messageType}</Form.Item>
      <Form.Item label="推送方式">
        {getFieldDecorator('pushMethod', {
          initialValue: ['stationLetter'],
        })(
          <Checkbox.Group
            options={[
              { label: '站内信', value: 'stationLetter' },
              { label: '邮件', value: 'mail' },
              { label: '短信', value: 'SMS' },
            ]}
          />,
        )}
      </Form.Item>
      <Form.Item label="推送组别">
        {getFieldDecorator('pushGroup', {
          initialValue: ['customer', 'accountManager'],
        })(
          <Checkbox.Group
            options={[
              { label: '客户', value: 'customer' },
              { label: '客户经理', value: 'accountManager' },
            ]}
          />,
        )}
      </Form.Item>
      <Form.Item label="推送策略">
        {getFieldDecorator(
          'pushStrategy',
          {},
        )(
          <Select>
            <Select.Option value="">请选择</Select.Option>
            <Select.Option value="15">每月4天</Select.Option>
            <Select.Option value="7">每月1天</Select.Option>
          </Select>,
        )}
      </Form.Item>
    </Form>
  );
});

function MessageSubscribe() {
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: '序号',
      dataIndex: 'messageNumber',
    },
    {
      title: '消息模块',
      dataIndex: 'messageModule',
    },
    {
      title: '消息类型',
      dataIndex: 'messageType',
    },
    {
      title: '推送方式',
      dataIndex: 'pushMethod',
    },
    {
      title: '推送组别',
      dataIndex: 'pushGroup',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        return record.children ? null : (
          <a onClick={() => setVisible(record)}>设置</a>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: 1,
      messageNumber: '01',
      messageModule: '告警类',
      messageType: '安全告警消息',
      pushMethod: '站内信/邮件/短信',
      pushGroup: '客户/客户经理',
    },
    {
      key: 2,
      messageNumber: '02',
      messageModule: '产品类',
      messageType: '资源到期提醒',
      pushMethod: '站内信/邮件/短信',
      pushGroup: '客户/客户经理',
    },
    {
      key: 3,
      messageNumber: '03',
      messageModule: '产品类',
      messageType: '资源到期提醒',
      pushMethod: '站内信/邮件/短信',
      pushGroup: '客户/客户经理',
    },
    {
      key: 4,
      messageNumber: '04',
      messageModule: '财务类',
      messageType: '账单推送',
      pushMethod: '站内信/邮件/短信',
      pushGroup: '客户经理',
    },
    {
      key: 5,
      messageNumber: '05',
      messageModule: '财务类',
      messageType: '欠费通知',
      pushMethod: '站内信/邮件/短信',
      pushGroup: '客户经理',
    },
  ];

  return (
    <>
      <h1>消息中心-消息订阅</h1>
      <TableFilter />
      <Table columns={columns} pagination={false} dataSource={dataSource} />
      <Modal
        title="订阅设置"
        visible={!!visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <SubscribeSettingForm record={visible} />
      </Modal>
    </>
  );
}

export default MessageSubscribe;
