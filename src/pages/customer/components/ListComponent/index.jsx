import React from 'react';
import { Card, Table, Button, Icon, Input } from '@/components';
import styles from './index.module.less';
import {Link} from 'react-router-dom';

const { Search } = Input;
const ListComponent = props => {
  return (
    <Card
      className={styles.cardContentTable}
      bordered={false}
      bodyStyle={{ padding: '0' }}
    >
      <div className={styles.ButtonGrouWrapper}>
        <div className={props.showVerified?styles.showVerified:styles.create}>
          {props.quota?props.quota:  <Link
            to={{
              pathname: props.pathname,
              search: '?id=',
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            <Button type="primary">
              <Icon type="plus" />
              {props.buttonText ? props.buttonText : '新建'}
            </Button>
          </Link>}
        </div>
        {props.search ? (
          <div className={styles.listSearchWrapper}>
            <Search
              className={styles.inputSearchWidth}
              placeholder="请输入沃云产品"
              onSearch={value => console.log(value)}
            />
          </div>
        ) : null}
      </div>
      <Table
        scroll ={ props.scroll}
        className={styles.TableTest}
        loading={props.loading || false}
        columns={props.columns || []}
        onChange={props.onChange ? props.onChange : () => {}}
        pagination={props.pagination}
        dataSource={props.data || []}
      />
    </Card>
  );
};
export default ListComponent;
