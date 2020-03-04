import { MessageDeployList, MessageDeployCreate ,MessageManageList, NewMedia, Publish, MessageSubscribe } from '@/pages/MessageCenter';

export default [
  // 消息管理
  {
    path: '/message/manage/list',
    exact: true,
    component: MessageManageList,
  },
  // 新媒体发布
  {
    path: '/message/manage/media',
    exact: true,
    component: NewMedia,
  },
  // 消息发布
  {
    path: '/message/manage/publish',
    exact: true,
    component:  Publish,
  },
  // 消息订阅
  {
    path: '/message/subscribe',
    exact: true,
    component: MessageSubscribe,
  },

  // 消息配置
  {
    path: '/message/deploy/list',
    exact: true,
    component: MessageDeployList,
  }, 
  {
    path: '/message/deploy/create',
    exact: true,
    component: MessageDeployCreate,
  }, 
  {
    path: '/message/deploy/edit',
    exact: true,
    component: MessageDeployCreate,
  },  
];


