import OrderList from '@/pages/OrderCenter/List';
import OrderDetail from '@/pages/OrderCenter/Detail';
import BillManagement from '@/pages/BillOperation/BillManagement';
import BillCenter from '@/pages/BillOperation/BillCenter';
import CloudOrderList from '@/pages/BillOperation/CloudOrderList';
import Pages from '@/pages/BillOperation/Pages';


export default [
  // {
  //   path: '/pages',
  //   exact: true,
  //   component: Pages,
  // },
  {
    path: '/order/list',
    exact: true,
    component: OrderList,
  },
  {
    path: '/order/detail',
    exact: true,
    component: OrderDetail,
  },
  {
    path: '/billManagement/list',
    exact: true,
    component: BillManagement,
  },
  {
    path: '/billCenter/list',
    exact: true,
    component: BillCenter,
  },
  {
    path: '/cloudOrderList/list',
    exact: true,
    component: CloudOrderList,
  },
];


