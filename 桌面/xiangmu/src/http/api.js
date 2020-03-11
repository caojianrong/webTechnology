export default {
    // 注册
    Register: {
        UploadImg: '/order/api/v1/pub/upload/upLoadImg', // 图片上传
        getVeriCode: '/auth/api/v1/sms/code', //获取验证码
        Register: '/user/api/v1/register/shipper' //注册
    },
    // 登陆
    Login: {
        Login: '/user/api/v1/login/shipper',
        //getLogToken: '/auth/oauth/token'
        getLogToken: '/auth/api/v1/username/token'
    },
    //获取验证码
    // 首页
    Index: {
        index: '/index/index',
        getGroupTask: "/order/api/v1/shortcut/findGroupTask", //货主登录首页任务数
        getPlatformTask: "/order/api/v1/shortcut/findPlatformTask",
    },
    LeftMenu: '/user/api/v1/tmsPermission/find/menuTree',//项目加载进来获取左侧侧菜单
    //业务类型接口
    Business: {
        goodsType: '/mot/api/v1/motGoodsTypeCode/findAll', //type代理 货物分类
        type: '/mot/api/v1/motBusinessTypeCode/findAll', //type代理
        auditedList: '/order/api/v1/configProject/findAll', //绑定项目
        materielType: '/order/api/v1/tmsConfigGoodsClass/get/groupId', //货物类型
        measurementType: '/order/api/v1/tmsConfigSettlementUnit/get/groupId', //计量单位
        freightSelect: '/order/api/v1/tmsConfigCalculateWay/findAll', //获取运费计算方式
        provinceCode: '/order/api/v1/pub/get/area', // 区县ID
        taxAuthority: '/user/api/v1/cascade/taxAuthoritys', //税务机关
        banks: '/user/api/v1/cascade/banks', //开户行
        projectList: '/order/api/v1/groupProject/projectSelect', // 关联项目下拉数据
        group: '/user/api/v1/cascade/group', //机构下拉列表
    },
    //平台作业管理
    PlatformTask: {

    },
    //平台用户管理
    PlatformUser: {
        ///////////////////用户/////////////////////
        UserList: '/user/api/v1/tmsUser/list',//用户列表
        AddUser: '/user/api/v1/tmsUser/save',//新增用户
        DelUser: '/user/api/v1/tmsUser/deleteUser',//删除用户
        ModifyUser: '/user/api/v1/tmsUser/update',//编辑用户
        mechanismselect: '/user/api/v1/cascade/group',//新建用户时获取机构ID下拉菜单
        roleshuselect: '/user/api/v1/tmsUser/getUserFlag',//新建用户时角色所属下拉菜单
        ////////////////////角色///////////////////
        roleList: '/user/api/v1/tmsRole/list',//获取角色列表
        // ModifyR: '/user/api/v1/tmsPermission/find/menuTreeByRoleId',//在角色列表页面选择一条数据进行修改用这个接口做回显
        ModifyID: '/user/api/v1/tmsPermission/find/menuByRoleId',//修改角色回显
        AddRole: '/user/api/v1/tmsRole/save/roleMenus',//新增角色
        DelRole: '/user/api/v1/tmsRole/delRole',//删除角色
        ModifyRole: '/user/api/v1/tmsRole/save/roleMenus',//修改角色

        JurisdictionMenu: '/user/api/v1/tmsPermission/find/menuTree',//获取权限菜单--菜单管理
        InitMenu: '/user/api/v1/tmsPermission/find/menuTreeByBelong',//进入页面 获取菜单   ---新增/修改菜单页面
        saveJurisdiction: '/user/api/v1/tmsPermission/save',//保存修改权限菜单
        delJurisdiction: '/user/api/v1/tmsPermission/del',//批量删除权限菜单
        delrole: '/user/api/v1/tmsRole/del',//批量删除角色信息
    },
    /** 平台支付管理 */
    PlatformPay: {
        /** 账户管理 */
        groupAccountList: '/pay/api/v1/virtualAccount/groupAccountList', //机构账户列表
        groupAccountInfo: '/pay/api/v1/virtualAccount/groupAccountInfo', //机构账户明细
        groupAccountBalance: '/pay/api/v1/virtualAccount/groupBalance', //查询机构账户余额
        userAccountList: '/pay/api/v1/virtualAccount/userAccountList', //用户账户列表
        userAccountBalance: '/pay/api/v1/virtualAccount/driverBalance', //查询用户账户余额
        accountFrozen: '/pay/api/v1/virtualAccount/frozen',  //账户冻结/解冻 1正常（解冻） 2冻结
        bindBankList: '/user/api/v1/tmsUserBindBanks/list', //用户绑定银行卡列表

    },
    //基础管理
    Basics: {
        audited: '/order/api/v1/groupProject/list', //项目加载列表接口和查询接口
        getOwnerGroupProjectList: '/order/api/v1/groupProject/listOwner', //获取分配给自己的项目列表，用户新建订单等的项目选择

        newAddAudited: '/order/api/v1/groupProject/save', //项目  新建项目接口 
        ////////////////////新增项目时下拉菜单部分开始//////////////////////

        projectType: '/user/api/v1/cascade/motBusinessClass',//新增项目时业务类型 
        bindinguser: '/user/api/v1/tmsUser/findMyList',//绑定用户下拉菜单

        ////////////////////新增项目时下拉菜单部分结束//////////////////////

        editAuditedMsg: '/order/api/v1/groupProject/info', //项目  修改项目回显数据接口       
        editAudited: '/order/api/v1/groupProject/edit', //项目  修改项目接口      
        delAudited: '/order/api/v1/groupProject/remove', //项目  删除项目接口   

        materiel: '/order/api/v1/groupGoods/list', //物料加载列表接口和查询接口 
        materietype: '/user/api/v1/cascade/motGoodsClass',//新建物料货物分类下拉框 
        wuliaotype:'/user/api/v1/cascade/motGoodsType',//新建物料货物类型下拉框
        jifei: '/user/api/v1/cascade/settlementUtil',//计费量单位
        addwuliaotype: '/order/api/v1/groupProject/projectSelect',//新建物料 里面的绑定项目下拉框
        newAddMateriel: '/order/api/v1/groupGoods/save', //物料  新建物料接口 
        editMaterielMsg: '/order/api/v1/groupGoods/info', //物料  修改物料回显数据接口
        editMateriel: '/order/api/v1/groupGoods/edit', //物料  修改物料接口
        delMateriel: '/order/api/v1/groupGoods/remove', //物料  删除物料接口

        // tmsShipping: '/order/api/v1/tmsShipping/getById', //运单查看详情接口

        priceList: '/order/api/v1/groupPrice/list', //价格表列表和查询接口
        newAddPrice: '/order/api/v1/groupPrice/save', //新建价格接口 
        editPriceMsg: '/order/api/v1/groupPrice/info', //价格  修改价格回显数据接口
        editPrice: '/order/api/v1/groupPrice/edit', //价格  修改价格接口
        delPrice: '/order/api/v1/groupPrice/remove', //价格  删除价格接口

        line: '/order/api/v1/groupAddress/list', //线路表列表和查询接口
        newAddLine: '/order/api/v1/groupAddress/save', //新建线路接口 
        editLineMsg: '/order/api/v1/groupAddress/info', //线路  修改线路回显数据接口
        editLine: '/order/api/v1/groupAddress/edit', //线路  修改线路接口
        delLine: '/order/api/v1/groupAddress/remove', //线路  删除线路接口
    },
    //轨迹
    localtion: {
        Alwayslocaltion: '/collect/carLocation',//实时位置
        Waybilllocaltion: '/collect/shipLocation',//运单位置信息
        position: '/order/api/v1/shipping/locationInfo',//在途管理
        LonLat: '/geocoding/v3',//获取经纬度
        // localtionline: '/direction/v2/driving',//货车路线规划
        getline: '/directionlite/v1/driving',//获取线路
        getgui: '/direction',//获取轨迹
    },
    //订单管理
    orderInformation: {
        orderInfo: '/order/api/v1/order/list', //订单列表接口
        orderInfoUpdate: '/order/api/v1/order/update/state', //
    },
    select: {
        calculation: '/user/api/v1/cascade/calculateFormula', // 获取新建项目的系统计算方式
        jifeiliang: '/user/api/v1/cascade/calculateKpi',//新建项目计费量
    },
    // 货主订单管理
    Order: {
        getOrderList: '/order/api/v1/order/list', //订单列表接口
        addOrder: '/order/api/v1/order/save', // 创建订单
        getOrderInfo: '/order/api/v1/configProject/get/groupId', // 项目信息弹窗
        getAddress: '/order/api/v1/configAddress/get/groupId', //  线路信息
        getGoodsList: '/order/api/v1/configGoods/get/groupId', // 物料信息
        getContract: '/order/api/v1/configPrice/get/groupId', // 合同信息
        getTons: '/order/api/v1/tmsConfigSettlementUnit/get/groupId', // 获取计量单位  例如 吨，千克
        getGoodTypeId: "/mot/api/api/v1/motGoodsTypeCode/findAll", // 获取部委货物类型接口
        getGoodClassCode: '/order/api/api/v1/tmsConfigGoodsClass/get/groupId', //获取物料类型接口

        errOrder: '/order/api/v1/tmsShipping/excList', //异常运单加载表格
        noErrOrder: '/order/api/v1/tmsShipping/list', //非异常运单加载表格
        getgoods: '/order/api/v1/tmsShipping/pickGood', //运单提货接口
        getDispatchOfOrderId: '/order/api/v1/order/info', //根据订单id获取订单信息
        getTruckingData: '/order/api/v1/trucking/get', //根据预派车单id获取预派车信息
        errSubmit: '/order/api/v1/tmsShipping/reportException', //异常原因提交接口

        orderEffect: '/order/api/v1/order/checkValid', // 订单生效
        orderEdit: '/order/api/v1/order/edit', // 修改订单
        orderGoods: '/order/api/v1/orderGoods/list', // 查看订单物料信息
        orderCancel: '/order/api/v1/order/cancel', // 取消订单

        addDispatch: '/order/api/v1/trucking/save', //新建预派单
        getTruckingRecord: '/order/api/v1/trucking/listByOrderId', // 获取派单记录
        getTruckingInfo: '/order/api/v1/trucking/info', // 根据预派单ID获取预派单信息
        removeTrucking: '/order/api/v1/trucking/remove', // 删除预派车单记录
        dispatchCar: '/order/api/v1/shipping/mobileAdd', // 派车
        finishOrder: '/order/api/v1/order/finish', // 完成订单

        signSubmit: '/order/api/v1/shipping/unloading', //签收提交接口
    },
    Shipping: {
        getShippingList: '/order/api/v1/shipping/list', //运单信息列表
        getShippingInfo: '/order/api/v1/shipping/info',  //运单详细信息（含物料信息）
        getShippingGoodsList: '/order/api/v1/shippingGoods/ListByShippingId',  //运单物料列表
        loading: '/order/api/v1/shipping/loading', //运单提货
        errSubmit: "/order/api/v1/shippingException/add",//异常上报提交接口
        unloading: '/order/api/v1/shipping/unloading', //运单签收

        getSettlementList: '/order/api/v1/shipping/settlementList', //运单结算列表
        editBill: '/order/api/v1/shipping/editBill', //修改账单
        checkBill: '/order/api/v1/shipping/checkBill', //确认账单
        applyPay: '/order/api/v1/shipping/applyPay', //申请付款
        doPay: '/order/api/v1/shipping/doPay', //付款
        doAgainPay: '/order/api/v1/shipping/doAgainPay', //再次付款
        applyInvoice: '/order/api/v1/shipping/applyInvoice', //申请开票
        doInvoice: '/order/api/v1/shipping/doInvoice', //开票

    },
    /** 异常 */
    Exception: {
        shippingExceptionList: '/order/api/v1/shippingException/list', //异常运单
        shippingExceptionAffirm: '/order/api/v1/shippingException/confirm', //异常确认
        shippingExceptionRecover: '/order/api/v1/shippingException/recover', //异常恢复
        shippingExceptionCheck: '/order/api/v1/shippingException/check', //异常审核

    },
    BusinessTypeCode: {
        businessList: '/user/api/v1/cascade/motBusinessClass', // 项目业务类型 下拉
        userselect: '/user/api/v1/tmsRole/roleSelect',//用户新增 角色下拉菜单获取
    },
    addOrder: '/order/api/v1/order/save',
    // 平台运营管理
    Risks: {
        getOwnerList: '/user/api/v1/tmsUser/findCarOwner', // 获取车主管理列表
        getOwnerDetail: '/user/api/v1/tmsUser/findCarOwnerInfo', // 车主审核详情
        sendOwnerAudit: '/user/api/v1/tmsUser/userApproval', // 车主审核
        Abnormal_recovery:'/user/api/v1/tmsUser/updateAll',//车主恢复异常


        getShipperList: '/user/api/v1/tmsGroup/list', // 货主审核列表
        getShipperDetail: '/user/api/v1/tmsGroup/get', // 货主审核详情
        sendShipperAudit: '/user/api/v1/tmsGroup/shipperApproval', // 货主审核
        exceptionRecover: '/user/api/v1/tmsGroup/exceptionRecover', // 货主异常恢复

        findGroupFeeInfo: '/order/api/v1/tmsGroupFee/findGroupFeeInfo',  //根据机构ID，获取费率
        saveGroupFee: '/order/api/v1/tmsGroupFee/save',  //保存服务费率

        findGroupDepositInfo: '/order/api/v1/tmsGroupDeposit/findGroupDepositInfo',  //根据机构ID，获取押金
        saveGroupDeposit: '/order/api/v1/tmsGroupDeposit/save',  //保存押金

        findGroupPaydaysInfo: '/order/api/v1/tmsGroupPaydays/findGroupPaydaysInfo',  //根据机构ID，获取账期
        saveGroupPaydays: '/order/api/v1/tmsGroupPaydays/save',  //保存账期

        findGroupDiscountsList: '/order/api/v1/tmsGroupDiscounts/findList',  //根据机构ID，获取货主优惠
        saveGroupDiscount: '/order/api/v1/tmsGroupDiscounts/saveBatch', //保存货主优惠



    },
    /** 支付类接口地址 */
    Pay: {
        getRechargeList: '/pay/api/v1/recharge/list', //获取充值列表
        getWithdrawList: '/pay/api/v1/withdraw/list', //获取提现列表
        getFinanceList: '/pay/api/v1/finance/list', // 获取资金流水列表
        getPayList: '/pay/api/v1/pay/list',  //获取支付列表

        groupWithdraw: '/pay/api/v1/withdraw/executeGroup', //机构账户提现

        addRechargeRecord: '/pay/api/v1/recharge/add', //机构线下充值记账
    }
}



// projectId线路所属项目ID
// projectCode项目编号
// projectName项目名称
// addressType地址类型（1发货地、2收货地）
// addressCompany公司名称 / 姓名
// addressArea区县ID
// addressDetail详细地址
// addressLon详细地址经度
// addressLat详细地址纬度
// addressContacter联系人
// addressContactMobile 电话
// addressContactIdentity收货人信用代码或个人证件号（地址类型为收货地，此字段必填）
// addressDesc地址描述