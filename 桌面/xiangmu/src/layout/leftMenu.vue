<template>
  <div class="left-menu">
    <el-row class="tac">
      <el-row class="menu-box">
        <el-col :span="24">
          <!-- 侧边栏菜单区域 -->
          <el-menu
            class="el-menu-vertical"
            :unique-opened="true"
            :router="true"
            @select="clearCheckData()"
          >
          <!-- 首页 -->
          <!-- <router-link to="/index" tag="li">
            <el-submenu :index='item.permRequest==""?index+"":item.permRequest' class="menu menu-home" v-for="item in leftMenuIndex" :key="item.permId">
              <template slot="title">
                <span>{{item.permName}}</span>
              </template>
            </el-submenu>
          </router-link> -->
            <!-- <el-menu-item  v-for="item in leftMenuIndex" :key="item.permId" :index='item.permRequest==""?index+"":item.permRequest' v-show="item.children.length===0">
              <template slot="title">
                <span class="black">{{item.permName}}</span>
              </template>
            </el-menu-item> -->
            <el-menu-item class="menu" :index='leftMenuIndex[0].permRequest ? leftMenuIndex[0].permRequest: ""' v-if="leftMenuIndex.length > 0">
              <template slot="title">
                <span class="black">
                  {{leftMenuIndex[0].permName ? leftMenuIndex[0].permName : ''}}
                </span>
              </template>
            </el-menu-item>
            <!-- 一级 -->
            <el-submenu
              :index='item.permRequest==""?item.permId+"":item.permRequest'
              class="menu"
              v-for="(item,index11) in leftMenuTwo"
              :key="index11"
              v-show="item.children.length!=0&&item.children.length>0"
            >
              <template slot="title">
                <span>{{item.permName}}</span>
              </template>
              <!-- 二级 -->
              <!-- 判断是否还有children -->
              <template v-if="item.children.length>0">
                <el-submenu class="menu2" v-for="item2 in item.children" v-show="item2.children.length>0" :key="item2.permId+1" :index='item2.permRequest==""?item2.permId+"":item2.permRequest'>
                  <template slot="title">
                   <span>{{item2.permName}}</span>
                  </template>
                  <!-- 三级 -->
                  <!-- 判断是否还有children -->
                  <template v-if="item2.children.length!=1&&item2.children.length>0">
                    <el-menu-item v-for="item3 in item2.children" :key="item3.permId" :index='item3.permRequest==""?item3.permId+"":item3.permRequest'>
                      {{item3.permName}}
                    </el-menu-item>
                  </template>
              <!-- 如果没有children -->
                 <template v-else>
                    <el-menu-item v-for="(item3,index3) in item2.children" :key="index3" :index='item3.permRequest==""?item3.permId+"1":item3.permRequest'>
                      {{item3.permName}}
                    </el-menu-item>
                  </template>
                </el-submenu>
                  <el-menu-item v-for="(item2,index2) in item.children" v-show="item2.children.length==0" :key="index2" :index='item2.permRequest==""?item2.permId+"":item2.permRequest'>
                    <template slot="title" >
                      <span>{{item2.permName}}</span>
                    </template>
                  </el-menu-item>
              </template>
                <!-- 如果没有children -->
              <template v-else>
                <el-menu-item v-for="(item2,index21) in item.children" :key="index21" :index='item2.permRequest==""?item2.permId+"":item2.permRequest'>
                  {{item2.permName}}
                </el-menu-item>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios"
