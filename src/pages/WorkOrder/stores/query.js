import { isString, isArray, isPlainObject, isEmpty } from 'lodash';
import {
  queryWorkOrderList,
  queryWorkOrderDetail,
} from '@/services/work-order';

// 处理查询条件
const toParam = (elememt, fn = elem => elem) => {
  if (
    (isString(elememt) && elememt !== '') ||
    ((isArray(elememt) || isPlainObject(elememt)) && !isEmpty(elememt))
  ) {
    return fn(elememt);
  }
  return undefined;
};

export default {
  // 工单列表
  workOrderList: [],

  saveWorkOrderList(data) {
    this.workOrderList = data;
  },

  async fetchWorkOrderList(tableParams) {
    const { pagination, filters, sorter } = tableParams;
    const {
      creationTime,
      region,
      workOrderType,
      workOrderTitle,
      workOrderNumber,
      workOrderStatus,
      initiator,
    } = filters;

    const newFilter = {
      creationTime: toParam(creationTime, d => [d[0], d[1]]),
      province: toParam(region[0]),
      city: toParam(region[1]),
      workOrderSource: toParam(workOrderType[0]),
      workOrderCategory: toParam(workOrderType[1]),
      workOrderType: toParam(workOrderType[2]),
      workOrderTitle: toParam(workOrderTitle),
      workOrderNumber: toParam(workOrderNumber),
      workOrderStatus: toParam(workOrderStatus),
      initiator: toParam(initiator),
    };

    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ...newFilter,
      sorter: toParam(sorter, d => ({ [d.field]: d.order })),
    };

    console.log(params);
    const response = await queryWorkOrderList(params);
    this.saveWorkOrderList(response);
  },

  // 工单详情
  workOrderDetail: {},

  saveWorkOrderDetail(data) {
    this.workOrderDetail = data;
  },

  async fetchWorkOrderDetail(id) {
    const response = await queryWorkOrderDetail(id);
    this.saveWorkOrderDetail(response);
  },
};
