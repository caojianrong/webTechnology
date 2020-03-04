import Store from '@ice/store';
import deploy from './deploy';

const storeManager = new Store();

const stores = storeManager.registerStores({
  deploy,
});

export default stores;


