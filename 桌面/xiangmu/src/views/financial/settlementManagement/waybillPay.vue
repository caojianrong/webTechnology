<template>
    <div class="waybillPay">
        <div class="table_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <el-tab-pane label="待付款" name="first">
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
                        <el-button class="reset reset_tab" type="primary" @click="toPayBill()">付款</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="已付款" name="second">
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
                        <el-button class="reset reset_tab" type="primary" @click="toPayBill(payBillForm.editFlag = true)">付款</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="支付异常" name="third">
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
                        <el-button class="reset reset_tab" type="primary" @click="toPayBill()">付款</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="全部" name="fourth">
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
                        <el-button class="reset reset_tab" type="primary" @click="toPayBill(payBillForm.editFlag = true)">付款</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>

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

            <el-dialog :title="dialogTitle" width="860px" :visible.sync="payBillDialog" >
                <el-container>
                    <el-header height="100px">
                        <el-form ref="InvoiceFrom" :model="payBillForm" label-width="140px">
                            <el-form-item label="申请付款数量：">
                                {{payBillForm.billCount}} 单
                            </el-form-item>
                            <el-form-item label="申请付款总额：">
                                {{payBillForm.billTotal}} 元
                            </el-form-item>
                        </el-form>
                    </el-header>
                    <el-main>
                        <div class="table_com">
                            <el-table
                                    :data="payBillForm.payBillList"
                                    show-overflow-tooltipc
                                    border
                                    :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
                            >
                                <el-table-column prop="shippingId" label="运单ID"></el-table-column>
                                <el-table-column prop="orderCode" label="订单号"></el-table-column>
                                <el-table-column prop="shippingCode" label="运单号"></el-table-column>
                                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                                <el-table-column prop="shippingServiceAmt" label="应付服务费"></el-table-column>
                                <el-table-column prop="shippingPayAmt" label="应付现金运费"></el-table-column>
                                <el-table-column prop="shippingPayCard" label="应付非现金运费"></el-table-column>
                                <el-table-column prop="shippingManagementAmt" label="应付管理费"></el-table-column>
                                <el-table-column prop="shippingInvoiceTotal" label="开票金额"></el-table-column>
                            </el-table>
                        </div>
                    </el-main>
                    <el-footer class="addFooterCenter">
                        <el-button @click="payBillDialog = false">取 消</el-button>
                        <el-button type="primary" @click="doPayBill"
                                   v-loading.fullscreen.lock="loading"
                                   element-loading-text="支付中......"
                                   element-loading-spinner="el-icon-loading"
                                   element-loading-background="rgba(0, 0, 0, 0.8)"
                        >确 定</el-button>
                    </el-footer>
                </el-container>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import tabComp from "../../../compontes/tabComp";
    import singularTable from "../../../compontes/singularTable";
    import Pagination from "../../../compontes/pagtion";
    import { MessageBox } from "element-ui";
    export default {
        name: "waybillSettlement",
        components: {
            tabComp,
            singularTable,
            Pagination
        },
        data() {
            return {
                loading: false,
                dialogTitle: "申请开票",
                activeName: "first",
                setAuditedData: [],
                payBillDialog: false,
                payBillForm: {
                    billCount: 0,  // 账单数量
                    billTotal: 0,  //账单总额
                    // 支付账单数组
                    payBillList: [],
                },
                searchForm: {
                    driverName: '', //承运人
                    orderProject: {
                        projectName: '', //所属项目
                        projectCustomer: '' //客户名称
                    },
                    carCode: '', //车牌号
                    shippingArrayStatus: [8] //运单状态
                },
                tableData: [],
                total: 0, //数据总条数
                page: 1, //默认显示第1页
                limit: 10, //默认一次显示10条数据
                // 表头数据-待付款
                auditedName: [
                    {tabTh: "派车日期", tabItem: "createTime", isShow: true},
                    {tabTh: "提货日期", tabItem: "shippingLoadTime", isShow: true},
                    {tabTh: "签收日期", tabItem: "shippingUnloadTime", isShow: true},
                    {tabTh: "订单号", tabItem: "orderCode", isShow: true},
                    {tabTh: "运单号", tabItem: "shippingCode", isShow: true},
                    {tabTh: "客户名称", tabItem: "orderProject.projectCustomer", isShow: true},
                    {tabTh: "所属项目", tabItem: "orderProject.projectName", isShow: true},
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

                    {tabTh: "开票单价", tabItem: "shippingInvoiceUnitprice", isShow: true},
                    {tabTh: "开票金额", tabItem: "shippingInvoiceTotal", isShow: true},
                    {tabTh: "开票金额（不含税）", tabItem: "shippingInvoiceAmt", isShow: true},
                    {tabTh: "开票税金", tabItem: "shippingInvoiceTaxes", isShow: true},
                    {tabTh: "开票亏涨吨扣款", tabItem: "shippingInvoiceDeficit", isShow: true},
                    {tabTh: "开票货损扣款", tabItem: "shippingInvoiceDamage", isShow: true},
                    {tabTh: "开票晚到扣款", tabItem: "shippingInvoiceOverdue", isShow: true},
                    {tabTh: "开票其他扣款", tabItem: "shippingInvoiceOther", isShow: true},
                    {tabTh: "状态信息", tabItem: "shippingStatusName", isShow: true},

                    {tabTh: "账单确认人", tabItem: "shippingBillConfirmOperator", isShow: true},
                    {tabTh: "认账确认时间", tabItem: "shippingBillConfirmTime", isShow: true},

                    {tabTh: "申请付款人", tabItem: "shippingApplyPayOperator", isShow: true},
                    {tabTh: "申请付款时间", tabItem: "shippingApplyPayTime", isShow: true}
                ],
                // 表头数据-已付款（支付成功与失败）
                auditedName1: [
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
                ],
                // 表头数据
                auditedName2: [
                    {tabTh: "派车日期", tabItem: "createTime", isShow: true},
                    {tabTh: "提货日期", tabItem: "shippingLoadTime", isShow: true},
                    {tabTh: "签收日期", tabItem: "shippingUnloadTime", isShow: true},
                    {tabTh: "订单号", tabItem: "orderCode", isShow: true},
                    {tabTh: "运单号", tabItem: "shippingCode", isShow: true},
                    {tabTh: "客户名称", tabItem: "orderProject.projectCustomer", isShow: true},
                    {tabTh: "所属项目", tabItem: "orderProject.projectName", isShow: true},
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

                    {tabTh: "开票单价", tabItem: "shippingInvoiceUnitprice", isShow: true},
                    {tabTh: "开票金额", tabItem: "shippingInvoiceTotal", isShow: true},
                    {tabTh: "开票金额（不含税）", tabItem: "shippingInvoiceAmt", isShow: true},
                    {tabTh: "开票税金", tabItem: "shippingInvoiceTaxes", isShow: true},
                    {tabTh: "开票亏涨吨扣款", tabItem: "shippingInvoiceDeficit", isShow: true},
                    {tabTh: "开票货损扣款", tabItem: "shippingInvoiceDamage", isShow: true},
                    {tabTh: "开票晚到扣款", tabItem: "shippingInvoiceOverdue", isShow: true},
                    {tabTh: "开票其他扣款", tabItem: "shippingInvoiceOther", isShow: true},
                    {tabTh: "状态信息", tabItem: "shippingStatusName", isShow: true},

                    {tabTh: "账单确认人", tabItem: "shippingBillConfirmOperator", isShow: true},
                    {tabTh: "认账确认时间", tabItem: "shippingBillConfirmTime", isShow: true},

                    {tabTh: "申请付款人", tabItem: "shippingApplyPayOperator", isShow: true},
                    {tabTh: "申请付款时间", tabItem: "shippingApplyPayTime", isShow: true},

                    {tabTh: "付款人", tabItem: "shippingPayOperator", isShow: true},
                    {tabTh: "付款时间", tabItem: "shippingPayTime", isShow: true}
                ],
                tabIndex: 0, // 选项卡索引
                // 时间
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6;
                    }
                }
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //获取表格数据-待付款
            getList() {
                var param = new URLSearchParams();
                param.append("page", this.page);
                param.append("rows", this.limit);
                param.append("shippingArrayStatus",this.searchForm.shippingArrayStatus)
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
            //查询
            doSearch(){
                this.getList();
            },
            //获取表格数据
            getPayList() {
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
            handleClick(tab, event) {
                if (tab.index == 0) {
                    this.setAuditedData = this.auditedName;
                    this.searchForm.shippingArrayStatus = [8];
                    this.getList();
                } else if (tab.index == 1) {
                    this.setAuditedData = this.auditedName1;
                    this.getPayList();
                } else if (tab.index == 2) {
                    this.setAuditedData = this.auditedName1;
                    this.getPayList();
                }
                else if (tab.index == 3) {
                    this.setAuditedData = this.auditedName2;
                    this.searchForm.shippingArrayStatus = [8,9,10],
                    this.getList();
                }
            }, // 初始化表头数据
            setHeaderData() {
                this.setAuditedData = this.auditedName;
            },
            //打开支付窗口
            toPayBill(){
                var shippingList = this.$store.state.selectData;
                if (shippingList.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "请选择需要支付的账单！",
                        type: "error"
                    });
                    return false;
                }
                this.payBillForm.billCount = shippingList.length;
                this.payBillForm.billTotal = 0;
                this.payBillForm.payBillList = [];
                shippingList.forEach((item, index, arr) => {
                    this.payBillForm.payBillList.push( {
                        shippingId: item.shippingId,  //运单ID
                        shippingCode: item.shippingCode, //运单号
                        orderCode: item.orderCode,  //订单号
                        projectName: item.orderProject.projectName, //项目名称
                        projectCustomer: item.orderProject.projectCustomer,  //项目客户
                        shippingInvoiceTotal: item.shippingInvoiceTotal, //开票金额
                        shippingServiceAmt: item.shippingServiceAmt,  //应付服务费
                        shippingPayAmt: item.shippingPayAmt,  //应付现金运费
                        shippingPayCard: item.shippingPayCard, //应付非现金运费
                        shippingManagementAmt: item.shippingManagementAmt,  //应付管理费
                        groupId: item.groupId, //付款机构ID（账单所属机构ID）
                        shippingDriverId: item.shippingDriverId //收款用户ID
                    });
                    this.payBillForm.billTotal += item.shippingServiceAmt + item.shippingPayAmt + item.shippingPayCard + item.shippingManagementAmt;
                });
                this.payBillDialog = true;
            },
            //确定支付
            doPayBill(){
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 60000);

                var param = {};
                param.shippingList = this.payBillForm.payBillList;
                this.$http
                    .post(this.$api.Shipping.doPay, param, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                    })
                    .then(res => {
                        this.loading = false;
                        this.payBillDialog = false;
                        this.$message({
                            showClose: true,
                            message: res.data.data,
                            type: "success",
                            duration: 30000
                        });
                    })
                    .catch(err => {
                        this.$message({
                            showClose: true,
                            message: "失败（≧?≦）",
                            type: "error"
                        });
                    })
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.setAuditedData = this.auditedName;
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
<style>
    @import url("../../../assets/css/singularTable.css");
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