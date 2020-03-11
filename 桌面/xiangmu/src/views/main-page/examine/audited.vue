<!--  -->
<template>
  <div class="audit">
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
              <el-form-item label="项目名称" prop="value">
                <el-input placeholder="请输入内容" v-model="searchData.projectName" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
              <el-form-item label="客户名称" prop="input">
                <el-input placeholder="请输入内容" v-model="searchData.projectCustomer" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" type="primary" @click="toSearch()">查询</el-button>
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
          <el-button class="reset reset_tab" type="primary" @click="newAddProject()">新建项目</el-button>
          <el-button
            class="reset reset_tab"
            type="primary"
            :disabled="editDis"
            @click="editProject()"
          >修改项目</el-button>
          <el-button
            class="reset reset_tab"
            type="primary"
            :disabled="deltDis"
            @click="delProject()"
          >删除项目</el-button>
        </div>
        <!-- 表单组件 -->
        <div class="list-box">
          <tabComp :tableHeader="auditedName" :tableData1="list"></tabComp>
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

    <!-- 弹窗开始 -->
    <!-- 新建项目弹窗开始 -->
    <el-dialog
      title="新建项目"
      custom-class="alert_default"
      :visible.sync="newProject1"
      width="760px"
      :close-on-click-modal="false"
      @close="closeDialogNewProject"
    >
      <el-form :model="newProjectForm" :rules="rules" ref="newProjectForm">
        <!--
        <el-form-item label="项目编号" :label-width="formLabelWidth" prop="projectCode">
          <el-input
            
            v-model="newProjectForm.projectCode"
            placeholder="项目编号 例如:123"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        -->

        <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName">
          <el-input
            v-model="newProjectForm.projectName"
            placeholder="项目名称 例如:大宗交易"
            style="width: 500px"
          ></el-input>
        </el-form-item>

        <el-form-item label="业务类型" :label-width="formLabelWidth" prop="projectBusinessType">
          <el-select
            class="sele_width500"
            v-model="newProjectForm.projectBusinessType"
            placeholder="请选择业务类型"
          >
            <el-option
              v-for="item in businessType"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="projectCustomer">
          <el-input
            v-model="newProjectForm.projectCustomer"
            placeholder="客户名称 例如:王先生"
            style="width: 500px"
          ></el-input>
        </el-form-item>

        <el-form-item label="结算模式" :label-width="formLabelWidth" prop="projectSettlementWay">
          <el-select
            class="sele_width500"
            v-model="newProjectForm.projectSettlementWay"
            placeholder="请选择结算模式"
            @input="onChange"
          >
            <el-option label="无差额" value="1"></el-option>
            <el-option label="有差额" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计费分类" :label-width="formLabelWidth" prop="projectSettlementClass">
          <el-select
            class="sele_width500"
            v-model="newProjectForm.projectSettlementClass"
            placeholder="请选择计费分类"
          >
            <el-option label="大宗" value="1"></el-option>
            <el-option label="非大宗" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运费计算方式" :label-width="formLabelWidth" prop="projectCalculateWay">
          <el-select
            class="sele_width500"
            v-model="newProjectForm.projectCalculateWay"
            placeholder="请选择运费计算方式"
            @input="onChange"
          >
            <el-option label="系统计算" value="1"></el-option>
            <el-option label="手动输入" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单计算公式" :label-width="formLabelWidth" v-show="OrderIsshow">
          <br />
          <el-table
            ref="multipleTable"
            :data="projectOrderCalculateFormula2"
            tooltip-effect="dark"
            style="width: 500px;"
            class="margin_left"
            :span-method="objectSpanMethod"
          >
            <el-table-column label="名称" width="100" prop="name"></el-table-column>
            <el-table-column label="计算公式">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.key"
                  placeholder="请选择"
                  @input="Adddingdan(scope.row.key,scope.row.id)"
                >
                  <el-option
                    v-for="item in scope.row.jifeiliangselect"
                    :label="item.value"
                    :key="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="取整" width="60">
              <template scope="scope">
                <el-checkbox
                  v-model="newProjectForm.projectOrderCalculateRound"
                  v-bind="{'checked': modifyForm.projectOrderCalculateRound == 1 ? true : false}"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="运单计算公式" :label-width="formLabelWidth" v-show="WaybillIsshow">
          <br />
          <el-table
            ref="multipleTable"
            :data="projectOrderCalculateFormula1"
            tooltip-effect="dark"
            style="width: 500px"
            :span-method="objectSpanMethod"
          >
            <el-table-column label="名称" width="100" prop="name"></el-table-column>
            <el-table-column label="计算公式">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.key"
                  placeholder="请选择"
                  @input="Addyundan(scope.row.key,scope.row.id)"
                >
                  <el-option
                    v-for="item in scope.row.kaipiaomaney"
                    :label="item.value"
                    :key="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="取整" width="60">
              <template scope="scope">
                <el-checkbox
                  v-model="newProjectForm.projectShippingCalculateRound"
                  v-bind="{'checked': modifyForm.projectShippingCalculateRound == 1 ? true : false}"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="绑定用户" :label-width="formLabelWidth" prop="bindinguser">
          <el-select
            class="sele_width500"
            v-model="newProjectForm.bindinguser"
            @input="onChangebinding(newProjectForm.bindinguser)"
          >
            <el-option
              v-for="item in binding"
              :key="item.id"
              :label="item.user_role"
              :value="item.user_role+','+item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-table :data="bindingpush" style="width: 100%" v-show="bindingisShow">
            <el-table-column label="绑定用户" width="150">
              <template slot-scope="scope">{{ scope.row.realName }}</template>
            </el-table-column>
            <el-table-column label="角色" width="120">
              <template slot-scope="scope">{{ scope.row.roleNames }}</template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
                >解绑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="medium">取 消</el-button>
        <el-button type="primary" @click="addNew('newProjectForm')" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建项目弹窗结束 -->

    <!-- 修改项目弹窗开始 -->
    <el-dialog
      title="修改项目"
      custom-class="alert_default"
      :visible.sync="modifyProject"
      width="760px"
      :close-on-click-modal="false"
      @close="closeDialogInformation"
    >
      <el-form :model="modifyForm" :rules="rules" ref="modifyForm">
        <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName1">
          <el-input style="width: 500px" v-model="modifyForm.projectName1" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="业务类型" :label-width="formLabelWidth" prop="projectBusinessType1">
          <el-select
            class="sele_width500"
            v-model="modifyForm.projectBusinessType1"
            placeholder="请选择业务类型"
          >
            <el-option
              v-for="item in businessType"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="projectCustomer1">
          <el-input style="width: 500px" v-model="modifyForm.projectCustomer1" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="结算模式" :label-width="formLabelWidth" prop="projectSettlementWay1">
          <el-select
            class="sele_width500"
            v-model="modifyForm.projectSettlementWay1"
            placeholder="请选择结算模式"
            @input="onChange1"
          >
            <el-option label="无差额" value="1"></el-option>
            <el-option label="有差额" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计费分类" :label-width="formLabelWidth" prop="projectSettlementClass1">
          <el-select
            class="sele_width500"
            v-model="modifyForm.projectSettlementClass1"
            placeholder="请选择计费分类"
          >
            <el-option label="大宗" value="1"></el-option>
            <el-option label="非大宗" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运费计算方式" :label-width="formLabelWidth" prop="projectCalculateWay1">
          <el-select
            class="sele_width500"
            v-model="modifyForm.projectCalculateWay1"
            placeholder="请选择运费计算方式"
            @input="onChange1"
          >
            <el-option label="系统计算" value="1"></el-option>
            <el-option label="手动输入" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="订单计算公式"
          :label-width="formLabelWidth"
          v-show="OrderIsshow1"
          style="position:relative"
        >
          <el-table
            ref="multipleTable"
            :data="projectOrderCalculateFormula2"
            tooltip-effect="dark"
            style="width: 500px;"
            class="margin_left"
            :span-method="objectSpanMethod"
          >
            <el-table-column label="名称" width="100" prop="name"></el-table-column>

            <el-table-column label="计算公式">
              <template slot-scope="scope"></template>
            </el-table-column>

            <el-table-column label="取整" width="60">px
              <template scope="scope">
                <el-checkbox
                  v-model="modifyForm.projectOrderCalculateRound1"
                  v-bind="{'checked': modifyForm.projectOrderCalculateRound1}"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <el-select
            v-model="modifyForm.projectOrderCalculateFormula1"
            placeholder="请选择"
            @change="Modifydingdan(modifyForm.projectOrderCalculateFormula1,1)"
            style="position:absolute;left:110px;top:100px;width: 320px;"
          >
            <el-option
              v-for="item in projectOrderCalculateFormula2[1].jifeiliangselect"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
          <el-select
            v-model="modifyForm.projectOrderCalculateKpi1"
            placeholder="请选择"
            @change="Modifydingdan(modifyForm.projectOrderCalculateKpi1,2)"
            style="position:absolute;left:110px;top:50px;width: 320px"
          >
            <el-option
              v-for="item in projectOrderCalculateFormula2[0].jifeiliangselect"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="运单计算公式"
          :label-width="formLabelWidth"
          v-show="WaybillIsshow1"
          style="position:relative"
        >
          <br />
          <el-table
            ref="multipleTable"
            :data="projectOrderCalculateFormula1"
            tooltip-effect="dark"
            style="width: 500px"
            :span-method="objectSpanMethod"
          >
            <el-table-column label="名称" width="100" prop="name"></el-table-column>
            <el-table-column label="计算公式">
              <template slot-scope="scope">
                <!-- <el-select
                  v-model="scope.row.key"
                  placeholder="请选择"
                  @input="Modifyyundan(scope.row.key,scope.row.id)"
                >
                  <el-option
                    v-for="item in scope.row.kaipiaomaney"
                    :label="item.value"
                    :key="item.key"
                    :value="item.key"
                  ></el-option>
                </el-select>-->
              </template>
            </el-table-column>
            <el-table-column label="取整" width="60">
              <template scope="scope">
                <el-checkbox
                  v-model="modifyForm.projectShippingCalculateRound1"
                  v-bind="{'checked': modifyForm.projectShippingCalculateRound1 }"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <el-select
            v-model="modifyForm.projectShippingCalculateFormula1"
            placeholder="请选择"
            @change="Modifyyundan(modifyForm.projectShippingCalculateFormula1,1)"
            style="position:absolute;left:110px;top:135px;width: 320px;"
          >
            <el-option
              v-for="item in projectOrderCalculateFormula1[1].kaipiaomaney"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
          <el-select
            v-model="modifyForm.projectShippingCalculateKpi1"
            placeholder="请选择"
            @change="Modifyyundan(modifyForm.projectShippingCalculateKpi1,2)"
            style="position:absolute;left:110px;top:90px;width: 320px"
          >
            <el-option
              v-for="item in projectOrderCalculateFormula1[0].kaipiaomaney"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定用户" :label-width="formLabelWidth" prop="bindinguser">
          <el-select
            v-model="newProjectForm.bindinguser1"
            class="sele_width500"
            @input="onChangemodifybinding(newProjectForm.bindinguser1)"
          >
            <el-option
              v-for="item in binding"
              :key="item.id"
              :label="item.user_role"
              :value="item.user_role+','+item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-table :data="modifybindingpush" style="width: 100%" v-show="bindingisShow1">
            <el-table-column label="绑定用户" width="150">
              <template slot-scope="scope">{{ scope.row.realName }}</template>
            </el-table-column>
            <el-table-column label="角色" width="120">
              <template slot-scope="scope">{{ scope.row.roleNames }}</template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData,2)"
                  type="text"
                  size="small"
                >解绑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyProject=false" size="medium">取 消</el-button>
        <el-button type="primary" @click="modify('modifyForm')" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改项目弹窗结束 -->
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
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
      //控制绑定用户的表格显示与隐藏
      bindingisShow: false,
      tableData: null,
      jiesuan: "", //结算模式
      yunfei: "", //运费计算方式
      dingdan: {}, //订单哪一行
      yundan: {}, //运单哪一行
      radioone: "", //订单单选
      radiotwo: "", //运单单选
      OrderIsshow: false, //订单是否显示
      WaybillIsshow: false, //运单是否显示

      OrderIsshow1: false, //修改项目时订单是否显示
      WaybillIsshow1: false, //修改项目时运单是否显示
      modifyjiesuan: null, //修改时  结算模式
      bindingisShow1: false, //修改时 绑定子用户是否显示
      modifybindingpush: [], //修改时 绑定子用户渲染列表

      //订单计算公式
      projectOrderCalculateFormula2: [
        {
          name: "结算计费量",
          jifeiliangselect: [],
          id: 1
        },
        {
          name: "开票金额",
          jifeiliangselect: [],
          checked: false,
          id: 2
        }
      ],
      //运单计算公式
      projectOrderCalculateFormula1: [
        {
          name: "结算计费量",
          kaipiaomaney: [],
          id: 1
        },
        {
          name: "司机运费",
          kaipiaomaney: [],
          checked: true,
          id: 2
        }
      ],

      //绑定用户下拉菜单
      binding: [],
      //绑定用户下拉菜单选中那个 push那个
      bindingpush: [],
      //业务类型
      businessType: [],
      multipleSelection: [],
      //搜索款前面下拉默认选项
      companyDefault: 1,
      //结算模式下拉数据
      settlementData: [
        {
          value: 2,
          label: "有差额"
        },
        {
          value: 1,
          label: "无差额"
        }
      ],
      //计费分类下拉数据
      settlementData1: [
        {
          value: 1,
          label: "大宗"
        },
        {
          value: 2,
          label: "快消"
        }
      ],
      //运费计算方式下拉数据
      settlementData2: [
        {
          value: 1,
          label: "系统计算"
        },
        {
          value: 2,
          label: "手动输入"
        }
      ],
      //系统计算公式
      System_calculation: [],
      //订单运费是否取整（1是 0否 系统计算时必填）
      projectOrderCalculateRound: "",
      //运单运费是否取整（1是 0否 系统计算时必填）
      projectShippingCalculateRound: "",
      //搜索数据
      searchData: {
        createTime: "", //创建时间
        projectName: "", //项目名称
        projectCustomer: "" //客户名称
      },
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
      //弹窗表格数据
      gridData: [],
      tableData: [],
      // 表头数据
      auditedName: [
        {
          tabTh: "项目名称",
          tabItem: "projectName",
          isShow: true,
          sortNum: 2
        },
        {
          tabTh: "项目业务类型",
          tabItem: "projectBusinessTypeName",
          isShow: true,
          sortNum: 3
        },
        {
          tabTh: "客户名称",
          tabItem: "projectCustomer",
          isShow: true,
          sortNum: 4
        },
        {
          tabTh: "结算模式",
          tabItem: "projectSettlementWayName",
          isShow: true,
          sortNum: 5
        },
        {
          tabTh: "计费分类",
          tabItem: "projectSettlementClassName",
          isShow: true,
          sortNum: 6
        },
        {
          tabTh: "运费计算方式",
          tabItem: "projectCalculateWayName",
          isShow: true,
          sortNum: 7
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true,
          sortNum: 8
        },
        {
          tabTh: "项目ID",
          tabItem: "projectId",
          isShow: false,
          sortNum: 9
        }
      ],
      value1: "",
      input: "",
      options: [
        {
          value: 1,
          label: "项目编号"
        },
        {
          value: 2,
          label: "项目名称"
        },
        {
          value: 3,
          label: "客户名称"
        }
      ],
      value: "",
      activeName: "first",
      input2: "",
      // 新建项目弹窗
      newProject1: false,
      newProjectForm: {
        projectName: "", //项目名称
        projectBusinessType: "", //项目业务类型code
        projectCustomer: "", //客户名称
        projectSettlementWay: "", //结算模式（1无差额、2有差额）
        projectSettlementClass: "", //计费分类（1大宗、2快消；选择大宗时，有亏涨吨）
        projectCalculateWay: "", //运费计算方式(1系统计算，2手工收入)
        projectOrderCalculateFormula: "", //订单运费计算公式（系统计算时必填/开票金额）
        projectOrderCalculateKpi: "", //订单结算计费量id
        projectOrderCalculateRound: "", //订单运费是否取整（1是 0否 系统计算时必填）
        projectShippingCalculateFormula: "", //运单运费计算公式（系统计算时必填）
        projectShippingCalculateKpi: "", //运单结算计费量id
        projectShippingCalculateRound: "", //运单运费是否取整（1是 0否 系统计算时必填）
        bindinguser: "", //绑定子用户
        ownerList: [] //项目所属用户集合
      },
      //表单验证   自定义验证validator
      rules: {
        projectCode: [
          //项目编号
          {
            required: true,
            message: "请输入项目编号 ",
            trigger: ["blur", "change"]
          }
        ],
        projectName: [
          //项目名称
          {
            required: true,
            message: "请输入项目名称 ",
            trigger: ["blur", "change"]
          }
        ],
        projectCustomer: [
          //客户名称
          {
            required: true,
            message: "请输入客户名称 ",
            trigger: ["blur", "change"]
          }
        ],
        projectCalculateWay: [
          //运费计算方式(1系统计算，2手工收入)
          { required: true, message: " 运费方式不能为空", trigger: "change" }
        ],
        projectSettlementClass: [
          //计费分类（1大宗、2快消；选择大宗时，有亏涨吨）
          { required: true, message: "计费分类不能为空 ", trigger: "change" }
        ],
        projectSettlementWay: [
          //结算模式（1无差额、2有差额）
          { required: true, message: " 结算模式不能为空", trigger: "change" }
        ],
        projectBusinessType: [
          //项目类型
          { required: true, message: "项目类型不能为空 ", trigger: "change" }
        ],
        bindinguser: [
          //绑定子用户下拉框中的内容
          {
            required: false,
            message: " ",
            trigger: ["blur", "change"]
          }
        ],
        //项目所属用户集合
        ownerList: [
          {
            required: true,
            message: " 绑定子用户列表不能为空",
            trigger: "change"
          }
        ],
        projectOrderCalculateFormula: [
          //订单运费计算公式（系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectOrderCalculateRound: [
          //订单运费是否取整（1是 0否 系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectShippingCalculateFormula: [
          //运单运费计算公式（系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectShippingCalculateRound: [
          //运单运费是否取整（1是 0否 系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        ///////////////////以上为增加，下方为修改//////////////////////

        projectCode1: [
          //项目编号
          {
            required: true,
            message: " 请输入项目编号",
            trigger: ["blur", "change"]
          }
        ],
        projectName1: [
          //项目名称
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur", "change"]
          }
        ],
        projectCustomer1: [
          //客户名称
          {
            required: true,
            message: "请输入客户名称 ",
            trigger: ["blur", "change"]
          }
        ],
        projectCalculateWay1: [
          //运费计算方式(1系统计算，2手工收入)
          { required: true, message: " 运费方式不能为空", trigger: "change" }
        ],
        projectSettlementClass1: [
          //计费分类（1大宗、2快消；选择大宗时，有亏涨吨）
          { required: true, message: "计费分类不能为空 ", trigger: "change" }
        ],
        projectSettlementWay1: [
          //结算模式（1无差额、2有差额）
          { required: true, message: "结算模式不能为空 ", trigger: "change" }
        ],
        projectBusinessType1: [
          //项目类型
          { required: true, message: "项目类型不能为空 ", trigger: "change" }
        ],
        bindinguser1: [
          //绑定子用户下拉框中的内容
          {
            required: false,
            message: " ",
            trigger: ["blur", "change"]
          }
        ],
        //项目所属用户集合
        ownerList1: [
          {
            required: true,
            message: " 绑定子用户列表不能为空",
            trigger: "change"
          }
        ],
        projectOrderCalculateFormula1: [
          //订单运费计算公式（系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectOrderCalculateRound1: [
          //订单运费是否取整（1是 0否 系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectShippingCalculateFormula1: [
          //运单运费计算公式（系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ],
        projectShippingCalculateRound1: [
          //运单运费是否取整（1是 0否 系统计算时必填）
          { required: false, message: " ", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      //修改项目弹窗
      modifyProject: false,
      modifyForm: {
        projectName1: "", //项目名称
        projectBusinessType1: "", //项目业务类型code
        projectCustomer1: "", //客户名称
        projectSettlementWay1: "", //结算模式（1无差额、2有差额）
        projectSettlementClass1: "", //计费分类（1大宗、2快消；选择大宗时，有亏涨吨）
        projectCalculateWay1: "", //运费计算方式(1系统计算，2手工收入)
        projectOrderCalculateFormula1: "", //订单运费计算公式（系统计算时必填）
        projectOrderCalculateKpi1: "", //订单结算计费量id
        projectOrderCalculateRound1: "", //订单运费是否取整（1是 0否 系统计算时必填）
        projectShippingCalculateFormula1: "", //运单运费计算公式（系统计算时必填）
        projectShippingCalculateKpi1: "", //运单结算计费量id
        projectShippingCalculateRound1: "", //运单运费是否取整（1是 0否 系统计算时必填）
        bindinguser1: "", //绑定子用户
        ownerList1: [] //项目所属用户集合
      },
      //开票信息弹窗
      information1: false,
      //绑定子用户
      subUser1: false,
      proId: null, //项目ID
      editDis: false,
      deltDis: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    cancel() {
      // alert(111);
      // console.log(this.newProject1);
      this.newProject1 = false;
      this.newProjectForm={}
      this.newProjectForm.ownerList=[]

      // console.log(this.newProject1);
      // Object.assign(this.$data, this.$options.data.call(this));
    },
    //此方法检测运费计算方式的改变 系统计算显示订单和运单
    onChange() {
      if (this.newProjectForm.projectCalculateWay == 1) {
        //系统计算
        if (this.newProjectForm.projectSettlementWay == 1) {
          //无差额
          this.OrderIsshow = true;
          this.WaybillIsshow = false;
        } else {
          //有差额
          this.OrderIsshow = true;
          this.WaybillIsshow = true;
        }
      } else {
        this.OrderIsshow = false;
        this.WaybillIsshow = false;
      }
    },
    onChange1() {
      if (this.modifyForm.projectCalculateWay1 == 1) {
        //系统计算
        if (this.modifyForm.projectSettlementWay1 == 1) {
          //无差额
          this.OrderIsshow1 = true;
          this.WaybillIsshow1 = false;
        } else {
          //有差额
          this.OrderIsshow1 = true;
          this.WaybillIsshow1 = true;
        }
      } else {
        this.OrderIsshow1 = false;
        this.WaybillIsshow1 = false;
      }
    },

    //此方法检测最下方子用户绑定表格的显示与隐藏
    onChangebinding(value) {
      if (value != "") {
        // console.log(value.split("-")[0]);//用户姓名
        // console.log(value.split("-")[1].split(",")[0])//用户角色
        // console.log(value.split("-")[1].split(",")[1])//id
        var list = {};
        list.userId = Number(value.split("-")[1].split(",")[1]);
        list.realName = value.split("-")[0];
        list.roleNames = value.split("-")[1].split(",")[0];
        if (this.bindingpush.length == 0) {
          this.bindingpush.push(list);
        } else {
          this.bindingpush.map(item => {
            if (item.userId != list.userId) {
              this.bindingpush.push(list);
            } else {
              this.$message({
                showClose: true,
                message: "已有重复数据哦！",
                type: "error"
              });
            }
          });
        }
        this.bindingisShow = true;
      } else {
        this.bindingisShow = false;
      }
    },
    //此方法检测修改时最下方自用户绑定表格的显示与隐藏
    onChangemodifybinding(value) {
      if (value != "") {
        // console.log(value.split("-")[0]);//用户姓名
        // console.log(value.split("-")[1].split(",")[0])//用户角色
        // console.log(value.split("-")[1].split(",")[1])//id
        var list = {};
        list.userId = Number(value.split("-")[1].split(",")[1]);
        list.realName = value.split("-")[0];
        list.roleNames = value.split("-")[1].split(",")[0];
        if (this.modifybindingpush.length == 0) {
          this.modifybindingpush.push(list);
        } else {
          this.modifybindingpush.map(item => {
            if (item.userId != list.userId) {
              this.modifybindingpush.push(list);
            } else {
              this.$message({
                showClose: true,
                message: "已有重复数据哦！",
                type: "error"
              });
            }
          });
        }
        this.bindingisShow1 = true;
      } else {
        this.bindingisShow1 = false;
      }
    },
    //检测修改时的结算模式
    onChangemodifyjiesuan(data) {
      this.modifyjiesuan = data;
      this.modifyForm.projectSettlementWay1 = this.modifyjiesuan;
      this.onChangemodifyyunfei();
    },
    //检测修改时的运费计算方式
    onChangemodifyyunfei(data) {
      // console.log(data, 444);
      if (data == "手动输入") {
        this.OrderIsshow1 = false;
        this.WaybillIsshow1 = false;
      } else {
        this.modifyjiesuan = this.modifyForm.projectSettlementWay1;
        if (this.modifyjiesuan == 1) {
          // console.log("等于1了");
          this.OrderIsshow1 = true;
          this.WaybillIsshow1 = false;
        } else if (this.modifyjiesuan == 2) {
          // console.log("等于2了");
          this.OrderIsshow1 = true;
          this.WaybillIsshow1 = true;
        }
      }
    },
    //新增项目里面绑定用户 的 移除操作
    deleteRow(index, rows, data) {
      // console.log(index, 1, data);
      if (data == 2) {
        this.modifybindingpush.splice(index, 1);
        if (this.modifybindingpush.length == 0) {
          this.bindingisShow1 = false;
        }
      } else {
        this.bindingpush.splice(index, 1);
        if (this.bindingpush.length == 0) {
          this.bindingisShow = false;
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return {
          rowspan: 3,
          colspan: 1
        };
      }
    },
    //新建项目 订单计算
    Adddingdan(data, flag) {
      // console.log(data,flag,"新增")
      //flag为1  是结算计费量 为2  是开票金额
      if (flag == 1) {
        this.projectOrderCalculateFormula2[0].jifeiliangselect.map(item => {
          if (data == item.value) {
            // console.log(111);
            this.newProjectForm.projectOrderCalculateKpi = item.key;
          }
        });
      } else {
        this.projectOrderCalculateFormula2[1].jifeiliangselect.map(item => {
          if (data == item.value) {
            // console.log(111);
            this.newProjectForm.projectOrderCalculateFormula = item.key;
          }
        });
      }
    },
    //新建项目 订单计算
    Addyundan(data, flag) {
      // console.log(data,flag,"新增")
      //flag为1  是结算计费量 为2  是开票金额
      if (flag == 1) {
        this.projectOrderCalculateFormula1[0].kaipiaomaney.map(item => {
          if (data == item.value) {
            // console.log(111);
            this.newProjectForm.projectShippingCalculateKpi = item.key;
          }
        });
      } else {
        this.projectOrderCalculateFormula1[1].kaipiaomaney.map(item => {
          if (data == item.value) {
            // console.log(111);
            this.newProjectForm.projectShippingCalculateFormula = item.key;
          }
        });
      }
    },
    //修改项目 订单计算
    Modifydingdan(data, flag) {
      // console.log(data, flag, "修改订单");
      //flag为2  是结算计费量 为1  是开票金额
      if (flag == 2) {
        this.modifyForm.projectOrderCalculateKpi11 = data;
      } else {
        this.modifyForm.projectOrderCalculateFormula1 = data;
      }
    },
    //修改项目 订单计算
    Modifyyundan(data, flag) {
      // console.log(data, flag, "修改运单");
      //flag为2  是结算计费量 为1  是开票金额
      if (flag == 2) {
        this.modifyForm.projectShippingCalculateKpi11 = data;
      } else {
        this.modifyForm.projectShippingCalculateFormula1 = data;
      }
    },
    //新建项目(完成)
    addNew(newProjectForm) {
      let that = this;
      // console.log(that.bindingpush, "这里是 绑定子用户Id");
      this.$refs[newProjectForm].validate(valid => {
        if (valid) {
          var param = {};
          // //项目编号
          // param.projectCode = that.newProjectForm.projectCode;
          //项目名称
          param.projectName = that.newProjectForm.projectName;
          //项目类型
          param.projectBusinessType = that.newProjectForm.projectBusinessType;
          //客户名称
          param.projectCustomer = that.newProjectForm.projectCustomer;
          //结算模式
          param.projectSettlementWay = that.newProjectForm.projectSettlementWay;
          //计费方式
          param.projectSettlementClass =
            that.newProjectForm.projectSettlementClass;
          //运费计算方式
          param.projectCalculateWay = that.newProjectForm.projectCalculateWay;
          //订单运费计算公式（系统计算时必填）
          param.projectOrderCalculateFormula =
            that.newProjectForm.projectOrderCalculateFormula; //that.dingdan.key;
          //订单结算计费量ID
          param.projectOrderCalculateKpi =
            that.newProjectForm.projectOrderCalculateKpi;
          //订单运费是否取整（1是 0否 系统计算时必填）
          param.projectOrderCalculateRound =
            that.newProjectForm.projectOrderCalculateRound == true ? 1 : 0; //Number(that.dingdan.projectOrderCalculateRound);
          //运单运费计算公式（系统计算时必填）
          param.projectShippingCalculateFormula =
            that.newProjectForm.projectShippingCalculateFormula; //that.yundan.key;
          //运单计费量ID
          param.projectShippingCalculateKpi =
            that.newProjectForm.projectShippingCalculateKpi;
          //运单运费是否取整（1是 0否 系统计算时必填）
          param.projectShippingCalculateRound =
            that.newProjectForm.projectShippingCalculateRound == true ? 1 : 0; //Number(that.yundan.projectShippingCalculateRound);
          //项目所属集合
          var list = {};
          var ownerList = [];
          that.bindingpush.map(item => {
            list.userId = item.userId;
            ownerList.push(list);
            list = {};
          });
          // console.log(param, 111111);
          param.ownerList = ownerList;
          that.$http
            .post(that.$api.Basics.newAddAudited, param, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(res => {
              this.$message({
                showClose: true,
                message: "新建项目成功",
                type: "success"
              });
              this.newProject1 = false;
              this.getList();
            })
            .catch(err => {
              console.log("失败");
              this.$message({
                showClose: true,
                message: "失败",
                type: "error"
              });
            });
        } else {
          console.log(valid);
        }
      });
    },
    //删除项目(完成)
    delProject() {
      let projectIdList = this.$store.state.selectData;
      if (projectIdList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择至少一个项目进项删除",
          type: "error"
        });
        return false;
      }
      let projectId = projectIdList[0].projectId;
      // console.log(typeof projectId);
      let param = new URLSearchParams();
      param.append("projectId", projectId);
      this.$confirm("确定删除该项目吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.Basics.delAudited, param, true)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.getList();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      // console.log(projectId, 555,projectIdList);
    },
    //修改项目,数据的回显(是否取整存在问题)
    editProject() {
      // this.freightSelect();
      var projectIdList = this.$store.state.selectData;
      if (projectIdList.length > 1 || projectIdList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行修改",
          type: "error"
        });
        return false;
      }
      //需要修改的项目ID
      this.proId = projectIdList[0].projectId;

      this.$http
        .get(
          this.$api.Basics.editAuditedMsg +
            "?projectId=" +
            projectIdList[0].projectId,
          true
        )
        .then(res => {
          this.modifyProject = true;
          if (res.data.code == 1) {
            //项目编号
            this.modifyForm.projectCode1 = res.data.data.projectCode;
            //项目名称
            this.modifyForm.projectName1 = res.data.data.projectName;
            //项目业务类型
            this.modifyForm.projectBusinessType1 =
              res.data.data.projectBusinessType;
            //客户名称
            this.modifyForm.projectCustomer1 = res.data.data.projectCustomer;
            //结算模式（1无差额、2有差额）
            this.modifyForm.projectSettlementWay1 = res.data.data.projectSettlementWay.toString();
            //计费分类（1大宗、2快消；选择大宗时，有亏涨吨）
            this.modifyForm.projectSettlementClass1 = res.data.data.projectSettlementClass.toString();
            //运费计算方式(1系统计算，2手工收入)
            this.modifyForm.projectCalculateWay1 = res.data.data.projectCalculateWay.toString();
            //订单运费计算公式（系统计算时必填）
            this.modifyForm.projectOrderCalculateFormula1 =
              res.data.data.projectOrderCalculateFormula;
            //订单结算计费量
            this.modifyForm.projectOrderCalculateKpi1 =
              res.data.data.projectOrderCalculateKpi;
            //订单运费是否取整（1是 0否 系统计算时必填）
            this.modifyForm.projectOrderCalculateRound1 =
              res.data.data.projectOrderCalculateRound == 1 ? true : false;
            //运单运费计算公式（系统计算时必填）
            this.modifyForm.projectShippingCalculateFormula1 =
              res.data.data.projectShippingCalculateFormula;
            //运单结算计费量
            this.modifyForm.projectShippingCalculateKpi1 =
              res.data.data.projectShippingCalculateKpi;
            //运单运费是否取整（1是 0否 系统计算时必填）
            this.modifyForm.projectShippingCalculateRound1 =
              res.data.data.projectShippingCalculateRound == 1 ? true : false;
            //绑定子用户
            this.modifyForm.bindinguser1 = res.data.data.bindinguser;
            //项目所属用户集合
            this.modifyForm.ownerList1 = res.data.data.ownerList;
            //判断子用户列表
            if (res.data.data.ownerList.length != 0) {
              this.modifybindingpush = res.data.data.ownerList;
              this.bindingisShow1 = true;
            }
            //判断 订单 运单是否显示
            if (this.modifyForm.projectCalculateWay1 == 2) {
              this.OrderIsshow1 = false;
              this.WaybillIsshow1 = false;
            } else {
              if (this.modifyForm.projectSettlementWay1 == 1) {
                // console.log();
                this.OrderIsshow1 = true;
                this.WaybillIsshow1 = false;
              } else if (this.modifyForm.projectSettlementWay1 == 2) {
                this.OrderIsshow1 = true;
                this.WaybillIsshow1 = true;
              }
            }
            this.modifyProject = true;
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
    },
    //修改项目提交(完成)
    modify(modifyForm) {
      var that = this;
      this.$refs[modifyForm].validate(valid => {
        if (valid) {
          let param = {};
          //项目ID
          param.projectId = that.proId;
          //项目编号
          param.projectCode = that.modifyForm.projectCode1;
          //项目名称
          param.projectName = that.modifyForm.projectName1;
          //项目类型
          param.projectBusinessType = that.modifyForm.projectBusinessType1;
          //客户名称
          param.projectCustomer = that.modifyForm.projectCustomer1;
          //结算模式
          param.projectSettlementWay = that.modifyForm.projectSettlementWay1;
          //计费方式
          param.projectSettlementClass =
            that.modifyForm.projectSettlementClass1;
          //运费计算方式
          param.projectCalculateWay = that.modifyForm.projectCalculateWay1;
          //订单运费计算公式（系统计算时必填/开票）
          param.projectOrderCalculateFormula =
            that.modifyForm.projectOrderCalculateFormula1;
          //订单计费量
          param.projectOrderCalculateKpi =
            that.modifyForm.projectOrderCalculateKpi11;
          //订单运费是否取整（1是 0否 系统计算时必填）
          param.projectOrderCalculateRound =
            that.modifyForm.projectOrderCalculateRound1 == true ? 1 : 0;
          //运单运费计算公式（系统计算时必填/开票）
          param.projectShippingCalculateFormula =
            that.modifyForm.projectShippingCalculateFormula1;
          //运单计费量
          param.projectShippingCalculateKpi =
            that.modifyForm.projectShippingCalculateKpi11;
          //运单运费是否取整（1是 0否 系统计算时必填）
          param.projectShippingCalculateRound =
            that.modifyForm.projectShippingCalculateRound1 == true ? 1 : 0;
          //项目所属集合
          var list = {};
          var ownerList = [];
          that.modifybindingpush.map(item => {
            list.userId = item.userId;
            ownerList.push(list);
            list = {};
          });
          param.ownerList = ownerList;
          this.$http
            .post(this.$api.Basics.editAudited, param, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(res => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.modifyProject = false;
              this.getList();
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            });
        } else {
          console.log(valid);
        }
      });
    },
    //搜索方法
    toSearch() {
      this.page = 1;
      this.limit = 10;
      this.getList();
      // console.log(this.searchData);
    },
    //重置
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.page = 1;
        this.limit = 10;
        this.searchData.projectName = "";
        this.searchData.projectCustomer = "";
        this.searchData.createTime = "";
        this.getList();
      });
    },
    //开票弹窗开启方法
    information() {
      this.information1 = false;
    },
    //绑定子用户弹窗开启方法
    subUser() {
      this.subUser1 = false;
    },
    // 新建项目弹窗开启方法
    newAddProject() {
      this.newProject1 = true;
    },
    //新建项目弹窗关闭回调
    closeDialogNewProject() {
      this.$refs["newProjectForm"].resetFields(); // this.$refs.adduserform.resetFields();
      this.$nextTick(() => {});
    },
    //开票弹窗关闭回调
    closeDialogInformation() {
      this.$nextTick(() => {
        this.$refs["modifyForm"].resetFields(); // this.$refs.adduserform.resetFields();
      });
    },
    //修改项目弹窗关闭回调
    closeDialogModify() {
      this.$nextTick(() => {
        this.$refs["informationForm"].resetFields(); // this.$refs.adduserform.resetFields();
      });
    },
    //绑定子用户弹窗关闭回调
    closeDialogSubUser() {
      this.$nextTick(() => {
        this.$refs["subUserForm"].resetFields(); // this.$refs.adduserform.resetFields();
      });
    },
    //控制表格显示隐藏
    changeHide(value) {
      this.auditedData.auditedName[2].isShow = !this.auditedData.auditedName[2]
        .isShow;
    },
    // 分页和加载数据方法
    getList() {
      //项目名称
      var projectName = this.searchData.projectName;
      //客户名称
      var projectCustomer = this.searchData.projectCustomer;
      //创建时间
      var createTime = this.searchData.createTime;
      var start = this.page;
      var end = this.limit;
      var projectStatus = 1;
      var url;
      url =
        this.$api.Basics.audited +
        "?page=" +
        start +
        "&rows=" +
        end +
        "&projectName=" +
        projectName +
        "&projectCustomer=" +
        projectCustomer +
        "&createTime=" +
        createTime +
        "&projectStatus=" +
        projectStatus;
      this.$http
        .get(url, true)
        .then(res => {
          // console.log(res, 5555);
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.log("失败");
        });
    },
    //加载新增项目的下拉选项
    addProType() {
      //项目类型菜单
      this.$http
        .get(this.$api.Basics.projectType, true)
        .then(res => {
          // console.log(res, "加载项目");
          let data = res.data.data;
          let list = {};
          data.map(item => {
            list.code = item.key;
            list.value = item.value;
            this.businessType.push(list);
            list = {};
          });
        })
        .catch(err => {
          console.log("失败");
        });
      //绑定用户下拉菜单
      this.$http
        .post(this.$api.Basics.bindinguser, "", true)
        .then(res => {
          // console.log(res.data.data, "绑定用户");
          let data = res.data.data;
          let list = {};
          data.map(item => {
            list.user_role = item.realName + "-" + item.roleNames;
            list.id = item.userId;
            this.binding.push(list);
            list = {};
          });
        })
        .catch(err => {
          console.log("失败");
        });

      //搜索数据
      this.$store.commit("getSingular", {
        options: this.options,
        isShow: true
      });
    },
    //获取系统计算方式
    calculation() {
      //计算公式
      this.$http.post(this.$api.select.calculation, "", true).then(res => {
        //订单开票金额
        this.projectOrderCalculateFormula2[1].jifeiliangselect = res.data.data;
        //运单司机运费
        this.projectOrderCalculateFormula1[1].kaipiaomaney = res.data.data;
      });
      //计费量
      this.$http.post(this.$api.select.jifeiliang, "", true).then(res => {
        //订单结算计费量
        this.projectOrderCalculateFormula2[0].jifeiliangselect = res.data.data;
        //运单结算计费量
        this.projectOrderCalculateFormula1[0].kaipiaomaney = res.data.data;
      });
      // console.log(
      //   this.projectOrderCalculateFormula2[1].jifeiliangselect,
      //   this.projectOrderCalculateFormula1[1].kaipiaomaney,
      //   this.projectOrderCalculateFormula2[0].jifeiliangselect,
      //   this.projectOrderCalculateFormula1[0].kaipiaomaney
      // );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.calculation(); //获取系统计算方式
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.addProType(); //加载业务类型下拉框
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
@import url("../../../assets/css/singularTable.css");
.el-form-item__content {
  margin-left: 0 !important;
}
  table .el-select{
    width: 100%;
  }
</style>