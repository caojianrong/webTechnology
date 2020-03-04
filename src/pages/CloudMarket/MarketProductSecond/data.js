
import { Link } from 'react-router-dom'
import React from 'react'
import { getNowFormatDate } from '@/utils/date';

export const formdata = [{
    name: '产品ID:',
    value: 'productId',
}, {
    name: '产品名称:',
    value: 'productName',
}, {
    name: '起始时间:',
    value: 'startTime',
    status: 2,
}, {
    name: '结束时间:',
    value: 'endTime',
    status: 2,
}, {
    name: '申请时间(排序):',
    value: 'mainProduct',
    status: 1,
    options: [
        {
            value: "00",
            name:"申请时间 正序"
        },
        {
            value: "01",
            name:"申请时间 倒序"
        }
    ]
}]

export const columns = [
    {
        title: '产品ID',
        dataIndex: 'productId',
        width: 150,
    },
    {
        dataIndex: "productName",
        title: "产品名称",
        width: 200,
    },
    {
        dataIndex: "productShowName",
        title: "产品展示名",
        width: 200,
    },
    {
        dataIndex: "startTime",
        title: "生效日期",
        width: 200,
        render: (text, record) => (
            <span>{getNowFormatDate(text)}</span>
        )
    },
    {
        dataIndex: "endTime",
        title: "失效日期",
        width: 200,
        render: (text, record) => (
            <span>{getNowFormatDate(text)}</span>
        )
    },
    {
        dataIndex: "modifyTime",
        title: "申请时间",
        width: 200,
        render: (text, record) => (
            <span>{getNowFormatDate(text)}</span>
        )
    },
    {
        dataIndex: "applicantId",
        title: "云商ID",
        width: 150,
    },
    {
        dataIndex: "applicantName",
        title: "云商名称",
        width: 200,
    },
    {
        dataIndex: "state",
        title: "产品状态",
        width: 100,
        render: (text, record) => (
            <span>{getPStatus(text)}</span>
        )
    },
    {
        dataIndex: "logId",
        title: "流水ID",
        width: 200,
    },
    {
        dataIndex: "logModifyTime",
        title: "日志操作日期",
        width: 200,
        render: (text, record) => (
            <span>{getNowFormatDate(text)}</span>
        )
    },
    {
        dataIndex: "auditState",
        title: "审核状态",
        width: 150,
        render: (text, record) => (
            <span>{getOkStatus(text)}</span>
        )
    },
    {
        dataIndex: "modifyType",
        title: "操作类型",
        width: 150,
        render: (text, record) => (
            <span>{getModifyType(text)}</span>
        )
    },
    {
        title: '操作',
        width: 100,
        // fixed: 'right',
        render: (text, record) => (
            <span>
                <Link
                    to={{
                        pathname: '/market/product/seclist/detail',
                        state: {  // 页面跳转要传递的数据，如下
                            // logId: record.logId,
                        },
                    }}
                >详情
                </Link>
            </span>
        )
    }
]

export const tabledata = [{
    "auditState": "02",
    "modifyType": "01",
    "auditDepartId": null,
    "logId": 1574306540409,
    "firstAuditorId": "947750fc80fd4d41928f4d6ae1705a17",
    "secondAuditTime": null,
    "applicantId": "6767",
    "state": "01",
    "endTime": 4102415999000,
    "logModifyTime": null,
    "productId": 1567498175823,
    "firstAuditMsg": null,
    "startTime": 1582124132000,
    "secondAuditMsg": null,
    "firstAuditorName": "wangxy5012",
    "secondAuditorName": "gengye0307",
    "productShowName": "云归档/云备份",
    "productData": null,
    "firstAuditTime": null,
    "auditDepartName": null,
    "secondAuditorId": "0194e32afd4540dfbf48607d2db9d743",
    "productName": "云归档/云备份",
    "modifyTime": 1574306530000,
    "applicantName": "北京易华录信息技术股份有限公司"
}, {
    "auditState": "02",
    "modifyType": "01",
    "auditDepartId": null,
    "logId": 1581861740036,
    "firstAuditorId": "947750fc80fd4d41928f4d6ae1705a17",
    "secondAuditTime": null,
    "applicantId": "6864",
    "state": "01",
    "endTime": 4102415999000,
    "logModifyTime": null,
    "productId": 1581673223819,
    "firstAuditMsg": null,
    "startTime": 1581864171000,
    "secondAuditMsg": null,
    "firstAuditorName": "wangxy5012",
    "secondAuditorName": "gengye0307",
    "productShowName": "智享云课堂",
    "productData": null,
    "firstAuditTime": null,
    "auditDepartName": null,
    "secondAuditorId": "0194e32afd4540dfbf48607d2db9d743",
    "productName": "智享云课堂",
    "modifyTime": 1581861727000,
    "applicantName": "上海会畅通讯股份有限公司"
}, {
    "auditState": "02",
    "modifyType": "01",
    "auditDepartId": null,
    "logId": 1581862032921,
    "firstAuditorId": "947750fc80fd4d41928f4d6ae1705a17",
    "secondAuditTime": null,
    "applicantId": "6864",
    "state": "01",
    "endTime": 4102415999000,
    "logModifyTime": null,
    "productId": 1581680906232,
    "firstAuditMsg": null,
    "startTime": 1581864154000,
    "secondAuditMsg": null,
    "firstAuditorName": "wangxy5012",
    "secondAuditorName": "gengye0307",
    "productShowName": "智享云课堂-存储流量服务",
    "productData": null,
    "firstAuditTime": null,
    "auditDepartName": null,
    "secondAuditorId": "0194e32afd4540dfbf48607d2db9d743",
    "productName": "智享云课堂-存储流量服务",
    "modifyTime": 1581862020000,
    "applicantName": "上海会畅通讯股份有限公司"
}]
// 产品状态
const getPStatus = (state) => {
    // let status = state;
    if(state === "01" ){
        state = "上架"
    }else if(state === "02" ){
        state = "下架"
    }else if(state === "03" ){
        state = "删除"
    }else{}

    return state;
}

// ID筛选
const getIDStatus = (v) => {
    // let status = state;
    if(v.auditState == "05" || v.auditState == "03"){
        v.auditorId = v.firstAuditorId;
      }else if(v.auditState == "06" || v.auditState == "02"){
        v.auditorId = v.secondAuditorId;
      }else{
        v.auditorId = "";
      }

    return v.auditorId;
}
// 审核状态
const getOkStatus = (state) => {
    // let status = state;
    if(state === "01" ){
        state = "申请待审核"
    }else if(state === "02" ){
        state = "二级审核通过"
    }else if(state === "03" ){
        state = "审核不通过"
    }else if(state === "04" ){
        state = "撤销申请"
    }else if(state === "05" ){
        state = "一级审核通过"
    }else if(state === "06" ){
        state = "二级审核不通过"
    }else{}

    return state;
}
// 操作类型
const getModifyType = (state) => {
    // let status = state;
    if(state === "01" ){
        state = "上架申请"
    }else if(state === "02" ){
        state = "下架申请"
    }else if(state === "03" ){
        state = "修改申请"
    }else if(state === "04" ){
        state = "撤销申请"
    }else if(state === "05" ){
        state = "创建"
    }else{}

    return state;
}