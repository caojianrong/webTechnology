import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //是否登录判断
    islogin: "",
    tabData: [],
    singularData: [],
    isShow: true,
    selectData: [],
    downList: {
      list1: [], // 获取业务类型下拉数据
      list2: []  // 获取单位，吨，车，千克
    },
    provinceCode: [],
    taxAuthoritys: [],
    token: localStorage.getItem("token") || '',
    //用户登录携带的ID
    userId: localStorage.getItem("userId") || "",
    //轮询token
    // lunxun_type:"",
    lunxun_user:"",
    lunxun_pass:""
    
  },
  mutations: {
    // login: (state, n) => {
    //   console.log(state,n,222)
    //   //传入登录状态islogin
    //   let islogin = JSON.parse(n);
    //   localStorage.setItem("islogin", JSON.stringify(islogin));
    //   // console.log(islogin);
    //   state.islogin = islogin;
    // },

    // 登录
    login: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    //登出
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },

    setStateAttr(state, param) {
      if (param instanceof Array) {
        for (let item of param) {
          state[item.key] = item.data;
        }
      } else {
        let key = Object.keys(param)[0]
        state[key] = param[key]
        if (key == 'token') { // 登录后添加token的入口
          axios.defaults.headers = {
            'Authorization': 'Bearer ' + param[key]
          }
        }
      }
    },

    getTableData(state, payload) {
      state.tabData = payload;
      //  console.log(state.tabData)
    },
    // 单行搜索引擎获取数据
    getSingular(state, payload) {
      state.singularData = payload.options;
      state.isShow = payload.isShow;
    },
    // 表格获取选中数据
    getSelectData(state, payload) {
      state.selectData = payload;
      // console.log(state,"这里是store")
    },
    open(state, payload) {
      // 弹窗
      payload.that.$alert(payload.content, payload.title, {
        confirmButtonText: state.btnCont,
        callback: function (action) { }
      });
    },
    // 获取单位
    tons(state, payload) {
      state.downList.list2 = payload;
    },
    // 业务类型下拉
    yewuList(state, payload) {
      state.downList.list1 = payload;
    },
    getProvinceList(state, payload) {
      state.provinceCode = payload;
    },
    // 获取税务机关列表
    getTaxAuthorityList(state, payload) {
      state.taxAuthoritys = payload;
    },
  },
  actions: {
    // 获取单位
    getTons(context, that) {
      axios
        .get(that.$api.Basics.jifei, true)
        .then(res => {
          if (res.data.code > 0) {
            context.commit("tons", res.data.data);
          }
        })
        .catch(err => {
          console.log("失败");
        });
    },

    // 项目业务类型下拉
    getYewuList({ commit }, that) {
      axios
        .get(that.$api.BusinessTypeCode.businessList, true)
        .then(res => {
          if (res.data.code > 0) {
            // this.downList.list1 = res.data.data;
            commit("yewuList", res.data.data);
          }
        })
        .catch(err => {
          console.log("失败");
        });
    },

    // 获取城市省市区ID
    getOptions({ commit }, that) {
      axios
          .get(that.$api.Business.provinceCode,true)
        .then(res => {
          // console.log(res);
          commit("getProvinceList",res.data.data);
        })
        .catch(err => {
          console.log("获取区县ID失败");
        });
    },

    // 获取税务机关
    getTaxAuthority({ commit }, that) {
      axios
        .get(that.$api.Business.taxAuthority, true)
        .then(res => {
          // console.log(res);
          commit("getTaxAuthorityList", res.data.data);
        })
        .catch(err => {
          console.log("货物税务机关失败");
        });
    }
  },
  modules: {}
});
