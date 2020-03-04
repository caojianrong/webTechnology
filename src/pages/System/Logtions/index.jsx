import React, { useState, useEffect } from 'react';
import { Table, Card } from '@/components';
import { Form, Input, Button, DatePicker } from 'antd';

const columns = [
  {
    title: '序列',
    dataIndex: 'num',
  },
  {
    title: '登陆账号',
    dataIndex: 'userName',
  },
  {
    title: '登陆类型',
    dataIndex: 'type',
  },
  {
    title: 'ip地址',
    dataIndex: 'ip',
  },
  {
    title: '登陆时间',
    dataIndex: 'time',
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
  });
}

function List(props) {
  const { getFieldDecorator } = props.form;
  const [list, setList] = useState([]);

  // 时间插件改变事件
  function datePickerChange (date, dateString) {
    console.log(date, dateString);
  }

  // get 和 set 数据方法
  function fetchData({account, ip, time}) {
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

  return (
    <Card>
      <Form layout="inline" onSubmit={handleQuery}>
        <Form.Item label="登录账号">
          {getFieldDecorator('account')(
            <Input
             placeholder="请输入登录账号"
            />,
          )}
        </Form.Item>
        <Form.Item label="ip地址">
          {getFieldDecorator('ip')(
            <Input
             placeholder="请输入登录账号"
            />,
          )}
        </Form.Item>
        <Form.Item label="登录日期">
          {getFieldDecorator('time')(
            <DatePicker.RangePicker
              onChange={datePickerChange}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={list}/>
    </Card>
  );
}


const Logins = Form.create({ name: 'list_filter' })(List);

export default Logins;