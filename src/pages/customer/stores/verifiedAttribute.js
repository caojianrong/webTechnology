// 产品属性管理
const listData = [
  {
    key: '1',
    address:'北京市海淀区',
    name: 'John Brown',
    age: 32,
    type:'金融',
    status:'已认证',
    source:'云策',
    time:'2019-02-03',
    industryType:'已认证',
    certifier:'张三',
  },
  {
    key: '2',
    address:'北京市海淀区2',
    name: 'John Brown',
    age: 32,
    type:'金融',
    status:'已认证',
    source:'云策',
    time:'2019-02-03',
    industryType:'已认证',
    certifier:'张三',
  },
  {
    key: '3',
    address:'北京市海淀区3',
    name: 'John Brown',
    age: 32,
    type:'金融',
    status:'已认证',
    source:'云策',
    time:'2019-02-03',
    industryType:'已认证',
    certifier:'张三',
  },
  {
    key: '4',
    address:'北京市海淀区4',
    name: 'John Brown',
    age: 32,
    type:'金融',
    status:'已认证',
    source:'云策',
    time:'2019-02-03',
    industryType:'已认证',
    certifier:'张三',
  },
];
// for (let i = 0; i < 130; i++) {
//   listData.push({
//     key: i.toString(),
//     address: `北京市海淀区 ${i+1}`,
//     name: `John Brown ${i}`,
//     age: `${i}`,
//     type:`金融${i}`,
//     status:`已认证${i}`,
//     source:`云策${i}`,
//     time:'2019-02-03',
//   });
// }

const verifiedAttribute = {
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
export default verifiedAttribute;
