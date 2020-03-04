import React from 'react';
import { Modal } from 'antd';
import { Icon } from '@/components';
import config from '@/config';
import classnames from 'classnames';

// Modal 静态方法的默认配置
const modalMethodOption = option => ({
  prefixCls: `${config.prefixCls}-modal`,
  okButtonProps: {
    ...option.okButtonProps,
    className: classnames(
      `${config.prefixCls}-btn ${config.prefixCls}-btn-primary`,
      option.okButtonProps && option.okButtonProps.className,
    ),
  },
  cancelButtonProps: {
    ...option.okButtonProps,
    className: classnames(
      `${config.prefixCls}-btn`,
      option.cancelButtonProps && option.cancelButtonProps.className,
    ),
  },
  ...option,
});

class CustomizedModal extends Modal {}

// 重写 Modal.info 方法
CustomizedModal.info = props =>
  Modal.info.call(
    Modal,
    modalMethodOption({
      icon: <Icon type="info-circle" theme="filled" />,
      ...props,
    }),
  );

// 重写 Modal.success 方法
CustomizedModal.success = props =>
  Modal.success.call(
    Modal,
    modalMethodOption({
      icon: <Icon type="check-circle" theme="filled" />,
      ...props,
    }),
  );

// 重写 Modal.error 方法
CustomizedModal.error = props =>
  Modal.error.call(
    Modal,
    modalMethodOption({
      icon: <Icon type="close-circle" theme="filled" />,
      ...props,
    }),
  );

// 重写 Modal.warning 方法
CustomizedModal.warning = props =>
  Modal.warning.call(
    Modal,
    modalMethodOption({
      icon: <Icon type="exclamation-circle" theme="filled" />,
      ...props,
    }),
  );

// 重写 Modal.confirm 方法
CustomizedModal.confirm = props =>
  Modal.confirm.call(
    Modal,
    modalMethodOption({
      icon: <Icon type="question-circle" theme="filled" />,
      ...props,
    }),
  );

export default CustomizedModal;
