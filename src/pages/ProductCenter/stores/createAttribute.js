// 产品属性新建
const createAttribute = {
  result: {},
  async createProductAttribute(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
};

export default createAttribute;
