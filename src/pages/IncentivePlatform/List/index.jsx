import React, { useState, useEffect, useRef } from 'react';
import { Table, Divider, Tabs, Form, Select, Input, Button } from '@wocloud/design';
import { Link } from 'react-router-dom';
// import { request } from '@wocloud/utils';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import SearchLine from '@/components/SearchLine';
import { data } from '../mock';
import search from '@/pages/customer/user-information/list/search';
import Modal from '../Modal'

let [visible, setVisible] = [false];
let modalData, setModalData;
const searchList = [
  {
    type: 'text',
    id: 'productName',
    label: '订单编号',
  },
  {
    type: 'text',
    id: 'supplierName',
    label: '产品名称'
  },
  {
    type: 'select',
    id: 'suppState',
    label: '激励状态',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 0,
        value: '待申请'
      },
      {
        id: 1,
        value: '待审核'
      },
      {
        id: 2,
        value: '审核通过'
      },
      {
        id: 3,
        value: '审核不通过'
      },
      {
        id: 4,
        value: '待发放'
      },
      {
        id: 5,
        value: '已发放'
      },
      {
        id: 6,
        value: '发放失败'
      },
      {
        id: 7,
        value: '退回成功'
      },
    ]
  },
  {
    type: 'select',
    id: 'orderType',
    label: '申请类型',
    optionList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: 'id2',
        value: '新购'
      },
      {
        id: 'id3',
        value: '续费'
      },
    ]
  },
  {
    type: 'dateRange',
    id: 'date', // billStartDate billEndDate
    label: '申请时间'
  },
]

const columns = [
  {
    title: '订单编号',
    dataIndex: 'monthId',
    // render: text => <a>{text}</a>,
  },
  {
    title: '产品名称',
    dataIndex: 'provinceCode',
  },
  {
    title: '账单金额（元）',
    dataIndex: 'provinceName',
  },
  {
    title: '激励比例（%）',
    dataIndex: 'cityCode',
  },
  {
    title: '申请类型',
    dataIndex: 'cityName',
  },
  {
    title: '激励状态',
    dataIndex: 'developerStaffId',
  },
  {
    title: '申请时间',
    dataIndex: 'developerStaffName',
  },
  {
    title: '操作',
    dataIndex: 'custName',
    render: () => <div>
      <a onClick={() => {
        setModalData({_type: 'action'})
        setVisible(true)
      }}>发放申请</a>
      <Divider type="vertical" />
      <a onClick={() => {
        setModalData({_type: 'reject'})
        setVisible(true)
      }}>退回申请</a>
      <Divider type="vertical" />
      <a onClick={() => {
        setModalData({_type: 'detail'})
        setVisible(true)
      }}>查看详情</a>
    </div>
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default function BillCenter() {

  const [searchValue, setSearchValue] = useState({ text2: 'default' });
  [visible, setVisible] = useState(false);
  [modalData, setModalData] = useState({})


  const onSearch = (data) => {
    console.log(data)
  }


  const buttonList = [
    {
      id: 'search',
      text: '查询',
      type: "primary",
      htmlType: "submit"
    },
    {
      id: 'export',
      text: '导出'
    }
  ]

  return (
    <div className={commomStyles.IceContainer}>
      <PageTitle title="激励查询" />
      <SearchLine
        value={searchValue}
        searchList={searchList}
        buttonList={buttonList}
        onSubmit={onSearch}
      />
      <Table
        // scroll={{ x: 3500 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Basic Modal"
        visible={visible}
        // onOk={this.handleOk}
        data={modalData}
        onCancel={(bool) => setVisible(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

