import BasicLayout from '@/layouts/BasicLayout';
import customer from './customer';
import product from './product';
import workOrder from './work-order';
import system from './system';
import market from './market';
import order from './order';
import incentive from './incentive';
import message from './message';
import business from './business';

export default [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      // 客户中心
      ...customer,

      // 产品中心
      ...product,

      // 工单管理
      ...workOrder,

      // 系统管理
      ...system,

      // 云市场
      ...market,

      // 订单中心
      ...order,

      // 激励平台
      ...incentive,

      // 消息中心
      ...message,

      // 商机管理
      ...business,

      // 未匹配，重定向
      { path: '/', redirect: '/user/list' },
    ],
  },
];
