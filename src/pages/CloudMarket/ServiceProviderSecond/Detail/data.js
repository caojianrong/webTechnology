import { getNowFormatDate } from '@/utils/date';

const result = {
    "companyWebsite": "www.baidu.com",
    "companyAddress": "北京",
    "createTime": 1581923805000,
    "checkOpr": "sqy",
    "busiLicenseImgUrl": "/ImageServer/M00/00/6E/rB0HE15KPJ2AJ3AhAACqJPmlV4U15.webp",
    "appkey": "Ow343rw706Q4qFb41Pv04q1pqU01ZXfR",
    "introduceDepartName": "总部云网协同部",
    "companyContactsPhone": "13141065282",
    "bankOfDeposit": "12345678945613",
    "remarks": null,
    "checkTime": 1581925253000,
    "companyContactsMail": "864941368@qq.com",
    "loginPassword": "25f9e794323b453885f5181f1b624d0b",
    "loginType": "1",
    "legalPersonImgUrl": "/ImageServer/M00/00/6E/rB0HE15KPMqAKhXzAABcZpJk0EI49.webp",
    "accountNumber": "123456789456",
    "checkStatus": "2",
    "businessLicense": "123456789",
    "checkLelvel": "2",
    "introduceDepartId": "942778b44d3d45f1a6f3d6ed56494c9d",
    "companyContacts": "孙世键",
    "loginName": "sunshijian",
    "bankAccountName": "中国银行",
    "auditOpinion": "ok ",
    "checkId": 589,
    "mail": "864941368@qq.comd",
    "loginUid": 146,
    "companyOrgCode": "a12345678911112589",
    "status": "1",
    "updateTime": null,
    "isSelfCompany": "0",
    "companyName": "联通时科云市场测试公司",
    "checkOprId": "b3be9759463d4e1a9177b91cbfd801df",
    "checkRemark": null,
    "telPhone": "13141065282",
    "companyMail": "864941368@qq.com",
    "companyLogo": "/ImageServer/M00/00/6E/rB0HE15KPLyAaFcZAABcZpJk0EI60.webp",
    "companyId": 123431,
    "companyProfile": "好企业",
    "mobileNo": "13141065282"
}

const statusFilter = (status) => {
    switch (Number(status)) {
        case 1:
            status = "正常"
            break;
        case 2:
            status = "冻结"
            break;
        case 0:
            status = "无效"
            break;
        default:
            break;
    }
    return status;
}
// status: 1 网址， status: 2 图片
// 详情页面展示数据
export const detailData = [{
    title: '客户详细信息',
    items: [{
        name: '登录账号:',
        value: result.loginName
    }, {
        name: '邮箱:',
        value: result.mail
    }, {
        name: '手机号码:',
        value: result.telPhone
    }, {
        name: '创建时间:',
        value: getNowFormatDate(result.createTime)
    }, {
        name: '状态:',
        value: statusFilter(result.status)
    }, {
        name: 'appkey:',
        value: result.appkey
    }, {
        name: '服务商ID:',
        value: result.companyId
    }]
}, {
    title: '企业信息',
    items: [{
        name: '公司名称:',
        value: result.companyName
    }, {
        name: '企业组织代码:',
        value: result.companyOrgCode
    }, {
        name: '企业地址:',
        value: result.companyAddress
    }, {
        name: '电子邮件:',
        value: result.companyMail
    }, {
        name: '移动电话:',
        value: result.mobileNo
    }, {
        name: '营业执照:',
        value: result.businesslicense
    }, {
        name: '企业简介:',
        value: result.companyProfile
    }, {
        name: '企业网址:',
        value: result.companyWebsite,
        status: 1
    }, {
        name: '企业联系人:',
        value: result.companyContacts
    }, {
        name: '企业联系人电话:',
        value: result.companyContactsPhone
    }, {
        name: '企业联系人邮箱:',
        value: result.companyContactsMail
    }, {
        name: '开户行账号:',
        value: result.accountNumber
    }, {
        name: '银行开户名:',
        value: result.bankAccountName
    }, {
        name: '开户行名称:',
        value: result.bankOfDeposit
    }, {
        name: '推荐部门id:',
        value: result.introduceDepartId
    }, {
        name: '推荐部门名称:',
        value: result.introduceDepartName
    }]
}, {
    title: '图片信息',
    items: [{
        name: '法人代表图片:',
        value: result.legalPersonImgUrl,
        status: 2
    }, {
        name: '工作执照图片:',
        value: result.busiLicenseImgUrl,
        status: 2
    }, {
        name: '企业Logo:',
        value: result.companyLogo,
        status: 2
    }]
}]