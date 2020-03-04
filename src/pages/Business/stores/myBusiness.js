//  商机查询
const myBusiness = {
  myBusinessList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getMyBusinessList(form) {
    console.log('商机查询', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: [
            {
              key: 1,
              businessCode: 'woyun001',
              businessName: '河北保定智慧城市项目',
              businessSource: '内部客户',
              sourceArea: '河北',
              businessType: 'IDC',
              customerName: '河北XXX公司',
              isStock: '是',
              businessStatus: '初审转意向',
              creationTime: '2016-09-21  08:50:08',
            },
            {
              key: 2,
              businessCode: 'woyun002',
              businessName: '山西太原智慧城市项目',
              businessSource: '外部客户',
              sourceArea: '山西',
              businessType: '公有云',
              customerName: '山西XXX公司',
              isStock: '是',
              businessStatus: '商机发布',
              creationTime: '2016-09-21  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.myBusinessList = data.list;
    this.current = data.current;
    this.totol = data.totol;
  },
};
export default myBusiness;
