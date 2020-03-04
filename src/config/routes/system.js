import {SystemPersonal, SystemOperation, SystemLogtions} from '@/pages/System';

export default [
  {
    path: '/system/personal',
    exact: true,
    component: SystemPersonal,
  },
  {
    path: '/system/operation',
    exact: true,
    component: SystemOperation,
  },
  {
    path: '/system/logtions',
    exact: true,
    component: SystemLogtions,
  },
];


