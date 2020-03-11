<!--  -->
<template>
  <div class="paymentDetails">
  <div class="table_main">
      <div class="table_main_head">
        <div class="auditSolid">
          <div class="audiafter">筛选查询</div>
          <div class="auditheadright">
            <div class="audited_down">
              <i class="el-icon-download"></i>
              导出信息
            </div>
            <div class="senior_search">高级检索>></div>
          </div>
        </div>
      </div>
      <div class="audit_search">
       <!-- 单行搜索引擎 -->
        <el-form ref="formData" :model="formData" label-width="80px">
          <el-row :gutter="10">

            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="支付类型" prop="payType">
                <el-input placeholder="请选择" v-model="formData.payType" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="运单号" prop="shippingCode">
                <el-input placeholder="请输承运人电话" v-model="formData.shippingCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="支付日期" prop="createTime">
                <el-date-picker
                        v-model="formData.createTime"
                        :picker-options="pickerOptions0"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" type="primary" @click="doSearch()">查询</el-button>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" @click="resetData('searchData')" class="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格组件 -->
      <div class="table_com">
        <div class="tab_operation">
         
        </div>
         <div class="list-box">
        <!-- 表单组件 -->
        <tabComp :tableHeader='auditedName' :tableData1="tableData">  
          </tabComp>
        <!-- 表单组件结束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
export default {
  name: "paymentDetails",
  //import引入的组件需要注入到对象中才能使用
  components: {
      tabComp,
      singularTable,
      Pagination
  },
  data() {
    //这里存放数据
    return {
      // 时间
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },

        formData: {
            createTime: '',
            payType: '',
            shippingCode: ''
        },
        total: 0, //数据总条数
        page: 1, //默认显示第1页
        limit: 10, //默认一次显示10条数据
      tableData: [],
      // 表头数据
      auditedName: [
          {tabTh: "支付时间", tabItem: "createTime", isShow: true},
          {tabTh: "支付单号", tabItem: "payCode", isShow: true},
          {tabTh: "支付状态", tabItem: "payStatusName", isShow: true},
          {tabTh: "订单号", tabItem: "payOrderCode", isShow: true},
          {tabTh: "运单号", tabItem: "payShippingCode", isShow: true},
          {tabTh: "付款方", tabItem: "payOutVirtualAccount.accountVirtualRealname", isShow: true},
          {tabTh: "付款账号", tabItem: "payOutVirtualAccount.accountVirtualNo", isShow: true},
          {tabTh: "收款方", tabItem: "payInVirtualAccount.accountVirtualRealname", isShow: true},
          {tabTh: "收款账号", tabItem: "payInVirtualAccount.accountVirtualNo", isShow: true},
          {tabTh: "费用类型", tabItem: "payTypeName", isShow: true},
          {tabTh: "支付金额", tabItem: "payAmount", isShow: true},
          {tabTh: "支付凭证号", tabItem: "paySwiftNo", isShow: true}
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      //重置
       resetData(formName){
          this.$nextTick(() => {
              this.$refs[formName].resetFields();
          });
      },
      //获取表格数据
      getList() {
          var param = new URLSearchParams();
          param.append("page", this.page);
          param.append("rows", this.limit);
          this.$http
              .post(
                  this.$api.Pay.getPayList,param,true
              )
              .then(res => {
                  if(res.data.code == 1) {
                      //表格数据
                      this.tableData = res.data.data.list;
                      this.total = res.data.data.total;
                  }
              })
              .catch(err => {
                  this.$message({
                      showClose: true,
                      message: "失败（≧?≦）",
                      type: "error"
                  });
              })
        },
        doSearch() {
            this.getList();
        }
  },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getList();
    },
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
<style scoped>
/* @import url(); 引入公共css类 */
@import url("../../../assets/css/singularTable.css");
.new_pro {
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 3px 10px;
}
.el-row {
  margin-bottom: 20px;
}
.subBtn {
  width: 240px;
  margin: 0 auto;
  display: block;
}
</style>