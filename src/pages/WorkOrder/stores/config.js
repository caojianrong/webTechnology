import { queryRegionTree, queryWorkOrderTypeTree } from '@/services/work-order';

export default {
  // 区域树
  regionTree: [],

  saveRegionTree(data) {
    this.regionTree = data;
  },

  async fetchRegionTree() {
    const response = await queryRegionTree();
    this.saveRegionTree(response);
  },

  // 工单类型树
  workOrderTypeTree: [],

  saveWorkOrderTypeTree(data) {
    this.workOrderTypeTree = data;
  },

  async fetchWorkOrderTypeTree() {
    const response = await queryWorkOrderTypeTree();
    this.saveWorkOrderTypeTree(response);
  },

  // 工单状态
  workOrderStatus: [
    { label: '待处理', value: '0', color: '#FAAD14' },
    { label: '处理中', value: '1', color: '#3C67B8' },
    { label: '已解决', value: '2', color: '#52C41A' },
    { label: '已关闭', value: '3', color: 'rgba(0,0,0,0.25)' },
  ],
};
