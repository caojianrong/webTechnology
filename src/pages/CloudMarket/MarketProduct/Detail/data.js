import { getNowFormatDate } from '@/utils/date';

const result = {
	"pmCommoditySettlement": {
		"settlementType": "02",
		"settlementValue": "70"
	},
	"pmProductAttrAndValueList": [{
		"pmProductAttrValueList": [{
			"valueShow": "基础",
			"valueFix": "基础",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 0
		}],
		"attrName": "PACKAGE_VERSION",
		"attrShowName": "套餐版本"
	}, {
		"pmProductAttrValueList": [{
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 0
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 1
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 2
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 3
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 4
		}],
		"attrName": "PURCHASE_QUANTITY",
		"attrShowName": "最大数量"
	}, {
		"pmProductAttrValueList": [{
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 0
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 1
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 2
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 3
		}, {
			"valueShow": 1,
			"valueFix": 1,
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "",
			"sortNum": 4
		}],
		"attrName": "PURCHASE_MINQUANTITY",
		"attrShowName": "最小数量"
	}, {
		"pmProductAttrValueList": [{
			"valueId": "5",
			"valueShow": "111次",
			"valueFix": "111",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "次",
			"sortNum": 0
		}],
		"attrName": "PACKAGE_QUOTA",
		"attrShowName": "配额"
	}, {
		"pmProductAttrValueList": [{
			"valueId": "1",
			"productVersion": 0,
			"attrId": "0",
			"productId": "0",
			"valueShow": "1月",
			"valueFix": "1",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "MONTH",
			"sortNum": 0
		}, {
			"valueId": "13",
			"productVersion": 0,
			"attrId": "0",
			"productId": "0",
			"valueShow": "2年",
			"valueFix": "2",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "YEAR",
			"sortNum": 12
		}, {
			"valueId": "7",
			"productVersion": 0,
			"attrId": "0",
			"productId": "0",
			"valueShow": "7月",
			"valueFix": "7",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "MONTH",
			"sortNum": 6
		}, {
			"valueId": "-1",
			"productVersion": 0,
			"attrId": "0",
			"productId": "0",
			"valueShow": "15天试用",
			"valueFix": "15",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "DAY",
			"sortNum": -1
		}, {
			"valueId": "15",
			"productVersion": 0,
			"attrId": "0",
			"productId": "0",
			"valueShow": "永久有效",
			"valueFix": "100",
			"valueStep": 0,
			"valueType": "FIX",
			"valueUnit": "YEAR",
			"sortNum": 14
		}],
		"attrName": "PURCHASE_DURATION",
		"attrShowName": "购买时长"
	}],
	"pmCommodityAndPriceList": [{
		"showPriceFlag": 0,
		"pmCommodityPriceList": [{
			"rebuyPrice": "{\"base\":\"\"}",
			"minPrice": "{\"base\":\"\"}",
			"costPrice": "{\"base\":\"\"}",
			"maxPrice": "{\"base\":11100}"
		}],
		"commodityId": "0",
		"commodityAttr": "{\"PACKAGE_VERSION\":\"基础\",\"PURCHASE_DURATION\":\"100YEAR\",\"PACKAGE_QUOTA\":\"111次\",\"PURCHASE_QUANTITY\":\"1\",\"PURCHASE_MINQUANTITY\":\"1\"}"
	}, {
		"showPriceFlag": 0,
		"pmCommodityPriceList": [{
			"rebuyPrice": "{\"base\":\"\"}",
			"minPrice": "{\"base\":\"\"}",
			"costPrice": "{\"base\":\"\"}",
			"maxPrice": "{\"base\":11100}"
		}],
		"commodityId": "0",
		"commodityAttr": "{\"PACKAGE_VERSION\":\"基础\",\"PURCHASE_DURATION\":\"7MONTH\",\"PACKAGE_QUOTA\":\"111次\",\"PURCHASE_QUANTITY\":\"1\",\"PURCHASE_MINQUANTITY\":\"1\"}"
	}, {
		"showPriceFlag": 0,
		"pmCommodityPriceList": [{
			"rebuyPrice": "{\"base\":\"\"}",
			"minPrice": "{\"base\":\"\"}",
			"costPrice": "{\"base\":\"\"}",
			"maxPrice": "{\"base\":11100}"
		}],
		"commodityId": "0",
		"commodityAttr": "{\"PACKAGE_VERSION\":\"基础\",\"PURCHASE_DURATION\":\"2YEAR\",\"PACKAGE_QUOTA\":\"111次\",\"PURCHASE_QUANTITY\":\"1\",\"PURCHASE_MINQUANTITY\":\"1\"}"
	}, {
		"showPriceFlag": 0,
		"pmCommodityPriceList": [{
			"rebuyPrice": "{\"base\":\"\"}",
			"minPrice": "{\"base\":\"\"}",
			"costPrice": "{\"base\":\"\"}",
			"maxPrice": "{\"base\":11100}"
		}],
		"commodityId": "0",
		"commodityAttr": "{\"PACKAGE_VERSION\":\"基础\",\"PURCHASE_DURATION\":\"15DAY\",\"PACKAGE_QUOTA\":\"111次\",\"PURCHASE_QUANTITY\":\"1\",\"PURCHASE_MINQUANTITY\":\"1\"}"
	}, {
		"showPriceFlag": 0,
		"pmCommodityPriceList": [{
			"rebuyPrice": "{\"base\":\"\"}",
			"minPrice": "{\"base\":\"\"}",
			"costPrice": "{\"base\":\"\"}",
			"maxPrice": "{\"base\":11100}"
		}],
		"commodityId": "0",
		"commodityAttr": "{\"PACKAGE_VERSION\":\"基础\",\"PURCHASE_DURATION\":\"1MONTH\",\"PACKAGE_QUOTA\":\"111次\",\"PURCHASE_QUANTITY\":\"1\",\"PURCHASE_MINQUANTITY\":\"1\"}"
	}],
	"pmProductApplyLog": {
		"firstAuditMsg": "g",
		"logId": 0,
		"productData": "",
		"productId": 0,
		"secondAuditMsg": "f"
	},
	"productInfo": {
		"supplierId": 123351,
		"attachTemplate": "",
		"catalogConfig": [{
			"catalogId": "155373540048710030"
		}],
		"sellType": "COUNT",
		"productName": "周期永久",
		"deliverType": "3",
		"openType": "ONLINE_ASYN",
		"paymentType": "POST_PAY",
		"deleteAddr": "",
		"renewAddr": "",
		"productDetailId": "1",
		"productType": "APP",
		"modifyAddr": "",
		"supplierName": "路附近的说法是否",
		"floorPrice": "11100",
		"productClass": "WO_W",
		"productDetail": "[\"/ImageServer/M00/00/6F/rB0HE15OUQuAW3IsAACksMlSHPI18.webp\"]",
		"productLogo": "/ImageServer/M00/00/6F/rB0HE15OUQyAZonwAAHk6qAYI8Q59.webp",
		"productExtend": [{
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_OPERATE_GUIDE",
			"extendShowName": "产品使用指南",
			"extendValue": ["/ImageServer/M00/00/6F/rB0HE15OUJ-AIN5pAACe0jSEFXY605.png"]
		}, {
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_APTITUDE",
			"extendShowName": "产品资质",
			"extendValue": []
		}, {
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_EDGE",
			"extendShowName": "产品亮点",
			"extendValue": []
		}, {
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_SCREENSHOT",
			"extendShowName": "产品截图",
			"extendValue": []
		}, {
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_CASE",
			"extendShowName": "产品案例",
			"extendValue": []
		}, {
			"extendValueType": "IMAGE",
			"extendName": "PRODUCT_PERSONALITY",
			"extendShowName": "产品个性化信息",
			"extendValue": []
		}, {
			"extendValueDesc": "售后电话",
			"extendValueType": "TEXT",
			"extendName": "CUSTOMER_SERVICE_PHONE",
			"extendShowName": "售后电话",
			"extendShowDesc": "售后电话",
			"extendDesc": "售后电话",
			"extendValue": "1314166899"
		}, {
			"extendValueDesc": "售后邮箱",
			"extendValueType": "TEXT",
			"extendName": "CUSTOMER_SERVICE_MAIL",
			"extendShowName": "售后邮箱",
			"extendShowDesc": "售后邮箱",
			"extendDesc": "售后邮箱",
			"extendValue": "112@qq.com"
		}, {
			"extendValueDesc": "官网地址",
			"extendValueType": "TEXT",
			"extendName": "CUSTOMER_SERVICE_URL",
			"extendShowName": "官网地址",
			"extendShowDesc": "官网地址",
			"extendDesc": "官网地址",
			"extendValue": "www.guanw.com"
		}, {
			"extendValueDesc": "客户群",
			"extendValueType": "TEXT",
			"extendName": "CUSTOMER_GROUP",
			"extendShowName": "客户群",
			"extendShowDesc": "客户群",
			"extendDesc": "客户群",
			"extendValue": "03"
		}, {
			"extendValueDesc": "产品归属来源",
			"extendValueType": "TEXT",
			"extendName": "PRODUCT_SOURCE",
			"extendShowName": "产品归属来源",
			"extendShowDesc": "产品归属来源",
			"extendDesc": "产品归属来源",
			"extendValue": "00"
		}, {
			"extendValueDesc": ["全国"],
			"extendValueType": "TEXT",
			"extendId": 333363,
			"extendName": "SALES_AREA",
			"productId": 0,
			"extendShowName": "产品的售卖区域",
			"extendShowDesc": "产品的售卖区域",
			"extendDesc": "产品的售卖区域",
			"extendValue": ["99"]
		}, {
			"extendValueType": "TEXT",
			"extendName": "SALES_DISCOUNT",
			"productId": 0,
			"extendShowName": "产品的售卖折扣",
			"extendShowDesc": "产品的售卖折扣",
			"extendDesc": "产品的售卖折扣",
			"extendValue": ["100"]
		}],
		"syncAddr": "www.tongbu.com",
		"supplierProductId": "",
		"productDesc": "周期永久测试",
		"rebuypriceAddr": "",
		"isSell": "01",
		"productDetailType": "IMG",
		"openAddr": "www.kaitong.com",
		"productShowDesc": "周期永久测试",
		"productShowName": "周期永久"
	}
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
// 各种状态数据
const state = {
    /**
     * @description 订单状态
     */
    order: {
        "": "全部",
        // 8: "未开通",
        // 9: "已开通"
        0: "初始",
        1: "已支付",
        7: "处理中",
        9: "完成"
    },
    /**
     * @description 开通方式
     */
    delivery: {
        "": "全部",
        ONLINE: "自动开通-实时",
        ONLINE_ASYN: "自动开通-异步",
        OFFLINE: "联系客服"
        // 2: "链接"
    },
    /**
     * @description 交付方式
     */
    DeliveryMode: {
        // 0: "全部",
        1: "镜像",
        2: "兑换码",
        3: "SaaS",
        4: "人工服务",
        5: "API",
        6: "下载",
        7: "授权",
        8: "资源编排",
        9: "docker镜像",
        10: "硬件类"
    },
    /**
     * @description 售卖方式
     */
    SellType: {
        CYCLE: "周期",
        COUNT: "计次"
    },
    /**
     * @description 结算方式
     */
    SettlementMethod: {
        "01": "固定成本",
        "02": "比例分成"
    },
    /**
     * @description 是否售卖
     */
    IsSell: {
        "00": "不售卖",
        "01": "售卖"
    },
    /**
     * @description 开通方式
     */
    OpeningMode: {
        ONLINE: "自动开通-实时",
        ONLINE_ASYN: "自动开通-异步",
        OFFLINE: "联系客服"
    },
    /**
     * @description 付费类型
     */
    PaymentType: {
        PRE_PAY: "预付费",
        POST_PAY: "后付费",
        ALL: "全部"
    },
    /**
     * @description 产品类别
     */
    ProductCategory: {
        BASE: "基础产品",
        APP: "云市场产品"
    },
    CustomerGroup: {
        "01": "个人",
        "02": "企业",
        "03": "全部"
    },

};

const getProductExtend = ()=>{
    let jsonstr = JSON.stringify(result.productInfo.productExtend)
    .replace(/extendShowName/g, 'name')
    .replace(/extendValue/g, 'value')

    return JSON.parse(jsonstr)
} 

// status: 1 网址， status: 2 图片
// 详情页面展示数据
export const detailData = [{
    title: '基本信息',
    items: [{
        name: '产品名称:',
        value: result.productInfo.productName
    }, {
        name: '产品logo:',
        value: result.productInfo.productLogo,
        status: 2
    }, {
        name: '产品描述:',
        value: result.productInfo.productDesc
    }, {
        name: '产品展示描述:',
        value: result.productInfo.productShowDesc
    }, {
        name: '产品展示名称:',
        value: result.productInfo.productShowName
    }, {
        name: '开通方式:',
        value: state.OpeningMode[result.productInfo.openType]
    }, {
        name: '付费类型:',
        value: state.PaymentType[result.productInfo.paymentType]
    }, {
        name: '产品类别:',
        value: state.ProductCategory[result.productInfo.productType]
    }, {
        name: '供应商侧产品ID:',
        value: result.productInfo.supplierProductId
    }, {
        name: '售卖方式:',
        value: state.SellType[result.productInfo.sellType]
    }, {
        name: '生效时间:',
        value: result.productInfo.startTime
    }, {
        name: '供应商:',
        value: result.productInfo.supplierId
    }, {
        name: '供应商名称:',
        value: result.productInfo.supplierName
    }, {
        name: '交付方式:',
        value: state.DeliveryMode[result.productInfo.deliverType]
    }, {
        name: '失效时间:',
        value: result.productInfo.endTime
    }, {
        name: '产品开通接口地址:',
        value: result.productInfo.openAddr
    }, {
        name: '产品退订接口地址:',
        value: result.productInfo.deleteAddr
    }, {
        name: '产品变配接口地址:',
        value: result.productInfo.modifyAddr
    }, {
        name: '产品续费接口地址:',
        value: result.productInfo.renewAddr
    }]
},{
    title: '产品信息扩展',
    items: getProductExtend()
},{
    title: '审核信息',
    items: [{
        name: '可选售卖折扣:',
        value: result.productInfo.productExtend
        .filter(item => item.extendName === 'SALES_DISCOUNT')[0]
        .extendValue.join('%,')
    },{
        name: '审核状态:',
        value: result.productInfo.auditState
    },{
        name: '一级审核意见:',
        value: result.pmProductApplyLog.firstAuditMsg
    },{
        name: '二级审核意见:',
        value: result.pmProductApplyLog.secondAuditMsg
    }]
},{
    title: '结算信息',
    items: [{
        name: '结算配置ID:',
        value: result.productInfo.settlementId
    },{
        name: '分成比例:',
        value: result.pmCommoditySettlement.settlementValue + '%'
    }]
},{
    title: '价格信息',
    items: []
}]

