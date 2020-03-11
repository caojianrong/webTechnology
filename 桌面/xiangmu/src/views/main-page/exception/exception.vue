<template>
  <div class="audit">
    <div class="table_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="异常待处理" name="first">
          <!-- 待生效 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="shippingCode">
                    <el-input placeholder="订单号" v-model="searchForm.shippingCode" clearable></el-input>
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
            <el-button class="reset reset_tab" type="primary"   @click="toAffirm()">确认异常</el-button>
            <el-button class="reset reset_tab" type="primary"   @click="toRecover()">异常恢复</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="异常待审核" name="second">
          <!-- 待生效 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="shippingCode">
                    <el-input placeholder="订单号" v-model="searchForm.shippingCode" clearable></el-input>
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
            <el-button class="reset reset_tab" type="primary" @click="toRecover()">审核</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="异常运单" name="third">
          <!-- 派单中 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="shippingCode">
                    <el-input placeholder="订单号" v-model="searchForm.shippingCode" clearable></el-input>
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
          <div class="tab_operation"></div>
        </el-tab-pane>

        <el-tab-pane label="全部" name="fourth">
          <!-- 派单中 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="4">
                  <el-form-item label="订单号" prop="shippingCode">
                    <el-input placeholder="订单号" v-model="searchForm.shippingCode" clearable></el-input>
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
          <div class="tab_operation"></div>
        </el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
      <div class="table_com">
        <div class="list-box">
          <tabComp :tableHeader="setAuditedData" :tableData1="list"></tabComp>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            @pagination="getList"
          />
        </div>
      </div>

      <!-- 异常恢复 -->
      <el-dialog :title="dialogTitle" width="860px" :visible.sync="dialogVisible" >
        <el-container>
          <el-main>
            <div class="auditBox">
                <table>
                    <tr class="trHeader">
                      <td>晚到扣款</td><td>货损扣款</td><td>其它扣款</td>
                    </tr>
                    <tr>
                      <td>
                        <el-input v-if="editFlag" placeholder="请输入扣款金额" v-model="editExceptionForm.shippingDamageAmt"></el-input>
                        <span v-else>{{this.editExceptionForm.shippingDamageAmt}}</span>
                      </td>
                      <td>
                        <el-input v-if="editFlag" placeholder="请输入扣款金额" v-model="editExceptionForm.shippingOverdueAmt"></el-input>
                        <span v-else>{{this.editExceptionForm.shippingOverdueAmt}}</span>
                      </td>
                      <td>
                        <el-input v-if="editFlag" placeholder="请输入扣款金额" v-model="editExceptionForm.shippingOtherAmt"></el-input>
                        <span v-else>{{this.editExceptionForm.shippingOtherAmt}}</span>
                      </td>
                    </tr>
                </table>

              <el-divider></el-divider>
              <el-form ref="editExceptionForm" :model="editExceptionForm">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="派单时间" prop="createTime">{{this.editExceptionForm.createTime}}</el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="派单计费量" prop="truckingFreightTotal">{{this.editExceptionForm.trucking.truckingFreightTotal}} {{this.editExceptionForm.trucking.truckingFreightUnit}}</el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="提货时间" prop="shippingLoadTime">{{this.editExceptionForm.shippingLoadTime}}</el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="提货计费量" prop="shippingLoadQty">{{this.editExceptionForm.shippingLoadQty}} {{this.editExceptionForm.trucking.truckingFreightUnit}}</el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="签收时间" prop="shipingUnloadTime">{{this.editExceptionForm.shipingUnloadTime}}</el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="签收计费量" prop="shippingUnloadQty">{{this.editExceptionForm.shippingUnloadQty}} {{this.editExceptionForm.trucking.truckingFreightUnit}}</el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <el-divider></el-divider>
              <table>
                <tr>
                  <td class="tdHeader">订单号</td><td>{{this.editExceptionForm.orderCode}}</td>
                  <td class="tdHeader">司机</td><td>{{this.editExceptionForm.driverName}}</td>
                </tr>
                <tr>
                  <td class="tdHeader">运单号</td><td>{{this.editExceptionForm.shippingCode}}</td>
                  <td class="tdHeader">车牌号</td><td>{{this.editExceptionForm.carCode}}</td>
                </tr>
              </table>
              <el-divider></el-divider>
              <el-table
                      :data="editExceptionForm.shippingGoodsList"
                      style="width: 100%"
                      :header-cell-style="{background:'#F6F6F6',color:'#606266'}"
              >
                <el-table-column prop="goodsName" label="物料名称"></el-table-column>
                <el-table-column prop="goodsSettlementTotal" label="派车计费量"></el-table-column>
                <el-table-column label="提货时间">{{this.editExceptionForm.shippingLoadTime}}</el-table-column>
                <el-table-column prop="shippingLoadQty" label="提货计费量"></el-table-column>
                <el-table-column label="签收时间">{{this.editExceptionForm.shippingUnloadTime}}</el-table-column>
                <el-table-column prop="shippingUnloadQty" label="签收计费量"></el-table-column>
              </el-table>

              <el-divider></el-divider>

              <div class="images">
                <el-image
                        :src="editExceptionForm.loadReceipt.receiptBill"
                        :preview-src-list="srcList">
                </el-image>
                <el-image
                        :src="editExceptionForm.loadReceipt.receiptImage"
                        :preview-src-list="srcList">
                </el-image>
                <el-image
                        :src="editExceptionForm.unloadReceipt.receiptBill"
                        :preview-src-list="srcList">
                </el-image>
                <el-image
                        :src="editExceptionForm.unloadReceipt.receiptImage"
                        :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button v-if="editFlag" type="primary" @click="doRecoverSign">确 定</el-button>
            <el-button v-if="!editFlag" type="primary" @click="doCheck(6)">审核不通过</el-button>
            <el-button v-if="!editFlag" type="primary" @click="doCheck(5)">审核通过</el-button>

          </el-footer>
        </el-container>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import tabComp from "../../../compontes/tabComp";
