<!--  -->
<template>
  <div class="materiel">
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
              <el-form-item label="货物名称" prop="input">
                <el-input placeholder="请输入内容" v-model="formData.goods" clearable></el-input>
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
          <el-button
            type="primary"
            v-for="(item,index) in goodsTitle"
            :key="index"
            @click="showModel(index)"
            class="reset reset_tab"
          >{{item}}</el-button>
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

      <el-dialog
        width="760px"
        :title="activeName"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        @close="closeDialogNewProject"
        class="myDialog"
      >
        <el-form
          :model="formMateriel"
          :rules="rules"
          ref="formMateriel"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="绑定项目" prop="projectId">
                  <el-select
                    v-model="formMateriel.projectId"
                    placeholder="请选择项目"
                    @input="onchangeID(formMateriel.projectId)"
                    style="width:250px"
                  >
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
                <div class="grid-content bg-purple">
                  <el-form-item label="货物名称" prop="goodsName">
                    <el-input v-model="formMateriel.goodsName" placeholder="货物名称 例如:轮胎、刹车片"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="货物类型" prop="goodsType">
                  <!-- <el-input v-model="formMateriel.goodsType" placeholder="货物类型 例如:物品、配件"></el-input> -->
                  <el-select v-model="formMateriel.goodsType" placeholder="请选择货物类型">
                    <el-option
                      v-for="item in bindProjectData4"
                      :label="item.value"
                      :key="item.key"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="货物分类" prop="goodsClass">
                  <el-select v-model="formMateriel.goodsClass" placeholder="请选择货物分类">
                    <el-option
                      v-for="item in bindProjectData2"
                      :label="item.value"
                      :key="item.key"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="计费量单位" prop="goodsSettlementUnit" style="height: 0px;">
                  <el-select v-model="formMateriel.goodsSettlementUnit" placeholder="请选择计费量单位">
                    <el-option
                      v-for="item in bindProjectData3"
                      :label="item.value"
                      :key="item.key"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple my-append">
                <el-form-item label="物料毛重" prop="goodsGrossWeight">
                  <el-input v-model="formMateriel.goodsGrossWeight" placeholder="请选输入物料毛重">
                    <template slot="append">千克</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple my-append">
                <el-form-item label="物料净重" prop="goodsNetWeight">
                  <el-input v-model="formMateriel.goodsNetWeight" placeholder="请选输入物料净重">
                    <template slot="append">千克</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple my-append1">
                <el-form-item label="物料体积" prop="goodsVolume">
                  <el-input v-model="formMateriel.goodsVolume" placeholder="请选输入物料体积">>
                    <template slot="append">立方米</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="总件数" prop="goodsQty" placeholder="请选输入总件数">
                  <el-input v-model="formMateriel.goodsQty">
                    <template slot="append">件</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" size="medium" @click="subMask('formMateriel')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
