import {
  BusinessCreation,
  BusinessVisit,
  ChangeStatus,
  BusinessSearch,
  MyBusiness,
  VisitCreation,
} from '@/pages/Business';

export default [
  {
    path: '/business/business-creation',
    exact: true,
    component: BusinessCreation,
  },
  {
    path: '/business/business-creation/:id',
    exact: true,
    component: BusinessCreation,
  },
  {
    path: '/business/visit-creation',
    exact: true,
    component: VisitCreation,
  },
  {
    path: '/business/business-visit/:id',
    exact: true,
    component: BusinessVisit,
  },
  {
    path: '/business/change-status/:id',
    exact: true,
    component: ChangeStatus,
  },
  {
    path: '/business/business-search',
    exact: true,
    component: BusinessSearch,
  },
  {
    path: '/business/my-business',
    exact: true,
    component: MyBusiness,
  },
];
