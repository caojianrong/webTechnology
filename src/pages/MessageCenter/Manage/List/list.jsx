import React, { useState, useEffect, Children } from 'react';
import { Table, Card } from '@/components';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom';

import { NewMedia, Message, Detail } from '../components';
import dataMessage from '../../data.jsx';

const {informationObj, tableObj}  = dataMessage;



const { Option } = Select;

const columns = [
  {
    title: '序列',
    dataIndex: 'num',
  },
  {
    title: '消息模块',
    dataIndex: 'userName',
  },
  {
    title: '消息类型',
    dataIndex: 'type',
  },
  {
    title: '消息来源',
    dataIndex: 'ip',
  },
  {
    title: '推送对象',
    dataIndex: 'time',
  },
  {
    title: '用户账号',
    dataIndex: 'account',
  },
  {
    title: '推送方式',
    dataIndex: 'types',
  },
  {
    title: '推送时间',
    dataIndex: 'times',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, row) => (
      <Detail row={row}>
        <a>{text}</a>
      </Detail>
    ),
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    num: i,
    account: `Edward King ${i}`,
    type: 32,
    address: `London, Park Lane no. ${i}`,
    operation: '查看详情',
  });
}

function List(props) {
  const { getFieldDecorator } = props.form;
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { messageType } = props;
  // 表格选择事件
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  // 时间插件改变事件
  function datePickerChange(date, dateString) {
    console.log(date, dateString);
  }

  // get 和 set 数据方法
  function fetchData({ account, ip, time }) {
    // TODO 获取数据
    setList(data);
  }

  // 查询
  function handleQuery(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        fetchData(values);
      }
    });
  }

  useEffect(() => {
    fetchData({});
  });

  // 消息模块改变事件
  function handleModuleChange(value) {

  }

  return (
    <Card>
      <Form layout="inline" onSubmit={handleQuery}>
        <Form.Item label="推送时间">
          {getFieldDecorator('time')(
            <DatePicker.RangePicker onChange={datePickerChange} />,
          )}
        </Form.Item>

        {messageType === 'unChecked' ? (
          ''
        ) : (
          <Form.Item label="消息模块">
            {getFieldDecorator('module', {
              // initialValue: 'huodong',
            })(
              <Select style={{ width: 180 }} onChange={handleModuleChange}>
               {
                 informationObj.module.map((v,i) => {
                   return (
                   <Option key={`id_${v.value}`} value={v.value}>{v.text}</Option>
                   );
                 })
               }
              </Select>,
            )}
          </Form.Item>
        )}

        <Form.Item label="消息类型">
          {getFieldDecorator('type', {
            initialValue: '1',
          })(
            <Select style={{ width: 180 }} disabled>
              <Option value="1">相关活动通知</Option>
              <Option value="2">系统通知</Option>
              <Option value="3">其他类通知</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="用户账号">
          {getFieldDecorator('account')(<Input placeholder="请输入用户账号" />)}
        </Form.Item>

        <Form.Item label="推送对象">
          {getFieldDecorator('ob')(
            <Select
              style={{ width: 180 }}
              // onChange={handleChange}
              placeholder="请选择推送对象"
            >
              <Option value="weibo">客户</Option>
              <Option value="lucy">客户经理</Option>
              <Option value="ding">运营人员</Option>
              <Option value="yunying">运维人员</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>

        {messageType === 'unChecked' ? (
          ''
        ) : (
          <Form.Item>
            <Link
              to={{
                pathname: '/message/manage/media',
                // search: '?id=',
                // hash: '#the-hash',
                // state: { fromDashboard: true },
              }}
            >
              <Button type="primary">+ 新媒体发布</Button>
            </Link>
          </Form.Item>
        )}
        {messageType === 'unChecked' ? (
          ''
        ) : (
          <Form.Item>
            <Link
              to={{
                pathname: '/message/manage/publish',
              }}
            >
              <Button type="primary">+ 消息发布</Button>
            </Link>
          </Form.Item>
        )}
      </Form>
      <Table rowSelection={rowSelection} columns={columns} dataSource={list} />
    </Card>
  );
}

const Logins = Form.create({ name: 'list_filter' })(List);

export default Logins;
