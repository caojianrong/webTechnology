// 产品管理详情
const customerDetail = {
  detail: [],
  async getProductDetail(form) {
    console.log('产品管理详情', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          {
            name: '产品大类',
            content: '基础类型',
          },
          {
            name: '主产品名称',
            content: '计算',
          },
          {
            name: '产品名称',
            content: '云主机ECS',
          },
          {
            name: '产品编码',
            content: '1102203304',
          },
          {
            name: '云商',
            content: '沃云',
          },
          {
            name: '地域',
            content: '',
          },
          {
            name: '可用区',
            content: '',
          },
          {
            name: '总部费用项',
            content: '',
          },
          {
            name: '总部科目',
            content: '',
          },
          {
            name: '版本',
            content: '',
          },
          {
            name: '产品介绍',
            content:
              '实例类型决定了用于实例的主机硬件配置。每一个实例类型提供不同的计算和存储能力',
          },
        ]);
      }, 1000),
    );
    this.loading = false;
    this.detail = data;
  },
};
export default customerDetail;
