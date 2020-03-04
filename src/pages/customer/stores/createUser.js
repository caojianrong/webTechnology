// 产品类别新建及修改
const createUser = {
  result: {},
  data: {},
  async createUserCategory(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getUserCategory(id) {
    const data = await new Promise(resolve =>
        setTimeout(() => {
        resolve({
          ownership:["天津市", "天津市"],
          name:'客户名称',
          type: '业务类型',
          developer:'发展人',
          number:'发展人编码',
          phone:'17600603301',
          bank:'开户银行',
        });
      }, 1000),
    );
    this.data = data;
  },
};
export default createUser;
