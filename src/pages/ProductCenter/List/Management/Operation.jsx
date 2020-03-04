import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@/components';
import styles from './index.module.less';

const Operation = props => {
  switch (props.status) {
    case '待审核':
      return null;
    case '已发布':
      return (
        <span>
          <Link
            className={styles.tableOperation}
            to={`/product/upper-and-lower/${props.id}`}
          >
            上下架管理
          </Link>
          <Divider type="vertical" />
          <Link
            to={`/product/config/${props.id}`}
            className={styles.tableOperation}
          >
            修改
          </Link>
        </span>
      );
    case '草稿':
      return (
        <span>
          <Link
            to={`/product/configr/${props.id}`}
            className={styles.tableOperation}
          >
            修改
          </Link>
          <Divider type="vertical" />
          <a className={styles.tableOperation} onClick={props.deleteFn}>
            删除
          </a>
        </span>
      );
    default:
      return (
        <span>
          <Link
            className={styles.tableOperation}
            to={`/product/upper-and-lower/${props.id}`}
          >
            上下架管理
          </Link>
          <Link
            to={`/product/configr/${props.id}`}
            className={styles.tableOperation}
          >
            修改
          </Link>
          <a className={styles.tableOperation} onClick={props.deleteFn}>
            删除
          </a>
        </span>
      );
  }
};
export default Operation;
