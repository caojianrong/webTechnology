<!-- 导航页 -->
<template>
  <div id="navigation">
    <div class="content">
      <div class="top-content">
        <div class="top-icon">
          <img src="../../assets/images/topicon.png" alt srcset />
        </div>

        <div class="top-operation">
          <el-button type="text" style="color:#fff" icon="el-icon-user">
            <span class="right-bor">兴云物流有限公司，欢迎登录！</span>
          </el-button>
          <el-button type="text" style="color:#fff" icon="el-icon-lock">修改密码</el-button>
          <el-button type="text" style="color:#fff" icon="el-icon-switch-button">退出</el-button>
        </div>
      </div>
      <div class="center-content">
        <div class="left-nav">
          <!--  <el-menu :default-active="$route.path" class="el-menu-vertical-demo nav-main" router>
            <el-menu-item v-for="menu in menus" :index="menu.route" :key="menu.route">
              <i class="el-icon-menu"></i>
              {{menu.name}}
            </el-menu-item>
          </el-menu>-->
          <!-- 导航栏开始 -->
          <el-row class="tac">
            <el-col :span="24" class="tac-main">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#333"
                active-text-color="#fff"
                :unique-opened="true"
                @select="clearCheckData()"
                router
              >
                <div v-for="(item,index) in menus" :index="item.route" :key="index">
                  <!-- 一级菜单开始 -->
                  <el-menu-item v-if="item.chi.length==0" :index="item.route">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                  <!-- 一级菜单结束 -->
                  <!-- 二级菜单开始 -->
                  <el-submenu v-else :index="item.name">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>{{item.name}}</span>
                    </template>
                    <el-submenu v-for="(item1,index) in item.chi" :index="item1.name" :key="index">
                      <template slot="title">{{item1.name}}</template>
                      <el-menu-item
                        v-for="(item2,index) in item1.com"
                        :index="item2.route"
                        :key="index"
                      >{{item2.name}}</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <!-- 二级菜单结束 -->
                </div>
              </el-menu>
            </el-col>
          </el-row>
          <!-- 导航栏结束 -->
        </div>
        <div class="right-main">
          <!-- router-view让子路由显示在本页面 -->
          <router-view></router-view>
        </div>
      </div>
      <!-- <div class="bottom-content"></div> -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "navigation",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      menus: [
        {
          route: "/whole/index",
          name: "首页",
          chi: []
        },
        {
          name: "作业管理",
          route: "",
          chi: [
            {
              name: "基础管理",
              route: "1",
              com: [
                {
                  route: "/audited",
                  name: "项目"
                },
                {
                  route: "/materiel",
                  name: "物料"
                },
                {
                  route: "/line",
                  name: "线路"
                },
                {
                  route: "/contract",
                  name: "价格表"
                }
              ]
            },
            {
              name: "订单管理",
              route: "",
              com: [
                {
                  route: "/orderInfo",
                  name: "订单信息"
                }
              ]
            },
            {
              name: "运单管理",
              route: "",
              com: [
                {
                  route: "/waybill",
                  name: "运单信息"
                }
              ]
            },
            {
              name: "异常管理",
              route: "",
              com: [
                {
                  route: "/exception",
                  name: "异常运单"
                }
              ]
            },
            {
              name: "轨迹管理",
              route: "",
              com: [
                {
                  route: "/realLocation",
                  name: "实时位置"
                }
              ]
            }
          ]
        },
        {
          route: "/indexTwo",
          name: "未知",
          chi: []
        },
        {
          route: "",
          name: "财务管理",
          chi: [
            {
              name: "账户管理",
              route: "",
              com: [
                {
                  route: "/accountMsg",
                  name: "账户信息"
                },
                {
                  route: "/rechargeDetails",
                  name: "账户充值明细"
                },
                {
                  route: "/presentationDetails",
                  name: "账户提现明细"
                },
                {
                  route: "/capitalFlow",
                  name: "账户资金流水"
                },
                {
                  route: "/paymentDetails",
                  name: "账户资金流水"
                }
              ]
            },
             {
              name: "结算管理",
              route: "",
              com: [
                {
                  route: "/waybillSettlement",
                  name: "运单结算"
                },
                {
                  route: "/waybillInvoice",
                  name: "运单开票"
                }
              ]
            },
             {
              name: "运营管理",
              route: "",
              com: [
                {
                  route: "/shipperAudit",
                  name: "货主审核/管理"
                }
              ]
            }
          ]
        },
      ],
      active: 0,
      currentIndex: 0,
      multipleSelection:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clearCheckData(){
        this.$store.commit("getSelectData", this.multipleSelection);
        this.$store.commit("getTableData", this.multipleSelection);
    },
    changeIndex(index) {
      this.currentIndex = index;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
/* @import url(); 引入公共css类 */
html,
body {
  width: 100%;
  height: 100%;
  background: #eee;
}
#navigation {
  height: 100%;
}
/* 全部内容整体布局 */
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top-content {
  width: 100%;
  height: 57px;
  background: #659cfe;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.center-content {
  width: 100%;
  flex: 1;
  display: flex;
  margin-top: 57px;
}
.bottom-content {
  width: 100%;
  height: 45px;
  background: yellowgreen;
}
/* 主体中间部分布局 */
.left-nav {
  width: 210px;
  height: 100%;
  background: #fff;
  text-align: left;
  position: fixed;
  left: 0;
  right: 0;
  padding: 7px;
}
.right-main {
  flex: 1;
  margin-left: 224px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.nav-main {
  height: 100%;
}
/*主体中间部分布局结束 */
.el-menu-item.is-active {
  background: #659cfe !important;
  border-radius: 6px;
}
.el-row {
  height: 100%;
}
.el-menu {
  height: 100%;

  border: none;
}
.tac-main {
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: auto;
  height: 38px;
  line-height: 38px;
}
.el-menu-item,
.el-submenu__title {
  height: 38px;
  line-height: 38px;
}
.top-icon {
  float: left;
  height: 100%;
  line-height: 57px;
  margin-left: 15px;
}
.top-icon img {
  width: 143px;
  height: 42px;
  margin-top: 6px;
}
.top-operation {
  float: right;
  height: 100%;
  line-height: 57px;
  color: #fff;
  margin-right: 20px;
}
.el-button--text {
  color: #fff;
}
.el-button [class*="el-icon-"] + span {
  margin-left: 10px;
  padding-right: 10px;
}

.right-bor {
  padding-right: 15px;
  border-right: 1px solid rgba(255, 255, 255, 1);
}
</style>