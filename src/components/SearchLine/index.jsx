import React, { useState, useEffect } from 'react';
import { Table, Divider, Tabs, Form, Select, Input, Button, Card, Icon } from '@wocloud/design';
import DatePicker from '@/components/DatePicker';
const { RangePicker } = DatePicker;

const { Option } = Select;


function SearchLine(props) {

  const {
    form,
    formList,
    searchList = formList || [],
    onSubmit = () => { },
    formProps,
    value,
    buttonList
  } = props;
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, setFieldsValue } = form;

  useEffect(() => {
    // ...
    setFieldsValue(value);
  }, [value]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      onSubmit(values)
    });
  }


  return <div>
    <Form
      layout="inline"  //'vertical' 'horizontal'
      labelCol={{ span: 6, }}
      wrapperCol={{ span: 18, }}
      onSubmit={handleSubmit}
      {...formProps}
    >
      {
        searchList.map((searchItem) => {
          const { type, id, label, formItemProps, itemProps } = searchItem;
          return <Form.Item
            key={id}
            label={label}
            // validateStatus={usernameError ? 'error' : ''}
            // help={usernameError || ''}
            style={{ width: 280 }}
            {...formItemProps}
          >
            {getFieldDecorator(id, {
              // rules: [{ required: true, message: 'Please input your username!' }],
            })(
              (() => {
                switch (type) {
                  case 'select':
                    const { optionList = [] } = searchItem
                    return <Select
                      {...itemProps}
                    >
                      {
                        optionList.map((optionItem) => {
                          return <Option
                            key={optionItem.id}
                            value={optionItem.id}
                          >
                            {optionItem.value}
                          </Option>
                        })
                      }
                    </Select>
                  // DatePickerRange
                  case 'dateRange':
                    console.log(itemProps)
                    return <RangePicker
                      {...itemProps}
                    />
                  default:
                    return <Input
                      {...itemProps}
                    />
                }
              })()
            )}
          </Form.Item>
        })
      }
      {
        Array.isArray(buttonList) ? buttonList.map(({ id, text, ...other }) => (
          <Form.Item>
            <Button
              key={id}
              {...other}
            >
              {text}
          </Button>
          </Form.Item>
        )) : (buttonList ===false ? null : <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            // disabled={hasErrors(getFieldsError())}
            >
              查询
          </Button>
          </Form.Item>)
      }
    </Form>
  </div>
}

export default Form.create()(SearchLine);