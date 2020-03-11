<!--  -->
<template>
  <div class="rechargeDetails">
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
        <el-form ref="searchForm" :model="searchForm" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
              <el-form-item label="创建时间" prop="value1">
                <el-date-picker
                        v-model="searchForm.createTime"
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
                <el-button size="medium" @click="resetData('searchForm')" class="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格组件 -->
      <div class="table_com">
        <div class="list-box">
          <tabComp :tableHeader="auditedName" :tableData1="tableData"></tabComp>
          <pagination
                  v-show="total>0"
                  :total="total"
                  :page.sync="page"
                  :limit.sync="limit"
                  @pagination="getList"
          />
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
  name: "rechargeDetails",
  //import引入的组件需要注入到对象中才能使用
  components: {
      tabComp,
      singularTable,
      Pagination
  },
  data() {
    //这里存放数据
    return {
        total: 0, //数据总条数
        page: 1, //默认显示第1页
        limit: 10, //默认一次显示10条数据
        searchForm:{
          createTime: ''
        },
        tableData: [],
        // 表头数据
        auditedName: [
            {tabTh: "充值单号", tabItem: "rechargeCode", isShow: true},
            {tabTh: "充值操作时间", tabItem: "createTime", isShow: true},
            {tabTh: "充值账户", tabItem: "rechargeVirtualName", isShow: true},
            {tabTh: "充值账号", tabItem: "rechargeVirtualNo", isShow: true},
            {tabTh: "充值金额", tabItem: "rechargeAmount", isShow: true},
            {tabTh: "充值类型", tabItem: "rechargeTypeName", isShow: true},
            {tabTh: "充值状态", tabItem: "rechargeStatusName", isShow: true},
            {tabTh: "操作人", tabItem: "createUserName", isShow: true},
            {tabTh: "流水号", tabItem: "rechargeSwiftNo", isShow: true},
            {tabTh: "到账时间", tabItem: "createTime", isShow: true}
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
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    //获取表格数据
    getList() {
        var param = new URLSearchParams();
        param.append("page", this.page);
        param.append("rows", this.limit);
        param.append("createTime", this.searchForm.createTime);
        this.$http
            .post(
                this.$api.Pay.getRechargeList,param,true
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
    //根据条件查询列表
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