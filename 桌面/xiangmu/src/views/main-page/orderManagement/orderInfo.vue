<template>
  <div class="orderInfo">
    <div class="table_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 待生效 -->
        <el-tab-pane label="待生效" name="first">
          <div class="audit_search">
            <!-- 单行搜索引擎-->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="项目名称" prop="orderProject.projectName">
                    <el-input placeholder="请输项目名称" v-model="searchForm.orderProject.projectName" clearable></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="客户名称" prop="orderProject.projectCustomer">
                    <el-input placeholder="请输客户名称" v-model="searchForm.orderProject.projectCustomer" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="orderCode">
                    <el-input placeholder="请输订单号" v-model="searchForm.orderCode" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
                  <el-form-item label="订单日期" prop="createTime">
                    <el-date-picker
                            style="width:184px"
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
          <div class="tab_operation">
            <el-button @click="addNewOrder()" type="primary" class="reset reset_tab">新建订单</el-button>
            <el-button @click="open()" type="primary" class="reset reset_tab">生效</el-button>
            <el-button @click="editOrder()" type="primary" class="reset reset_tab">修改订单</el-button>
            <el-button class="reset reset_tab" type="primary" @click="materialInformation(0)">物料信息</el-button>
            <el-button @click="openAlert()" type="primary" class="reset reset_tab">取消订单</el-button>
          </div>
        </el-tab-pane>
        <!-- 选择大宗非大宗弹框开始 -->
        <el-dialog title="请选择新增订单类型" :visible.sync="centerDialogVisible" width="30%" center>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="centerDialogVisiblebig(1) ">大 宗</el-button>
            <el-button size="mini" type="primary" @click="centerDialogVisiblesmall(1) ">非 大 宗</el-button>
          </span>
        </el-dialog>
        <!-- 选择大宗非大宗弹框结束 -->

        <!-- 派单中 -->
        <el-tab-pane label="派单中" name="second">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="项目名称" prop="orderProject.projectName">
                    <el-input placeholder="请输承运人姓名" v-model="searchForm.orderProject.projectName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="客户名称" prop="orderProject.projectCustomer">
                    <el-input placeholder="请输客户名称" v-model="searchForm.orderProject.projectCustomer" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="orderCode">
                    <el-input placeholder="请输订单号" v-model="searchForm.orderCode" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
                  <el-form-item label="订单日期" prop="createTime">
                    <el-date-picker
                            style="width:184px"
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
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="newAddDispatch">新建预派单</el-button>
            <el-button class="reset reset_tab" type="primary" @click="disLeafRecordBtn()">派单记录</el-button>
            <el-button class="reset reset_tab" type="primary" @click="materialInformation(1)">物料信息</el-button>
            <el-button class="reset reset_tab" type="primary" @click="finishOrder">完成订单</el-button>
          </div>
        </el-tab-pane>
        <!--    预派 选择大宗非大宗弹框开始 -->
        <el-dialog title="请选择预派单类型" :visible.sync="centerDispatch" width="30%" center>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="centerDispatchbigP(2) ">大 宗</el-button>
            <el-button size="mini" type="primary" @click="centerDispatchsmallP(2) ">非 大 宗</el-button>
          </span>
        </el-dialog>

        <!-- 已完成 -->
        <!-- 选择大宗非大宗弹框结束 -->
        <el-tab-pane label="已完成" name="third">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="项目名称" prop="orderProject.projectName">
                    <el-input placeholder="请输承运人姓名" v-model="searchForm.orderProject.projectName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="客户名称" prop="orderProject.projectCustomer">
                    <el-input placeholder="请输客户名称" v-model="searchForm.orderProject.projectCustomer" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="orderCode">
                    <el-input placeholder="请输订单号" v-model="searchForm.orderCode" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
                  <el-form-item label="订单日期" prop="createTime">
                    <el-date-picker
                            style="width:184px"
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
          <div class="tab_operation">
            <!-- <el-button class="reset reset_tab" type="primary">派车记录</el-button> -->
            <el-button class="reset reset_tab" type="primary" @click="disLeafRecordBtn()">派单记录</el-button>
            <el-button class="reset reset_tab" type="primary" @click="materialInformation(2)">物料信息</el-button>
          </div>
        </el-tab-pane>

        <!-- 已取消 -->
        <el-tab-pane label="已取消" name="fourth">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="项目名称" prop="orderProject.projectName">
                    <el-input placeholder="请输项目名称" v-model="searchForm.orderProject.projectName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="客户名称" prop="orderProject.projectCustomer">
                    <el-input placeholder="请输客户名称" v-model="searchForm.orderProject.projectCustomer" clearable></el-input>
                  </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="订单号" prop="orderCode">
                    <el-input placeholder="请输订单号" v-model="searchForm.orderCode" clearable></el-input>
                  </el-form-item>
                </el-col>
             
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
                  <el-form-item label="订单日期" prop="createTime">
                    <el-date-picker
                            style="width:184px"
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
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="materialInformation(3)">物料信息</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 订单列表 -->
      <div class="table_com">
        <div class="list-box">
          <tabComp :tableHeader="setAuditedData" :tableData1="list"></tabComp>
          <!-- <tabComp>
          <template v-if="tabIndex == 0 || tabIndex == 3">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              v-for="(item,index) in auditedName"
              :key="index"
              :prop="item.tabItem"
              :label="item.tabTh"
            ></el-table-column>
          </template>

          <template v-if="tabIndex == 1 || tabIndex == 2">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              v-for="(item,index) in auditedName2"
              :key="index"
              :prop="item.tabItem"
              :label="item.tabTh"
            ></el-table-column>
          </template>
          </tabComp>-->

          <!-- 分页 -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            @pagination="orderInfoList"
          />
        </div>
      </div>
    </div>

    <!-- 派单记录弹窗开始 -->
    <el-dialog title="派单记录" :visible.sync="disLeafRecordForm" class="disLeafRecord-header">
      <el-table :data="disLeafRecord" border align="center">
        <el-table-column width="250" prop="truckingId" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDelete(scope.row.orderId, scope.row.truckingId)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleSee(scope.row.orderId, scope.row.truckingId)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleRecord(scope.row.orderId, scope.row.truckingId)">派车</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="truckingCode" label="预派车单号"></el-table-column>
        <el-table-column prop="freightUnitPrice" label="运费单价"></el-table-column>
      </el-table>
      <div slot="footer" class="disLeafRecord-footer">
        <el-button type="primary" @click="disLeafRecordForm = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 派单记录弹窗结束 -->

    <!-- 物料信息弹窗开始 -->
    <el-dialog
      title="物料信息"
      custom-class="alert_default"
      :visible.sync="subUser1"
      width="800px"
      :close-on-click-modal="false"
      style="text-align: center;"
    >
      <el-form :model="subUserForm" ref="subUserForm">
        <el-table
          :data="gridData"
          border
          :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            v-for="(item,index) in meMsgList"
            :prop="item.tabItem"
            :label="item.tabTh"
            :key="index"
          ></el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="width:200px;margin-bottom: 20px;margin-top:20px"
          size="medium"
          @click="subUser1 = false"
        >关闭</el-button>
      </el-form>
    </el-dialog>
    <!-- 物料信息弹窗结束 -->

    <!-- 派车记录弹窗开始 -->
    <el-dialog title="派车记录" :visible.sync="dispatchCarDataForm" class="disLeafRecord-header">
      <el-table :data="dispatchCarData" border align="center">
        <el-table-column width="250" prop="truckingId" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDelete(scope.row.orderId, scope.row.truckingId)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleSee(scope.row.orderId, scope.row.truckingId)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleRecord(scope.row.orderId, scope.row.truckingId)">派车</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="truckingCode" label="预派车单号"></el-table-column>
        <el-table-column prop="freightUnitPrice" label="运费单价"></el-table-column>
      </el-table>
      <div slot="footer" class="disLeafRecord-footer">
        <el-button type="primary" @click="dispatchCarDataForm = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 派车记录弹窗结束 -->
  </div>
