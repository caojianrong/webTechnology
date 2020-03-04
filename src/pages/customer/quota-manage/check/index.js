import React, { useState, useEffect } from 'react';
import {Table} from '@wocloud/design';
import {Breadcrumb} from "../../../ProductCenter/components";
import styles from "./index.module.less";
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
    name: '配置管理',
  },
  {
    key: 3,
    name: '详情',
  },
];
const columns1 = [
  {
    title: '数据中心',
    dataIndex: 'name',
    width: '15%',
    editable: true,
  },
  {
    title: '区域',
    dataIndex: 'age',
    width: '15%',
    editable: true,
  },
  {
    title: 'CPU（核）',
    dataIndex: 'address',
    width: '13%',
    editable: true,
  },
  {
    title: '内存（GB）',
    dataIndex: 'address1',
    width: '13%',
    editable: true,
  },
  {
    title: '数据盘（个）',
    dataIndex: 'address2',
    width: '13%',
    editable: true,
  },
  {
    title: '存储（GB）',
    dataIndex: 'address3',
    width: '13%',
    editable: true,
  },
  {
    title: '云主机',
    dataIndex: 'address4',
    width: '13%',
    editable: true,
  },

];
const columns = [
  {
    title: '数据中心',
    dataIndex: 'name',
    width: '15%',
    editable: true,
  },
  {
    title: '负载均衡(个 )',
    dataIndex: 'age',
    width: '15%',
    editable: true,
  },
  {
    title: '公网ip（个）',
    dataIndex: 'address',
    width: '13%',
    editable: true,
  },
  {
    title: '路由（个）',
    dataIndex: 'address1',
    width: '13%',
    editable: true,
  },
  {
    title: '公网带宽（MB）',
    dataIndex: 'address2',
    width: '13%',
    editable: true,
  },
  {
    title: '镜像（GB）',
    dataIndex: 'address3',
    width: '13%',
    editable: true,
  },

];
const data = [];
for (let i = 0; i < 130; i++) {
  data.push({
    key: i.toString(),
    name: `北京 ${i}`,
    age: 32,
    address: ` ${i}`,
    address1: `${i}`,
    address2: ` ${i}`,
    address3: ` ${i}`,
  });
}
const data1 = [];
for (let i = 0; i < 130; i++) {
  data1.push({
    key: i.toString(),
    name: `北京 ${i}`,
    age: 'cell01.nanjing',
    address: ` ${i}`,
    address1: `${i}`,
    address2: ` ${i}`,
    address3: ` ${i}`,
    address4: ` ${i}`,
  });
}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default function portrait() {
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

        <div className={styles.infoBox}>
          <h5>客户总配额</h5>
          <div>不区分域配额</div>
          <div style={{height:'12px'}}></div>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data}
          />
          <div >不区分域配额</div>
          <div style={{height:'12px'}}></div>
          <Table
            className={styles.table}
            columns={columns1}
            dataSource={data1}
          />
        </div>

        {/*<div className={styles.infoBox}>*/}
        {/*  <h5>销售策略</h5>*/}
        {/*  <Table*/}
        {/*    className={styles.table}*/}
        {/*    loading={loading}*/}
        {/*    columns={columnsTable}*/}
        {/*    dataSource={upperAndLowerList}*/}
        {/*    onChange={onTimeChange}*/}
        {/*    pagination={pagination}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>


      <div >


        {/*<div >*/}
        {/*  <Descriptions title="客户信息">*/}
        {/*    <Descriptions.Item label="客户名">Zhou Maomao</Descriptions.Item>*/}
        {/*    <Descriptions.Item label="登录账号：">1810000000</Descriptions.Item>*/}
        {/*  </Descriptions>*/}
        {/*</div>*/}
        {/*<Table  columns={columns} dataSource={data} />*/}
        {/*<Table  columns={columns1} dataSource={data1} />*/}
      </div>
    </div>

  );
}
