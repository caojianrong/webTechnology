<template>
  <div class="shipper">
    <div class="table_main">
      <!-- 头部 -->
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchForm" :model="searchForm" label-width="100px">
              <el-row :gutter="10">

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="货主名称" prop="ownerName">
                    <el-input placeholder="请输货主名称" v-model="searchForm.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5" >
                  <el-form-item label="审核通过时间" prop="createTime" style="width:200px">
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px"
                            v-model="searchForm.startTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                    ></el-date-picker>
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px;margin-left:140px"
                            v-model="searchForm.endTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="toSearch()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 1)">审核</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 2)">置为异常</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 4)">查看明细</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="third">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchForm" :model="searchForm" label-width="100px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="货主名称" prop="ownerName">
                    <el-input placeholder="请输入货主名称" v-model="searchForm.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>
               <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5" >
                  <el-form-item label="审核通过时间" prop="createTime" style="width:200px">
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px"
                            v-model="searchForm.startTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                    ></el-date-picker>
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px;margin-left:140px"
                            v-model="searchForm.endTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="toSearch()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toFee">费率管理</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toDiscounts">货主优惠</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toDeposit">押金额度</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toPaydays">货主账期</el-button>
            <!--
            <el-button class="reset reset_tab" type="primary" @click="">风控配置</el-button>
