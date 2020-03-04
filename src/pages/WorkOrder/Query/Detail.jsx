import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'qs/lib/parse';
import { Card, Descriptions, Icon, List, Button } from '@/components';
import stores from '../stores';
import styles from './Detail.module.less';

function WorkOrderDetail(props) {
  const { location } = props;

  const { workOrderDetail: d, fetchWorkOrderDetail } = stores.useStore('query');

  const renderListItem = item => (
    <List.Item>
      <div style={{ marginBottom: 12 }}>
        <span>{item.username}</span>
        <span style={{ float: 'right' }}>{item.date}</span>
      </div>
      <pre>{item.record}</pre>
    </List.Item>
  );

  // 初始化获取
  useEffect(() => {
    const { id } = parse(location.search, { ignoreQueryPrefix: true });
    fetchWorkOrderDetail(id);
  }, []);

  return (
    <div className={styles['work-order-detail']}>
      <div style={{ marginBottom: 20 }}>工单管理 / 工单查询 / 工单详情</div>
      <Card bodyStyle={{ paddingLeft: 75 }}>
        <Descriptions size="middle" column={1}>
          <Descriptions.Item label="工单编号">
            {d.workOrderNumber}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {d.creationTime}
          </Descriptions.Item>
          <Descriptions.Item label="工单状态">
            {d.workOrderStatus}
          </Descriptions.Item>
          <Descriptions.Item label="工单来源">
            {d.workOrderSource}
          </Descriptions.Item>
          <Descriptions.Item label="工单分类">
            {d.workOrderCategory}
          </Descriptions.Item>
          <Descriptions.Item label="工单类型">
            {d.workOrderType}
          </Descriptions.Item>
          <Descriptions.Item label="创建人">{d.initiator}</Descriptions.Item>
          <Descriptions.Item label="创建人账号">
            {d.initiatorAccount}
          </Descriptions.Item>
          <Descriptions.Item label="创建人联系方式">
            {d.initiatorContact}
          </Descriptions.Item>
          <Descriptions.Item label="当前处理人">
            {d.processor}
          </Descriptions.Item>
          <Descriptions.Item label="当前处理人账号">
            {d.processorAccount}
          </Descriptions.Item>
          <Descriptions.Item label="当前处理人联系方式">
            {d.processorContact}
          </Descriptions.Item>
          <Descriptions.Item label="工单标题">
            {d.workOrderTitle}
          </Descriptions.Item>
          <Descriptions.Item label="产品名称">
            {d.productName}
          </Descriptions.Item>
          <Descriptions.Item label="问题描述">
            <pre>{d.problemDescription}</pre>
          </Descriptions.Item>
          <Descriptions.Item label="其他信息">
            <pre>{d.otherInformation}</pre>
          </Descriptions.Item>
          <Descriptions.Item label="附件">
            <a href={d.attachment && d.attachment.link}>
              <Icon style={{ paddingRight: 6 }} type="paper-clip" />
              <span>{d.attachment && d.attachment.file}</span>
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="沟通记录">
            <List
              style={{ width: 600 }}
              size="small"
              itemLayout="vertical"
              bordered
              dataSource={d.communicationRecord}
              renderItem={renderListItem}
            />
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary">
          <Link to="/work-order/query">返回</Link>
        </Button>
      </Card>
    </div>
  );
}

export default WorkOrderDetail;
