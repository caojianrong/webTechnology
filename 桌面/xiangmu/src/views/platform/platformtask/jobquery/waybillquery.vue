<template>
    <div class="waybillquery">

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
                    carCode: '' //车牌号
                },
                total: 0, //数据总条数
                page: 1, //默认显示第1页
                limit: 10, //默认一次显示10条数据
                tableData: [],
                setAuditedData: [],
                // 表头数据
                auditedName: [
                    {tabTh: "装货时间", tabItem: "shippingLoadTime", isShow: true, sortNum: 1},
                    {tabTh: "卸货时间", tabItem: "shippingUnloadTime", isShow: true, sortNum: 2},
                    {tabTh: "订单号", tabItem: "orderCode", isShow: true, sortNum: 3},
                    {tabTh: "运单号", tabItem: "shippingCode", isShow: true, sortNum: 4},
                    {tabTh: "运单状态", tabItem: "shippingStatus", isShow: true, sortNum: 4},
                    {tabTh: "运单单价", tabItem: "truckingPrice.priceSettlementUnitprice", isShow: true, sortNum: 5},
                    {tabTh: "承运人", tabItem: "driverName", isShow: true, sortNum: 6},
                    {tabTh: "车牌号", tabItem: "carCode", isShow: true, sortNum: 7},
                    {tabTh: "承运人电话", tabItem: "driverMobile", isShow: true, sortNum: 8},
                    {tabTh: "派单日期", tabItem: "truckingCreateTime", isShow: true, sortNum: 9},
                    {tabTh: "接单日期", tabItem: "createTime", isShow: true, sortNum: 10},
                    {tabTh: "发货单位", tabItem: "truckingLoadAddress.addressCompany", isShow: true, sortNum: 11},
                    {tabTh: "发货人", tabItem: "truckingLoadAddress.addressContacter", isShow: true, sortNum: 12},
                    {tabTh: "发货地址", tabItem: "truckingLoadAddress.addressDetail", isShow: true, sortNum: 13},
                    {tabTh: "发货省", tabItem: "truckingLoadAddress.addressArea.provinceName", isShow: true, sortNum: 14},
                    {tabTh: "发货市", tabItem: "truckingLoadAddress.addressArea.cityName", isShow: true, sortNum: 15},
                    {tabTh: "发货区", tabItem: "truckingLoadAddress.addressArea.areaName", isShow: true, sortNum: 16},
                    {tabTh: "收货单位", tabItem: "truckingUnLoadAddress.addressCompany", isShow: true, sortNum: 17},
                    {tabTh: "收货人", tabItem: "truckingUnLoadAddress.addressContacter", isShow: true, sortNum: 18},
                    {tabTh: "收货地址", tabItem: "truckingUnLoadAddress.addressDetail", isShow: true, sortNum: 19},
                    {tabTh: "收货省", tabItem: "truckingUnLoadAddress.addressArea.provinceName", isShow: true, sortNum: 20},
                    {tabTh: "收货市", tabItem: "truckingUnLoadAddress.addressArea.cityName", isShow: true, sortNum: 21},
                    {tabTh: "收货区", tabItem: "truckingUnLoadAddress.addressArea.areaName", isShow: true, sortNum: 22},
                    {tabTh: "亏吨计量方式", tabItem: "truckingPrice.priceDeficitWay", isShow: true, sortNum: 23},
                    {tabTh: "允许亏吨量", tabItem: "truckingPrice.priceDeficitValue", isShow: true, sortNum: 24},
                    {tabTh: "亏吨扣费单价", tabItem: "truckingPrice.priceDeficitUnitprice", isShow: true, sortNum: 25},
                    {tabTh: "涨吨计量方式", tabItem: "truckingPrice.priceRiseWay", isShow: true, sortNum: 26},
                    {tabTh: "允许涨吨量", tabItem: "truckingPrice.priceRiseValue", isShow: true, sortNum: 27},
                    {tabTh: "涨吨扣费单价", tabItem: "truckingPrice.priceRiseUnitprice", isShow: true, sortNum: 28},
                    {tabTh: "货损扣款", tabItem: "truckingPrice.priceDamageDeduct", isShow: true, sortNum: 29},
                    {tabTh: "晚到扣款", tabItem: "truckingPrice.priceOverdueDeduct", isShow: true, sortNum: 30},
                    {tabTh: "其他扣款", tabItem: "truckingPrice.priceOtherDeduct", isShow: true, sortNum: 31},
                    {tabTh: "是否购买保险", tabItem: "shippingPremiumFlag", isShow: true, sortNum: 32},
                    {tabTh: "保险金额", tabItem: "shippingPremiumAmt", isShow: true, sortNum: 33},
                    {tabTh: "保价金额", tabItem: "shippingInsuredAmt", isShow: true, sortNum: 34},
                    {tabTh: "管理费", tabItem: "shippingManagementAmt", isShow: true, sortNum: 35},
                    {tabTh: "油气卡预付", tabItem: "shippingAdvanceCard", isShow: true, sortNum: 36},
                    {tabTh: "现金预付", tabItem: "shippingAdvanceAmt", isShow: true, sortNum: 37},
                    {tabTh: "其他费用项名称", tabItem: "shippingOtherAmtDesc", isShow: true, sortNum: 38},
                    {tabTh: "费用金额", tabItem: "shippingOtherAmt", isShow: true, sortNum: 39}
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
                        this.$api.Shipping.getShippingList,param,true
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