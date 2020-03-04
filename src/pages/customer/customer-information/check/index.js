import React, { useState, useEffect } from 'react';
import {Tabs, Table} from '@wocloud/design';
import {Breadcrumb} from "../../../ProductCenter/components";
import styles from "./index.module.less";
const { TabPane } = Tabs;
const detail=[
  {
    name: '客户名称',
    content: '河北XXX科技有限公司',
  },
  {
    name: '登录账户',
    content: 'bt_test01',
  },
];
const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '客户资料管理',
  },
  {
    key: 3,
    name: '360画像',
  },
];
function callback(key) {
  console.log(key);
}
function calloperations(key){
  console.log(key)
}
const profileDetailsColumns=[
  {
    title: '订单编号',
    dataIndex: 'number',
  },
  {
    title: '订单类型',
    dataIndex: 'type',
  },
  {
    title: '资源类型',
    dataIndex: 'resources',
  },
  {
    title: '订单金额',
    dataIndex: 'money',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间 ',
    dataIndex: 'time',
  },
];
const profileDetailsData=[
  {
    number:'123',
    type:'类型',
    resources:'资源类型',
    money:123,
    status:'已发货',
    time:'2018-09-09',
  }
];
const orderColumns =[
  {
    title: '订单编号',
    dataIndex: 'number',
  },
  {
    title: '订单类型',
    dataIndex: 'type',
  },
  {
    title: '资源类型',
    dataIndex: 'resources',
  },
  {
    title: '订单金额',
    dataIndex: 'money',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间 ',
    dataIndex: 'time',
  },
];
const orderData =[
  {
    number:'123',
    type:'类型',
    resources:'资源类型',
    money:123,
    status:'已发货',
    time:'2018-09-09',
  }
];

