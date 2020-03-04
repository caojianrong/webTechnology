import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import classes from './index.scss'

export default function OrderDetail() {
  return (
    <div className={commomStyles.IceContainer}>
      <PageTitle title="订单详情" />
      <div className={'mainBox'}>
        <div className={'head'}>
          <div className={'line'}>客户名称：河北XXX科技公司 cityName</div>
          <div className={'line'}>订单类型： 新购 orderType    提单人(账号ID)： zhangsan      提单时间： 2019-10-08 16:00:45</div>
        </div>
        <div className={'content'}>
          <div>
            <div className={'title'}>子订单号 subOrderId</div>
            <div>20191008227998</div>
          </div>
          <div>
            <div className={'title'}>产品名称</div>
            <div>云主机ECS</div>
          </div>
          <div>
            <div className={'title'}>实例ID</div>
            <div>89</div>
          </div>
          <div>
            <div className={'title'}>产品详情</div>
            <div className={'detail'}>
              <span className={'line'}>地域：华北地区(北京)</span>
              <span className={'line'}>可用区：北京三区 zone</span>
              <span className={'line'}>机型：1核CPU、1G内存</span>
              <span className={'line'}>镜像：CentOS 7.6 64位</span>
              <span className={'line'}>存储：系统盘(50G高性能云硬盘)</span>
              <span className={'line'}>网络：Default-VPC（默认） | Default-Subnet（默认）</span>
              <span className={'line'}>带宽：按带宽计费(带宽1Mbps</span>
            </div>
          </div>
          <div>
            <div className={'title'}>数量</div>
            <div>1</div>
          </div>
          <div>
            <div className={'title'}>单价</div>
            <div>10</div>
          </div>
          <div>
            <div className={'title'}>付款方式</div>
            <div>后付费</div>
          </div>
          <div>
            <div className={'title'}>周期</div>
            <div>2019/10/8-2020/10/7</div>
          </div>
          <div>
            <div className={'title'}>费用（元）</div>
            <div>954</div>
          </div>
        </div>
        <div className={'divce'}></div>
        <div className={'footer'}>总计费用：954.00</div>
      </div>
    </div>
  );
}

