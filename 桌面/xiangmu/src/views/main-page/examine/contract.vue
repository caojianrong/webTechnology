<!--  -->
<template>
  <div class="contract">
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
        <el-form ref="formData" :model="formData" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="项目名称" prop="value">
                <el-input placeholder="请输入内容" v-model="formData.project" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
              <el-form-item label="价格表名称" prop="input">
                <el-input placeholder="请输入内容" v-model="formData.price" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" type="primary" @click="searchData()">查询</el-button>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" @click="resetData('formData')" class="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格组件 -->
      <div class="table_com">
        <div class="tab_operation">
          <el-button class="reset reset_tab" type="primary" @click="newContract(1)">新增价格表</el-button>
          <el-button class="reset reset_tab" type="primary" @click="editContract(2)">修改价格表</el-button>
          <el-button class="reset reset_tab" type="primary" @click="delContract()">删除价格表</el-button>
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
    <!-- 
      非大宗合同弹窗
    -->
    <el-dialog
      width="760px"
      :disabled="showIndex ==2 ? true : false"
      :title="showIndex ==2 ? '修改价格表' : '新增价格表'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialogNewProject"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="关联项目" prop="projectId">
                <el-select
                  v-model="form.projectId"
                  placeholder="请选择项目"
                  @change="screenBulk()"
                  style="width:230px"
                ><!-- :disabled="showIndex ==2 ? true : false"-->
                  <el-option
                    v-for="item in bindProjectData"
                    :label="item.projectName"
                    :key="item.projectId"
                    :value="item.projectId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="价格表类型" prop="priceType">
                <el-select v-model="form.priceType" placeholder="请选择价格表类型" @change="unitPrice()" style="width: 230px">
                  <el-option
                    v-for="item in bindProjectData1"
                    :label="item.label"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="价格表名称" prop="priceName">
                  <el-input v-model="form.priceName" placeholder="价格表名称 例如:XX订单"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="计量单位" prop="priceSettlementUnit">
                <el-select v-model="form.priceSettlementUnit" placeholder="请选择计量单位" style="width: 230px">
                  <el-option
                    v-for="item in Company"
                    :label="item.value"
                    :key="item.key"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12" v-if="unitPriceFlag">
            <div class="grid-content bg-purple">
              <el-form-item label="订单单价" prop="priceSettlementUnitprice">
                <el-input v-model="form.priceSettlementUnitprice" placeholder="订单单价,可是小数"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12" v-else>
            <div class="grid-content bg-purple">
              <el-form-item label="运单单价" prop="priceSettlementUnitprice">
                <el-input v-model="form.priceSettlementUnitprice" placeholder="运单单价,可是小数"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- 以上是全部都有的 -->
          <div v-if="bulkFlag">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="亏吨计量方式" prop="priceDeficitWay">
                  <el-select v-model="form.priceDeficitWay" placeholder="请选择亏吨计量方式" style="width: 230px">
                    <el-option
                      v-for="item in bindProjectData2"
                      :label="item.label"
                      :key="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="亏吨允许值" prop="priceDeficitValue">
                  <el-input v-model="form.priceDeficitValue" placeholder="请根据亏吨计量方式输入值"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="亏吨扣款标准" prop="priceDeficitUnitprice">
                  <el-input v-model="form.priceDeficitUnitprice" placeholder="请根输入亏吨扣款标准"></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="涨吨计量方式" prop="priceRiseWay">
                  <el-select v-model="form.priceRiseWay" placeholder="请选择涨吨计量方式" style="width: 230px">
                    <el-option
                      v-for="item in bindProjectData3"
                      :label="item.label"
                      :key="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="涨吨允许值" prop="priceRiseValue">
                  <el-input v-model="form.priceRiseValue" placeholder="请根据涨吨计量方式输入值"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="涨吨扣款标准" prop="priceRiseUnitprice">
                  <el-input v-model="form.priceRiseUnitprice" placeholder="请根输入涨吨扣款标准"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </div>
          <!-- 以上是大宗合同显示的 -->
          <div v-else>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="货损扣款" prop="priceDamageDeduct">
                  <el-input v-model="form.priceDamageDeduct" placeholder="对货到扣款的说明"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="晚到扣款" prop="priceOverdueDeduct">
                  <el-input v-model="form.priceOverdueDeduct" placeholder="对晚到扣款的说明"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="其他扣款" prop="priceOtherDeduct">
                  <el-input v-model="form.priceOtherDeduct
                " placeholder="对其他扣款的说明"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </div>
          <!-- 以上是内容 -->
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="subMask('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 非大宗和同弹窗结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
export default {
  name: "contract",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    //这里存放数据
    return {
      //表单验证   自定义验证validator
      rules: {
        projectId: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceType: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceName: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceSettlementUnit: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceSettlementUnitprice: [
          { required: true, message: " ", trigger: ["blur", "change"] },
          {
            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,3})$)|^(([1-9]+)$)/g,
            message: "此处为数字，最多保留三位小数"
          }
        ],
        priceDeficitWay: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceDeficitValue: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceDeficitUnitprice: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceRiseWay: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceRiseValue: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ],
        priceRiseUnitprice: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ]
      },
      bindProjectData: [], // 绑定项目下拉数据
      //计费单位下拉数据
      Company: [],
      // 价格表类型下拉数据
      bindProjectData1: [
        {
          value: 1,
          label: "订单单价"
        },
        {
          value: 2,
          label: "运单单价"
        }
      ],
      //亏吨计量方式下拉数据
      bindProjectData2: [
        {
          value: 1,
          label: "亏吨允许比例"
        },
        {
          value: 2,
          label: "亏吨允许范围"
        }
      ],
      // 涨吨计量方式下拉数据
      bindProjectData3: [
        {
          value: 1,
          label: "涨吨允许比例"
        },
        {
          value: 2,
          label: "涨吨允许范围"
        }
      ],
      // 搜索下拉框默认选择
      companyDefault: 1,
      //搜索数据
      formData: {
        value1: "",
        value: "",
        input: "",
        project: "", //项目名称
        price: "" //价格表
      },
      contractName: "新增价格表",
      dialogFormVisible: false,
      form: {
        groupId: null, //价格所属机构ID
        projectId: null, //关联项目
        // projectCode: null, //项目编号
        projectName: null, //项目名称
        priceType: null, //价格表类型（1订单单价表[货主]、2运单单价表[车主]）
        priceName: null, //价格（合同）名称
        priceSettlementUnit: null, //计量单位（结算单位）[tms_config_settlement_unit表]
        priceSettlementUnitprice: null, //计量单价（订单单价）
        projectSettlementType: null, //费选项[也就是对应的结算业务]（1大宗、2快消；选择大宗时，有亏涨吨）
        priceDeficitWay: null, //亏吨计量方式(1亏吨允许比例，2亏吨允许范围)--计费选项为大宗必填
        priceDeficitValue: null, //亏吨允许值--计费选项为大宗必填
        priceDeficitUnitprice: null, //亏吨扣款标准--计费选项为大宗必填
        priceRiseWay: null, //涨吨计量方式(1涨吨允许比例，2涨吨允许范围)--计费选项为大宗必填
        priceRiseValue: null, //涨吨允许值--计费选项为大宗必填
        priceRiseUnitprice: null, //涨吨扣款标准--计费选项为大宗必填
        priceDamageDeduct: "", //货损扣款--计费选项为非大宗选填
        priceOverdueDeduct: "", //晚到扣款--计费选项为非大宗选填
        priceOtherDeduct: "" //其它扣款--计费选项为非大宗选填
      },
      dialogFormVisibleNon: false,
      // 表头数据
      auditedName: [
        {
          tabTh: "价格ID",
          tabItem: "priceId",
          isShow: true,
          sortNum: 1
        },
        {
          tabTh: "价格表类型",
          tabItem: "priceType",
          isShow: true,
          sortNum: 2
        },
        {
          tabTh: "价格表名称",
          tabItem: "priceName",
          isShow: true,
          sortNum: 3
        },
        {
          tabTh: "关联项目",
          tabItem: "projectName",
          isShow: true,
          sortNum: 4
        },
        {
          tabTh: "计费单位",
          tabItem: "priceSettlementUnit",
          isShow: true,
          sortNum: 5
        },
        {
          tabTh: "订单单价",
          tabItem: "priceSettlementUnitprice",
          isShow: true,
          sortNum: 6
        },
        {
          tabTh: "计费选项",
          tabItem: "projectSettlementClass",
          isShow: true,
          sortNum: 7
        },
        {
          tabTh: "亏吨计量方式",
          tabItem: "priceDeficitWay",
          isShow: true,
          sortNum: 8
        },
        {
          tabTh: "亏吨允许比例",
          tabItem: "priceDeficitValue",
          isShow: true,
          sortNum: 9
        },
        {
          tabTh: "亏吨扣款标准",
          tabItem: "priceDeficitUnitprice",
          isShow: true,
          sortNum: 10
        },
        {
          tabTh: "涨吨计量方式",
          tabItem: "priceRiseWay",
          isShow: true,
          sortNum: 11
        },
        {
          tabTh: "涨吨允许比例",
          tabItem: "priceRiseValue",
          isShow: true,
          sortNum: 12
        },
        {
          tabTh: "亏吨扣款标准",
          tabItem: "priceRiseUnitprice",
          isShow: true,
          sortNum: 13
        },
        {
          tabTh: "货损扣款",
          tabItem: "priceDamageDeduct",
          isShow: true,
          sortNum: 14
        },
        {
          tabTh: "晚到扣款",
          tabItem: "priceOverdueDeduct",
          isShow: true,
          sortNum: 15
        },
        {
          tabTh: "其他扣款",
          tabItem: "priceOtherDeduct",
          isShow: true,
          sortNum: 16
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true,
          sortNum: 17
        }
      ],
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
          value: 1,
          label: "项目名称"
        },
        {
          value: 2,
          label: "价格表名称"
        }
      ],
      value: "",
      // activeName: "新建价格表",
      input2: "",
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据，
      bulk: [], // 所选的关联项目
      bulkFlag: false, //判断大宗还是非大宗
      unitPriceFlag: true, //判断是订单单价还是运单单价
      showIndex: 1, //判断弹窗是修改还是添加
      // 修改合同priceId
      priceEditId: "",
      //删除数据保存数组
      projectArray: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监听formMateriel.projectName变化获取code和name参数
    "form.projectId": function(val) {
      if (val) {
        let bindProjectDataOne = this.bindProjectData.find(
          m => m.projectId == this.form.projectId
        );
        this.bulk = bindProjectDataOne;
      }
    }
  },
  //方法集合
  methods: {
    //删除项目
    delContract() {
      let projectIdList = this.$store.state.selectData;
      if (projectIdList.length !== 1) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行删除",
          type: "error"
        });
        return false;
      }
      // let projectArray = [];
      // projectIdList.forEach((item, index) => {
      //   projectArray.push(item.priceId);
      // });
      let param = new URLSearchParams();
      param.append("priceId", projectIdList[0].priceId);
      this.$confirm("确定删除该价格表吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.Basics.delPrice, param, true)
            .then(res => {
              if (res.data.code > 0) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                this.getList();
              } else {
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err.desc,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //弹窗确认按钮提交事件
    subMask(Form) {
      var that = this;
      this.$refs[Form].validate(valid => {
        if (valid) {
          let param = new URLSearchParams();
          param.append("projectId", that.form.projectId); //关联项目
          // param.append("projectCode", that.bulk.projectCode); //项目编号
          // param.append("projectName", that.bulk.projectName); //项目名称
          param.append("priceType", that.form.priceType); //价格表类型
          param.append("priceName", that.form.priceName); //价格（合同）名称
          param.append("priceSettlementUnit", that.form.priceSettlementUnit); //计量单位（结算单位）
          param.append(
            "priceSettlementUnitprice",
            that.form.priceSettlementUnitprice
          ); //计量单价（订单单价）
          // param.append("projectSettlementClass",that.bulk.projectSettlementClass); //计费选项 大宗/非大宗

          //判断1大宗还是2非大宗
          if (that.bulk.projectSettlementClass == 1) {
            param.append("priceDeficitWay", that.form.priceDeficitWay); //亏吨计量方式
            param.append("priceDeficitValue", that.form.priceDeficitValue); //亏吨允许值
            param.append(
              "priceDeficitUnitprice",
              that.form.priceDeficitUnitprice
            ); //亏吨扣款标准
            param.append("priceRiseWay", that.form.priceRiseWay); //涨吨计量方式
            param.append("priceRiseValue", that.form.priceRiseValue); //涨吨允许值
            param.append("priceRiseUnitprice", that.form.priceRiseUnitprice); //涨吨扣款标准
          } else {
            param.append("priceDamageDeduct", that.form.priceDamageDeduct); //货损扣款
            param.append("priceOverdueDeduct", that.form.priceOverdueDeduct); //晚到扣款
            param.append("priceOtherDeduct", that.form.priceOtherDeduct); //其它扣款
          }

          //根绝showIndex判断是修改的提交还是新建的提交 shouIndex=2为修改的提交
          let url = "";
          if (this.showIndex == 2) {
            url = this.$api.Basics.editPrice;
            param.append("priceId", that.priceEditId); //合同IdpriceEditId
          } else {
            url = this.$api.Basics.newAddPrice;
          }
          // console.log('====新建===',that)
          this.$http.post(url, param, true).then(res => {
            if (res.data.code > 0) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success"
              });
              this.dialogFormVisible = false;
              this.getList();
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          });
        } else {
        }
      });
    },

    //判断显示订单单价还是运单单价
    unitPrice() {
      if (this.form.priceType == 1) {
        this.unitPriceFlag = true;
      } else {
        this.unitPriceFlag = false;
      }
    },
    // 弹窗选择关联项目
    screenBulk() {
      let bindProjectDataOne = this.bindProjectData.find(
        m => m.projectId == this.form.projectId
      );
      // console.log('-----',bindProjectDataOne,this.form.projectId)
      this.bulk = bindProjectDataOne;
      if (this.bulk.projectSettlementClass == 1) {
        this.bulkFlag = true;
      } else {
        this.bulkFlag = false;
      }
    },
    //加载下拉框数据
    bingProject() {
      this.$http
        .post(this.$api.Business.projectList, "", true)
        .then(res => {
          if (res.data.code == 1) {
            this.bindProjectData = res.data.data;
          }
          // console.log('=====', res.data.data)
        })
        .catch(err => {
          console.log("失败");
          this.$message({
            showClose: true,
            message: "失败",
            type: "error"
          });
        });
      //计费单位
      this.$http.post(this.$api.Basics.jifei, "", true).then(res => {
        // console.log(res, "jifei");
        this.Company = res.data.data;
      });
    },
    //搜索方法
    searchData() {
      this.page = 1;
      this.limit = 10;
      this.getList();
    },
    //新建项目弹窗关闭回调
    closeDialogNewProject() {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    //重置搜索
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.page = 1;
        this.limit = 10;
        this.formData.project = "";
        this.formData.price = "";
        this.getList();
      });
    },
    // 分页和加载数据方法
    getList() {
      var start = this.page;
      var end = this.limit;
      var url;
      url =
        this.$api.Basics.priceList +
        "?page=" +
        start +
        "&rows=" +
        end +
        "&project.projectName=" +
        this.formData.project +
        "&priceName=" +
        this.formData.price;
      console.log(url);
      this.$http
        .get(url, true)
        .then(res => {
          //表格数据
          res.data.data.list.forEach((item, index, arr) => {
            //价格类型
            item.projectName = item.project.projectName;
            item.priceType == 1
              ? (item.priceType = "货主订单价格")
              : item.priceType == 2
              ? (item.priceType = "车主运单")
              : (item.priceType = "");
            //计费选项
            item.project.projectSettlementClass == 1
              ? (item.projectSettlementClass = "大宗")
              : item.project.projectSettlementClass == 2
              ? (item.projectSettlementClass = "非大宗")
              : (item.projectSettlementClass = "");
            //亏吨计量方式
            item.priceDeficitWay == 1
              ? (item.priceDeficitWay = "亏吨允许比例")
              : item.priceDeficitWay == 2
              ? (item.priceDeficitWay = "亏吨允许范围")
              : (item.priceDeficitWay = "");
            //涨吨计量方式
            item.priceRiseWay == 1
              ? (item.priceRiseWay = "涨吨允许比例")
              : item.priceRiseWay == 2
              ? (item.priceRiseWay = "涨吨允许范围")
              : (item.priceRiseWay = "");
          });
          // console.log(res.data.data.list);
          this.list = res.data.data.list;
          // console.log('list2',res)
          this.total = res.data.data.total;
          this.$store.commit("getTableData", this.list);
        })
        .catch(err => {
          console.log("失败");
        });
    },
    //弹出新建价格表
    newContract(index) {
      this.showIndex = index;
      this.dialogFormVisible = true;
    },
    //修改合同点击数据回显
    editContract(index) {
      // 获取选中数据
      let projectIdList = this.$store.state.selectData;
      // console.log(projectIdList,'啦啦啦')
      this.showIndex = index;
      if (projectIdList.length == 1) {
        if (projectIdList[0].projectSettlementClass == "大宗") {
          this.bulkFlag = true;
        } else {
          this.bulkFlag = false;
        }
        this.priceEditId = projectIdList[0].priceId;
        this.dialogFormVisible = true;
        this.$http
          .get(
            this.$api.Basics.editPriceMsg,
            {
              params: {
                priceId: projectIdList[0].priceId
              }
            },
            true
          )
          .then(res => {
            if (res.data.code > 0) {
              this.form.projectId = res.data.data.projectId; //关联项目
              this.form.priceType = res.data.data.priceType; //价格表类型（1订单单价表[货主]、2运单单价表[车主]）
              this.form.priceName = res.data.data.priceName; //价格（合同）名称
              // var CompanyPrice;
              this.Company.map(item => {
                if (res.data.data.priceSettlementUnit == item.key) {
                  res.data.data.priceSettlementUnit = item.value;
                }
              });
              this.form.priceSettlementUnit = res.data.data.priceSettlementUnit; //计量单位（结算单位）[tms_config_settlement_unit表]
              this.form.priceSettlementUnitprice =
                res.data.data.priceSettlementUnitprice; //计量单价（订单单价）
              this.form.projectSettlementType =
                res.data.data.projectSettlementType; //费选项[也就是对应的结算业务]（1大宗、2快消；选择大宗时，有亏涨吨）
              if (this.bulkFlag) {
                this.form.priceDeficitWay = res.data.data.priceDeficitWay; //亏吨计量方式(1亏吨允许比例，2亏吨允许范围)--计费选项为大宗必填
                this.form.priceDeficitValue = res.data.data.priceDeficitValue; //亏吨允许值--计费选项为大宗必填
                this.form.priceDeficitUnitprice =
                  res.data.data.priceDeficitUnitprice; //亏吨扣款标准--计费选项为大宗必填
                this.form.priceRiseWay = res.data.data.priceRiseWay; //涨吨计量方式(1涨吨允许比例，2涨吨允许范围)--计费选项为大宗必填
                this.form.priceRiseValue = res.data.data.priceRiseValue; //涨吨允许值--计费选项为大宗必填
                this.form.priceRiseUnitprice = res.data.data.priceRiseUnitprice; //涨吨扣款标准--计费选项为大宗必填
              }
              this.form.priceDamageDeduct = res.data.data.priceDamageDeduct; //货损扣款--计费选项为非大宗选填
              this.form.priceOverdueDeduct = res.data.data.priceOverdueDeduct; //晚到扣款--计费选项为非大宗选填
              this.form.priceOtherDeduct = res.data.data.priceOtherDeduct; //其它扣款--计费选项为非大宗选填
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
              message: "失败",
              type: "error"
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择一个价格表修改",
          type: "error"
        });
        return false;
      }
    }
    // changeHide(value) {
    //   this.auditedData.auditedName[2].isShow = !this.auditedData.auditedName[2]
    //     .isShow;
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.bingProject();
    this.getList();
    //搜索数据
    this.$store.commit("getSingular", {
      options: this.options,
      isShow: false
    });
    //表格数据
    this.$store.commit("getTableData", this.tableData);
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