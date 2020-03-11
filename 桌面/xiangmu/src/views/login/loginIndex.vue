<!--  -->
<template>
  <div class="login">
    <div class="login-top">
      <div class="login-main">
        <div class="login-content">
          <div class="login-text">
            <img src="../../assets/images/login-title2@2x.png" alt />
            <!-- <span>厂厂宝-无车承运业务管理平台</span> -->
          </div>
          <p class="login-title">无车承运业务管理平台</p>
          <div class="uesr-code">
            <el-input placeholder="请输入内容" v-model="user" clearable>
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </div>
          <div class="pass-code">
            <el-input placeholder="请输入密码" v-model="password"  show-password>
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
          <p class="shipper" >
            <span @click="registerBtn" style=" cursor:pointer;">
            货主注册
            <i class="el-input__icon el-icon-d-arrow-right"></i>
            </span>
          </p>
            <el-button
              type="primary" 
              class="go-btn" 
              @click="loginBtn"
            >登录</el-button>
        </div>
      </div>
    </div>
    <div class="login-bottom">
        <p>技术支持：睿博龙（天津）智慧物联科技有限公司</p>
    </div>
  </div>
</template>

<script>
import { Form } from 'element-ui';
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "login",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      user: "",
      password: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginBtn(){
      let that = this;
      // let param = new URLSearchParams();
      // param.append("userName", that.user); //用户名
      // param.append("userLoginPwd", that.password); //密码
      // this.$http
      //   .post(that.$api.Login.Login, param, true)
      //   .then(res => {
      //     if(res.data.code === 1) {
      //       that.$message({
      //         showClose: true,
      //         message: res.data.message,
      //         type: "success"
      //       });
      //       this.$router.push({ path: "/index" });
      //     } else {
      //       that.$message({
      //         showClose: true,
      //         message: res.data.message,
      //         type: "error"
      //       });
      //     }
      //   })
      
      let param = new URLSearchParams();
      param.append("grant_type", "password");
      param.append("username", that.user);
      param.append("password", that.password);
      //  that.$store.state.lunxun_type='password'
      sessionStorage.setItem("u",btoa(that.user))
      sessionStorage.setItem("u1",btoa(that.password))
      //  that.$store.state.lunxun_user=that.user
      //  that.$store.state.lunxun_pass=that.password
      that.$http
      .post(that.$api.Login.getLogToken, param, {auth:{username: "app", password: "app"}})
      .then(res => {
        // console.log(res.data.code)
        if(res.data.code == 1) {
          // console.log(res.data.data.userFlag)
         
          // console.log('登录成功',res.data.data.userId)
          that.$store.commit("setStateAttr", {
            'token': res.data.data.access_token
          });
           //1为平台  2为货主
          if(res.data.data.userFlag==1){
            // console.log("走的平台端")
            that.$router.push({ path: "/platformIndex",query:{roleId:res.data.data.userId} });
          }else{
            that.$router.push({ path: "/index",query:{roleId:res.data.data.userId} });
          }
          // that.$router.push({ path: "/index",query:{roleId:res.data.data.userId} });
          localStorage.setItem("token", res.data.data.access_token);
          localStorage.setItem("userId",res.data.data.userId);
          localStorage.setItem("groupId",res.data.data.groupId);//所属机构针对于货主端
          localStorage.setItem("userFlag",res.data.data.userFlag);//角色所属 针对于
          localStorage.setItem("realName",res.data.data.realName); //用户真实姓名
        } else {
          that.$message({
            showClose: true,
            message: res.data.message,
            type: "error"
          });
        }
      })
      .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          });
        })
      // .catch(() => {
      //   that.$message({
      //     showClose: true,
      //     message: "用户名或密码错误",
      //     type: "error"
      //   });
      // })
    },
    // loginScc() {

    // },
    registerBtn(){
      this.$router.push({path:'/register'})
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {

  }, //生命周期 - 创建之前
  beforeMount() {

  }, //生命周期 - 挂载之前
  beforeUpdate() {

  }, //生命周期 - 更新之前
  updated() {
    
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.login {
  width: 100%;
  height: 100%;
  /* background: red; */
}
.login-top {
  width: 100%;
  height: 65%;
  background:url("../../assets/images/login-bj.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.login-bottom {
  width: 100%;
  height: 35%;
}
.login-main{
  position: absolute;
  bottom: -10%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 648px;
  height: 415px;
}
.login-content {
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px 0px rgba(55, 74, 109, 0.18);
  border-radius: 5px;
}
.login-text {
  margin: 0 auto;
  width: 30%;
  margin-top: 20px;
  font-weight: bold;
  color: rgba(251, 255, 255, 1);
  font-size: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  height: 10%;
}
img{
    width: 100%;
}
.uesr-code,
.pass-code {
  width: 75%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.login-btn {
  width: 75%;
  margin: 0 auto;
  margin-bottom: 25px;
  font-weight: 600;
}
.login-title {
  text-align: center;
  color: rgba(101, 156, 254, 1);
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 30px;
  font-weight: 600;
}
.go-btn {
  width: 100%;
}
.el-input__icon {
  color: #659cfe;
}
.shipper {
  font-size: 13px;
  font-family: Microsoft YaHei;
  color: rgba(101, 156, 254, 1);
  width: 75%;
  margin: 0 auto;
  text-align: right;
  margin-bottom: 25px;

}
.login-bottom p{
        position: fixed;
    bottom: 20px;
    /* text-align: center; */
    margin: 0 auto;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153,153,153,1)
}
</style>