// 产品类别新建及修改
const businessCreation = {
  result: {},
  data: {},
  async createMyBusiness(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getMyBusiness(id) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          businessName: '丝丝',
          businessSource: '1',
          sourceArea: '2',
          location: '1',
          businessType: '2',
          joinType: '2',
          msg: '222',
          TenderTime: null,
          incomeTime: null,
          annualIncome: '200000',
          customerName: '钉钉',
          industry: '2',
          isStock: 2,
          customerContacts: '李四',
          customerPhone: '13675847658',
          businessInput: '张三',
          inputPhone: '13675847657',
        });
      }, 1000),
    );
    this.data = data;
  },
};
export default businessCreation;
