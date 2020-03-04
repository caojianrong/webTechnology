import React from 'react';
import { Card } from '@/components';
import { Tabs } from 'antd';
import List from './list';

const { TabPane } = Tabs;


function manage() {

  function callback(key) {
    console.log(key);
  }

  return (
    <Card>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="全部消息" key="1">
        <List messageType="all" />
      </TabPane>
      <TabPane  tab="待审核消息" key="2">
      <List messageType="unChecked" />
      </TabPane>
    </Tabs>
    </Card>

  );
}

export default manage;