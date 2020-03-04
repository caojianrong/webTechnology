// 产品管理详情
const accountDetail = {
  detail: [],
  async getAccountDetail(form) {
    console.log('产品管理详情', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          {
            name: '账户名称',
            content: '河北XXX科技有限公司',
          },
          {
            name: '账户标识',
            content: '3525135152',
          },
          {
            name: '客户名称',
            content: '河北XX公司',
          },
          {
            name: '地址',
            content: '河北省保定市',
          },
          {
            name: '付费类型',
            content: '预付费',
          },
          {
            name: '开户银行',
            content: '中国工商银行',
          },
          {
            name: '开户支行名称',
            content: '中国工商银行上地支行',
          },
          {
            name: '银行账号',
            content: '6021758434232451',
          }
        ]);
      }, 1000),
    );
    this.loading = false;
    this.detail = data;
  },
};
export default accountDetail;
