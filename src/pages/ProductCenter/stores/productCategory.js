//  产品类别管理
const productCategory = {
  categoryList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getCategoryList(form) {
    console.log('类别管理', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: [
            {
              key: '1',
              categoryCode: 1,
              productLargeClass: '基础产品',
              productSmallClass: '计算',
              describe: '沃云基础产品计算类产品目录',
              creationTime: '2016-09-21  08:50:08',
            },
            {
              key: '2',
              categoryCode: 2,
              productLargeClass: '基础产品',
              productSmallClass: '存储',
              describe: '沃云基础产品计算类产品目录',
              creationTime: '2016-09-22  08:50:08',
            },
            {
              key: '3',
              categoryCode: 2,
              productLargeClass: '基础产品',
              productSmallClass: '存储',
              describe: '沃云基础产品计算类产品目录',
              creationTime: '2016-09-22  08:50:08',
            },
            {
              key: '4',
              categoryCode: 2,
              productLargeClass: '基础产品',
              productSmallClass: '存储',
              describe: '沃云基础产品计算类产品目录',
              creationTime: '2016-09-22  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.categoryList = data.list;
    this.current = data.current;
    this.totol = data.totol;
  },

  async deleteCategory(id) {
    const newDateSource = this.categoryList.filter(
      item => item.categoryCode !== id,
    );
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    if (data) {
      this.categoryList = newDateSource;
    }
  },
};
export default productCategory;