-->

            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 3)">置为异常</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 4)">查看</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="异常" name="second">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchForm" :model="searchForm" label-width="100px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="货主名称" prop="ownerName">
                    <el-input placeholder="请输货主名称" v-model="searchForm.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>
               <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5" >
                  <el-form-item label="审核通过时间" prop="createTime" style="width:200px">
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px"
                            v-model="searchForm.startTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                    ></el-date-picker>
                    <el-date-picker
                            style="width:120px;position:absolute;top:5px;margin-left:140px"
                            v-model="searchForm.endTime"
                            
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="toSearch()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 4)">查看异常</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit(auditFlag = 5)">恢复</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 表格 -->
      <div class="table_com">
        <div class="list-box">
          <!--
          <tabComp :tableHeader="auditedName" :tableData1="tabIndex == 0 ? shpperWaited : tabIndex == 1 ? shpperApproved : shpperAbnormal"></tabComp>
          -->
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

      <!-- 弹窗 -->
      <!-- 审核弹窗 -->
      <el-dialog title="货主审核" :visible.sync="toAuditDialog">
        <div class="auditBox">
          <div class="auditL">
            <ul>
              <li>
                <span class="spanL">
                  货主id
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupId }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  公司名称
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupCompany }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  公司电话
                </span>
                <span class="spanR">
                   {{ this.auditDetail.groupMobile }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  纳税人识别号
                </span>
                <span class="spanR">
                   {{ this.auditDetail.groupTaxCode }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  法人
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupLegal }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  注册资本
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupCapital }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  成立日期
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupCreateDate }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  所属地区
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupArea }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  经营范围
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupBusinessScope }}
                </span>
              </li>
            </ul>
          </div>

          <div class="auditR">
            <ul>
              <li>
                <span class="spanL">
                  企业类型
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupType }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  主管税务机关
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupTaxAuthorities }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  企业地址
                </span>
                <span class="spanR">
                  {{ this.auditDetail.provinceName }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  详细地址
                </span>
                <span class="spanR">
                  {{ this.auditDetail.groupAddress }}
                </span>
              </li>
              <li class="business">
                <span class="spanL">
                  营业执照
                </span>
                <span class="businessImg" v-if="auditDetail.groupBusinessLicense">
                  <el-avatar shape="square" :size="100" :src="auditDetail.groupBusinessLicense"></el-avatar>
                </span>
                <span class="spanR" v-else>
                  未上传
                </span>
              </li>
              <li>
                <span class="spanL">
                  注册时间
                </span>
                <span class="spanR">
                  {{ this.auditDetail.createTime }}
                </span>
              </li>
              <li>
                <span class="spanL">
                  审核状态
                </span>
                <span class="spanR">
                  <el-select v-model="auditDetail.groupStatus" placeholder="请选择" :disabled="auditFlag == 4">
                    <el-option
                      v-for="item in groupStatusOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span>
              </li>
            </ul>
          </div>

          <div class="auditB">
            <el-button @click="toAuditDialog = false">取 消</el-button>
            <el-button type="primary" @click="changeAudit">确 定</el-button>
          </div>
        </div>
        <el-dialog
          width="30%"
          :title="promptText"
          :visible.sync="innerConfirm"
          append-to-body>
          <div class="auditB">
            <el-button @click="innerConfirm = false">取 消</el-button>
            <el-button type="primary" @click="confirmAudit"
                       v-loading.fullscreen.lock="auditLoading"
                       element-loading-text="处理中......"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(0, 0, 0, 0.8)"
            >确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>


      <!--费率管理 -->
      <el-dialog title="费率管理" width="460px"  :visible.sync="dialogVisibleFee" >
        <el-container>
          <el-main>
            <div class="auditBox">
              <el-form ref="feeForm" :model="feeForm" :rules="feeRules" label-width="80px" class="demo-ruleForm">

                <el-form-item label="当前费率" v-if="!feeForm.isFirst">
                  {{this.feeForm.groupFeeRateOld}} %
                </el-form-item>

                <el-form-item label="有效日期" v-if="!feeForm.isFirst">
                    {{this.feeForm.groupFeeDateOld}} 至今
                </el-form-item>

                <el-form-item label="新费率" prop="groupFeeRateNew">
                  <el-input type="text" v-model="feeForm.groupFeeRateNew" placeholder="请输入费率">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="生效日期" prop="groupFeeDateNew">
                  <el-date-picker
                          @change="selectFeeDate"
                          v-model="feeForm.groupFeeDateNew"
                          type="date"
                          placeholder="选择日期"
                          style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button @click="dialogVisibleFee = false">取 消</el-button>
            <el-button  type="primary" @click="doFee('feeForm')">确 定</el-button>

          </el-footer>
        </el-container>
      </el-dialog>

      <!--押金额度 -->
      <el-dialog title="押金额度" width="460px"  :visible.sync="dialogVisibleDeposit" >
        <el-container>
          <el-main>
            <div class="auditBox">
              <el-form ref="depositForm" :model="depositForm" :rules="depositRules" label-width="80px" class="demo-ruleForm">

                <el-form-item label="当前额度" v-if="!depositForm.isFirst">
                  {{this.depositForm.groupDepositAmtOld}} 元
                </el-form-item>

                <el-form-item label="有效日期" v-if="!depositForm.isFirst">
                  {{this.depositForm.groupDepositDateOld}}至今
                </el-form-item>

                <el-form-item label="新额度" prop="groupDepositAmtNew">
                  <el-input type="text" v-model.number="depositForm.groupDepositAmtNew" placeholder="请输入额度">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="生效日期" prop="groupDepositDateNew">
                  <el-date-picker
                          @change="selectDepositDate"
                          v-model="depositForm.groupDepositDateNew"
                          type="date"
                          placeholder="选择日期"
                          style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button @click="dialogVisibleDeposit = false">取 消</el-button>
            <el-button  type="primary" @click="doDeposit('depositForm')">确 定</el-button>

          </el-footer>
        </el-container>
      </el-dialog>


      <!-- 货主账期 -->
      <el-dialog title="货主账期" width="460px"  :visible.sync="dialogVisiblePaydays" >
        <el-container>
          <el-main>
            <div class="auditBox">
              <el-form ref="paydaysForm" :model="paydaysForm" :rules="paydaysRules" label-width="80px" class="demo-ruleForm">

                <el-form-item label="当前账期" v-if="!paydaysForm.isFirst">
                  {{this.paydaysForm.groupPaydaysDaysOld}} 天
                </el-form-item>

                <el-form-item label="有效日期" v-if="!paydaysForm.isFirst">
                  {{this.paydaysForm.groupPaydaysDateOld}} 至今
                </el-form-item>

                <el-form-item label="新账期" prop="groupPaydaysDaysNew">
                  <el-input type="text" v-model.number="paydaysForm.groupPaydaysDaysNew" placeholder="请输入账期">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="生效日期" prop="groupPaydaysDateNew">
                  <el-date-picker
                          @change="selectPaydaysDate"
                          v-model="paydaysForm.groupPaydaysDateNew"
                          type="date"
                          placeholder="选择日期"
                          style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button @click="dialogVisiblePaydays = false">取 消</el-button>
            <el-button  type="primary" @click="doPaydays('paydaysForm')">确 定</el-button>

          </el-footer>
        </el-container>
      </el-dialog>

      <!-- 货主优惠 -->
      <el-dialog title="货主优惠" width="860px"  :visible.sync="dialogVisibleDiscount" >
        <el-container>
          <el-main>
            <div class="auditBox">
              <el-form ref="discountForm"  label-width="80px" class="demo-ruleForm">
                  <el-table :data="discountForm.discountData"  border style="width: 100%">
                    <el-table-column  label="序号" width="80" >
                      <template scope="scope"> <span>{{scope.$index + 1}} </span> </template>
                    </el-table-column>
                    <el-table-column label="交易金额">
                      <template slot-scope="scope" >
                        <div style="display: flex">
                        <el-input type="text" v-model="scope.row.groupBillBegin" style="width: 43%"></el-input>
                        -
                        <el-input type="text" v-model="scope.row.groupBillEnd" style="width:  43%"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="优惠金额">
                      <template slot-scope="scope" >
                        <el-input type="text" v-model="scope.row.groupDiscountAmt"></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作">
                      <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, discountForm.discountData)"
                                type="text"
                                size="small">移除
                        </el-button>
                      </template>
                    </el-table-column>


                  </el-table>
              </el-form>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button type="primary" plain @click="addTableTr">增加</el-button>
            <el-button  type="primary" @click="doDiscounts()" style="float: right">确 定</el-button>
            <el-button @click="dialogVisibleDiscount = false" style="float: right;margin-right: 20px">取 消</el-button>
          </el-footer>
        </el-container>
      </el-dialog>

    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../../compontes/tabComp";