</template>
<script>
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import { MessageBox } from "element-ui";
import Pagination from "../../../compontes/pagtion";

export default {
  name: "orderInfo",
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    return {
      //新增订单类型(大宗/非大宗)
      centerDialogVisible: false,
      //预派单类型(大宗/非大宗)
      centerDispatch: false,
      // 表头数据
      meMsgList: [
        // {
        //   tabTh: "序号",
        //   tabItem: "goodsId",
        //   isShow: true
        // },
        {
          tabTh: "货物名称",
          tabItem: "goodsName",
          isShow: true
        },
        {
          tabTh: "货物类型",
          tabItem: "goodType",
          isShow: true
        },
        {
          tabTh: "货物分类",
          tabItem: "goodsClass",
          isShow: true
        },
        {
          tabTh: "计费量",
          tabItem: "goodsSettlementTotal",
          isShow: true
        },
        {
          tabTh: "物料毛重",
          tabItem: "goodsGrossWeight",
          isShow: true
        },
        {
          tabTh: "物料净重",
          tabItem: "goodsNetWeight",
          isShow: true
        },
        {
          tabTh: "物料体积",
          tabItem: "goodsVolume",
          isShow: true
        },
        {
          tabTh: "总件数",
          tabItem: "goodsQty",
          isShow: true
        }
      ],
      // 现在选中的订单
      checkNow: "",
      //派单记录弹窗
      // disLeafRecord: [
      //   {
      //     truckingId: "",
      //     orderId: "",
      //     createTime: "",
      //     orderCode: "",
      //     truckingCode: "",
      //     freightUnitPrice: ""
      //   }
      // ],
      disLeafRecord: [], // 派单记录数据
      disLeafRecordForm: false, //派单记录弹窗
      dispatchCarData: [], // 派车记录数据
      dispatchCarDataForm: false, // 派车记录弹窗
      gridData: [],//物料信息弹窗数据
      subUser1: false,// 物料信息弹窗
      formLabelWidth: "120px",
      subUserForm: {},
      list: null, // 订单列表
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
      searchForm: {
          orderProject:{
              projectName:'', //项目名称
              projectCustomer:'', //客户名称
          },
          orderCode: '', //订单号
          createTime: '', //订单创建时间
          orderStatus: 1, //订单状态
         
    },
      // 表头数据
      auditedName: [
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "绑定项目",
          tabItem: "projectName",
          isShow: true
        },
        {
          tabTh: "业务类型",
          tabItem: "projectBusinessType",
          isShow: true
        },
        {
          tabTh: "客户名称",
          tabItem: "orderCustomer",
          isShow: true
        },
        {
          tabTh: "结算模式",
          tabItem: "orderSettlementWay",
          isShow: true
        },
        {
          tabTh: "计费分类",
          tabItem: "orderSettlementClass",
          isShow: true
        },
        {
          tabTh: "运费计算方式",
          tabItem: "orderCalculateWay",
          isShow: true
        },
        {
          tabTh: "计费总量",
          tabItem: "orderFreightTotal",
          isShow: true
        },
        {
          tabTh: "计费单位",
          tabItem: "orderFreightUnit",
          isShow: true
        },
        {
          tabTh: "订单单价",
          tabItem: "orderSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "是否购买保价",
          tabItem: "orderPremiumFlag",
          isShow: true
        },
        {
          tabTh: "保价金额",
          tabItem: "orderInsuredAmt",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "orderPremiumAmt",
          isShow: true
        },
        {
          tabTh: "发货联系人",
          tabItem: "orderLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "orderLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货联系电话",
          tabItem: "orderLoadContactMobile",
          isShow: true
        },
        {
          tabTh: "发货详细地址",
          tabItem: "orderLoadDetail",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "sendProvince",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "sendCity",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "sendArea",
          isShow: true
        },
        {
          tabTh: "要求提货时间",
          tabItem: "orderLoadTime",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "orderUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "orderUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货联系电话",
          tabItem: "orderUnloadContactMobile",
          isShow: true
        },
        {
          tabTh: "收货详细地址",
          tabItem: "orderUnloadDetail",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "unloadProvinceName",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "unloadCityName",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "unloadAreaName",
          isShow: true
        },
        {
          tabTh: "要求签收时间",
          tabItem: "orderUnloadTime",
          isShow: true
        },
        {
          tabTh: "订单备注",
          tabItem: "orderDesc",
          isShow: true
        }
      ],
      auditedName2: [
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "绑定项目",
          tabItem: "projectName",
          isShow: true
        },
        {
          tabTh: "业务类型",
          tabItem: "projectBusinessType",
          isShow: true
        },
        {
          tabTh: "客户名称",
          tabItem: "orderCustomer",
          isShow: true
        },
        {
          tabTh: "待提货",
          tabItem: "customName",
          isShow: true
        },
        {
          tabTh: "待签收",
          tabItem: "customName",
          isShow: true
        },
        {
          tabTh: "已提货签收",
          tabItem: "customName",
          isShow: true
        },
        {
          tabTh: "结算模式",
          tabItem: "orderSettlementWay",
          isShow: true
        },
        {
          tabTh: "计费分类",
          tabItem: "orderSettlementClass",
          isShow: true
        },
        {
          tabTh: "运费计算方式",
          tabItem: "orderCalculateWay",
          isShow: true
        },
        {
          tabTh: "计费总量",
          tabItem: "orderFreightTotal",
          isShow: true
        },
        {
          tabTh: "计费单位",
          tabItem: "orderFreightUnit",
          isShow: true
        },
        {
          tabTh: "订单单价",
          tabItem: "orderSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "是否购买保价",
          tabItem: "orderPremiumFlag",
          isShow: true
        },
        {
          tabTh: "保价金额",
          tabItem: "orderInsuredAmt",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "orderPremiumAmt",
          isShow: true
        },
        {
          tabTh: "发货联系人",
          tabItem: "orderLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "orderLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货联系电话",
          tabItem: "orderLoadContactMobile",
          isShow: true
        },
        {
          tabTh: "发货详细地址",
          tabItem: "orderLoadDetail",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "sendProvince",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "sendCity",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "sendArea",
          isShow: true
        },
        {
          tabTh: "要求提货时间",
          tabItem: "orderLoadTime",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "orderUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "orderUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货联系电话",
          tabItem: "orderUnloadContactMobile",
          isShow: true
        },
        {
          tabTh: "收货详细地址",
          tabItem: "orderUnloadDetail",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "unloadProvinceName",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "unloadCityName",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "unloadAreaName",
          isShow: true
        },
        {
          tabTh: "要求签收时间",
          tabItem: "orderUnloadTime",
          isShow: true
        },
        {
          tabTh: "订单备注",
          tabItem: "orderDesc",
          isShow: true
        }
      ],
      tabIndex: 0, // 选项卡索引
      // 时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      value1: "",
      input: "",
      options: [
        {
          value: "1",
          label: "项目编号"
        },
        {
          value: "2",
          label: "项目名称"
        },
        {
          value: "3",
          label: "客户名称"
        }
      ],
      value: "",
      indexType: 1,
      activeName: "first",
      input2: "",
      setAuditedData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //派单记录弹窗
    disLeafRecordBtn() {
      this.disLeafRecord = [];
      let that = this;
      const orderOne = this.$store.state.selectData;
      this.checkNow = orderOne;
      // console.log(orderOne,'orderOne')
      if (orderOne.length == 1) {
        // console.log(orderOne[0], 'orderOne[0]')
        this.truckingRecord(orderOne);
      } else {
        this.$message({
          type: "info",
          message: "请选择一笔订单进行操作"
        });
      }
    },

    truckingRecord(one) {
      const orderId = one[0].orderId;
        this.disLeafRecordForm = true;
        let param = new URLSearchParams();
        param.append("orderId", orderId);
        this.$http
          .post(this.$api.Order.getTruckingRecord, param, true)
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res, '获取派单记录')
              let truckingList = res.data.data;
              truckingList.forEach((item, key, arr) => {
                item.freightUnitPrice = item.truckingPrice.priceSettlementUnitprice;
              })
              this.disLeafRecord = truckingList;
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
    },

    //派单记录删除
    handleDelete(orderId, truckingId) {
      let that = this;
      let param = new URLSearchParams();
      // param.append("orderId", orderId);
      param.append("truckingId", truckingId);
      this.$confirm(
        "确定删除此条派单记录吗",
        "操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http
          .post(this.$api.Order.removeTrucking, param, true)
          .then(res => {
            if (res.data.code == 1) {
              this.truckingRecord(this.checkNow);
              this.$message({
                showClose: true,
                message: "派单记录已删除",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //派单记录查看
    handleSee(orderId,truckingId) {
      let projectIdList = this.$store.state.selectData;
      const orderSettlementClass = projectIdList[0].orderProject.projectSettlementClass;
      if(orderSettlementClass == 1) {
        this.$router.push({
          path: "/workManage/order/newAddDispatchbig",
          query: { truckingId: truckingId }
        });
      } else if(orderSettlementClass == 2) {
        this.$router.push({
          path: "/workManage/order/newAddDispatchsmall",
          query: { truckingId: truckingId }
        });
      }
    },

    //派单记录派车
    handleRecord(orderId,truckingId) {
      let projectIdList = this.$store.state.selectData;
      const orderSettlementClass = projectIdList[0].orderProject.projectSettlementClass;
      if(orderSettlementClass == 1) {
        this.$router.push({
          path: "/workManage/order/dispatchcarbig",
          query: { truckingId: truckingId }
        });
      } else if(orderSettlementClass == 2) {
        this.$router.push({
          path: "/workManage/order/dispatchcarsmall",
          query: { truckingId: truckingId }
        });
      }
      // this.$router.push("/workManage/order/newAddTruking");
    },

    // 物料信息弹窗
    materialInformation(index) {
      let projectIdList = this.$store.state.selectData;
      if (projectIdList.length == 1) {
        this.subUser1 = true;
        this.$http
          .get(
            this.$api.Order.orderGoods,
            {
              params: {
                orderId: projectIdList[0].orderId
              }
            },
            true
          )
          .then(res => {
            // console.log(res, '订单物料信息');
            this.gridData = res.data.data;
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
        /* if (index == 0) {
              alert("待生效");
            } else if (index == 1) {
              alert("派单中");
            } else if (index == 2) {
              alert("已完成");
            } else if (index == 3) {
              alert("已取消");
            } */
      } else {
        this.$message({
          showClose: true,
          message: "请选择一个订单进行操作",
          type: "error"
        });
      }
    },
    // changeHide(value) {
    //   // this.auditedData.auditedName[2].isShow = !this.auditedData.auditedName[2]
    //   //   .isShow;
    //   console.log(123213);
    // }

    // 完成订单
    finishOrder() {
      let orderList = this.$store.state.selectData;
      if (orderList.length !== 1) {
        this.$message({
          showClose: true,
          message: "请选择一个订单进行操作",
          type: "error"
        });
        return false;
      }
      let param = new URLSearchParams();
      param.append("orderId", orderList[0].orderId);
      this.$confirm(
        "确定完成此订单吗",
        "操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http
          .post(this.$api.Order.finishOrder, param, true)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: "订单已完成",
                type: "success"
              });
              this.orderInfoList();
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
      //搜索列表
      doSearch(){
        this.orderInfoList();
      },
      resetData(formName){
          this.$refs[formName].resetFields();
          this.page = 1;
          this.limit = 10;
          this.orderInfoList();
      },
    //订单列表数据
    orderInfoList() {

        var param = new URLSearchParams();
        param.append("orderProject.projectName", this.searchForm.orderProject.projectName);
        param.append("orderProject.projectCustomer", this.searchForm.orderProject.projectCustomer);
        param.append("orderCode", this.searchForm.orderCode);
        param.append("createTime", this.searchForm.createTime);
        param.append("orderStatus",this.searchForm.orderStatus)
        param.append("page", this.page);
        param.append("rows", this.limit);
      this.$http
        .post(this.$api.Order.getOrderList,param, true)
        .then(res => {
          const _data = res.data.data.list;
          // console.log(_data,'_data')
          _data.forEach((item, index, arr) => {
            item.projectName = item.orderProject.projectName;
            item.projectBusinessType = item.orderProject.projectBusinessTypeName;
            item.orderCustomer = item.orderProject.projectCustomer;
            item.orderSettlementWay = item.orderProject.projectSettlementWayName;
            item.orderSettlementClass = item.orderProject.projectSettlementClassName;
            item.orderCalculateWay = item.orderProject.projectCalculateWayName;
            // 价格表
            item.orderSettlementUnitprice = item.orderPrice.priceSettlementUnitprice; // 订单单价

            item.orderPremiumFlag = item.orderPremiumFlag == 1?'是':'否';
            // 发货地
            item.orderLoadContacter = item.orderLoadAddress.addressContacter;
            item.orderLoadCompany = item.orderLoadAddress.addressCompany;
            item.orderLoadContactMobile = item.orderLoadAddress.addressContactMobile;
            item.orderLoadDetail = item.orderLoadAddress.addressDetail;
            item.sendProvince = item.orderLoadAddress.addressArea.provinceName;
            item.sendCity = item.orderLoadAddress.addressArea.cityName;
            item.sendArea = item.orderLoadAddress.addressArea.areaName;

            // 卸货地
            item.orderUnloadContacter = item.orderUnLoadAddress.addressContacter;
            item.orderUnloadCompany = item.orderUnLoadAddress.addressCompany;
            item.orderUnloadContactMobile = item.orderUnLoadAddress.addressContactMobile;
            item.orderUnloadDetail = item.orderUnLoadAddress.addressDetail;
            item.unloadProvinceName = item.orderUnLoadAddress.addressArea.provinceName;
            item.unloadCityName = item.orderUnLoadAddress.addressArea.cityName;
            item.unloadAreaName = item.orderUnLoadAddress.addressArea.areaName;
          });
          //表格数据
          // console.log(_data, '订单列表');
          this.list = _data;
          this.total = res.data.data.total;
          //console.log(this.list);

          this.$store.commit("getTableData", this.list);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          })
        })
    },
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      if (tab.index == 0) {
        this.page = 1;
        this.limit = 10;
        this.indexType = 1;
        this.setAuditedData = this.auditedName;
        this.searchForm.orderStatus = 1;  //待生效
        this.orderInfoList();
      } else if (tab.index == 1) {
        this.page = 1;
        this.limit = 10;
        this.indexType = 2;
        this.setAuditedData = this.auditedName2;
          this.searchForm.orderStatus = 2; //派单中
        this.orderInfoList();
      } else if (tab.index == 2) {
        this.page = 1;
        this.limit = 10;
        this.indexType = 3;
        this.setAuditedData = this.auditedName2;
          this.searchForm.orderStatus = 3; //已完成
        this.orderInfoList();
      } else if (tab.index == 3) {
        this.page = 1;
        this.limit = 10;
        this.indexType = 0;
        this.setAuditedData = this.auditedName;
          this.searchForm.orderStatus = 0; //已取消
        this.orderInfoList();
      }
    }, // 初始化表头数据
    setHeaderData() {
      this.setAuditedData = this.auditedName;
    },
    // 新增订单
    addNewOrder() {
      this.centerDialogVisible = true;
      // this.$router.push("/workManage/order/newAddOrderbig");
    },
    //大宗
    centerDialogVisiblebig() {
      this.$router.push("/workManage/order/newAddOrderbig");
      this.centerDialogVisible = false;
    },
    //非大宗
    centerDialogVisiblesmall() {
      this.$router.push("/workManage/order/newAddOrdersmall");
      this.centerDialogVisible = false;
    },
    // 新增预派单
    newAddDispatch() {
      const orderOne = this.$store.state.selectData;
      // console.log(orderOne,'orderOne')
      if (orderOne.length == 1) {
        // console.log(orderOne[0], 'orderOne[0]')
        const orderId = orderOne[0].orderId;
        const orderSettlementClass = orderOne[0].orderProject.projectSettlementClass;
        if(orderSettlementClass == 1) {
          this.$router.push({
            path: "/workManage/order/newAddDispatchbig",
            query: { orderId: orderId }
          });
        } else if(orderSettlementClass == 2) {
          this.$router.push({
            path: "/workManage/order/newAddDispatchsmall",
            query: { orderId: orderId }
          });
        }
        // this.$router.push({
        //   path: "/workManage/order/newAddOrder",
        //   query: { orderId: orderId }
        // });
      } else {
        this.$message({
          type: "info",
          message: "请选择一笔订单进行操作"
        });
      }
      // this.centerDispatch = true;
    },
    //大宗
    centerDispatchbigP() {
      // this.$router.push({
      //   path: "/workManage/order/newAddOrdersmall",
      //   query: { orderId: orderId }
      // });
      this.$router.push("/workManage/order/newAddDispatchbig");
      this.centerDialogVisible = false;
    },
    //非大宗
    centerDispatchsmallP() {
      this.$router.push("/workManage/order/newAddDispatchsmall");
      this.centerDialogVisible = false;
    },
    // 修改订单
    editOrder() {
      const _Ids = this.$store.state.selectData;
      // console.log(_Ids,'ids')
      if (_Ids.length == 1) {
        // console.log(_Ids[0], '_ids[0]')
        const orderId = _Ids[0].orderId;
        const orderSettlementClass = _Ids[0].orderProject.projectSettlementClass;
        if(orderSettlementClass == 1) {
          this.$router.push({
            path: "/workManage/order/newAddOrderbig",
            query: { orderId: orderId }
          });
        } else if(orderSettlementClass == 2) {
          this.$router.push({
            path: "/workManage/order/newAddOrdersmall",
            query: { orderId: orderId }
          });
        }
        // this.$router.push({
        //   path: "/workManage/order/newAddOrder",
        //   query: { orderId: orderId }
        // });
      } else {
        this.$message({
          type: "info",
          message: "请选择一笔订单进行操作"
        });
      }
    },
    // 取消订单
    openAlert() {
      let orderList = this.$store.state.selectData;
      if (orderList.length !== 1) {
        this.$message({
          showClose: true,
          message: "请选择一个订单进行操作",
          type: "error"
        });
        return false;
      }
      let param = new URLSearchParams();
      param.append("orderId", orderList[0].orderId);

      this.$confirm(
        "确定取消此订单吗",
        "操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http
          .post(this.$api.Order.orderCancel, param, true)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: "订单已取消",
                type: "success"
              });
              this.orderInfoList();
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
      // MessageBox.confirm("12123", "title", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消"
      // }).then(() => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      // });
    
    // 订单生效
    open() {
      let orderList = this.$store.state.selectData;
      if (orderList.length !== 1) {
        this.$message({
          showClose: true,
          message: "请选择一个订单进行操作",
          type: "error"
        });
        return false;
      }
      let param = new URLSearchParams();
      param.append("orderId", orderList[0].orderId);

      this.$confirm(
        "确定生效此订单吗",
        "操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http
          .post(this.$api.Order.orderEffect, param, true)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: "订单已生效",
                type: "success"
              });
              this.orderInfoList();
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "失败（≧?≦）",
              type: "error"
            })
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setHeaderData();
    this.orderInfoList(1);
    this.$store.commit("getSingular", {
      options: this.options,
      isShow: true
    });
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
@import url("../../../assets/css/singularTable.css");
.tab_operation {
  text-align: right;
  margin-bottom: 0px;
  padding-right: 5%;
  height: 30px;
  line-height: 30px;
}
.disLeafRecord-header {
  text-align: center;
  font-weight: 600;
  padding: 40px 20px 10px !important;
}
.disLeafRecord-footer {
  text-align: center;
}
</style>