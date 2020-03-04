// 商机状态变更
const ChangeStatus = {
  result: {},
  data: {},
  async createChangeStatus(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getChangeStatus(id) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          businessName: '河北保定智慧城市项目',
          customerName: '河北XXX科技有限公司',
          businessType: '初审转意向状态',
          changeStatus: '1',
          msg: '0',
          enclosure: '2',
        });
      }, 1000),
    );
    this.data = data;
  },
};
export default ChangeStatus;
