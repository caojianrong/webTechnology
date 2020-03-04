import MessageDeploy from './Deploy';
import manage from './Manage';
import MessageSubscribe from './Subscribe';

const { MessageManageList, NewMedia, Publish } = manage;

const { MessageDeployList, MessageDeployCreate } = MessageDeploy;

export {
  MessageDeployList, MessageDeployCreate,  MessageManageList, NewMedia, Publish, MessageSubscribe,
};