import pagination from "../../../compontes/pagtion";
import singularTable from "../../../compontes/singularTable";
import { MessageBox } from "element-ui";
export default {
  name: "exception",
  components: {
    tabComp,
    pagination,
    singularTable
  },
  data() {
    return {

        activeName: "first",
        dialogTitle: '签收弹窗', //弹窗标题
        dialogVisible: false,  //签收异常弹
        editFlag: true,   //修改标识
        editExceptionForm:{
            exceptionId: '',  //异常主键ID
            shippingDamageAmt: '',  //货损扣款
            shippingOverdueAmt: '', //晚到扣款
            shippingOtherAmt: '',    //其它扣款

            createTime: '', //派单时间
            shippingLoadTime: '', //提货时间
            shippingLoadQty: '',  //提货计费量
            shippingUnloadTime: '', //签收时间
            shippingUnloadQty: '', //签收计费量
            trucking: {
                truckingFreightTotal:'', //派单计费量
                truckingFreightUnit: '', //派单计费量单位
            },
            orderCode: '', //订单号
            shippingCode: '', //运单号
            driverName: '',  //司机
            carCode: '',  //车牌号
            shippingGoodsList: '',  //物料列表
            loadReceipt: {
                receiptImage: '',  //提货现场照片
                receiptBill: '',   //提货单照片
            },
            unloadReceipt: {
                receiptImage: '',  //卸货现场照片
                receiptBill: '',   //卸货单照片
            }
        } ,
        srcList: [], //图片预览列表
        tabIndex: 0, // 选项卡索引
        searchForm: {
            shippingCode: '', //运单号
            shippingExceptionArrayStatus:[1]  //异常状态数组
        },
        list: null, //请求回来填充表格的数据
        total: 0, //数据总条数
        page: 1, //默认显示第1页
        limit: 10, //默认一次显示10条数据
        setAuditedData: [],
        // 表头数据
        auditedName: [
            {tabTh: "异常原因", tabItem: "shippingExceptionDesc", isShow: true},
            {tabTh: "异常时间", tabItem: "createTime", isShow: true},
            {tabTh: "异常类型", tabItem: "shippingExceptionTypeName", isShow: true},
            {tabTh: "异常状态", tabItem: "shippingExceptionStatusName", isShow: true},
            {tabTh: "所属项目", tabItem: "shippingProjectName", isShow: true},
            {tabTh: "订单号", tabItem: "orderCode", isShow: true},
            {tabTh: "运单号", tabItem: "shippingCode", isShow: true},
            {tabTh: "承运人", tabItem: "shippingDriverName", isShow: true},
            {tabTh: "车牌号", tabItem: "shippingCarCode", isShow: true},
            {tabTh: "车主电话", tabItem: "shippingDriverMobile", isShow: true},
            {tabTh: "接单日期", tabItem: "shippingCreateTime", isShow: true},
            {tabTh: "异常ID", tabItem: "exceptionId", isShow: false},
            {tabTh: "运单ID", tabItem: "shippingId", isShow: false}
        ],
        auditedName1: [
            {tabTh: "异常原因", tabItem: "shippingExceptionDesc", isShow: true},
            {tabTh: "异常时间", tabItem: "createTime", isShow: true},
            {tabTh: "处理时间", tabItem: "updateTime", isShow: true},
            {tabTh: "异常类型", tabItem: "shippingExceptionTypeName", isShow: true},
            {tabTh: "异常状态", tabItem: "shippingExceptionStatusName", isShow: true},
            {tabTh: "所属项目", tabItem: "shippingProjectName", isShow: true},
            {tabTh: "订单号", tabItem: "orderCode", isShow: true},
            {tabTh: "运单号", tabItem: "shippingCode", isShow: true},
            {tabTh: "承运人", tabItem: "shippingDriverName", isShow: true},
            {tabTh: "车牌号", tabItem: "shippingCarCode", isShow: true},
            {tabTh: "车主电话", tabItem: "shippingDriverMobile", isShow: true},
            {tabTh: "接单日期", tabItem: "shippingCreateTime", isShow: true},
            {tabTh: "异常ID", tabItem: "exceptionId", isShow: false},
            {tabTh: "运单ID", tabItem: "shippingId", isShow: false}
        ],
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
      handleClick(tab, event) {
          //（0逻辑删除、1异常待处理、2确认异常、3恢复正常、4异常恢复待审核、5异常审核通过恢复正常,6异常审核不通过）
          this.tabIndex = tab.index;
          if (tab.index == 0) {
              this.editFlag = true;
              this.setAuditedData = this.auditedName;
              this.searchForm.shippingExceptionArrayStatus = [1]; //异常待处理
              this.getList();
          } else if (tab.index == 1) {
              this.editFlag = false;
              this.setAuditedData = this.auditedName;
              this.searchForm.shippingExceptionArrayStatus = [4]; //异常恢复待审核
              this.getList();
          } else if (tab.index == 2) {
              this.editFlag = false;
              this.setAuditedData = this.auditedName1;
              this.searchForm.shippingExceptionArrayStatus = [2,6]; //异常恢复待审核
              this.getList();
          }else if (tab.index == 3) {
              this.setAuditedData = this.auditedName1;
              this.searchForm.shippingExceptionArrayStatus = []; //全部
              this.getList();
          }
      },
      //检索列表
      doSearch(){
          this.getList();
      },
      //渲染表格
      getList() {
          var param = new URLSearchParams();
          param.append("page", this.page);
          param.append("rows", this.limit);
          param.append("shippingExceptionArrayStatus",this.searchForm.shippingExceptionArrayStatus);
          this.$http
              .post(
                  this.$api.Exception.shippingExceptionList,param,true
              )
              .then(res => {
                  if(res.data.code == 1) {
                      //表格数据
                      this.list = res.data.data.list;
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
      //确认异常
      toAffirm() {
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({
                  showClose: true,
                  message: "请选择一条要操作的记录！",
                  type: "error"
              });
              return false;
          }
          this.$confirm(
              "确定当前运单状态为异常运单吗？确定异常后该运单将不再进行结算，并且不可开具发票！",
              "操作",
              {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
              })
              .then(() => {
                  var param = new URLSearchParams();
                  param.append("exceptionId", idList[0].exceptionId);
                  this.$http
                      .post(
                          this.$api.Exception.shippingExceptionAffirm,param,true
                      )
                      .then(res => {
                          if(res.data.code == 1){
                              this.$message({showClose: true, message: res.data.message, type: "success"});
                              this.getList();
                          }
                          else
                              this.$message({showClose: true, message: res.data.message, type: "error"});
                      })
                      .catch(err => {
                          this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
                      })
              })
      },
      //异常恢复
      toRecover(){
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({showClose: true, message: "请选择一条要操作的记录！", type: "error"});
              return false;
          };
          /** 1轨迹异常,2签收异常, 3其它异常*/
          var exceptionType = idList[0].shippingExceptionType;
          if(exceptionType == 1)
              this.doRecoverGps(idList[0].exceptionId);
          else if(exceptionType == 2)
              this.toRecoverSign(idList[0].exceptionId,idList[0].shippingId);
          else if(exceptionType == 3)
              this.doRecoverOther(idList[0].exceptionId);
          else
              this.$message({showClose: true, message: "未知异常不能恢复，请联系管理员！", type: "error"});

      },
      //轨迹异常恢复
      doRecoverGps(exceptionId){
          this.$confirm(
              '点击"上报轨迹"重新查询轨迹信息，如查到该车辆的归集，运单自动置为正常！',
              "操作",
              {
                  confirmButtonText: "上报轨迹",
                  cancelButtonText: "取消",
                  type: "warning"
              })
              .then(() => {
                  var param = new URLSearchParams();
                  param.append("exceptionId", exceptionId);
                  this.$http
                      .post(
                          this.$api.Exception.shippingExceptionRecover,param,true
                      )
                      .then(res => {
                          if(res.data.code == 1){
                              this.$message({showClose: true, message: res.data.message, type: "success"});
                              this.getList();
                          }
                          else
                              this.$message({showClose: true, message: res.data.message, type: "error"});
                      })
                      .catch(err => {
                          this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
                      })
              })
      },
      //打开签收异常恢复弹窗
      toRecoverSign(exceptionId,shippingId){
          this.dialogVisible = true;

          var param = new URLSearchParams();
          param.append("shippingId", shippingId);
          this.$http
              .post(
                  this.$api.Shipping.getShippingInfo,param,true
              )
              .then(res => {
                  if(res.data.code == 1){
                      var shipping = res.data.data;
                      this.editExceptionForm.exceptionId = exceptionId;
                      this.editExceptionForm.orderCode = shipping.orderCode;
                      this.editExceptionForm.shippingCode = shipping.shippingCode;
                      this.editExceptionForm.driverName = shipping.driverName;
                      this.editExceptionForm.carCode = shipping.carCode;
                      this.editExceptionForm.shippingDamageAmt = shipping.shippingDamageAmt;
                      this.editExceptionForm.shippingOverdueAmt = shipping.shippingOverdueAmt;
                      this.editExceptionForm.shippingOtherAmt = shipping.shippingOtherAmt;
                      this.editExceptionForm.createTime = shipping.createTime;
                      this.editExceptionForm.trucking.truckingFreightUnit = shipping.trucking.truckingFreightUnit;
                      this.editExceptionForm.trucking.truckingFreightTotal = shipping.trucking.truckingFreightTotal;
                      this.editExceptionForm.shippingLoadTime = shipping.shippingLoadTime;
                      this.editExceptionForm.shippingLoadQty = shipping.shippingLoadQty;
                      this.editExceptionForm.shippingUnloadTime = shipping.shippingUnloadTime;
                      this.editExceptionForm.shippingUnloadQty = shipping.shippingUnloadQty;
                      this.editExceptionForm.shippingGoodsList = shipping.shippingGoodsList;
                      this.editExceptionForm.loadReceipt.receiptBill = "http://redox-test01.oss-cn-qingdao.aliyuncs.com" + shipping.loadReceipt.receiptBill;
                      this.editExceptionForm.loadReceipt.receiptImage = "http://redox-test01.oss-cn-qingdao.aliyuncs.com" + shipping.loadReceipt.receiptImage;
                      this.editExceptionForm.unloadReceipt.receiptBill = "http://redox-test01.oss-cn-qingdao.aliyuncs.com" + shipping.unloadReceipt.receiptBill;
                      this.editExceptionForm.unloadReceipt.receiptImage = "http://redox-test01.oss-cn-qingdao.aliyuncs.com" + shipping.unloadReceipt.receiptImage;
                  }
                  else
                      this.$message({showClose: true, message: res.data.message, type: "error"});
              })
              .catch(err => {
                  this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
              });
      },
      doRecoverSign() {
          var param = new URLSearchParams();
          param.append("exceptionId", this.editExceptionForm.exceptionId);
          param.append("damageDeduct", this.editExceptionForm.shippingDamageAmt);
          param.append("overdueDeduct", this.editExceptionForm.shippingOverdueAmt);
          param.append("otherDeduct", this.editExceptionForm.shippingOtherAmt);
          this.$http
              .post(
                  this.$api.Exception.shippingExceptionRecover,param,true
              )
              .then(res => {
                  if(res.data.code == 1)
                      this.$message({showClose: true, message: res.data.message, type: "success"});
                  else
                      this.$message({showClose: true, message: res.data.message, type: "error"});
              })
              .catch(err => {
                  this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
              });
      },
      //其它异常恢复
      doRecoverOther(exceptionId){
          this.$confirm(
              "确定当前运单置为正常吗？确定置为正常后该条运单将显示在运单信息列表",
              "操作",
              {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
              })
              .then(() => {
                  var param = new URLSearchParams();
                  param.append("exceptionId", exceptionId);
                  this.$http
                      .post(
                          this.$api.Exception.shippingExceptionRecover,param,true
                      )
                      .then(res => {
                          if(res.data.code == 1){
                              this.$message({showClose: true, message: res.data.message, type: "success"});
                              this.getList();
                          }
                          else
                              this.$message({showClose: true, message: res.data.message, type: "error"});
                      })
                      .catch(err => {
                          this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
                      })
              })
      },
      doCheck(exceptionStatus){
          var param = new URLSearchParams();
          param.append("exceptionId", this.editExceptionForm.exceptionId);
          param.append("exceptionStatus", exceptionStatus);
          this.$http
              .post(
                  this.$api.Exception.shippingExceptionCheck,param,true
              )
              .then(res => {
                  if(res.data.code == 1)
                      this.$message({showClose: true, message: res.data.message, type: "success"});
                  else
                      this.$message({showClose: true, message: res.data.message, type: "error"});
              })
              .catch(err => {
                  this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
              });
      },
      // 初始化表头数据
      setHeaderData() {
          this.setAuditedData = this.auditedName;
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.setHeaderData();
      this.getList();

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
  @import url("../../../assets/css/singularTable.css");

  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
  }

  .el-form-item {
    margin-bottom: 0px;
  }
  .el-form-item__label{
    text-align: left;
  }

  .el-image{
    margin-right: 7px;
    width: 24%;
    height: 120px;
  }

  .auditBox {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
  }
  .auditBox table{
    width: 100%;
    border: 0;
  }
  .auditBox table td{
    border: 1px solid #E5E5E5;
    height: 30px;
  }
  .auditBox table .trHeader{
    background-color: #F6F6F6;
    font-size: 13px;
    text-align: center;
  }

  .tdHeader{
    width: 20%;
    background-color: #F6F6F6;
  }

  .addFooterCenter{
    text-align: right;
  }
</style>