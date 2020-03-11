<template>
  <div class="orderinquiry">

    <div class="table_main">
      <div class="table_main_head">
        <div class="auditSolid">
          <div class="audiafter">筛选查询</div>
          <div class="auditheadright">
            <div class="audited_down">
              <i class="el-icon-download"></i>
              导出信息
            </div>
            <!-- <div class="senior_search">
              高级检索
              <i class="el-icon-d-arrow-right"></i>
            </div> -->
          </div>
        </div>
      </div>
      <div class="audit_search">
        <!-- 单行搜索引擎 -->
        <el-form ref="searchForm" :model="searchForm" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="订单号" prop="shippingCode">
                <el-input placeholder="订单号" v-model="searchForm.orderCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="承运人" prop="driverName">
                <el-input placeholder="承运人" v-model="searchForm.driverName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="项目" prop="orderProject.projectName">
                <el-input placeholder="项目" v-model="searchForm.orderProject.projectName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="客户" prop="orderProject.projectCustomer">
                <el-input placeholder="客户" v-model="searchForm.orderProject.projectCustomer" clearable></el-input>
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
      <div class="tab_operation">
      </div>

      <div class="table_com">
        <div class="list-box">
          <tabComp :tableHeader="setAuditedData" :tableData1="tableData"></tabComp>
          <pagination
                  v-show="total>0"
                  :total="total"
                  :page.sync="page"
                  :limit.sync="limit"
                  @pagination="getList"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import tabComp from "../../../../compontes/tabComp";
    import singularTable from "../../../../compontes/singularTable";
    import Pagination from "../../../../compontes/pagtion";
    import { MessageBox } from "element-ui";
    export default {
        name: "shipperinvoice",
        components: {
            tabComp,
            singularTable,
            Pagination
        },
        data() {
            return {
                tabIndex: 0, // 选项卡索引
                activeName: "first",
                searchForm: {
                    driverName: '', //承运人
                    orderProject: {
                        projectName: '', //所属项目
                        projectCustomer: '' //客户名称
                    },
                    carCode: '' //车牌号
                },
                total: 0, //数据总条数
                page: 1, //默认显示第1页
                limit: 10, //默认一次显示10条数据
                tableData: [],
                setAuditedData: [],
                // 表头数据
                auditedName: [
                    {tabTh: "订单号", tabItem: "orderCode", isShow: true},
                    {tabTh: "创建时间", tabItem: "createTime", isShow: true},
                    {tabTh: "绑定项目", tabItem: "orderProject.projectName", isShow: true},
                    {tabTh: "业务类型", tabItem: "orderProject.projectBusinessType", isShow: true},
                    {tabTh: "客户名称", tabItem: "orderProject.projectCustomer", isShow: true},
                    {tabTh: "结算模式", tabItem: "orderProject.projectSettlementWay", isShow: true},
                    {tabTh: "计费分类", tabItem: "orderProject.projectSettlementClass", isShow: true},
                    {tabTh: "运费计算方式", tabItem: "orderProject.projectCalculateWay", isShow: true},
                    {tabTh: "计费总量", tabItem: "orderFreightTotal", isShow: true},
                    {tabTh: "计费单位", tabItem: "orderPrice.priceSettlementUnit", isShow: true},
                    {tabTh: "订单单价", tabItem: "orderPrice.priceSettlementUnitprice", isShow: true},
                    {tabTh: "是否购买保险", tabItem: "orderPremiumFlag", isShow: true},
                    {tabTh: "保价金额", tabItem: "orderInsuredAmt", isShow: true},
                    {tabTh: "保险金额", tabItem: "orderPremiumAmt", isShow: true},
                    {tabTh: "发货联系人", tabItem: "orderLoadAddress.addressContacter", isShow: true},
                    {tabTh: "发货单位", tabItem: "orderLoadAddress.addressCompany", isShow: true},
                    {tabTh: "发货联系电话", tabItem: "orderLoadAddress.addressContactMobile", isShow: true},
                    {tabTh: "发货详细地址", tabItem: "orderLoadAddress.addressDetail", isShow: true},
                    {tabTh: "发货省", tabItem: "orderLoadAddress.addressArea.provinceName", isShow: true},
                    {tabTh: "发货市", tabItem: "orderLoadAddress.addressArea.cityName", isShow: true},
                    {tabTh: "发货区", tabItem: "orderLoadAddress.addressArea.areaName", isShow: true},
                    {tabTh: "要求提货时间", tabItem: "orderLoadTime", isShow: true},
                    {tabTh: "收货单位", tabItem: "orderUnLoadAddress.addressCompany", isShow: true},
                    {tabTh: "收货人", tabItem: "orderUnLoadAddress.addressContacter", isShow: true},
                    {tabTh: "收货联系电话", tabItem: "orderUnLoadAddress.addressContactMobile", isShow: true},
                    {tabTh: "收货详细地址", tabItem: "orderUnLoadAddress.addressDetail", isShow: true},
                    {tabTh: "收货省", tabItem: "orderUnLoadAddress.addressArea.provinceName", isShow: true},
                    {tabTh: "收货市", tabItem: "orderUnLoadAddress.addressArea.cityName", isShow: true},
                    {tabTh: "收货区", tabItem: "orderUnLoadAddress.addressArea.areaName", isShow: true},
                    {tabTh: "要求签收时间", tabItem: "orderUnloadTime", isShow: true},
                    {tabTh: "订单备注", tabItem: "orderDesc", isShow: true}
                ],
                // 时间
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6;
                    }
                },
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //查询
            doSearch(){
                this.getList();
            },
            //获取表格数据-待付款
            getList() {
                var param = new URLSearchParams();
                param.append("page", this.page);
                param.append("rows", this.limit);
                this.$http
                    .post(
                        this.$api.Order.getOrderList,param,true
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
            // 初始化表头数据
            setHeaderData() {
                this.setAuditedData = this.auditedName;
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.setHeaderData();
            this.getList();
        },
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
  @import url("../../../../assets/css/singularTable.css");
  .tab_operation {
    text-align: right;
    margin-bottom: 15px;
    padding-right: 5%;
    height: 30px;
    line-height: 30px;
  }
  .new_pro {
    border-radius: 4px;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 3px 10px;
  }
  .el-header {
    height: auto;
  }

  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
  }
  .el-main{
    padding-right: 10px;
  }

  .addFooterCenter{
    text-align: right;
  }
</style>