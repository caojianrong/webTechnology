import React from 'react';
import { Input, Button, Modal, Table } from '@/components';
import { StandardSelect } from '../components';

const columns = [
  { title: '登录账号', dataIndex: 'account' },
  { title: '用户名称', dataIndex: 'username' },
  { title: '联系方式', dataIndex: 'phone' },
  { title: '创建时间', dataIndex: 'createTime' },
];

class ChooseCustomerInput extends React.Component {
  state = {
    visible: false,
  };

  render(props) {
    // const { form } = this.props;
    const { visible } = this.state;

    return (
      <>
        <Input {...props} />
        <Button>选择用户</Button>
        <Modal visible={visible}>
          <div>
            <StandardSelect
              options={[
                { label: '登录账号', value: 'account' },
                { label: '用户名称', value: 'username' },
                { label: '联系电话', value: 'phone' },
              ]}
            />
            <Input />
            <Button type="primary">查询</Button>
          </div>
          <Table columns={columns} />
        </Modal>
      </>
    );
  }
}

export default ChooseCustomerInput;
