import Store from '@ice/store';
import config from './config';
import customerAttribute from './customerAttribute';
import userAttribute from './userAttribute';
import accountAttribute from './accountAttribute';
import quotaAttribute from './quotaAttribute';
import verifiedAttribute from './verifiedAttribute';
import createAccount from './createAccount';
import createCustomer from './createCustomer';
import createUser from './createUser';
import accountDetail from './accountDetail';
import customerDetail from './customerDetail';
import quotaDetail from './quotaDetail';
import userDetail from './userDetail';

import upperAndLower from './upperAndLower';
import productDetail from './productDetail';

const storeManager = new Store();
const stores = storeManager.registerStores({
  config,
  customerAttribute,
  userAttribute,
  accountAttribute,
  quotaAttribute,
  verifiedAttribute,
  createAccount,
  createCustomer,
  createUser,
  accountDetail,
  customerDetail,
  quotaDetail,
  userDetail,

  upperAndLower,
  productDetail,
});

export default stores;