export default {
  data() {
    return {
      //专门用来放首页以外的
      leftMenuList: [],
      //专门用来放首页
      leftMenuIndex: [],
      // 二级菜单
      leftMenuTwo: [],
      // 三级菜单
      leftMenuThree: [],
      //平台名字
      IndexName: "",
      //选中菜单路径path
      activeMenu:"",
      roleId:null//用户ID
    };
  },
  components: {

  },
  methods: {
    clearCheckData() {
      this.$store.commit("getSelectData", this.multipleSelection);
      this.$store.commit("getTableData", this.multipleSelection);
      let currentUrl = window.location.href
      let currentPage = "/"+currentUrl.split('/')[4]
      // console.log(currentUrl,111,currentPage)
      this.activeMenu=currentPage
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取左侧菜单
    leftMenu() {
      let userId = localStorage.getItem("userId");
      this.roleId=localStorage.getItem("userId");
      let menuType = 0;
      let url =
        this.$api.LeftMenu + "?userId=" + userId + "&menuType=" + menuType;
      this.$http.get(url, true).then(res => {
        if (res.data.code !== 1) return this.$message.error(res.data.Message);
        this.leftMenuTwo = res.data.data;
        res.data.data.map(item => {
          if (item.children.length == 0) {
            this.leftMenuIndex.push(item);
            this.IndexName = this.leftMenuIndex[0].permName;
          } else {
            this.leftMenuList.push(item);
          }
        });
        // console.log(this.leftMenuList)
        // console.log(this.leftMenuIndex[0].permRequest)
        /*
        permName 菜单名称
        permRequest 请求地址
        permIcon 图标
        children 下级list
        permId 此ID
        */
      });
    }
  },
  beforeCreate: function() {
    //可以在这加个loading事件
    //console.group('beforeCreate 创建前状态===============》');
  },
  created: function() {
    // console.log(this.$route);
    // console.log(this.$route, "左侧");
    this.leftMenu();
    //在这结束loading，还做一些初始化，实现函数自执行
    //console.group('created 创建完毕状态===============》');
  },

  beforeMount: function() {
    //console.group('beforeMount 挂载前状态===============》');
  },
  mounted: function() {
    // console.log(atob(sessionStorage.getItem("u")),555,atob( sessionStorage.getItem("u1")))
    //在这发起后端请求，拿回数据，配合路由钩子做一些事情
    //console.group('mounted 挂载结束状态===============》');
//     window.lunxun = 0;
    
//     this.timer = window.setInterval(() => {
//     let param = new URLSearchParams();
//     param.append("grant_type", "password");
//     param.append("username",atob(sessionStorage.getItem("u"))  );
//     // console.log(atob(sessionStorage.getItem("user")),555,atob( sessionStorage.getItem("user1")))
//     param.append("password",atob( sessionStorage.getItem("u1")));
//     this.$http
//         .post(this.$api.Login.getLogToken, param, {auth:{username: "app", password: "app"}}).then(res=>{
//           console.log(res,"轮询")
//           if(res.data.code==0&&res.data.message=="token校验失败！"){
//               this.$message('身份验证失败,即将跳转登陆页...');
//                setTimeout(() => {
//                   this.$router.push({ path: "/login" });
//                 }, 2000);
//           }
//         })
//       // 查看登录是否过期
//           // alert("六秒了")
//           // console.log("三分钟了")

//     }, 1800000);//30分钟请求一次登陆
// console.log(this.$store)
  },
  beforeUpdate: function() {
    //console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    //console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // 你确认删除XX吗？  当前组件已被删除，清空相关内容
    //console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    //console.group('destroyed 销毁完成状态===============》');
  }
};
</script>


<style>
.left-menu {
  width: 100%;
  height: 100%;
}
.menu-box {
  margin: 10px auto 0;
  width: 90%;
}
/*初始化行高等*/
.menu-box .el-menu-item,
.menu-box .el-submenu__title,
.menu-box .el-submenu .el-menu-item {
  height: auto !important;
  line-height: 2em !important;
}
.menu-box .el-menu {
  border-right: none !important;
}
.el-menu-vertical a {
  text-decoration: none;
}
/*箭头大小*/
.menu-box .el-submenu__icon-arrow {
  font-size: 14px;
}
/* 首页及以及菜单 */
.menu-home > .el-submenu__title,
.menu.is-opened > .el-submenu__title {
  background: #659cfe;
}
.menu,
.menu > .el-icon,
.menu-home > .el-submenu__title,
.menu-home .el-icon,
.el-menu-vertical > .is-opened > .el-submenu__title,
.el-menu-vertical > .is-opened > .el-submenu__title > i {
  color: #ffffff !important;
}
.menu-home > .el-submenu__title:focus,
.menu-home > .el-submenu__title:hover,
.menu.is-opened > .el-submenu__title:hover {
  background-color: #659cfe !important;
}
.menu-home .el-submenu__icon-arrow {
  display: none;
}
.black{
  color: #303133
}
.el-menu-vertical .menu,
.el-menu-vertical .menu > .el-submenu__title {
  width: 100%;
  font-size: 14px;
  line-height: 3em !important;
  border-radius: 10px;
}

/*二级目录*/
.menu > .el-submenu__title {
  margin-bottom: 10px !important;
}
.menu > ul > .is-opened .el-submenu__title,
.menu > ul > .is-opened .el-submenu__icon-arrow {
  color: #659cfe;
}

.menu-2 > .el-submenu__title,
.menu-2 .el-menu-item {
  padding-left: 20px;
  font-size: 14px;
  line-height: 2.5em !important;
}
.menu-2 .el-submenu__icon-arrow:before {
  content: "\e6e0";
}
.menu-2 .el-submenu__icon-arrow {
  left: 20px;
  right: auto;
}
.menu-2.is-opened > .el-submenu__title > .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(90deg) !important;
  transform: rotateZ(90deg) !important;
}
.menu-2 .el-menu-item {
  padding-left: 40px !important;
}
.icon-dot {
  display: inline-block;
  margin-right: 8px;
  margin-top: -7px;
  font-style: normal;
  font-size: 12px;
}
.menu-2 .el-menu-item.is-active {
  color: #659cfe;
}
</style>