import pagination from "../../../../compontes/pagtion";
import axios from 'axios';

export default {
  name: "index",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    pagination
  },
  data() {
    //这里存放数据
    return {
        auditFlag: 1,   //弹窗标识    1审核  2置为异常  3 查看明细

      activeName: "first",
      // 搜索的字段
      searchForm: {
        groupCompany: '', // 公司名称
        startTime:'',//开始时间
        endTime:'',//结束时间
        

      },
      tabIndex: 0, // 选项卡索引
      setAuditedData: [], //最终表头数据

      groupFlag: 3, // 机构标识
      groupArrayStatus: [1], // 机构状态
      list: [], //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
        auditedName: [
            {tabTh: "货主ID", tabItem: "groupId", isShow: true, sortNum: 1},
            {tabTh: "公司全称", tabItem: "groupCompany", isShow: true, sortNum: 2},
            {tabTh: "联系电话", tabItem: "groupMobile", isShow: true, sortNum: 3},
            {tabTh: "注册时间", tabItem: "createTime", isShow: true, sortNum: 4},
            {tabTh: "状态", tabItem: "groupStatusName", isShow: true, sortNum: 5}
        ],
        auditedName1: [
            {tabTh: "货主ID", tabItem: "groupId", isShow: true, sortNum: 1},
            {tabTh: "公司全称", tabItem: "groupCompany", isShow: true, sortNum: 2},
            {tabTh: "联系电话", tabItem: "groupMobile", isShow: true, sortNum: 3},
            {tabTh: "注册时间", tabItem: "createTime", isShow: true, sortNum: 4},
            {tabTh: "状态", tabItem: "groupStatusName", isShow: true, sortNum: 5},
            {tabTh: "审核时间", tabItem: "groupAuditTime", isShow: true, sortNum: 6},
            {tabTh: "审核人", tabItem: "groupAuditorName", isShow: true, sortNum: 7}
        ],
        auditedName2: [
            {tabTh: "货主ID", tabItem: "groupId", isShow: true, sortNum: 1},
            {tabTh: "公司全称", tabItem: "groupCompany", isShow: true, sortNum: 2},
            {tabTh: "联系电话", tabItem: "groupMobile", isShow: true, sortNum: 3},
            {tabTh: "注册时间", tabItem: "createTime", isShow: true, sortNum: 4},
            {tabTh: "状态", tabItem: "groupStatusName", isShow: true, sortNum: 5},
            {tabTh: "异常原因", tabItem: "exceptionReason", isShow: true, sortNum: 8},
            {tabTh: "异常时间", tabItem: "exceptionTime", isShow: true, sortNum: 9},
            {tabTh: "审核时间", tabItem: "groupAuditTime", isShow: true, sortNum: 10},
            {tabTh: "审核人", tabItem: "groupAuditorName", isShow: true, sortNum: 11}
        ],
        toAuditDialog: false, // 审核弹窗 外层hidden
      innerConfirm: false, // 审核弹窗 内层确认修改弹窗hidden
      promptText: '', // 审核弹窗 内层确认提示文本
      // 审核弹窗数据
      auditDetail: { 
        groupId: '', // 货主ID
        groupCompany: '', // 公司名称
        groupMobile: '', // 公司电话
        groupTaxCode: '', // 纳税人识别号
        groupLegal: '', // 法人
        groupCapital: '', // 注册资本
        groupCreateDate: '', // 成立日期
        groupArea: '', // 所属地区
        groupBusinessScope: '', // 经营范围
        groupType: '', // 企业类型
        groupTaxAuthorities: '', // 主管税务机关
        provinceName: '', // 企业地址
        groupAddress: '', // 详细信息
        groupBusinessLicense: '', // 营业执照
        createTime: '', // 注册时间
        groupStatus: '', // 审核状态
      } ,
      originalStatus: '', // 用户初始状态
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      groupBusinessLicense: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 营业执照

        groupStatusOption: [],
        //审核下拉选项
        checkOption:[
            {value: 1, label: '待审核'},
            {value: 2, label: '审核通过'},
            {value: 3, label: '审核不通过'}
        ],
        //注册异常审核
        exceptionOption:[
            {value: 1, label: '待审核'},
            {value: 5, label: '注册异常'}
        ],
        //货主异常审核
        exceptionOption1:[
            {value: 2, label: '审核通过'},
            {value: 4, label: '货主异常'}
        ],
        exceptionOption2:[
            {value: 2, label: '审核通过'},
            {value: 3, label: '审核不通过'},
            {value: 4, label: '货主异常'}
        ],

        auditLoading: false,

        //费率管理弹窗
        dialogVisibleFee: false,
        //押金弹窗
        dialogVisibleDeposit: false,
        //账期
        dialogVisiblePaydays: false,
        feeForm:{
            isFirst: true,  //是否第一次
            groupId: '',
            groupFeeRateOld: '',//当前费率
            groupFeeDateOld: '',//有效日期

            groupFeeIdNew: '',
            groupFeeRateNew: null,//新费率
            groupFeeDateNew: ''//生效日期
        },
        feeRules: {
            groupFeeRateNew: [
                {required: true, message: '请输入新费率', trigger: 'blur'},
                //{type: 'number', message: '费率必须是数字', trigger: 'blur' },
                //{ pattern:/^\d{1,2}$/, message: '费率在99%以内', trigger: 'blur' }
            ],
            groupFeeDateNew: [
                {required: true, message: '请选择生效日期', trigger: 'change'},
            ]
        },
        depositForm:{
            isFirst: true,  //是否第一次
            groupId: '',
            groupDepositAmtOld: '',//当前押金
            groupDepositDateOld: '',//有效日期

            groupDepositIdNew: '',
            groupDepositAmtNew: null,//新押金
            groupDepositDateNew: ''//生效日期
        },
        depositRules: {
            groupDepositAmtNew: [
                {required: true, message: '请输入新额度', trigger: 'blur'},
                {type: 'number', message: '额度必须是数字', trigger: 'blur' },
                {pattern:/^\d{1,7}$/, message: '额度在100万以内', trigger: 'blur' }
            ],
            groupDepositDateNew: [
                {required: true, message: '请选择生效日期', trigger: 'change'},
            ]
        },
        paydaysForm:{
            isFirst: true,  //是否第一次
            groupId: '',
            groupPaydaysDaysOld: '',//当前账期
            groupPaydaysDateOld: '',//有效日期

            groupPaydaysIdNew: '',
            groupPaydaysDaysNew: null,//新账期
            groupPaydaysDateNew: ''//生效日期
        },
        paydaysRules: {
            groupPaydaysDaysNew: [
                {required: true, message: '请输入新账期', trigger: 'blur'},
                {type: 'number', message: '额度必须是数字', trigger: 'blur' },
                {pattern:/^\d{1,2}$/, message: '账期在100天以内', trigger: 'blur' }
            ],
            groupPaydaysDateNew: [
                {required: true, message: '请选择生效日期', trigger: 'change'},
            ]
        },

        dialogVisibleDiscount: false,
        discountForm:{
            groupId: '',
            discountData: [],
        }

    };

  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      handleClick(tab, event) {
          //0逻辑删除、1待审核、2审核通过、3审核不通过、4禁止登陆[此状态下，机构内所有用户禁止登陆]）
          if (tab.index == 0) { //待审核
              this.groupArrayStatus = [1];
              this.setAuditedData = this.auditedName;
              this.getList();
          }else if(tab.index == 1){ //已通过
              this.groupArrayStatus = [2];
              this.setAuditedData = this.auditedName1;
              this.getList();
          }else if(tab.index == 2){ //审核不通过
              this.groupArrayStatus = [3,4,5];
              this.setAuditedData = this.auditedName2;
              this.getList();
          }
      },
    // 点击查询
    toSearch() {
      this.getList();
    },
    resetData(formName) {
        this.$refs[formName].resetFields();
        this.page=1;
        this.rows=10;
        this.getList()
    },
    // 获取货主管理列表
    getList() {
        var param = new URLSearchParams();
        param.append("page", this.page);
        param.append("rows", this.limit);
        param.append("groupCompany",this.searchForm.groupCompany);
        param.append("startTime",this.searchForm.startTime);
        param.append("endTime",this.searchForm.endTime);

        // param.append("groupArrayStatus",this.groupArrayStatus);
      this.$http
          .post(
              this.$api.Risks.getShipperList,param,true
          )
        .then(res => {
          //表格数据
            this.list = res.data.data.list;
            this.total = res.data.data.total;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          });
        })
    },

    // 点击审核
    toAudit() {
      var that = this;
      var projectIdList = this.$store.state.selectData;
      if (projectIdList.length > 1 || projectIdList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一条记录进行审核",
          type: "error"
        });
        return false;
      }

      if(this.auditFlag == 1)
          this.groupStatusOption = this.checkOption;
      else if(this.auditFlag == 2)
          this.groupStatusOption = this.exceptionOption;
      else if(this.auditFlag == 3)
          this.groupStatusOption = this.exceptionOption1;
      else if(this.auditFlag == 5)
          this.groupStatusOption = this.exceptionOption2;

      this.toAuditDialog = !this.toAuditDialog;
      this.$http
        .get(this.$api.Risks.getShipperDetail + '?id=' + projectIdList[0].groupId , true)
        .then(res => {
          if(res.data.code == 1) {
            let list = res.data.data;
            this.auditDetail.groupId = list.groupId
            this.auditDetail.groupCompany = list.groupCompany
            this.auditDetail.groupMobile = list.groupMobile
            this.auditDetail.groupTaxCode = list.groupTaxCode
            this.auditDetail.groupLegal = list.groupLegal

            this.auditDetail.groupCapital = list.groupCapital
            this.auditDetail.groupCreateDate = list.groupCreateDate
            this.auditDetail.groupArea = list.groupArea
            this.auditDetail.groupBusinessScope = list.groupBusinessScope
            this.auditDetail.groupType = list.groupType

            this.auditDetail.groupTaxAuthorities = list.groupTaxAuthorities
            this.auditDetail.provinceName = list.provinceName
            this.auditDetail.groupAddress = list.groupAddress
            this.auditDetail.groupBusinessLicense = 
              list.groupBusinessLicense ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + list.groupBusinessLicense : ''
            this.auditDetail.createTime = list.createTime

            this.auditDetail.groupStatus = list.groupStatus
            this.originalStatus = list.groupStatus
          } else {
            this.$message({
              showClose: true,
              message: "获取审核信息失败",
              type: "error"
            });
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

    // 弹窗确定修改审核
    changeAudit() {
      if(this.auditDetail.groupStatus == this.originalStatus) {
        this.$message({
          showClose: true,
          message: "未做任何修改",
          type: "info"
        });
      }

      if(this.auditDetail.groupStatus != this.originalStatus) {
        if(this.auditDetail.groupStatus == 0) {
          this.promptText = '确定要删除吗';
        } else if(this.auditDetail.groupStatus == 1) {
          this.promptText = '确定修改为 “待审核” 状态吗';
        } else if(this.auditDetail.groupStatus == 2) {
          this.promptText = '确定修改为 “审核通过” 状态吗';
        } else if(this.auditDetail.groupStatus == 3) {
          this.promptText = '确定修改为 “审核不通过” 状态吗';
        } else if(this.auditDetail.groupStatus == 4) {
          this.promptText = '确定修改为 “货主异常” 状态吗';
        }else if(this.auditDetail.groupStatus == 5) {
              this.promptText = '确定修改为 “注册异常” 状态吗';
          }
        this.innerConfirm = !this.innerConfirm;
      }
    },
    // 最终修改审核状态
    confirmAudit() {
        this.auditLoading = true;
        setTimeout(() => {
            this.auditLoading = false;
        }, 10000);


      let that = this;
      this.toAuditDialog = !this.toAuditDialog;
      this.innerConfirm = !this.innerConfirm;
      var param = new URLSearchParams();
      param.append("groupId", this.auditDetail.groupId);
      param.append("groupStatus", this.auditDetail.groupStatus);
      var url = this.$api.Risks.sendShipperAudit;
      if(this.auditFlag == 5) //如果是恢复
          url = this.$api.Risks.exceptionRecover;
      this.$http
        .post(url, param, true)
        .then(res => {
            this.auditLoading = false;
          console.log(res)
          if(res.data.code == 1) {
            this.originalStatus = this.auditDetail.groupStatus;
            this.getList()
            this.$message({
              showClose: true,
              message: res.data.message,
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
          });
        })
    },

    // 重置审核详情弹窗
    resetAuditDetail() {
      this.auditDetail = { 
        groupId: '', // 货主ID
        groupCompany: '', // 公司名称
        groupMobile: '', // 公司电话
        groupTaxCode: '', // 纳税人识别号
        groupLegal: '', // 法人
        groupCapital: '', // 注册资本
        groupCreateDate: '', // 成立日期
        groupArea: '', // 所属地区
        groupBusinessScope: '', // 经营范围
        groupType: '', // 企业类型
        groupTaxAuthorities: '', // 主管税务机关
        provinceName: '', // 企业地址
        groupAddress: '', // 详细信息
        groupBusinessLicense: '', // 营业执照
        createTime: '', // 注册时间
        groupStatus: '', // 审核状态
      }
      this.originalStatus = '' // 用户初始状态
    },

      selectFeeDate(val) {
          this.feeForm.groupFeeDateNew = this.$moment(val).format(
              "YYYY-MM-DD"
          );
      },
      selectDepositDate(val) {
          this.depositForm.groupDepositDateNew = this.$moment(val).format(
              "YYYY-MM-DD"
          );
      },
      selectPaydaysDate(val) {
          this.paydaysForm.groupPaydaysDateNew = this.$moment(val).format(
              "YYYY-MM-DD"
          );
      },

      //打开费率管理弹窗
      toFee(){
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({showClose: true, message: "请选择要配置的货主！", type: "error"});
              return false;
          }

          this.feeForm.groupId = idList[0].groupId;
          this.dialogVisibleFee = true;
          var param = new URLSearchParams();
          param.append("groupId", this.feeForm.groupId);
          this.$http
              .get(this.$api.Risks.findGroupFeeInfo+"?groupId=" + this.feeForm.groupId,true)
              .then(res => {
                  var map = res.data.data;
                  //没查询到记录，认为是首次设置
                  if(map.rows == 0){
                      this.feeForm.isFirst = true;
                  }else{
                      if(map.valid != null){
                          this.feeForm.isFirst = false;
                          this.feeForm.groupFeeRateOld = map.valid.groupFeeRate;
                          this.feeForm.groupFeeDateOld = map.valid.groupFeeDate;
                      }
                      if(map.wait != null){
                          this.feeForm.groupFeeRateNew = map.wait.groupFeeRate;
                          this.feeForm.groupFeeDateNew = map.wait.groupFeeDate;
                          this.feeForm.groupFeeIdNew = map.wait.feeId;
                      }

                  }
              }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
      },
      doFee(formName){
          this.$refs[formName].validate((valid) => {
              if (valid == false) {
                  return null;
              }else
              {
                  let param = new FormData();
                  param.append("groupId",this.feeForm.groupId);
                  param.append("groupFeeRate",this.feeForm.groupFeeRateNew);
                  param.append("groupFeeDate",this.feeForm.groupFeeDateNew);
                  param.append("feeId",this.feeForm.groupFeeIdNew);
                  this.$http
                      .post(this.$api.Risks.saveGroupFee,param,true)
                      .then(res => {
                          this.$message({showClose: true, message: res.data.message, type: "success"});
                          this.dialogVisibleFee = false;
                      }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
              }
          });
      },
      //打开货主优惠
      toDiscounts(){
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({showClose: true, message: "请选择要配置的货主！", type: "error"});
              return false;
          }
          this.discountForm.groupId = idList[0].groupId;
          this.dialogVisibleDiscount = true;
          this.$http
              .get(this.$api.Risks.findGroupDiscountsList+"?groupId=" + this.discountForm.groupId,true)
              .then(res => {
                  this.discountForm.discountData = res.data.data;
              }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
      },
      doDiscounts(){
          var param = {};
          param.discountsList = this.discountForm.discountData;
          param.groupId = this.discountForm.groupId;
          this.$http
              .post(this.$api.Risks.saveGroupDiscount, param, {
                  headers: {
                      "Content-Type": "application/json;charset=UTF-8"
                  }
              })
              .then(res => {
                  this.dialogVisibleDiscount = false;
                  this.$message({showClose: true, message: res.data.message, type: "success"});
              })
              .catch(err => {
                  this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});
              })
      },
      //押金额度
      toDeposit(){
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({showClose: true, message: "请选择要配置的货主！", type: "error"});
              return false;
          }
          this.depositForm.groupId = idList[0].groupId;
          this.dialogVisibleDeposit = true;
          var param = new URLSearchParams();
          param.append("groupId", this.depositForm.groupId);
          this.$http
              .get(this.$api.Risks.findGroupDepositInfo+"?groupId=" + this.depositForm.groupId,true)
              .then(res => {
                  var map = res.data.data;
                  //没查询到记录，认为是首次设置
                  if(map.rows == 0){
                      this.depositForm.isFirst = true;
                  }else{
                      if(map.valid != null){
                          this.depositForm.isFirst = false;
                          this.depositForm.groupDepositAmtOld = map.valid.groupDepositAmt;
                          this.depositForm.groupDepositDateOld = map.valid.groupDepositDate;
                      }
                      if(map.wait != null){
                          this.depositForm.groupDepositAmtNew = map.wait.groupDepositAmt;
                          this.depositForm.groupDepositDateNew = map.wait.groupDepositDate;
                          this.depositForm.groupDepositIdNew = map.wait.depositId;
                      }

                  }
              }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
      },
      doDeposit(formName){
          this.$refs[formName].validate((valid) => {
              if (valid == false) {
                  return null;
              }else
              {
                  let param = new FormData();
                  param.append("groupId",this.depositForm.groupId);
                  param.append("groupDepositAmt",this.depositForm.groupDepositAmtNew);
                  param.append("groupDepositDate",this.depositForm.groupDepositDateNew);
                  param.append("depositId",this.depositForm.groupDepositIdNew);
                  this.$http
                      .post(this.$api.Risks.saveGroupDeposit,param,true)
                      .then(res => {
                          this.$message({showClose: true, message: res.data.message, type: "success"});
                          this.dialogVisibleDeposit = false;
                      }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
              }
          });
      },
      //货主账期
      toPaydays(){
          var idList = this.$store.state.selectData;
          if (idList.length > 1 || idList.length == 0) {
              this.$message({showClose: true, message: "请选择要配置的货主！", type: "error"});
              return false;
          }
          this.paydaysForm.groupId = idList[0].groupId;
          this.dialogVisiblePaydays = true;
          var param = new URLSearchParams();
          param.append("groupId", this.paydaysForm.groupId);
          this.$http
              .get(this.$api.Risks.findGroupPaydaysInfo+"?groupId=" + this.paydaysForm.groupId,true)
              .then(res => {
                  var map = res.data.data;
                  //没查询到记录，认为是首次设置
                  if(map.rows == 0){
                      this.paydaysForm.isFirst = true;
                  }else{
                      if(map.valid != null){
                          this.paydaysForm.isFirst = false;
                          this.paydaysForm.groupPaydaysDaysOld = map.valid.groupPaydaysDays;
                          this.paydaysForm.groupPaydaysDateOld = map.valid.groupPaydaysDate;
                      }
                      if(map.wait != null){
                          this.paydaysForm.groupPaydaysDaysNew = map.wait.groupPaydaysDays;
                          this.paydaysForm.groupPaydaysDateNew = map.wait.groupPaydaysDate;
                          this.paydaysForm.groupPaydaysIdNew = map.wait.paydaysId;
                      }

                  }
              }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
      },
      doPaydays(formName){
          this.$refs[formName].validate((valid) => {
              if (valid == false) {
                  return null;
              }else
              {
                  let param = new FormData();
                  param.append("groupId",this.paydaysForm.groupId);
                  param.append("groupPaydaysDays",this.paydaysForm.groupPaydaysDaysNew);
                  param.append("groupPaydaysDate",this.paydaysForm.groupPaydaysDateNew);
                  param.append("paydaysId",this.paydaysForm.groupPaydaysIdNew);
                  this.$http
                      .post(this.$api.Risks.saveGroupPaydays,param,true)
                      .then(res => {
                          this.$message({showClose: true, message: res.data.message, type: "success"});
                          this.dialogVisiblePaydays = false;
                      }).catch(err => {this.$message({showClose: true, message: "失败（≧?≦）", type: "error"});})
              }
          });
      },


      addTableTr(){
          this.discountForm.discountData.push({
              groupBillBegin: 0,
              groupBillEnd: 0,
              groupDiscountAmt: 0,
          })
      },
      deleteRow(index, rows) {
          rows.splice(index, 1);
      }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.groupArrayStatus = [1];
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

<style scoped>
/* @import url(); 引入公共css类 */
.auditBox {
  width: 100%;
  overflow: hidden;
  font-size: 14px;
}
.auditBox ul {
  border-top: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
}
.auditL {
  float: left;
}
.auditR {
  float: right;
}
.auditL,.auditR {
  width: 49%;
}
.auditBox li{
  display: flex;
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.auditBox .spanL,.spanR{

  text-align: center;
  line-height: 40px;
}
.auditBox .business {
  display: flex;
  align-items: center;
}
.auditBox .business .spanL {
  border: 0;
}
.auditBox .business .spanR {
  border: 0;
  border-left: 1px solid #e4e7ed;
}
.auditBox .businessImg {
  flex: 1;
  display: flex;
  justify-content: center;
  border-left: 1px solid #e4e7ed;
}
.auditBox .spanL{
  width: 100px;
  padding-left: 3px;
  border-right: 1px solid #e4e7ed;
}
.auditBox .spanR{
  flex: 1;
}
.auditB {
  clear: both;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.auditB .el-button{
  width: 200px;
  margin: 0 30px 0 0;
  padding: 0;
  height: 40px;

}

</style>
