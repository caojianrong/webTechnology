const informationObj = {

  // 消息来源
  from: [
    { value: 1, text: '云警' },
    { value: 2, text: '云策' },
    { value: 3, text: '云径' },
    { value: 4, text: '云畅' },
  ],

  // 消息模块
  module: [
    // { value: 1, text: '告警类' },
    // { value: 2, text: '产品类' },
    // { value: 3, text: '财务类' },
    // { value: 4, text: '活动类' },

    { value: 1, text: '安全' },
    { value: 2, text: '资源' },
    { value: 3, text: '活动' },
  ],

  // 消息类型
  type: [
    { value: 1, text: '安全告警消息' },
    { value: 2, text: '资源到期提醒' },
    { value: 3, text: '资源回收提醒' },
    { value: 4, text: '产品服务通知' },
    { value: 5, text: '欠费通知' },
    { value: 6, text: '账单推送' },
    { value: 7, text: '余额预警通知' },
    { value: 8, text: '相关活动通知' },
  ],

  // 推送对象
  user: [
    { value: 1, text: '云公司运营人员' },
    { value: 2, text: '客户经理' },
    { value: 3, text: '支撑经历' },
    { value: 4, text: '活动类' },
  ],

  // 推送方式
  toType: [
    { value: 1, text: '短信' },
    { value: 2, text: '邮件' },
    { value: 3, text: '站内信' },
  ],

  // 发布平台
  publish: [
    { value: 1, text: '微博' },
    { value: 2, text: '公众号' },
    { value: 3, text: '钉钉' },
  ],
};

const tableObj = {

  // 消息模块
  module: {
    "1": "安全",
    "2": "资源",
    "3": "活动",
  },

  // 消息类型
  type: {
    "1": "安全告警消息",
    "2": "资源到期提醒",
    "3": "资源回收提醒",
    "4": "产品服务通知",
    "5": "欠费通知",
    "6": "账单推送",
    "7": "余额预警通知",
    "8": "相关活动通知",
  },

  //  消息来源
  from: {
    "1": "云警",
    "2": "云策",
    "3": "云径", 
    "4": "云畅",
  },

  // 推送对象
  obj: {
    "1": "客户",
    "2": "客户经理",
    "3": "运营人员", 
    "4": "运维人员",
  },

  // 推送方式
  toType: {
    "1": "短信",
    "2": "邮件",
    "3": "站内信",
  },
};
const data = {informationObj, tableObj};

export default data;