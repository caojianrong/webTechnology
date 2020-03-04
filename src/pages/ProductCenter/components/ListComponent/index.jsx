import React from 'react';
import { Card, Table, Button, Icon } from '@/components';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const ListComponent = props => {
  return (
    <Card
      className={styles.cardContentTable}
      bordered={false}
      bodyStyle={{ padding: '0' }}
    >
      <div className={styles.ButtonGrouWrapper}>
        <div className={styles.create}>
          {props.router ? (
            <Link to={'' || props.router}>
              <Button type="primary">
                <Icon type="plus" />
                {props.buttonText ? props.buttonText : '新建'}
              </Button>
            </Link>
          ) : null}
        </div>
        {props.rightComponent ? (
          <div className={styles.listSearchWrapper}>{props.rightComponent}</div>
        ) : null}
      </div>
      <Table
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
