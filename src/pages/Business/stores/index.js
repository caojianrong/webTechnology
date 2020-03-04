import Store from '@ice/store';
import config from './config';
import businessCreation from './businessCreation';
import businessVisit from './businessVisit';
import changeStatus from './changeStatus';
import businessSearch from './businessSearch';
import myBusiness from './myBusiness';
import visitCreation from './visitCreation';

const storeManager = new Store();
const stores = storeManager.registerStores({
  config,
  businessCreation,
  businessVisit,
  changeStatus,
  businessSearch,
  visitCreation,
  myBusiness,
});

export default stores;
