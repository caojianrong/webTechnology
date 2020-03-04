import React, {useState, useEffect} from 'react';
import {Descriptions, Card, Table, Select, Divider,Button,Modal} from '@wocloud/design';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.less';

const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

export default function portrait() {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: '数据中心',
      dataIndex: 'name',
      // width: '15%',
      editable: true,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <a onClick={()=>showModal(2,record)}>修改</a>
        <Divider type="vertical"/>

        <a>删除</a>

      </span>
      ),
    },


  ];
  const data = [];
  for (let i = 0; i < 130; i++) {
    data.push({
      key: i.toString(),
      name: `北京 ${i}`,
    });
  }

  const showModal = (e) => {
    // console.log('list',list)
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div className={commomStyles.IceContainer}>

      <div>
        <Descriptions title="客户信息">
          <Descriptions.Item label="客户名">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="登录账号：">1810000000</Descriptions.Item>
        </Descriptions>
      </div>
      <PageTitle title="客户总配额"/>
      <div className={commomStyles.centerButton}>
        <Button type="primary" onClick={showModal}>新增 </Button>
        <Modal
          title="数据中心"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            showSearch
            style={{ width: 200}}
            placeholder="选择数据中心"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">北京</Option>
            <Option value="lucy">上海</Option>
            <Option value="tom">南京</Option>
            <Option value="tom1">南京</Option>
            <Option value="tom2">南京</Option>
            <Option value="tom3">南京</Option>
            <Option value="tom4">南京</Option>
            <Option value="tom5">南京</Option>
            <Option value="tom6">南京</Option>
            <Option value="tom7">南京</Option>
          </Select>
        </Modal>

      </div>
      <Table columns={columns} dataSource={data}/>

    </div>
  );
}
