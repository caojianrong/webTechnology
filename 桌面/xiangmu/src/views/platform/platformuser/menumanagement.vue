<template>
  <div>
    <div class="userList">
      <div class="table_main">
        <div class="table_main_head">
          <div class="auditSolid">
            <div class="audiafter">筛选查询</div>
            <div class="auditheadright">
              <div class="senior_search" @click="displayOrnone">
                <i>^</i>&nbsp;&nbsp;收起筛选
              </div>
            </div>
          </div>
        </div>

        <div class="audit_search">
          <!-- 单行搜索引擎 -->
          <el-form ref="formData" :model="formData">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="5" :md="3" :lg="4" :xl="3">
                <el-form-item label prop="value">
                  <el-input placeholder="菜单名称" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
                <el-form-item label-width="0" prop="input">
                  <el-input placeholder="请输入你要查询的菜单" v-model="formData.input" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                <el-form-item label-width="0">
                  <el-button
                    style="width:100%"
                    size="medium"
                    type="primary"
                    @click="searchData()"
                  >查询</el-button>
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
          <div class="tab_operation" style="height:30px">
            <!-- <el-button class="reset reset_tab" type="primary" @click="newAddUser(1)">新增角色</el-button>
            <el-button class="reset reset_tab" type="primary" @click="modifyAddUser(2)">编辑角色</el-button>
            <el-button class="reset reset_tab" type="primary" @click="delUser()">删除角色</el-button>-->
          </div>
          <div class="list-box">
            <!-- 表单组件 -->
            <!-- <tabComp :tableHeader="auditedName" :tableData1="tableData"></tabComp> -->
            <!-- 表单组件结束 -->
          </div>
        </div>
      </div>

      <!-- 编辑弹框开始 -->
      <el-dialog
        width="500px"
        :title="activeName"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        @close="closeDialogNewProject"
      >
        <el-form
          :model="Rolepermissions"
          ref="Rolepermissions"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="菜单名称" prop="Name">
                    <el-input v-model="Rolepermissions.Name"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="URL" prop="Url">
                    <el-input v-model="Rolepermissions.Url"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="排序编号" prop="Sort">
                    <el-input v-model="Rolepermissions.Sort"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="状态" prop="Status">
                    <el-select v-model="Rolepermissions.Status">
                      <el-option
                        v-for="item in bindProjectData3"
                        :key="item.settlementUnitId"
                        :value="item.settlementUnitName"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="Rolepermissions.IsorNo"></el-input> -->
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div slot="footer" class="dialog-footer">
                    <el-form-item label-width="0">
                      <el-button class="subBtn" @click="dialogFormVisible = false" size="mini">取 消</el-button>
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
                      size="mini"
                      @click="submitForm('platform')"
                    >确 定</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 编辑弹框结束 -->
      <!-- 表格开始 -->
      <el-table :data="tableData" style="width: 100%;text-align:center">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ID }}</span>
          </template>
        </el-table-column>

        <el-table-column label="菜单名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.menuname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="层级" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.Hierarchy }}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.S_sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.IsorNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="Popup(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格结束 -->
    </div>
  </div>
</template>



<script>
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
export default {
  name: "menumanagement",
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    return {
      //编辑弹框显示与否
      EisShow: false,
      // 弹窗数据是什么内容
      activeName: "编辑菜单",
      // 弹窗下拉菜单权限
      bindProjectData3: [
        {
          settlementUnitName: "未启用",
          settlementUnitId: 0
        },
        {
          settlementUnitName: "启用",
          settlementUnitId: 1
        }
      ],
      //控制弹窗的显示隐藏
      dialogFormVisible: false,
      //编辑弹窗页面内的内容
      Rolepermissions: {
        Name: "",
        Url: "",
        Sort: "",
        Status: ""
      },
      formLabelWidth: "120px",
      companyDefault: "",
      formData: {
        input: ""
      },
      //表里面的内容
      tableData: [
        {
          ID: 1,
          menuname: "王小虎",
          Hierarchy: "1级",
          S_sort: 1,
          type: "按钮",
          IsorNo: "启用"
        },
        {
          ID: 1,
          menuname: "王小虎",
          Hierarchy: "1级",
          S_sort: 1,
          type: "按钮",
          IsorNo: "启用"
        },
        {
          ID: 1,
          menuname: "王小虎",
          Hierarchy: "1级",
          S_sort: 1,
          type: "按钮",
          IsorNo: "启用"
        },
        {
          ID: 1,
          menuname: "王小虎",
          Hierarchy: "1级",
          S_sort: 1,
          type: "按钮",
          IsorNo: "启用"
        }
      ],
      // 表头数据
      auditedName: [
        {
          tabTh: "ID",
          tabItem: "ID",
          isShow: true
        },
        {
          tabTh: "菜单名称",
          tabItem: "menuname",
          isShow: true
        },
        {
          tabTh: "层级",
          tabItem: "Hierarchy",
          isShow: true
        },
        {
          tabTh: "排序",
          tabItem: "S_sort",
          isShow: true
        },
        {
          tabTh: "类型",
          tabItem: "type",
          isShow: true
        },
        {
          tabTh: "状态",
          tabItem: "IsorNo",
          isShow: true
        },
        {
          tabTh: "操作",
          tabItem: "operation",
          isShow: true
        }
      ]
    };
  },
  methods: {
    //编辑弹窗
    Popup(index,row) {
      this.dialogFormVisible = true;
      this.Rolepermissions.Name=row.menuname
      this.Rolepermissions.Url=row.menuname
      this.Rolepermissions.Sort=row.S_sort
      this.Rolepermissions.Status=row.IsorNo
    },
    //弹窗关闭回调
    closeDialogNewProject() {
      this.$refs["Rolepermissions"].resetFields(); // this.$refs.adduserform.resetFields();
      this.$nextTick(() => {});
    },
    //重置
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.formData.input = "";
      });
    },
    displayOrnone() {
      //显示与隐藏
      this.isShow = !this.isShow;
    },
    newAddUser() {
      this.$router.push({ path: "/platform/platformuser/addmodifylist" });
    },
    modifyAddUser() {
      //编辑用户
      let selectlength = this.$store.state.selectData; //勾选的条数，下面做判断。只能勾选一个
      // console.log(selectlength[0], 222);
      if (selectlength.length < 1) {
        this.$message({
          message: "请选择你要编辑的用户",
          type: "warning"
        });
      } else if (selectlength.length > 1) {
        this.$message({
          message: "只能修改一个数据哦！",
          type: "warning"
        });
      } else if (selectlength.length == 1) {
        this.dialogFormVisible = true;
        this.activeName = "编辑用户";
        // console.log(this.Rolepermissions,"弹框里的内容")
        this.Rolepermissions = selectlength[0];
      }
    },
    searchData() {

    },
    delUser() {
      //删除操作
      let selectDellength = this.$store.state.selectData; //勾选的条数，下面做判断。只能勾选一个
      // console.log(selectlength[0], 222);
      if (selectDellength.length < 1) {
        this.$message({
          message: "请选择你要删除的用户",
          type: "warning"
        });
      } else if (selectDellength.length > 1) {
        this.$message({
          message: "您只可以删除一个用户哦！",
          type: "warning"
        });
      } else if ((selectDellength.length = 1)) {
        this.$confirm("你确定要删除此用户吗？", "提示", {
          confirmButtonText: "确定",

          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 编辑弹框确认
    submitForm() {
      this.dialogFormVisible = false;
    }
  },
  created() {},
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
.el-table /deep/ th,
.el-table /deep/ td {
  text-align: center;
}
.subBtn {
  width: 80px;
}
</style>