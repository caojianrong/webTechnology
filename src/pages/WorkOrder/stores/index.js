import Store from '@ice/store';
import config from './config';
import query from './query';

const storeManager = new Store();

const stores = storeManager.registerStores({
  config,
  query,
});

export default stores;
