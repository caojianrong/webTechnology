<!--  -->
<template>
    <div class="userAccountList">
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
                <el-form ref="searchData" :model="searchData" label-width="80px">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <el-form-item label="司机名称" prop="value">
                                <el-input placeholder="请输入内容" v-model="searchData.driverName" clearable></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                            <el-form-item label="手机号" prop="input">
                                <el-input placeholder="请输入内容" v-model="searchData.driverMobile" clearable></el-input>
                            </el-form-item>
                        </el-col>

                        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                          <el-form-item label="创建时间" prop="searchCreateTime">
                            <el-date-picker
                              v-model="searchData.createTime"
                              :picker-options="pickerOptions0"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col> -->

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
                    <el-button class="reset reset_tab" type="primary" @click="refreshBalance()">银行余额</el-button>
                    <el-button
                            class="reset reset_tab"
                            type="primary"
                            @click="doFrozen()"
                    >冻结/解冻</el-button>
                    <el-button
                            class="reset reset_tab"
                            type="primary"
                            @click="doAdd()"
                    >开户/注销</el-button>
                </div>
                <!-- 表格组件 -->
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
            <!-- 刷新余额弹窗 -->
            <el-dialog
                    title="提示"
                    :visible.sync="dialogFormVisible"
                    width="30%">
                <span>{{dialogFormMag}}</span>
                <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="dialogFormVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import tabComp from "../../../../compontes/tabComp";
    import singularTable from "../../../../compontes/singularTable";
    import Pagination from "../../../../compontes/pagtion";
    import axios from "axios";
    export default {
        name: "audit",
        //import引入的组件需要注入到对象中才能使用
        components: {
            tabComp,
            singularTable,
            Pagination
        },
        data() {
            return {
                // 限制时间
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6;
                    }
                },
                //搜索数据
                searchData: {
                    driverName: "", //司机姓名
                    driverMobile: "" //手机号
                },
                total: 0, //数据总条数
                page: 1, //默认显示第1页
                limit: 10, //默认一次显示10条数据
                //table数据
                tableData: [],
                // 表头数据
                auditedName: [
                    {tabTh: "司机姓名", tabItem: "driverName", isShow: true, sortNum: 1},
                    {tabTh: "手机号", tabItem: "driverMobile", isShow: true, sortNum: 2},
                    {tabTh: "账户余额", tabItem: "accountBalance", isShow: true, sortNum: 3},
                    {tabTh: "账户状态", tabItem: "accountStatusName", isShow: true, sortNum: 4},
                    {tabTh: "虚账户名", tabItem: "accountVirtualRealname", isShow: true, sortNum: 5},
                    {tabTh: "虚账户", tabItem: "accountVirtualNo", isShow: true, sortNum: 6},
                    {tabTh: "实账户", tabItem: "accountRealNo", isShow: true, sortNum: 7},
                    {tabTh: "创建时间", tabItem: "createTime", isShow: true, sortNum: 8},
                    {tabTh: "更新时间", tabItem: "updateTime", isShow: true, sortNum: 9}
                ],
                //余额弹窗
                dialogFormVisible: false,
                dialogFormMag: '',
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //根据条件查询列表
            doSearch() {
                this.page = 1;
                this.limit = 10;
                this.getList();
            },
            //重置
            resetData(formName) {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                    this.page = 1;
                    this.limit = 5;
                    this.searchData.projectName = "";
                    this.searchData.projectCustomer = "";
                    this.searchData.createTime = "";
                    this.getList();
                });
            },
            // 分页和加载数据方法
            getList() {
                var param = new URLSearchParams();
                param.append("page", this.page);
                param.append("rows", this.limit);
                this.$http
                    .post(
                        this.$api.PlatformPay.userAccountList,param,true
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
            //刷新余额
            refreshBalance(){
                var idList = this.$store.state.selectData;
                if (idList.length > 1 || idList.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "请选择要操作的记录！",
                        type: "error"
                    });
                    return false;
                }
                var param = new URLSearchParams();
                param.append("driverId", idList[0].accountOwnerId);
                this.$http
                    .post(
                        this.$api.PlatformPay.userAccountBalance,param,true
                    )
                    .then(res => {
                        this.dialogFormVisible = true;
                        if(res.data.code == 1) {
                            this.dialogFormMag = "当前账户余额："+res.data.data + " 元";
                            this.getList();
                        }else{
                            this.dialogFormMag = res.data.message;
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
            //冻结、解冻 1正常（解冻） 2冻结
            doFrozen(){
                var idList = this.$store.state.selectData;
                if (idList.length > 1 || idList.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "请选择要操作的记录！",
                        type: "error"
                    });
                    return false;
                }
                var param = new URLSearchParams();
                var tmpStatus;
                var tmpMssage;
                if(idList[0].accountStatus == 1){
                    tmpStatus = 2;
                    tmpMssage = "账户冻结";
                }
                else if(idList[0].accountStatus == 2){
                    tmpStatus = 1;
                    tmpMssage = "账户解冻";
                }
                else
                    return ;
                param.append("accountId", idList[0].accountId);
                param.append("accountStatus",tmpStatus);
                this.$http
                    .post(
                        this.$api.PlatformPay.accountFrozen,param,true
                    )
                    .then(res => {
                        this.dialogFormVisible = true;
                        if(res.data.code == 1) {
                            tmpMssage = tmpMssage + "成功！";
                            this.getList();
                        }else{
                            tmpMssage = tmpMssage + "失败！";
                        }
                        this.dialogFormMag = tmpMssage;
                    })
                    .catch(err => {
                        this.$message({
                            showClose: true,
                            message: "失败（≧?≦）",
                            type: "error"
                        });
                    })
            },
            //开户/注销
            doAdd(){
                alert("等我来加-ZL");
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getList(); //加载列表
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
<style scoped>
    /* @import url(); 引入公共css类 */
    @import url("../../../../assets/css/singularTable.css");
    .el-form-item__content {
        margin-left: 0 !important;
    }
</style>