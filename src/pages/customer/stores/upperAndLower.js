// 上下架管理
const upperAndLower = {
  upperAndLowerList: [],
  item: [],
  current: 1,
  totol: 1,
  loading: false,
  async getUpperAndLowerList(value) {
    console.log('下架管理', value);
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          item: [
            { id: 1, name: '产品大类', content: '基础类型' },
            { id: 2, name: '主产品名称', content: '计算' },
            { id: 3, name: '产品名称', content: '云主机ECS' },
            { id: 4, name: '产品编码', content: '1102203304' },
          ],
          list: [
            {
              key: '1',
              instanceId: 'i-8vbdvvvp9su27ykfoopc',
              productName: '云主机',
              instanceNorms: '1核1G',
              countType: '包年包月',
              countUnit: '年',
              price: '100',
              instanceType: '标准型',
              model: 'intel Xeon',
              framework: '高可用',
              upperStatus: '上架',
              area: '海口、西宁',
              useArea: '海口一区；海口二区；西宁一区；西宁二区；',
              creationTime: '2016-09-21  08:50:08',
            },
            {
              key: '2',
              instanceId: 'i-8vbdvvvp9su27ykfoopd',
              productName: '云主机',
              instanceNorms: '1核1G',
              countType: '包年包月',
              countUnit: '年',
              price: '100',
              instanceType: '标准型',
              model: 'intel Xeon',
              framework: '高可用',
              area: '海口、西宁',
              useArea: '海口一区；海口二区；西宁一区；西宁二区；',
              upperStatus: '下架',
              creationTime: '2016-09-21  08:50:08',
            },
          ],
          totol: 50,
          current: 1,
        });
      }, 1000),
    );
    this.loading = false;
    this.upperAndLowerList = data.list;
    this.current = data.current;
    this.totol = data.totol;
    this.item = data.item;
  },

  async changeStatus(id, status) {
    this.loading = true;
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );
    const nUpperAndLowerList = this.upperAndLowerList.map(item => {
      return {
        ...item,
        upperStatus:
          item.instanceId === id
            ? status === '上架'
              ? '下架'
              : '上架'
            : item.upperStatus,
      };
    });
    if (data) {
      this.loading = false;
      this.upperAndLowerList = nUpperAndLowerList;
    }
  },
};
export default upperAndLower;
