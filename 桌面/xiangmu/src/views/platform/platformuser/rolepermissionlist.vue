<template>
  <div>
    <div class="userList">
      <div class="table_main">
        <div class="table_main_head">
          <div class="auditSolid">
            <div class="audiafter">筛选查询</div>
            <div class="auditheadright">
              <div class="senior_search">
                <i>^</i>&nbsp;&nbsp;收起筛选
              </div>
            </div>
          </div>
        </div>
        <div class="audit_search">
          <!-- 单行搜索引擎 -->
          <el-form ref="formData" :model="formData" label-width="80px" size="mini">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="5" :md="3" :lg="4" :xl="3">
                <el-form-item label prop="value">
                  <el-select class="select_default" v-model="formData.roleshu" placeholder="角色所属">
                    <el-option
                      v-for="item in options_role"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="5" :md="3" :lg="4" :xl="3">
                <el-form-item label prop="value">
                  <el-select class="select_default" v-model="formData.rolename" placeholder="角色名称">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                <el-form-item label-width="0" size="mini">
                  <el-button style="width:100%" size="mini" type="primary" @click="searchData()">查询</el-button>
                </el-form-item>
              </el-col>

              <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                <el-form-item label-width="0">
                  <el-button
                    style="width:100%"
                    size="mini"
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
            <el-button class="reset reset_tab" type="primary" @click="newAddUser(1)">新增角色</el-button>
            <el-button class="reset reset_tab" type="primary" @click="modifyAddUser(2)">编辑角色</el-button>
            <el-button class="reset reset_tab" type="primary" @click="delUser()">删除角色</el-button>
          </div>
          <div class="list-box">
            <!-- 表单组件 -->
            <tabComp :tableHeader="auditedName" :tableData1="tableData"></tabComp>
            <!-- 表单组件结束 -->
          </div>
        </div>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="rows"
        @pagination="getList"
      />
    </div>
  </div>
</template>


<script>
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
export default {
  name: "rolepermissionlist",
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    return {
      //角色权限页面
      Rolepermissions: {
        roleId: "", //角色ID
        roleBelong: "", //角色所属
        roleName: "", //角色名称
        roleDesc: "", //备注
        //创建时间
        createTime: "",
        roleStatus: "" //是否启用
      },
      formLabelWidth: "120px",
      companyDefault: "",
      formData: {
        roleshu: "", //角色所属
        rolename: "", //角色名称
        value: "" //角色名称内容
      },
      //表里面的内容
      tableData: [],
      // 表头数据
      auditedName: [
        {
          tabTh: "角色ID",
          tabItem: "roleId",
          isShow: true
        },
        {
          tabTh: "角色所属",
          tabItem: "roleBelong",
          isShow: true
        },
        {
          tabTh: "角色名称",
          tabItem: "roleName",
          isShow: true
        },
        {
          tabTh: "备注",
          tabItem: "roleDesc",
          isShow: true
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "是否启用",
          tabItem: "roleStatus",
          isShow: true
        }
      ],
      //角色名称
      options: [
        {
          value: "管理员",
          label: "管理员",
          id: 1
        },
        {
          value: "货主",
          label: "货主",
          id: 2
        },
        {
          value: " 车主",
          label: " 车主",
          id: 3
        },
        {
          value: " 财务",
          label: " 财务",
          id: 4
        }
      ],
      //角色所属
      options_role: [
        {
          value: "平台",
          label: "平台",
          id: 1
        },
        {
          value: "货主",
          label: "货主",
          id: 2
        },
        {
          value: "车主",
          label: "车主",
          id: 3
        }
      ],
      page: 1, //页数
      rows: 10, //每页条数
      total: 0 //数据总条数
    };
  },
  methods: {
    //弹窗关闭回调
    closeDialogNewProject() {
      this.$refs["Rolepermissions"].resetFields(); // this.$refs.adduserform.resetFields();
      this.$nextTick(() => {});
    },
    //重置
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.page = 1;
        this.rows = 10;
        (this.formData.rolename = ""), (this.formData.roleshu = "");
        this.getList();
      });
    },
    //搜索
    searchData() {
      this.page = 1;
      this.rows = 10;
      this.getList();
    },
    //主函数
    getList() {
      //角色所属
      var roleBelong =
        this.formData.roleshu == "平台"
          ? 1
          : this.formData.roleshu == "货主"
          ? 2
          : this.formData.roleshu == "车主"
          ? 3
          : "";
      //角色名称
      var roleName = this.formData.rolename;
      var page = this.page;
      var rows = this.rows;
      var url;
      url =
        this.$api.PlatformUser.roleList +
        "?page=" +
        page +
        "&rows=" +
        rows +
        "&roleBelong=" +
        roleBelong +
        "&roleName=" +
        roleName;
      this.$http.get(url, true).then(res => {
        res.data.data.list.forEach((item, index, arr) => {
          //启用状态
          item.roleStatus == 0
            ? (item.roleStatus = "未启用")
            : item.roleStatus == 1
            ? (item.roleStatus = "启用")
            : "";
          item.roleBelong == 1
            ? (item.roleBelong = "平台")
            : item.roleBelong == 2
            ? (item.roleBelong = "货主")
            : item.roleBelong == 3
            ? (item.roleBelong = "车主")
            : "";
        });
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    //添加跳转页面
    newAddUser() {
      this.$router.push({
        path: "/platform/platformuser/addmodifylist",
        query: { dataFlag: "ADD" }
      });
    },
    //修改
    modifyAddUser() {
      let modifyRole = this.$store.state.selectData; //勾选的条数，下面做判断。只能勾选一个
      if (modifyRole.length > 1 || modifyRole.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个角色修改",
          type: "error"
        });
        return false;
      }
      this.RoleId = modifyRole[0].roleId;

      let param = new URLSearchParams();
      param.append("roleId", this.RoleId);
      //需要传递给修改页面的一条数据
      let modifydatarole = {};

      this.$http
        .get(this.$api.PlatformUser.ModifyID + "?roleId=" + this.RoleId, true)
        .then(res => {
          this.$router.push({
            path: "/platform/platformuser/addmodifylist",
            query: { dataFlag: "MODIFY1", roledata: res.data.data }
          });
        });
    },
    //删除
    delUser() {
      //删除操作
      let DelRoleList = this.$store.state.selectData; //勾选的条数，下面做判断。只能勾选一个
      if (DelRoleList.length == 0 || DelRoleList.length < 0) {
        this.$message({
          showClose: true,
          message: "请选择至少一项进项删除",
          type: "error"
        });
        return false;
      }
      let RoleListArray;
      DelRoleList.forEach((item, index) => {
        RoleListArray = item.roleId;
      });
      let param = new URLSearchParams();
      param.append("roleId", RoleListArray);

      this.$confirm("确定删除该角色吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.PlatformUser.DelRole, param, true)
            .then(res => {
              // console.log(res);
              if (res.data.code == 0) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.getList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      // console.log(param, 111);
    },
    //加载角色列表
    rolesListData() {
      this.$http
        .get(this.$api.PlatformUser.roleList, true)
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.log("失败");
        });
    }
  },
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.rolesListData();
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