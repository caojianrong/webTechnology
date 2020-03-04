// 产品属性管理
const listData = [];
for (let i = 0; i < 130; i++) {
  listData.push({
    key: i.toString(),
    address: `北京市海淀区 ${i+1}`,
    name: `John Brown ${i}`,
    age: `${i}`,
    type:`金融${i}`,
    status:`已认证${i}`,
    source:`云策${i}`,
    time:'2019-02-03',
  });
}

const customerAttribute = {
  attributeList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getAttributeList(form) {
    // console.log('属性管理', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: listData,
          totol: listData.length,
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
export default customerAttribute;
