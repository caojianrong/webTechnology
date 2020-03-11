<template>
    <div class="carownerBill">

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
                            <el-form-item label="运单号" prop="shippingCode">
                                <el-input placeholder="运单号" v-model="searchForm.shippingCode" clearable></el-input>
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
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <el-form-item label="车牌号" prop="carCode">
                                <el-input placeholder="车牌号" v-model="searchForm.carCode" clearable></el-input>
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
                    carCode: '', //车牌号
                    shippingArrayStatus: [9,10,11,12,13] //运单状态
                },
                total: 0, //数据总条数
                page: 1, //默认显示第1页
                limit: 10, //默认一次显示10条数据
                tableData: [],
                setAuditedData: [],
                // 表头数据-支付成功
                auditedName: [
                    {tabTh: "派车日期", tabItem: "createTime", isShow: true},
                    {tabTh: "提货日期", tabItem: "shippingLoadTime", isShow: true},
                    {tabTh: "签收日期", tabItem: "shippingUnloadTime", isShow: true},
                    {tabTh: "订单号", tabItem: "orderCode", isShow: true},
                    {tabTh: "运单号", tabItem: "shippingCode", isShow: true},
                    {tabTh: "承运人", tabItem: "driverName", isShow: true},
                    {tabTh: "车牌号", tabItem: "carCode", isShow: true},
                    {tabTh: "应付服务费", tabItem: "shippingServiceAmt", isShow: true},
                    {tabTh: "应付现金运费", tabItem: "shippingPayAmt", isShow: true},
                    {tabTh: "应付非现金运费", tabItem: "shippingPayCard", isShow: true},
                    {tabTh: "应付管理费", tabItem: "shippingManagementAmt", isShow: true},

                    {tabTh: "提货量", tabItem: "shippingLoadQty", isShow: true},
                    {tabTh: "签收量", tabItem: "shippingUnloadQty", isShow: true},
                    {tabTh: "结算计费量", tabItem: "shippingSettlementQty", isShow: true},

                    {tabTh: "运单单价", tabItem: "shippingSettlementUnitprice", isShow: true},
                    {tabTh: "运费总额", tabItem: "shippintPayTotal", isShow: true},
                    {tabTh: "预付现金运费", tabItem: "shippingAdvanceAmt", isShow: true},
                    {tabTh: "预付非现金运费", tabItem: "shippingAdvanceCard", isShow: true},
                    {tabTh: "亏涨吨扣款", tabItem: "shippingDeficitAmt", isShow: true},
                    {tabTh: "货损扣款", tabItem: "shippingDamageAmt", isShow: true},
                    {tabTh: "晚到扣款", tabItem: "shippingOverdueAmt", isShow: true},
                    {tabTh: "其他扣款", tabItem: "shippingOtherAmt", isShow: true},

                    {tabTh: "状态信息", tabItem: "shippingStatusName", isShow: true},

                    {tabTh: "账单确认人", tabItem: "shippingBillConfirmOperator", isShow: true},
                    {tabTh: "认账确认时间", tabItem: "shippingBillConfirmTime", isShow: true},

                    {tabTh: "申请付款人", tabItem: "shippingApplyPayOperator", isShow: true},
                    {tabTh: "申请付款时间", tabItem: "shippingApplyPayTime", isShow: true},

                    {tabTh: "付款人", tabItem: "shippingPayOperator", isShow: true},
                    {tabTh: "付款时间", tabItem: "shippingPayTime", isShow: true},
                    {tabTh: "申请开票人", tabItem: "shippingApplyInvoiceOperator", isShow: true},
                    {tabTh: "申请开票时间", tabItem: "shippingApplyInvoiceTime", isShow: true},
                    {tabTh: "开票人", tabItem: "shippingInvoiceOperator", isShow: true},
                    {tabTh: "开票时间", tabItem: "shippingInvoiceTime", isShow: true},
                    {tabTh: "发票号", tabItem: "shippingInvoiceCode", isShow: true}
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
                param.append("shippingArrayStatus",this.searchForm.shippingArrayStatus);
                this.$http
                    .post(
                        this.$api.Shipping.getSettlementList,param,true
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