import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import VueAxios from 'vue-axios'
import api from './http/api';
import http from './http/http';
import BaiduMap from 'vue-baidu-map'
import qs from 'qs';
import moment from 'moment'
// 图标css
import "./assets/iconfont/iconfont.css"
//公用css
import './assets/css/common.css'
// axios 拦截器
import './http/axios'
/** table 自适应宽度*/
import AFTableColumn from 'af-table-column'

Vue.use(AFTableColumn)

// 全局注册qs进行序列化数据
Vue.prototype.$qs = qs;

Vue.prototype.$moment = moment;
// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.$http = http;
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'LI6j6rxVDwp3698Gfx89GMGASVUfG2iZ'
})
// Vue.filter('datefmt', function (input, fmtstring) {
//   return moment.unix(input).format(fmtstring)
// })
//引入axios请求
Vue.use(VueAxios, Axios)
// 引入element组件库
Vue.use(Element)

Vue.config.productionTip = false
//请求方法  this.$http.post("url",参数,是否携带header（true是携带 false是不携带）)  例： this.$http.post(this.$api.Login,param, true).then(res => {console.log("成功");}).catch(err => {console.log("失败");});
//请求地址  在api.js里面生成（写） this.$api.（api.js）里面的对象名  例：this.$api.Login


//路由守卫   在路由页面加  meta: { requireAuth: true },//路由守卫   进行路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next();
    } else {
      next({
        path: "/login"//指向为你的登录界面
      });
    }
  } else {
    next();
  }

  if (to.fullPath === "/dd") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

//判断登录状态需要存localStorage.setItem(‘islogin',JSON.stringify(islogin));将islogin变为String类型    取出来的时候需要将islogin转化为Boolean类型，就比如JSON.parse(localStorage.getItem(‘islogin'))这样。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
