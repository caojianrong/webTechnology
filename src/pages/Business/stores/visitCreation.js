// 拜访记录创建
const visitCreation = {
  result: {},
  async createVisit(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
};

export default visitCreation;