const workColumns = [
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '工单编码',
    dataIndex: 'number',
  },
  {
    title: '关联工单',
    dataIndex: 'contact',
  },
  {
    title: '来源',
    dataIndex: 'source',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '创建时间 ',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  },
];
const workData =[
  {
    type:'类型',
    number:'工单编码',
    contact:'关联工单',
    source:'来源',
    title:'标题',
    time:'2018-09-09',
    operate:'操作',
  }
];
const letterColumns=[
  {
    title: '通知方式',
    dataIndex: 'way',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '通知时间',
    dataIndex: 'time',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];
const letterData = [
  {
    key: '1',
    way:'通知方式',
    title:'标题',
    content:'内容内容内容内容',
    time:'2018-08-02',
    status:'未读',
  },
];


const loginColumns=[
  {
    title: '#',
    dataIndex: 'number',
  },
  {
    title: '登录ip',
    dataIndex: 'ip',
  },
  {
    title: '登录时间',
    dataIndex: 'time',
  },
];
const loginData = [
  {
    key: '1',
    number:1,
    ip:'127.0.0.1',
    time:'2018-08-08'
  },
];

const businessColumns =[
  {
    title: '通知方式',
    dataIndex: 'type',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '通知时间',
    dataIndex: 'time',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];
const businessData = [
  {
    key: '1',
    type:'站内信',
    title: '预付费',
    content:'您有预付费资源进行释放，释放后数据无法恢复。 产品信息 到期时间',
    time:'2017-10-01 12:00',
    status:'未读',
  },
];


const billData = [
  {
    key: '1',
    total:'123',
    December:'1',
    November:'2',
    October:'3',
    September:'4',
    August:'5',
  },
];

const billColumns = [
  {
    title: '账单总金额',
    dataIndex: 'total',
  },
  {
    title: '12月',
    dataIndex: 'December',
  },
  {
    title: '11月',
    dataIndex: 'November',
  },
  {
    title: '10月',
    dataIndex: 'October',
  },
  {
    title: '9月',
    dataIndex: 'September',
  },{
    title: '8月',
    dataIndex: 'August',
  },
];

const customerData = [
  {
    key: '1',
    index:'1',
    type:'沃云A',
    number:'099ALW432135',
    manager:'张三',
    phone:'13244888888',
    time:'2017-10-01 12:00',
    ip:'127.0.0.1'
  },
  {
    key: '2',
    index:'2',
    type:'沃云A',
    number:'099ALW432135',
    manager:'张三',
    phone:'13244888888',
    time:'2017-10-01 12:00',
    ip:'127.0.0.1'
  },
  {
    key: '3',
    index:'3',
    type:'沃云A',
    number:'099ALW432135',
    manager:'张三',
    phone:'13244888888',
    time:'2017-10-01 12:00',
    ip:'127.0.0.1'
  },
];
const customerColumns = [
  {
    title: '账号',
    dataIndex: 'index',
  },
  {
    title: '邮箱',
    dataIndex: 'type',
  },
  {
    title: '客户名称',
    dataIndex: 'number',
  },
  {
    title: '客户登记',
    dataIndex: 'manager',
  },
  {
    title: '关联客户经理',
    dataIndex: 'phone',
  },{
    title: '最后一次登录时间',
    dataIndex: 'time',
  },{
    title: '最后登录IP',
    dataIndex: 'ip',
  },
];
// const operations = <Button>Extra Action</Button>;

export default function customerPortrait() {
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} back />
      <div className={styles.content}>
        <div className={styles.infoBox}>
          <h5>客户信息</h5>
          <ul className={styles.detailBox}>
            {(detail || []).map((item, i) => (
              <li className={styles.detailItem} key={i}>
                <span className={styles.itemName}>{`${item.name}：`}</span>
                <span className={styles.itemContent}>{item.content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoTitle}>
          <h5>360画像</h5>
        </div>

        <Tabs defaultActiveKey="1" onChange={callback} type="card">
          <TabPane tab="概览" key="1">
            <div className={styles.infoBox}>
              <div className={styles.usreTile}>用户信息</div>
              <Table
                className={styles.table}
                columns={customerColumns} dataSource={customerData}
              />
              <div className={styles.usreTile}>账单概览</div>
              <Table
                className={styles.table}
                columns={billColumns} dataSource={billData} size="middle"
              />
              <div className={styles.usreTile}>最近5条通知记录</div>
              <Table
                className={styles.table}
                columns={businessColumns} dataSource={businessData} size="middle"
              />
            </div>
          </TabPane>
          <TabPane tab="用户资料" key="2">
            <div className={styles.infoBox}>
              <div className={styles.usreTile}>用户资料</div>
              <Table
                className={styles.table}
                columns={customerColumns} dataSource={customerData}
              />
              <div className={styles.usreTile}>关联信息</div>
              <Table
                className={styles.table}
                columns={billColumns} dataSource={billData} size="middle"
              />
              <div className={styles.usreTile}>其他业务号码</div>
              <Table
                className={styles.table}
                columns={businessColumns} dataSource={businessData} size="middle"
              />
            </div>
          </TabPane>
          <TabPane tab="资料详情" key="3">
            资源信息
            <Table
              className={styles.table}
              columns={profileDetailsColumns} dataSource={profileDetailsData} size="middle"
            />
          </TabPane>
          <TabPane tab="订单信息" key="4">
            订单信息
            <Table
              className={styles.table}
              columns={orderColumns} dataSource={orderData} size="middle"
            />
          </TabPane>
          <TabPane tab="工单记录" key="5">
            <Table
              className={styles.table}
              columns={workColumns} dataSource={workData} size="middle"
            />
          </TabPane>
          <TabPane tab="通知记录" key="6">
            <Tabs  onChange={calloperations}>
              <TabPane tab=" 站内信" key="8">
                <Table
                  className={styles.table}
                  columns={letterColumns} dataSource={letterData} size="middle"
                />
              </TabPane>
              <TabPane tab="短信" key="9">
                <Table
                  className={styles.table}
                  columns={letterColumns} dataSource={letterData} size="middle"
                />
              </TabPane>
              <TabPane tab="邮件" key="10">
                <Table
                  className={styles.table}
                  columns={letterColumns} dataSource={letterData} size="middle"
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="登录记录" key="7">
            <Table
              className={styles.table}
              columns={loginColumns} dataSource={loginData} size="middle"
            />
          </TabPane>
        </Tabs>
      </div>

    </div>



  );
}
