import React from 'react';
import { Breadcrumb, Button } from '@/components';
import styles from './index.module.less';

const BreadcrumbBox = props => (
  <div className={styles.breadcrumbWrapper}>
    <Breadcrumb className={styles.breadcrumb}>
      {props.breadcrumbName.map(item => (
        <Breadcrumb.Item key={item.key}>
          <a href="">{item.name}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    {props.back ? (
      <Button className={styles.breadcrumbBack}>返回</Button>
    ) : null}
  </div>
);
export default BreadcrumbBox;
