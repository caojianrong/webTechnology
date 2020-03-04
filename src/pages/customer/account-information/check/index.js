import React, {useState, useEffect} from 'react';
import { Spin } from '@/components';
import styles from './index.module.less';
import {Breadcrumb} from "../../../ProductCenter/components";
import stores from '../../stores';

const breadcrumbName = [
  {
    key: 1,
    name: '客户中心',
  },
  {
    key: 2,
    name: '账户管理',
  },
  {
    key: 3,
    name: '详情',
  },
];
export default function accountPortrait() {
  const accountDetailStore = stores.useStore('accountDetail');
  const { detail, getAccountDetail ,loading} = accountDetailStore;
  // 生命周期
  useEffect(() => {
    getAccountDetail();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} back />
      <div className={styles.content}>
        <div className={styles.infoBox}>
          <h5>账户信息</h5>
          <Spin spinning={loading} delay={500} style={{minHeight:'40vw'}}>
            <ul className={styles.detailBox}>
              {(detail || []).map((item, i) => (
                <li className={styles.detailItem} key={i}>
                  <span className={styles.itemName}>{`${item.name}:`}</span>
                  <span className={styles.itemContent}>{item.content}</span>
                </li>
              ))}
            </ul>
          </Spin>
        </div>
      </div>
    </div>
  );
}
