import React, { useState } from 'react';
import { Steps, Button } from '@/components';
import { Breadcrumb } from '../../components';
import styles from './index.module.less';

import {
  SaleRuleConfig,
  AddAttribute,
  ApplyRelease,
  ProductCategory,
} from './components';

const { Step } = Steps;

const steps = [
  {
    title: '产品信息配置',
  },
  {
    title: '销售规则配置',
  },
  {
    title: '申请发布',
  },
];

const stepsContent = [
  {
    title: '产品信息配置',
    content: <ProductCategory />,
  },
  {
    title: '产品信息配置',
    content: <AddAttribute />,
  },
  {
    title: '销售规则配置',
    content: <SaleRuleConfig />,
  },
  {
    title: '申请发布',
    content: <ApplyRelease />,
  },
];

const breadcrumbName = [
  {
    key: 1,
    name: '产品中心',
  },
  {
    key: 2,
    name: '产品管理',
  },
  {
    key: 3,
    name: '产品创建',
  },
];

const CreateProduct = () => {
  const [current, setCurrent] = useState(0);
  const [contentCurrent, setContentCurrent] = useState(0);
  const next = () => {
    setContentCurrent(contentCurrent + 1);
    contentCurrent >= 1 ? setCurrent(current + 1) : null;
  };
  const prev = () => {
    setContentCurrent(contentCurrent - 1);
    contentCurrent > 1 ? setCurrent(current - 1) : setCurrent(0);
  };
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbName={breadcrumbName} />
      <div className={styles.content}>
        <div className={styles.stepsWrapper}>
          <div className={styles.stepsTitle}>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        </div>
        <div className={styles.stepsContent}>
          {stepsContent[contentCurrent].content}
        </div>
        <div className={styles.stepsAction}>
          <Button>保存草稿</Button>
          {contentCurrent === 3 ? (
            <Button className={styles.btnSpace}>工单预览</Button>
          ) : null}
          {contentCurrent > 0 && (
            <Button
              className={styles.btnSpace}
              type={contentCurrent !== 3 ? 'primary' : null}
              onClick={() => prev()}
            >
              上一步
            </Button>
          )}
          {contentCurrent < stepsContent.length - 1 && (
            <Button
              className={styles.btnSpace}
              type="primary"
              onClick={() => next()}
            >
              下一步
            </Button>
          )}
          {contentCurrent === 3 ? (
            <Button className={styles.btnSpace} type="primary">
              提交审核
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
