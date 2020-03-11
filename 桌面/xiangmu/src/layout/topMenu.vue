<template>
  <div class="top-menu">
    <el-row>
      <el-col :span="9">
        <div class="grid-content logo">
          <img src="@/assets/images/logo2@2x.png" alt="厂厂宝" />
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content top-welcome text-right">
          <i class="el-icon el-icon-user-solid"></i>{{this.name}}，欢迎登录！
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content top-edit">
          <i class="el-icon el-icon-lock"></i>修改密码
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content top-logout text-center" @click="signout">
          <i class="el-icon el-icon-switch-button"></i>退出
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "top-menu",
  data() {
    return {};
  },
  data() {
    return{
      name:""
    }
  },
  computed: {},
  methods: {
    signout() {
      //退出登录
      this.$confirm("确定要退出登陆吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  created() {},
  beforeCreate: function() {
    //可以在这加个loading事件
    //console.group('beforeCreate 创建前状态===============》');
  },
  created: function() {
    //在这结束loading，还做一些初始化，实现函数自执行
      this.name = localStorage.getItem("realName");
  },
  beforeMount: function() {
    //console.group('beforeMount 挂载前状态===============》');
  },
  mounted: function() {
    //在这发起后端请求，拿回数据，配合路由钩子做一些事情
    //console.group('mounted 挂载结束状态===============》');
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

<style scoped>
@import url("../assets/css/base.css");
.top-menu {
  width: 100%;
  height: 100%;
  background-color: #659cfe;
}
.el-row,
.el-col {
  height: 100%;
}

.grid-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 1px;
}

.logo {
  margin-left: 20px;
  width: 140px;
}
.logo > img {
  width: 100%;
}

.el-icon {
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
}
.top-menu .el-icon-user-solid {
  border: 1px solid #ffffff;
  border-radius: 50%;
}

.top-welcome {
  padding-right: 25px;
  box-sizing: border-box;
  cursor: default;
}

.top-welcome::after {
  content: "";
  position: absolute;
  z-index: 111;
  top: 50%;
  right: 0;
  width: 2px;
  height: 18px;
  transform: translateY(-50%);
  background-color: #ffffff;
}

.top-edit {
  padding-left: 25px;
  box-sizing: border-box;
  cursor: pointer;
}

.top-logout {
  cursor: pointer;
}
</style>