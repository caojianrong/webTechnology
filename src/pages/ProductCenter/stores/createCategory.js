// 产品类别新建及修改
const createCategory = {
  result: {},
  data: {},
  async createProductCategory(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getProductCategory(id) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          systemType: '0',
          directoryName: '测试',
          directoryHierarchy: '0',
          fatherName: '无',
          sort: 1,
          msg: '1',
        });
      }, 1000),
    );
    this.data = data;
  },
};
export default createCategory;
