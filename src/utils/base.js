import React from 'react';
import ReactDOM from 'react-dom';
import {
  isInIcestark,
  getMountNode,
  registerAppEnter,
  registerAppLeave,
} from '@ice/stark-app';

const root = document.getElementById('root');

// 在渲染主组件前，对当前环境及安装节点进行判断
export function renderApp(AppComponent) {
  if (isInIcestark()) {
    registerAppEnter(() => {
      ReactDOM.render(<AppComponent />, getMountNode());
    });
    registerAppLeave(() => {
      ReactDOM.unmountComponentAtNode(getMountNode());
    });
  } else {
    ReactDOM.render(<AppComponent />, root);
  }
}

// 设置弹出框（Select, Tooltip, Menu 等等）渲染父节点
export function getPopupContainer() {
  return isInIcestark() ? getMountNode() : root;
}
