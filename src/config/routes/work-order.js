import WorkOrderQuery from '@/pages/WorkOrder/Query';
import WorkOrderQueryDetail from '@/pages/WorkOrder/Query/Detail';
import WorkOrderList from '@/pages/WorkOrder/List';
import CreateCustomerWO from '@/pages/WorkOrder/List/CreateCustomerWO';
import CreatePersonalWO from '@/pages/WorkOrder/List/CreatePersonalWO';
import HandleByMe from '@/pages/WorkOrder/List/HandleByMe';
import CreatedByMe from '@/pages/WorkOrder/List/CreatedByMe';
import WorkOrderSetting from '@/pages/WorkOrder/Setting';

export default [
  // 工单查询
  {
    path: '/work-order/query',
    exact: true,
    component: WorkOrderQuery,
  },
  {
    path: '/work-order/query/detail',
    exact: true,
    component: WorkOrderQueryDetail,
  },
  // 我的工单 - 全部工单
  {
    path: '/work-order/list',
    exact: true,
    component: WorkOrderList,
  },
  {
    path: '/work-order/list/create-customer-work-order',
    exact: true,
    component: CreateCustomerWO,
  },
  {
    path: '/work-order/list/create-personal-work-order',
    exact: true,
    component: CreatePersonalWO,
  },
  // 我的工单 - 我的处理
  {
    path: '/work-order/list/handle-by-me',
    exact: true,
    component: HandleByMe,
  },
  // 我的工单 - 我的提交
  {
    path: '/work-order/list/created-by-me',
    exact: true,
    component: CreatedByMe,
  },
  // 工单配置
  {
    path: '/work-order/setting',
    exact: true,
    component: WorkOrderSetting,
  },
];
