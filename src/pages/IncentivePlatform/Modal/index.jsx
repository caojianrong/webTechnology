import React, { useState, useEffect } from 'react';
import { Table, Divider, Tabs, Select, Input, Button, Modal } from '@wocloud/design';
import SearchLine from '@/components/SearchLine';


const searchList = [
  {
    type: 'text',
    id: 'name',
    label: '姓名',
  },
  {
    type: 'text',
    id: 'number',
    label: '沃支付账号'
  },
  {
    type: 'text',
    id: 'stdio',
    label: '分配比例'
  },
]


export default function BillCenter(props) {

  const { visible, data, onCancel } = props;

  return (
    <div>
      <Modal
        title={data._type}
        visible={visible}
        width={1000}
        // onOk={this.handleOk}
        onCancel={onCancel}
      >
        <SearchLine formList={searchList} buttonList={false} />
      </Modal>
    </div>
  );
}

