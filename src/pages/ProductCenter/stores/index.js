import Store from '@ice/store';
import config from './config';
import productCategory from './productCategory';
import createCategory from './createCategory';
import productAttribute from './productAttribute';
import createAttribute from './createAttribute';
import productManagement from './productManagement';
import upperAndLower from './upperAndLower';
import productDetail from './productDetail';
import createProductConfig from './createProductConfig';

const storeManager = new Store();
const stores = storeManager.registerStores({
  config,
  productCategory,
  createCategory,
  productAttribute,
  createAttribute,
  productManagement,
  upperAndLower,
  productDetail,
  createProductConfig,
});

export default stores;
