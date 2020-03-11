<template>
  <div id="app"> 
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
   mounted: function() {
    // console.log(atob(sessionStorage.getItem("u")),555,atob( sessionStorage.getItem("u1")))
    //在这发起后端请求，拿回数据，配合路由钩子做一些事情
    // console.group('mounted 挂载结束状态===============》');
    window.lunxun = 0;
    
    this.timer = window.setInterval(() => {
    let param = new URLSearchParams();
    param.append("grant_type", "password");
    param.append("username",atob(sessionStorage.getItem("u"))  );
    param.append("password",atob( sessionStorage.getItem("u1")));
    this.$http
        .post(this.$api.Login.getLogToken, param, {auth:{username: "app", password: "app"}}).then(res=>{
          console.log(res,"轮询")
          if(res.data.code==0&&res.data.message=="token校验失败！"){
              this.$message('身份验证失败,即将跳转登陆页...');
               setTimeout(() => {
                  this.$router.push({ path: "/login" });
                }, 2000);
          }
        })
    }, 1800000);//30分钟请求一次登陆
  },
}
</script>

<style>
#app {
  height: 100%;
}
@import url("./assets/css/singularTable.css");
</style>
