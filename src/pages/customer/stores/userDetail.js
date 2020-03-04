// 产品管理详情
const userDetail = {
  detail: [],
  async getUserDetail(form) {
    console.log('产品管理详情', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          {
            name: '地址',
            content: '河南省濮阳市',
          },
          {
            name: '客户名称',
            content: '河北XXX科技有限公司',
          },
          {
            name: '业务类型',
            content: '自研公有云',
          },
          {
            name: '发展人',
            content: '市场部张三',
          },
          {
            name: '发展人编码',
            content: '11022033044055066',
          },
          {
            name: '联系电话',
            content: '13244888888',
          },
          {
            name: '账户',
            content: '25879984',
          }
        ]);
      }, 1000),
    );
    this.loading = false;
    this.detail = data;
  },
};
export default userDetail;
