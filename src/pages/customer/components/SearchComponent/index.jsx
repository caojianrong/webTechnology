import React from 'react';
import { Button, Card, Form } from '@/components';

import styles from './index.module.less';

const SearchComponent = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        Object.keys(values).map((key)=>{
          // 表单值未定义处理
          values[key] = values[key] ? values[key] : '';
          // 表单值是时间moment格式处理
          // values[key] = values[key]._isAMomentObject
          //   ? moment(values[key]).format("YYYY-MM-DD HH:mm:ss")
          //   : values[key]
        });
        props.submit(values);
      }
    });
  };
  const clear = e => {
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
        <Form className={styles.searchForm} onSubmit={handleSubmit}>
          {props.search.map(item => (
            <Form.Item
              className={styles.searchFormItem}
              label={item.label}
              key={item.key}
            >
              {props.form.getFieldDecorator(item.label, {
                initialValue: item.initialValue ? item.initialValue : undefined,
                rules: [
                  {
                    required: false,
                    message: 'Input something!',
                  },
                ],
              })(item.component)}
            </Form.Item>
          ))}
          <Form.Item className={styles.searchFormItem}>
            <Button type="primary" onClick={handleSubmit}>查询</Button>
            <Button onClick={clear}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Form.create()(SearchComponent);
