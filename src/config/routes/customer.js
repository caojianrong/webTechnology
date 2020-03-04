import userList from '@/pages/customer/user-information/list';
import userEdit from '@/pages/customer/user-information/edit';
import userCheck from '@/pages/customer/user-information/check';
import customerList from '@/pages/customer/customer-information/list';
import customerEdit from '@/pages/customer/customer-information/edit';
import customerCheck from '@/pages/customer/customer-information/check';
import accountList from '@/pages/customer/account-information/list';
import accountEdit from '@/pages/customer/account-information/edit';
import accountCheck from '@/pages/customer/account-information/check';
import verified from '@/pages/customer/customer-information/verified';
import quotaList from '@/pages/customer/quota-manage/list';
import quotaSetting from '@/pages/customer/quota-manage/setting';
import quotaCheck from '@/pages/customer/quota-manage/check';
import quotaCenter from '@/pages/customer/quota-manage/center';

export default [
  {
    path: '/user/list',
    exact: true,
    component: userList,
  },
  {
    path: '/user/edit',
    exact: true,
    component: userEdit,
  },
  {
    path: '/user/check',
    exact: true,
    component: userCheck,
  },
  {
    path: '/customer/list',
    exact: true,
    component: customerList,
  },
  {
    path: '/customer/edit',
    exact: true,
    component: customerEdit,
  },
  {
    path: '/customer/check',
    exact: true,
    component: customerCheck,
  },
  {
    path: '/account/list',
    exact: true,
    component: accountList,
  },
  {
    path: '/account/edit',
    exact: true,
    component: accountEdit,
  },
  {
    path: '/account/check',
    exact: true,
    component: accountCheck,
  },
  {
    path: '/verified',
    exact: true,
    component: verified,
  },
  {
    path: '/quota/list',
    exact: true,
    component: quotaList,
  },
  {
    path: '/quota/setting',
    exact: true,
    component: quotaSetting,
  },
  {
    path: '/quota/check',
    exact: true,
    component: quotaCheck,
  }, {
    path: '/quota/center',
    exact: true,
    component: quotaCenter,
  },
];


