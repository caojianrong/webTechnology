import React from 'react';
import { Button, Card, Form } from '@/components';

import styles from './index.module.less';

const SearchComponent = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  };

  const handleReset = () => {
    props.onReset();
    props.form.resetFields();
  };

  return (
    <Card
      className={styles.cardContent}
      bordered={false}
      bodyStyle={{ padding: '0' }}
    >
      <div className={styles.selectWrapper}>
        <Form className={styles.searchForm}>
          {props.search.map(item => (
            <Form.Item
              className={styles.searchFormItem}
              label={item.label}
              key={item.key}
            >
              {props.form.getFieldDecorator(item.label, {
                initialValue: item.initialValue ? item.initialValue : null,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(item.component)}
            </Form.Item>
          ))}
        </Form>
        <div className={styles.btnWrapper}>
          <Button type="primary" onClick={handleSubmit}>
            查询
          </Button>
          <Button className={styles.clearBtn} onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Form.create()(SearchComponent);