export default {
  name: "materiel",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    //这里存放数据
    return {
      //物料毛重净重单位
      maojingdanwei:'',
      //表单验证   自定义验证validator
      rules: {
        //项目ID
        projectId: [
          {
            required: true,
            message: "绑定项目不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //货物名称
        goodsName: [
          {
            required: true,
            message: "货物名称不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //货物类型
        goodsType: [
          {
            required: true,
            message: " 货物类型不能为空",
            trigger: ["blur", "change"]
          }
        ],
        //货物分类
        goodsClass: [
          {
            required: true,
            message: "货物分类不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //计费量单位
        goodsSettlementUnit: [
          {
            required: true,
            message: "计费量单位不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //物料毛重
        goodsGrossWeight: [
          {
            required: true,
            message: " 货物毛重不能为空",
            trigger: ["blur", "change"]
          },
           {
            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,3})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,3})$)|^(([1-9]+)$)/g,
            message: "此处为数字，最多保留三位小数"
          }
          // {
          //   pattern: /^[0-9]*$/g,
          //   message: "请输入有效数字"
          // }
        ],
        //物料净重
        goodsNetWeight: [
          {
            required: false,
            message: "货物净重不能为空 ",
            trigger: ["blur", "change"]
          },
           {
            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,3})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,3})$)|^(([1-9]+)$)/g,
            message: "此处为数字，最多保留三位小数"
          }
          // {
          //   pattern: /^[0-9]*$/g,
          //   message: "请输入有效数字"
          // }
        ],
        //物料体积
        goodsVolume: [
          {
            required: false,
            message: "货物体积不能为空 ",
            trigger: ["blur", "change"]
          },
           {
            pattern: /^(([^0][0-9]+|0)\.([0-9]{1,3})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,3})$)|^(([1-9]+)$)/g,
            message: "此处为数字，最多保留三位小数"
          }
          // {
          //   pattern: /^[0-9]*$/g,
          //   message: "请输入有效数字"
          // }
        ]
        // //总件数
        // goodsQty: [
        //   {
        //     required: true,
        //     message: "总件数不能为空 ",
        //     trigger: ["blur", "change"]
        //   },
        //   {
        //     pattern: /^[0-9]*$/g,
        //     message: "请输入有效数字"
        //   }
        // ]
      },
      // 分页数据
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
      // 限制时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      //搜索数据
      formData: {
        project: "", //项目名称
        goods: "", //货物名称
        value1: "",
        value: "",
        input: ""
      },
      // 表头数据
      auditedName: [
        {
          tabTh: "物料ID",
          tabItem: "goodsId",
          isShow: true
        },
        {
          tabTh: "项目名称",
          tabItem: "projectId",
          isShow: true
        },
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
          tabTh: "计费量单位",
          tabItem: "goodsSettlementUnit",
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
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true
        }
      ],
      value1: "",
      input: "",
      options: [
        {
          value: 1,
          label: "项目名称"
        },
        {
          value: 2,
          label: "货物名称"
        }
      ],
      value: "",
      activeName: "first",
      input2: "",
      dialogFormVisible: false,
      //新增修改数据的表单数据
      formMateriel: {
        //项目ID
        projectId: "",
        //货物名称
        goodsName: "",
        //货物类型
        goodsType: "",
        //货物分类
        goodsClass: "",
        //计费量单位
        goodsSettlementUnit: "",
        //物料毛重
        goodsGrossWeight: "",
        //物料净重
        goodsNetWeight: "",
        //物料体积
        goodsVolume: "",
        //总件数
        goodsQty: ""
      },

      formLabelWidth: "120px",
      goodsTitle: ["新建物料", "修改物料", "删除物料"],
      showIndex: "",
      //修改时，物料ID
      modifywuliaoID: "",
      //新建物料时绑定项目ID
      projectID: "",
      //页面记载时渲染货物分类
      goodsClass: "",
      // 绑定项目下拉数据
      bindProjectData: [],
      // 货物分类下拉数据
      bindProjectData2: [],
      // 计费量单位下拉数据
      bindProjectData3: [],
      // 货物类型
      bindProjectData4: [],
      // 提交需要的参数
      proCode: "",
      proName: "",
      proFlag: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监听formMateriel.projectName变化获取code和name参数
    "formMateriel.projectName": function(val) {
      if (val) {
        console.log("监听" + val);
        let bindProjectDataOne = this.bindProjectData.find(
          m => m.projectId == val
        );
        this.proCode = bindProjectDataOne.projectCode;
        this.proName = bindProjectDataOne.projectName;
        this.proFlag = false;
      }
    }
  },
  //方法集合
  methods: {
    //检测绑定项目ID
    onchangeID(data) {
      // console.log(data, "检测绑定项目ID");
      this.projectID = data;
    },
    //确认按钮方法
    subMask(formDataRef) {
      var that = this;
      //0为新建
      var goodsSettlementUnit;
      if (this.showIndex == 0) {
        this.$refs[formDataRef].validate(valid => {
          if (valid) {
            // console.log(this.formMateriel, "新建项目提交的数据");
            var param = new URLSearchParams();
            param.append("projectId", that.formMateriel.projectId); //项目ID
            param.append("goodsName", that.formMateriel.goodsName); //货物名称
            param.append("goodType", that.formMateriel.goodsType); //货物类型Code
            param.append("goodsClass", that.formMateriel.goodsClass); //货物分类ID
            
            this.bindProjectData3.map(item=>{
              if(that.formMateriel.goodsSettlementUnit==item.value){
                goodsSettlementUnit=item.key
              }
            })
            param.append(
              "goodsSettlementUnit",
              goodsSettlementUnit
            ); //计费量单位
            param.append(
              "goodsGrossWeight",
              that.formMateriel.goodsGrossWeight
            ); //物料毛重
            param.append("goodsNetWeight", that.formMateriel.goodsNetWeight); //	物料净重
            param.append("goodsVolume", that.formMateriel.goodsVolume); //物料体积
            param.append("goodsQty", that.formMateriel.goodsQty); //总件数
            this.$http
              .post(this.$api.Basics.newAddMateriel, param, true)
              .then(res => {
                console.log(res, "新建项目");
                if (res.data.code == 1) {
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
            console.log(valid);
          }
        });
      } else if (this.showIndex == 1) {
        let projectIdList = this.$store.state.selectData;
        this.$refs[formDataRef].validate(valid => {
          if (valid) {
            var param = new URLSearchParams();
            param.append("goodsId", this.modifywuliaoID); //物料ID
            param.append("projectId", this.projectID); //项目ID

            param.append("goodsName", that.formMateriel.goodsName); //货物名称
            param.append("goodType", that.formMateriel.goodsType); //货物类型Code
            param.append("goodsClass", that.formMateriel.goodsClass); //货物分类ID
             this.bindProjectData3.map(item=>{
              if(that.formMateriel.goodsSettlementUnit==item.value){
                goodsSettlementUnit=item.key
              }
            })
            param.append(
              "goodsSettlementUnit",
              goodsSettlementUnit
            ); //计费量单位
            param.append(
              "goodsGrossWeight",
              that.formMateriel.goodsGrossWeight
            ); //物料毛重
            param.append("goodsNetWeight", that.formMateriel.goodsNetWeight); //	物料净重
            param.append("goodsVolume", that.formMateriel.goodsVolume); //物料体积
            param.append("goodsQty", that.formMateriel.goodsQty); //总件数
            this.$http
              .post(this.$api.Basics.editMateriel, param, true)
              .then(res => {
                // console.log(res, "这里是修改数据");
                if (res.data.code == 1) {
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message({
                    showClose: true,
                    message: "修改失败",
                    type: "error"
                  });
                }
              });
          } else {
            console.log(valid);
          }
        });
      }
    },
    // 点击新建/修改/删除物料等弹窗显示
    showModel(index) {
      let projectIdList = this.$store.state.selectData;
      this.showIndex = index;
      // console.log(index, "此处判断是新增还是修改0增1修2删");

      if (index == 0) {
        this.dialogFormVisible = true;
        this.activeName = "新建物料";
      } else if (index == 1) {
        this.activeName = "修改物料";
        if (projectIdList.length == 1) {
          // console.log(projectIdList,555)

          // 修改物料回显接口
          let param = new URLSearchParams();
          param.append("goodsId", projectIdList[0].goodsId);
          this.$http
            .post(this.$api.Basics.editMaterielMsg, param, true)
            .then(res => {
              this.modifywuliaoID = res.data.data.goodsId;
              // console.log(res.data.data.goodsId, "这里是编辑回显数据");
              if (res.data.code == 1) {
                //绑定项目判断
                var projectId;
                this.bindProjectData.map(item => {
                  if (res.data.data.projectId == item.projectId) {
                    projectId = item.projectName;
                  }
                });

                //判断货物分类
                var goodsClass;
                this.bindProjectData2.map(item => {
                  if (res.data.data.goodsClass == item.projectId) {
                    goodsClass = item.projectName;
                  }
                });
                this.projectID = res.data.data.projectId;
                // console.log(projectId,"要修改的数据绑定ID",res.data.data.projectId)
                // console.log(goodsClass, "货物分类 ");
                //绑定项目
                this.formMateriel.projectId = projectId;
                //货物名称
                this.formMateriel.goodsName = res.data.data.goodsName;
                //货物类型
                this.formMateriel.goodsType = res.data.data.goodType;
                //货物分类
                this.formMateriel.goodsClass =
                  goodsClass || res.data.data.goodsClass;
                //计费量单位
                this.bindProjectData3.map(item=>{
                  if(res.data.data.goodsSettlementUnit==item.key){
                    res.data.data.goodsSettlementUnit=item.value
                  }
                })
                this.formMateriel.goodsSettlementUnit =
                  res.data.data.goodsSettlementUnit;
                this.maojingdanwei=res.data.data.goodsSettlementUnit;
                //物料毛重
                this.formMateriel.goodsGrossWeight =
                  res.data.data.goodsGrossWeight;
                //物料净重
                this.formMateriel.goodsNetWeight = res.data.data.goodsNetWeight;
                //物料体积
                this.formMateriel.goodsVolume = res.data.data.goodsVolume;
                //总件数
                this.formMateriel.goodsQty = res.data.data.goodsQty;
                this.dialogFormVisible = true;
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        } else {
          this.$message({
            showClose: true,
            message: "请选择一个物料修改",
            type: "error"
          });
          return false;
        }
      } else if (index == 2) {
        this.activeName = "删除项目";
        if (projectIdList.length == 0) {
          this.$message({
            showClose: true,
            message: "请选择至少一个项目进项删除",
            type: "error"
          });
          return false;
        }

        let goodsIds;
        projectIdList.forEach((item, index) => {
          goodsIds = item.goodsId;
        });

        let param = new URLSearchParams(); //传递参数
        param.append("goodsId", goodsIds);

        this.$confirm("确定删除该物料吗", "操作", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http
              .post(this.$api.Basics.delMateriel, param, true)
              .then(res => {
                // console.log(res.data);
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
      }
    },
    //搜索方法
    searchData() {
      this.page = 1;
      this.limit = 10;
      this.getList();
    },
    // 重置方法
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.page = 1;
        this.limit = 10;
        this.getList();
      });
    },
    //新建项目弹窗关闭回调
    closeDialogNewProject() {
      this.$refs["formMateriel"].resetFields(); // this.$refs.adduserform.resetFields();
      this.proCode = null;
      this.proName = null;
      this.proFlag = true;
      this.$nextTick(() => {});
    },
    // 分页和加载数据方法
    getList() {
      var start = this.page;
      var end = this.limit;
      var url;
      url =
        this.$api.Basics.materiel +
        "?page=" +
        start +
        "&rows=" +
        end +
        "&project.projectName=" +
        this.formData.project +
        "&goodsName=" +
        this.formData.goods;

      this.$http.get(url, true).then(res => {
        // console.log(res, "获取物料列表");
        if (res.data.code == 1) {
          res.data.data.list.map(item => {
            item.projectId = item.project.projectName;
          });
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          this.$store.commit("getTableData", this.list);
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "error"
          });
        }
      });
    },

    //获取下拉菜单数据方法
    select() {
      //绑定项目
      this.$http.post(this.$api.Basics.addwuliaotype, "", true).then(res => {
        // console.log(res, "绑定项目下拉框");
        this.bindProjectData = res.data.data;
      });
      //货物分类
      this.$http.post(this.$api.Basics.materietype, "", true).then(res => {
        // console.log(res, "获取货物分类下拉菜单数据");
        this.bindProjectData2 = res.data.data;
      });
      
      //计费量单位
      this.$http.post(this.$api.Basics.jifei, "", true).then(res => {
        // console.log(res, "计费量单位");
        this.bindProjectData3 = res.data.data;
      });
       //货物类型
       this.$http.post(this.$api.Basics.wuliaotype, "", true).then(res => {
        console.log(res, "货物类型");
        this.bindProjectData4 = res.data.data;
      });
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
    this.select();
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
.el-row {
  margin-bottom: 20px;
}
.subBtn {
  width: 240px;
  margin: 0 auto;
  display: block;
}
.el-select {
  width: 250px;
}
.my-append >>> .el-input-group__append{
  padding-left: 13px;
  padding-right: 13px;
}

.my-append1 >>> .el-input-group__append{
  padding-left: 6px;
  padding-right: 6px;
}
</style>