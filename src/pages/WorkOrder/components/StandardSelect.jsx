/**
 * 功能：
 * 1. 传入 options 属性，使 Select.Option 可配置
 */

import React from 'react';
import { Select } from '@/components';

class CustomizedSelect extends Select {
  // 渲染下拉选项
  renderOption = option => {
    const { label, ...optionProps } = option;
    return (
      <Select.Option key={optionProps.value} {...optionProps}>
        {label}
      </Select.Option>
    );
  };

  // 渲染下拉选项组
  renderOptGroup = optGroup => {
    const { options, ...optGroupProps } = optGroup;
    return (
      <Select.OptGroup {...optGroupProps}>
        {options.map(option => this.renderOption(option))}
      </Select.OptGroup>
    );
  };

  render() {
    const { options, ...selectProps } = this.props;

    if (options) {
      return (
        <Select {...selectProps}>
          {options.map(option => {
            // 存在 option.options，则先渲染下拉选项组
            if (option.options) {
              return this.renderOptGroup(option);
            }
            return this.renderOption(option);
          })}
        </Select>
      );
    }

    return <Select {...selectProps} />;
  }
}

export default CustomizedSelect;
