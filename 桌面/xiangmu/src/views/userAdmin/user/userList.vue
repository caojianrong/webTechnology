<!--  -->
<template>
  <div class="userList">
    <div class="table_main">
      <div class="table_main_head">
        <div class="auditSolid">
          <div class="audiafter">筛选查询</div>
          <div class="auditheadright">
            <div class="audited_down">
              <i class="el-icon-download"></i>
              导出信息
            </div>
            <!-- <div class="senior_search">高级检索>></div> -->
          </div>
        </div>
      </div>

      <div class="audit_search">
        <!-- 单行搜索引擎 -->
        <el-form ref="formData" :model="formData">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="5" :md="3" :lg="4" :xl="3">
              <el-form-item label prop="value">
                <el-select class="select_default" v-model="companyDefault" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
              <el-form-item label-width="0" prop="input">
                <el-input placeholder="请输入内容" v-model="formData.input" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
              <el-form-item label="创建时间" prop="value1">
                <el-date-picker
                  v-model="formData.value1"
                  :picker-options="pickerOptions0"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button style="width:100%" size="medium" type="primary" @click="searchData()">查询</el-button>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button
                  style="width:100%"
                  size="medium"
                  @click="resetData('formData')"
                  class="reset"
                >重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格组件 -->
      <div class="table_com">
        <div class="tab_operation">
          <el-button class="reset reset_tab" type="primary" @click="newAddUser(1)">新建用户</el-button>
          <el-button class="reset reset_tab" type="primary" @click="newAddUser(2)">修改用户</el-button>
          <el-button class="reset reset_tab" type="primary" @click="delUser()">删除用户</el-button>
        </div>
        <div class="list-box">
          <!-- 表单组件 -->
          <tabComp :tableHeader="auditedName" :tableData1="tableData"></tabComp>
          <!-- 表单组件结束 -->
        </div>
      </div>
    </div>

    <!-- 新建和修改用户弹窗 -->
    <el-dialog
      width="700px"
      :title="activeName"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialogNewProject"
    >
      <el-form :model="formUser" ref="formUser" label-width="100px" class="demo-ruleForm">
        <!--  :rules="rules" -->
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="用户名" prop="goodsName">
                  <el-input v-model="formUser.goodsName"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="姓名" prop="goodsName">
                  <el-input v-model="formUser.goodsName"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="手机号" prop="goodsName">
                  <el-input v-model="formUser.goodsName"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="邮箱地址" prop="email">
                  <el-input v-model="formUser.email"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="用户角色" prop="goodsClassName">
                <el-select v-model="formUser.goodsClassName" placeholder="请选择用户角色">
                  <el-option
                    v-for="(item) in bindProjectData2"
                    :label="item.goodsTypeName"
                    :key="item.goodsTypeCode"
                    :value="item.goodsTypeCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="登录密码" prop="goodsName">
                  <el-input v-model="formUser.goodsName"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="确认密码" prop="goodsName">
                  <el-input v-model="formUser.goodsName"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="是否启用" prop="goodsSettlementUnit">
                <el-select v-model="formUser.goodsSettlementUnit" placeholder="请选择">
                  <el-option
                    v-for="(item) in bindProjectData3"
                    :label="item.settlementUnitName"
                    :key="item.settlementUnitId"
                    :value="item.settlementUnitId==1?'启用':'禁止'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="24">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div slot="footer" class="dialog-footer">
                  <el-form-item label-width="0">
                    <el-button class="subBtn" @click="dialogFormVisible = false" size="medium">取 消</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label-width="0">
                  <el-button
                    class="subBtn"
                    type="primary"
                    size="medium"
                    @click="subMask('formUser')"
                  >确 定</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
export default {
  name: "userList",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    singularTable
  },
  data() {
    //这里存放数据
    return {
      // 弹窗数据
      activeName: "新建用户",
      bindProjectData2: [
        {
          goodsTypeName: "哈哈",
          goodsTypeCode: 1
        },
        {
          goodsTypeName: "嘿嘿",
          goodsTypeCode: 2
        }
      ],
      bindProjectData3: [
        {
          settlementUnitName: "启用",
          settlementUnitId: 1
        },
        {
          settlementUnitName: "禁用",
          settlementUnitId: 2
        }
      ],
      dialogFormVisible: false,
      formUser: {
        projectName: null,
        motGoodsTypeCode: null,
        goodsName: null,
        email: null,
        goodsSettlementUnit: null,
        goodsGrossWeight: null,
        goodsNetWeight: null,
        goodsVolume: null,
        goodsQty: null
      },
      formLabelWidth: "120px",
      companyDefault: "",
      // 时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },

      formData: {
        value1: "",
        value: "",
        input: ""
      },
      tableData: [
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   date: "2016-05-08",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        // {
        //   date: "2016-05-07",
        //   name: "王小虎",
        //   address: "启用"
        // }
      ],
      // 表头数据
      auditedName: [
        {
          tabTh: "用户名",
          tabItem: "date",
          isShow: true
        },
        {
          tabTh: "姓名",
          tabItem: "name",
          isShow: true
        },
        {
          tabTh: "角色",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "用户手机号",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "邮箱",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "添加时间",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "是否启用",
          tabItem: "address",
          isShow: true
        }
      ],
      options:[

      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //弹窗关闭回调
    closeDialogNewProject() {
      this.$refs["formUser"].resetFields(); // this.$refs.adduserform.resetFields();
      this.$nextTick(() => {});
    },
    //重置
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    newAddUser(indexFlag) {
      this.dialogFormVisible = true;
      if (indexFlag == 1) {
        this.activeName = "新建用户";
      } else {
        this.activeName = "修改用户";
      }
    },
    searchData(data) {
      alert("我有这个方法", data);
    },
    delUser() {
      alert("删除用户");
    },
    subMask() {
      alert("这里是模态框里面的内容");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$store, 555);
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