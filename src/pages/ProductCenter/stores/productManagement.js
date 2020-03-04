// 产品管理
const productManagement = {
  productList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getProductList(form) {
    console.log('产品列表', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: [
            {
              key: '1',
              id: 1,
              serialNumber: '1',
              productName: '云主机',
              cloudTraded: '沃云',
              productLargeClass: '应用产品',
              productMainClass: '应用',
              productCode: '1102203304',
              status: '已发布',
              version: '1.0',
              CreationTime: '2016-09-21  08:50:08',
            },
            {
              key: '2',
              id: 2,
              serialNumber: '2',
              productName: '智慧门店',
              cloudTraded: '沃云',
              productLargeClass: '应用产品',
              productMainClass: '应用',
              productCode: '1102203304',
              status: '草稿',
              version: '1.0',
              CreationTime: '2016-09-21  08:50:08',
            },
            {
              key: '3',
              id: 3,
              serialNumber: '3',
              productName: 'AI党建云-标准版',
              cloudTraded: '阿里',
              productLargeClass: '应用产品',
              productMainClass: '应用',
              productCode: '1102203304',
              status: '待审核',
              version: '1.0',
              CreationTime: '2016-09-21  08:50:08',
            },
            {
              key: '4',
              id: 4,
              serialNumber: '4',
              productName: 'AI党建云-标准版',
              cloudTraded: '阿里',
              productLargeClass: '应用产品',
              productMainClass: '应用',
              productCode: '1102203304',
              status: '已发布',
              version: '1.0',
              CreationTime: '2016-09-21  08:50:08',
            },
            {
              key: '5',
              id: 5,
              serialNumber: '5',
              productName: 'AI党建云-标准版',
              cloudTraded: '阿里',
              productLargeClass: '应用产品',
              productMainClass: '应用',
              productCode: '1102203304',
              status: '草稿',
              version: '1.0',
              CreationTime: '2016-09-21  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.productList = data.list;
    this.current = data.current;
    this.totol = data.totol;
  },

  async deleteProducty(id) {
    const newDateSource = this.productList.filter(item => item.key !== id);
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    if (data) {
      this.productList = newDateSource;
    }
  },
};
export default productManagement;
