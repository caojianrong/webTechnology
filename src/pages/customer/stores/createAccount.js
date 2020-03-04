// 账户类别新建及修改
const createAccount = {
  result: {},
  data: {},
  async createAccountCategory(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getAccountCategory(id) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          name:'客户名称',
          ownership:["天津市", "天津市"],
          account:'账户名称',
          type: '1',
          bank:'开户银行',
          branch:'开户支行名称',
        });
      }, 1000),
    );
    this.data = data;
  },
};
export default createAccount;
