/**
 * 功能：
 * 1. 传入 items 属性，使 TableFilterForm 可配置
 * 2. 传入 onSearch、onReset 属性，监听查询、重置按钮点击事件
 */

import React from 'react';
import { Form, Button } from '@/components';

@Form.create('table_filter')
class TableFilter extends React.Component {
  static defaultProps = {
    items: [],
    onSearch: () => {},
    onReset: () => {},
  };

  // 监听查询按钮
  handleSearch = () => {
    const { form, onSearch } = this.props;
    onSearch(form.getFieldsValue());
  };

  // 监听重置按钮
  handleReset = () => {
    const { form, onReset } = this.props;
    form.resetFields();
    onReset(form.getFieldsValue());
  };

  // 渲染表单项
  renderFormItems() {
    const { form, items } = this.props;
    return items.map(item => {
      const { label, field, options, component } = item;
      return (
        <Form.Item label={label} key={field}>
          {form.getFieldDecorator(field, options)(component)}
        </Form.Item>
      );
    });
  }

  render() {
    return (
      <Form layout="inline" noValidate autoComplete="off">
        {this.renderFormItems()}
        <Form.Item>
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            onClick={this.handleSearch}
          >
            查询
          </Button>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default TableFilter;
