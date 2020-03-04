import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, message } from '@/components';
import { getPopupContainer } from '@/utils/base';
import config from '@/config';
import routes from '@/config/routes';
import AppRouter from './AppRouter';

// message 组件全局配置
message.config({
  // ConfigProvider 无法配置 message 的 prefixCls，需要单独配置
  prefixCls: `${config.prefixCls}-message`,
});

function App() {
  return (
    <ConfigProvider
      prefixCls={config.prefixCls}
      locale={zhCN}
      getPopupContainer={getPopupContainer}
    >
      <AppRouter routes={routes} />
    </ConfigProvider>
  );
}

export default App;
