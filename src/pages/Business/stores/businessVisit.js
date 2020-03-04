//  商机查询
const businessVisit = {
  businessVisitList: [],
  current: 1,
  totol: 1,
  loading: false,
  async getBusinessVisitList(form) {
    console.log('商机查询', form);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          list: [
            {
              key: 1,
              code: 2,
              visiter: '张三',
              visiterJob: '部门经理',
              visiterPhone: '13288888888',
              accountManager: '李四',
              companions: '无',
              communicate: '行业云解决方案交流，客户评估方案，待跟踪意向',
              visitTime: '2016-09-21  08:50:08',
            },
            {
              key: 2,
              code: 2,
              visiter: '张三',
              visiterJob: '部门经理',
              visiterPhone: '13288888888',
              accountManager: '李四',
              companions: '无',
              communicate: '行业云解决方案交流，客户评估方案，待跟踪意向',
              visitTime: '2016-09-21  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.businessVisitList = data.list;
    this.current = data.current;
    this.totol = data.totol;
  },
  async deleteBusinessVisit(id) {
    const newDateSource = this.businessVisitList.filter(
      item => item.key !== id,
    );
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    if (data) {
      this.businessVisitList = newDateSource;
    }
  },
};
export default businessVisit;
