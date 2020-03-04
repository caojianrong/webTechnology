// fake request
const request = fakeData => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(fakeData);
    }, 200);
  });
};

const regionTree = [
  {
    label: '河北',
    value: '河北',
    children: [
      { label: '石家庄', value: '石家庄' },
      { label: '保定', value: '保定' },
      { label: '廊坊', value: '廊坊' },
    ],
  },
  {
    label: '浙江',
    value: '浙江',
    children: [
      { label: '杭州', value: '杭州' },
      { label: '温州', value: '温州' },
    ],
  },
  {
    label: '江苏',
    value: '江苏',
    children: [
      { label: '苏州', value: '苏州' },
      { label: '南京', value: '南京' },
      { label: '无锡', value: '无锡' },
    ],
  },
];

const workOrderTypeTree = [
  {
    label: '客户工单',
    value: '客户工单',
    children: [
      {
        label: '技术类',
        value: '技术类',
        children: [
          { label: '开通问题', value: '开通问题' },
          { label: '技术支持', value: '技术支持' },
        ],
      },
      {
        label: '业务类',
        value: '业务类',
        children: [{ label: '变更工单', value: '变更工单' }],
      },
    ],
  },
  {
    label: '内部工单',
    value: '内部工单',
    children: [
      {
        label: '技术类',
        value: '技术类',
        children: [{ label: '开通问题', value: '开通问题' }],
      },
      {
        label: '业务类',
        value: '业务类',
        children: [{ label: '变更工单', value: '变更工单' }],
      },
    ],
  },
];

const workOrderList = {
  total: 11,
  dataSource: [
    {
      key: '1',
      workOrderNumber: '78945',
      province: '河北',
      city: '保定',
      workOrderSource: '客户工单',
      workOrderCategory: '技术类',
      workOrderType: '技术支持',
      workOrderTitle: '开通问题',
      initiator: 'XXX公司',
      initiatorContact: '13355667743',
      workOrderStatus: '0',
      creationTime: '2016-09-21 08:50:08',
    },
  ],
};

const workOrderDetail = {
  workOrderNumber: '10000038661942',
  creationTime: '2016-09-21 08:50:08',
  workOrderStatus: '1',
  workOrderSource: '客户工单',
  workOrderCategory: '技术类',
  workOrderType: '技术支持',
  initiator: 'admin',
  initiatorAccount: '123456789',
  initiatorContact: '13812345678',
  processor: '张三',
  processorAccount: '34567425',
  processorContact: '13588888888',
  workOrderTitle: '主机无法访问',
  productName: '云服务器ECS',
  problemDescription: '云主机无法访问',
  otherInformation: '问题产品所在域：',
  attachment: {
    file: '情况说明.docx',
    link:
      'https://www.iconfont.cn/api/project/download.zip?spm=a313x.7781069.1998910419.d7543c303&pid=1200477&ctoken=VcXy01y3zeT3aFc9LxX84wns',
  },
  communicationRecord: [
    {
      username: '客户XXX',
      date: '2016-09-21 08:50:08',
      record: '开永云服务时遇到闪退',
    },
    {
      username: '客户经理admin',
      date: '2016-09-21 08:50:08',
      record: '请重新更换浏览器试一下',
    },
  ],
};

// 查询区域树
export async function queryRegionTree() {
  return request(regionTree);
}

// 查询工单类型树
export async function queryWorkOrderTypeTree() {
  return request(workOrderTypeTree);
}

// 查询工单列表
export async function queryWorkOrderList(/* params */) {
  return request(workOrderList);
}

// 查询工单详情
export async function queryWorkOrderDetail(/* id */) {
  return request(workOrderDetail);
}
