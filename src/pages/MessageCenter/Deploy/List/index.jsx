import React, { useState, useEffect } from 'react';
import { Table, Card } from '@/components';
import { Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import stores from '../../stores';
// import CreateTemplate from './components/Create';

const { Option } = Select;

const columns = [
  {
    title: '序列',
    dataIndex: 'num',
  },
  {
    title: '消息模块',
    dataIndex: 'module',
  },
  {
    title: '消息类型',
    dataIndex: 'type',
  },
  {
    title: '消息内容模版',
    dataIndex: 'detail',
  },
  {
    title: '状态',
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

  const deploy = stores.useStore('deploy');
  console.log(deploy);

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

  return (
    <Card>
      <Form layout="inline" onSubmit={handleQuery}>
        <Form.Item label="消息模块">
          {getFieldDecorator('module')(<Input placeholder="请输入消息模块" />)}
        </Form.Item>
        <Form.Item label="消息类型">
          {getFieldDecorator('type')(
            <Select style={{ width: 160 }} placeholder="请选择消息类型">
              <Option value="1">异常登录提醒</Option>
              <Option value="2">漏洞周报</Option>
              <Option value="3">安全事件提醒</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Link
            to={{
              pathname: '/message/deploy/create',
            }}
          >
            <Button type="primary">+ 新建模版</Button>
          </Link>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={list} />
    </Card>
  );
}

const Logins = Form.create({ name: 'list_filter' })(List);

export default Logins;
