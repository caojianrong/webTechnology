import Vue from "vue";
import VueRouter from "vue-router";
import Content from "@/layout/content.vue"; // 页面整体布局
import Layout from "@/layout/home.vue"; // 页面整体布局

// process.env.NODE_ENV === "development" ? Vue.use(VueRouter) : null;
Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/login",
    hidden: true
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/loginIndex.vue")
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: () => import("../views/login/register.vue")
  },
    //平台首页
    {
        path: "/platformindex",
        component: Layout,
        noDropdown: true,
        children: [
            {
                path: "",
                meta: {
                    title: "首页",
                    icon: "el-icon-s-home",
                    routerType: ""
                },
                component: () => import("../views/index/platformIndex.vue")
            }
        ]
    },
  // 货主首页
  {
    path: "/index",
    component: Layout,
    noDropdown: true,
    children: [
      {
        path: "",
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
          routerType: ""
        },
        component: () => import("../views/index/index.vue")
      }
    ]
  },
  // 货主端作业管理
  {
    path: "/workManage",
    component: Layout,
    meta: {
      title: "作业管理",
      icon: ""
    },
    children: [
      {
        //基础管理
        path: "basic",
        component: Content,
        meta: {
          title: "基础管理",
          icon: ""
        },
        children: [
          {
            path: "project",
            meta: {
              title: "项目"
            },
            component: () => import("../views/main-page/examine/audited.vue")
          },
          {
            path: "materiel",
            meta: {
              title: "物料"
            },
            component: () => import("../views/main-page/examine/materiel.vue")
          },
          {
            path: "line",
            meta: {
              title: "线路"
            },
            component: () => import("../views/main-page/examine/line.vue")
          },
          {
            path: "contract",
            meta: {
              title: "价格表"
            },
            component: () => import("../views/main-page/examine/contract.vue")
          }
        ]
      },
      {
        //订单管理
        path: "order",
        component: Content,
        meta: {
          title: "订单管理",
          icon: ""
        },
        children: [
          {
            path: "orderInfo",
            meta: {
              title: "订单信息"
            },
            component: () =>
              import("../views/main-page/orderManagement/orderInfo.vue")
          },
          {
            path: "newAddOrderbig",
            meta: {
              title: "新增/修改订单(大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/newAddOrderbig.vue")
          },
          {
            path: "newAddOrdersmall",
            meta: {
              title: "新增/修改订单(大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/newAddOrdersmall.vue")
          },
          {
            path: "newAddDispatchbig",
            meta: {
              title: "新增预派单(大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/newAddDispatchbig.vue")
          },
          {
            path: "newAddDispatchsmall",
            meta: {
              title: "新增预派单(非大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/newAddDispatchsmall.vue")
          },
          {
            path: "dispatchcarbig",
            meta: {
              title: "派车(大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/dispatchcarbig.vue")
          },
          {
            path: "dispatchcarsmall",
            meta: {
              title: "派车(非大宗)"
            },
            component: () =>
              import("../views/main-page/orderManagement/dispatchcarsmall.vue")
          },
          {
            path: "newAddTruking",
            meta: {
              title: "新增运单"
            },
            component: () =>
              import("../views/main-page/orderManagement/newAddTruking.vue")
          }
        ]
      },
      {
        //轨迹跟踪
        path: "realLocationMsg",
        component: Content,
        meta: {
          title: "轨迹跟踪",
          icon: ""
        },
        children: [
          {
            path: "realLocation",
            meta: {
              title: "实时位置"
            },
            component: () =>
              import("../views/main-page/lineAddress/realLocation.vue")
          },
          {
            path: "trackQuery",
            meta: {
              title: "轨迹查询"
            },
            component: () =>
              import("../views/main-page/lineAddress/trackQuery.vue")
          }
        ]
      },
      {
        //运单管理
        path: "shippingManage",
        component: Content,
        meta: {
          title: "运单管理",
          icon: ""
        },
        children: [
          {
            path: "shippingList",
            meta: {
              title: "运单信息"
            },
            component: () => import("../views/main-page/shippingManage/shippingList.vue")
          }
        ]
      },
      {
        //异常管理
        path: "exceptionMsg",
        component: Content,
        meta: {
          title: "异常管理",
          icon: ""
        },
        children: [
          {
            path: "exception",
            meta: {
              title: "异常运单"
            },
            component: () =>
              import("../views/main-page/exception/exception.vue")
          }
        ]
      }
    ]
  },
  // 货主端财务管理
  {
    path: "/finance",
    component: Layout,
    meta: {
      title: "财务管理",
      icon: ""
    },
    children: [
      {
        //账户管理
        path: "account",
        component: Content,
        meta: {
          title: "账户管理",
          icon: ""
        },
        children: [
          {
            path: "accountMsg",
            meta: {
              title: "账户信息"
            },
            component: () => import("../views/financial/account/accountMsg.vue")
          },
          {
            path: "rechargeDetails",
            meta: {
              title: "账户充值明细"
            },
            component: () =>
              import("../views/financial/account/rechargeDetails.vue")
          },
          {
            path: "presentationDetails",
            meta: {
              title: "账户提现明细"
            },
            component: () =>
              import("../views/financial/account/presentationDetails.vue")
          },
          {
            path: "capitalFlow",
            meta: {
              title: "账户资金流水"
            },
            component: () =>
              import("../views/financial/account/capitalFlow.vue")
          },
          {
            path: "paymentDetails",
            meta: {
              title: "支付明细"
            },
            component: () =>
              import("../views/financial/account/paymentDetails.vue")
          }
        ]
      },
      {
        //结算管理
        path: "settle",
        component: Content,
        meta: {
          title: "结算管理",
          icon: ""
        },
        children: [
          {
            path: "waybillSettlement",
            meta: {
              title: "运单结算"
            },
            component: () =>
              import(
                "../views/financial/settlementManagement/waybillSettlement.vue"
              )
          },
          {
            path: "waybillInvoice",
            meta: {
              title: "运单开票"
            },
            component: () =>
              import(
                "../views/financial/settlementManagement/waybillInvoice.vue"
              )
          }
        ]
      }
    ]
  },
  // 货主端用户管理
  {
    path: "/userAdmin",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: ""
    },
    children: [
      {
        //账户管理
        path: "userMsg",
        component: Content,
        meta: {
          title: "用户信息",
          icon: ""
        },
        children: [
          {
            path: "userList",
            meta: {
              title: "用户列表"
            },
            component: () => import("../views/userAdmin/user/userList.vue")
          }
        ]
      }
    ]
  },
  // 平台端作业管理
  {
    path: "/platform/platformtask",
    component: Layout,
    meta: {
      title: "平台作业管理",
      icon: ""
    },
    children: [
      {
        path: "jobquery",
        component: Content,
        meta: {
          title: "平台作业查询",
          icon: ""
        },
        children: [
          {
            path: "orderinquiry",
            meta: {
              title: "订单查询"
            },
            component: () => import("../views/platform/platformtask/jobquery/orderinquiry.vue")
          },
          {
            path: "waybillquery",
            meta: {
              title: "运单查询"
            },
            component: () => import("../views/platform/platformtask/jobquery/waybillquery.vue")
          },
          {
            path: "trackquery",
            meta: {
              title: "轨迹查询"
            },
            component: () => import("../views/platform/platformtask/jobquery/trackquery.vue")
          },
          {
            path: "abnormaljobquery",
            meta: {
              title: "异常作业查询"
            },
            component: () => import("../views/platform/platformtask/jobquery/abnormaljobquery.vue")
          },
          {
            path: "abnormaloperationmanagement",
            meta: {
              title: "异常作业管理"
            },
            component: () => import("../views/platform/platformtask/jobquery/abnormaloperationmanagement.vue")
          },
        ]
      },
      {
        path: "billinquiry",
        component: Content,
        meta: {
          title: "平台账单查询",
          icon: ""
        },
        children: [
          {
            path: "shipperbill",
            meta: {
              title: "货主账单"
            },
            component: () => import("../views/platform/platformtask/billinquiry/shipperbill.vue")
          },
          {
            path: "carownerbill",
            meta: {
              title: "车主账单"
            },
            component: () => import("../views/platform/platformtask/billinquiry/carownerbill.vue")
          },
          {
            path: "merchantbill",
            meta: {
              title: "商户账单"
            },
            component: () => import("../views/platform/platformtask/billinquiry/merchantbill.vue")
          },
        ]
      },
      {
        path: "invoicingmanagement",
        component: Content,
        meta: {
          title: "平台开票查询",
          icon: ""
        },
        children: [
          {
            path: "shipperinvoice",
            meta: {
              title: "货主开票申请"
            },
            component: () => import("../views/platform/platformtask/invoicingmanagement/shipperinvoice.vue")
          },
          {
            path: "carownerinvoice",
            meta: {
              title: "车主开票申请"
            },
            component: () => import("../views/platform/platformtask/invoicingmanagement/carownerinvoice.vue")
          },
          {
            path: "vehicleownerexcess",
            meta: {
              title: "车主超额纳税查询"
            },
            component: () => import("../views/platform/platformtask/invoicingmanagement/vehicleownerexcess.vue")
          },
        ]
      }
    ]
  },
  // 平台端用户管理
  {
    path: "/platform/platformuser",
    component: Layout,
    meta: {
      title: "平台用户管理",
      icon: ""
    },
    children: [
      {
        path: "quanxianliucheng",
        meta: {
          title: "权限流程"
        },
        component: () => import("../views/platform/platformuser/quanxianliucheng.vue")
      },
      {
        path: "menumanagement",
        meta: {
          title: "菜单管理"
        },
        component: () => import("../views/platform/platformuser/menumanagement.vue")
      },
      {
        path: "rolepermissionlist",
        meta: {
          title: "角色权限列表"
        },
        component: () => import("../views/platform/platformuser/rolepermissionlist.vue")
      },
      {
        path: "addmodifylist",
        meta: {
          title: "新增/修改角色"
        },
        component: () => import("../views/platform/platformuser/addmodifylist.vue")
      },
      {
        path: "userlist",
        meta: {
          title: "用户列表"
        },
        component: () => import("../views/platform/platformuser/userlist.vue")
      },
    ]
  },
  // 平台端运营管理
  {
    path: "/operations",
    component: Layout,
    meta: {
      title: "运营管理",
      icon: ""
    },
    children: [
      {
        path: "riskmainten",
        meta: {
          title: "风控维护",
        },
        component: () => import("../views/platform/operations/riskMainten/riskMainten.vue")
      },
      {
        path: "settlemainten",
        meta: {
          title: "结算维护",
        },
        component: () => import("../views/platform/operations/settleMainten/settleMainten.vue")
      },
      {
        path: "ownermanage",
        meta: {
          title: "车主管理",
        },
        component: () => import("../views/platform/operations/ownerManage/ownerManage.vue")
      },
      {
        path: "ownertoaudit",
        name: "OwnerToAudit",
        meta: {
          title: "车主待审核",
        },
        component: () => import("../views/platform/operations/ownerManage/ownerDetails.vue")
      },
      {
        path: "ownerabnormal",
        // name: "Ownerabnormal",
        meta: {
          title: "车主异常修改",
        },
        component: () => import("../views/platform/operations/ownerManage/ownerabnormal.vue")
      },
      {
        path: "shippermanage",
        meta: {
          title: "货主管理",
        },
        component: () => import("../views/platform/operations/shipperManage/shipperManage.vue")
      },
      {
        path: "merchantmanage",
        meta: {
          title: "商户管理",
        },
        component: () => import("../views/platform/operations/merchantManage/merchanManage.vue")
      }
    ]
  },

    // 平台端支付管理
    {
        path: "/platform/platformpay",
        component: Layout,
        meta: {
            title: "平台支付管理",
            icon: ""
        },
        children: [
            {
                path: "account",
                component: Content,
                meta: {
                    title: "账户管理",
                    icon: ""
                },
                children: [
                    {
                        path: "groupAccountList",
                        meta: {
                            title: "对公账户管理"
                        },
                        component: () => import("../views/platform/platformpay/account/groupAccountList.vue")
                    },
                    {
                        path: "userAccountList",
                        meta: {
                            title: "个人账户管理"
                        },
                        component: () => import("../views/platform/platformpay/account/userAccountList.vue")
                    },
                    {
                        path: "bindBankList",
                        meta: {
                            title: "个人银行卡管理"
                        },
                        component: () => import("../views/platform/platformpay/account/bindBankList.vue")
                    }
                ]
            },
            {
                path: "withdrawRecord",
                meta: {
                    title: "提现记录"
                },
                component: () => import("../views/financial/account/presentationDetails.vue")
                //component: () => import("../views/platform/platformpay/withdrawRecord.vue")
            },
            {
                path: "rechargeRecord",
                meta: {
                    title: "充值记录"
                },
                component: () => import("../views/financial/account/rechargeDetails.vue")
                //component: () => import("../views/platform/platformpay/rechargeRecord.vue")
            },
            {
                path: "payRecord",
                meta: {
                    title: "支付记录"
                },
                component: () =>
                    import("../views/financial/account/paymentDetails.vue")
            },
            {
                path: "financeRecord",
                meta: {
                    title: "资金流水"
                },
                component: () =>
                    import("../views/financial/account/capitalFlow.vue")
            }
        ]
    },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
