
export const tabledata = [{
    "companyAddress": "中国北京上地",
    "mail": "register@chinaunicom.cn",
    "createTime": 1581575086000,
    "companyOrgCode": "CHINAUNICOM",
    "loginUid": 145,
    "status": "1",
    "updateTime": null,
    "introduceDepartName": "推荐部门名称",
    "checkTime": 1581589512000,
    "companyName": "注册测试科技有限公司",
    "loginPassword": "4361f8841709ebb644a231b61b2657fb",
    "loginType": "1",
    "checkLelvel": "1",
    "checkStatus": "2",
    "telPhone": "12341234123",
    "introduceDepartId": "推荐部门id",
    "companyId": 123430,
    "loginName": "register-test"
}, {
    "companyAddress": "北京市西城区西单北大街133号",
    "mail": "haodj7@chinaunicom.cn",
    "createTime": 1578893942000,
    "companyOrgCode": "91110302788601580P",
    "loginUid": 144,
    "status": "1",
    "updateTime": null,
    "introduceDepartName": "总部云网协同部",
    "checkTime": 1578894340000,
    "companyName": "联通在线",
    "loginPassword": "75934e2e5e48e7a4e7b936d2efac15d8",
    "loginType": "1",
    "checkLelvel": "2",
    "checkStatus": "2",
    "telPhone": "18601108209",
    "introduceDepartId": "942778b44d3d45f1a6f3d6ed56494c9d",
    "companyId": 123429,
    "loginName": "ltzqyx"
}]

export const formdata = [{
    name: '登录账号',
    value: 'loginName',
}, {
    name: '企业名称',
    value: 'compName',
}, {
    name: '联系电话',
    value: 'mobile',
}, {
    name: '状态',
    value: 'checkStatus',
    status: 1,
    options: [{
        name: '全部',
        value: 1
    }, {
        name: '一级审核中',
        value: 2
    }, {
        name: '二级审核中',
        value: 3
    }, {
        name: '一级审核通过',
        value: 4
    }, {
        name: '二级审核通过',
        value: 5
    }, {
        name: '一级审核不通过',
        value: 6
    }, {
        name: '二级审核不通过',
        value: 7
    }]
}]
export const getStatus = (item) => {
    let level = item.checkLelvel;
    let status = item.checkStatus;

    if(level === "1" ){
        level = "一级"
    }else if(level === "2" ){
        level = "二级"
    }
    if(status === "1"){
        status = level+"审核中";
    }else if(status === "2"){
        status = level+"审核通过";
    }else if(status === "4"){
        status = level+"审核不通过";
    }else if(status === "5"){
        status = "冻结";
    }else{
        status = "未申请";
    }
    return status;
}
