// 产品属性管理
const productAttribute = {
  attributeList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getAttributeList(form) {
    console.log('属性管理', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: [
            {
              key: '1',
              serialNumber: '1',
              attributeName: 'CPU',
              attributeCode: '110220330401',
              attributeUnit: '核',
              attributeType: '枚举型',
              content: '可选值：1,3,6',
              creationTime: '2016-09-21  08:50:08',
            },
            {
              key: '2',
              serialNumber: '2',
              attributeName: 'CPU',
              attributeCode: '110220330401',
              attributeUnit: '核',
              attributeType: '枚举型',
              content: '可选值：1,3,6',
              creationTime: '2016-09-21  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.attributeList = data.list;
    this.current = data.current;
    this.totol = data.totol;
  },
};
export default productAttribute;
