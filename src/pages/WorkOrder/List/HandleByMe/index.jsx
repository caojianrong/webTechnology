import React from 'react';
import { Tabs } from '@/components';
import TodoList from './TodoList';
import DoingList from './DoingList';
import DoneList from './DoneList';
import ClosedList from './ClosedList';

function HandleByMe() {
  return (
    <>
      <h1>工单管理 - 我的工单 - 我的处理</h1>
      <Tabs defaultActiveKey="todo" type="card">
        <Tabs.TabPane tab="待处理" key="todo">
          <TodoList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="处理中" key="doing">
          <DoingList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="已解决" key="done">
          <DoneList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="已关闭" key="closed">
          <ClosedList />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default HandleByMe;
