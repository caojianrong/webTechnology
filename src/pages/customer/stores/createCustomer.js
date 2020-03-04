// 客户新建及修改
const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];
const createCustomer = {
  result: {},
  data: {},
  async createCustomerCategory(form) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    this.result = data;
  },
  async getCustomerCategory(id) {
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          customerName:'客户名称',
          customerType:'1',
          ownership:["天津市", "天津市"],
          customerAddress:'客户地址',
          contactName:'联系人名称',
          contactPhone:'联系人电话',
          category:'1',
          certificateOwner:'1',
          certificateName:'证件人姓名',
          certificateType:'1',
          certificateNumber:'证件人证件号码',
          certificateAddress:'证件人证件地址',
          customerSubtype: '1',
          certificatePhone:'17600603300',
          taxpayerNumber:'纳税人识别号',

          taxpayerName:'一般纳税人名称',
          isGeneralTaxpayer: '1',
          bankAccount:'开户银行',
          bankAccountNumber:'开户银行账号',
          customerLevel:'1',

        });
      }, 1000),
    );
    this.data = data;
  },
};
export default createCustomer;
