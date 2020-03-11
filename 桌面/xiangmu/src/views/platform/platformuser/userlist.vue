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
          <el-form ref="formData" :model="formData">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="5" :md="3" :lg="4" :xl="3">
                <el-form-item label prop="value">
                  <el-input placeholder="用户姓名" v-model="formData.person" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
                <el-form-item
                  label-width="0"
                  prop="value"
                  :rules="[{pattern: /^1[34578]\d{9}$/g,message:'手机号格式错误'}]"
                >
                  <el-input placeholder="请输入手机号" v-model="formData.value" clearable></el-input>
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
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="newAddUser(1)">新增用户</el-button>

            <el-button class="reset reset_tab" type="primary" @click="modifyAddUser(2)">编辑用户</el-button>
            <el-button class="reset reset_tab" type="primary" @click="delUser()">删除用户</el-button>
          </div>
          <div class="list-box">
            <!-- 表单组件 -->
            <tabComp :tableHeader="auditedName" :tableData1="tableData"></tabComp>
            <!-- 表单组件结束 -->
          </div>
        </div>
      </div>

      <!-- 新建和修改用户弹窗开始 -->
      <el-dialog
        width="700px"
        :title="activeName"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        @close="closeDialogNewProject"
      >
        <el-form
          :model="platform"
          ref="platform"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-row :gutter="20">
            <!-- <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="platform.userName" placeholder="用户名为手机号"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>-->
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="姓名" prop="realName">
                    <el-input v-model="platform.realName" placeholder="请输入用户姓名"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12" v-if="Shippershu">
              <div class="grid-content bg-purple">
                <el-form-item label="角色所属" prop="roleBelong">
                  <el-select v-model="platform.roleBelong" placeholder="角色所属" @change="roleIdBelong">
                    <el-option
                      v-for="(item) in roleshuselect"
                      :label="item.flagDesc"
                      :key="item.flag"
                      :value="item.flagDesc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="角色" prop="roleName">
                    <el-select v-model="platform.roleName" :disabled="jinyong" placeholder="请选择用户角色">
                      <el-option
                        v-for="(item) in userselect"
                        :label="item.roleName"
                        :key="item.roleId"
                        :value="item.roleName"
                      ></el-option>
                    </el-select>
                    <!-- <el-input placeholder="请输入用户角色" v-model="platform.roleName" clearable></el-input> -->
                  </el-form-item>
                </div>
              </div>
            </el-col>
            
            <el-col :span="12" v-if="ShipperGroupFlag">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="所属机构" prop="groupCompany">
                    <el-select v-model="platform.groupCompany" placeholder="请选择用户所属机构">
                      <el-option
                        v-for="(item) in mechanism"
                        :label="item.value"
                        :key="item.key"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="手机号" prop="userMobile">
                    <el-input v-model="platform.userMobile" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="登录密码" prop="userLoginPwd">
                    <el-input v-model="platform.userLoginPwd" placeholder="请填写登录密码"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="platform.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否启用" prop="userStatus">
                    <el-select v-model="platform.userStatus" placeholder="是否启用权限">
                      <el-option
                        v-for="(item) in bindProjectData3"
                        :label="item.settlementUnitName"
                        :key="item.settlementUnitId"
                        :value="item.settlementUnitName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" size="medium" @click="submitForm('platform')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新建和修改用户弹窗结束 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="limit"
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
  name: "shipperbill",
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    return {
      // 弹窗数据
      activeName: "新增用户",
      //权限是否启用
      bindProjectData3: [
        {
          settlementUnitName: "未启用",
          settlementUnitId: 0
        },
        {
          settlementUnitName: "启用",
          settlementUnitId: 3
        }
      ],
      //平台端角色的初始禁用
      jinyong:true,
      ShipperGroup: null, //货主所属机构
      flag: null, //当角色所属为货主时(登陆角色为货主时)
      ShipperGroupFlag: true, //角色所属机构(当是货主时不显示)
      Shippershu: true, //角色所属(当是货主时不显示)
      //所属机构
      mechanism: [],
      UserIDdan: null,
      //弹框的显示隐藏
      dialogFormVisible: false,
      //表格里面每一条数据的信息
      platform: {
        // //用户名
        // userName: "",
        //姓名
        realName: "",
        //角色
        roleName: "",
        //角色所属
        roleBelong: "",
        //所属机构
        groupCompany: "",
        //登录密码
        userLoginPwd: "",
        //手机号
        userMobile: "",
        //邮箱
        email: "",
        date: "",
        //用户权限
        userStatus: ""
      },
      formLabelWidth: "120px",
      //搜索需要的数据
      formData: {
        person: "", //承运人
        value: "", //内容
        role: "" //用户角色
      },
      //表里面的内容
      tableData: [],
      //表里面的内容待处理
      list: {},
      // 表头数据
      auditedName: [
        // {
        //   tabTh: "用户名",
        //   tabItem: "userName",
        //   isShow: true,
        //   id: 1
        // },
        {
          tabTh: "姓名",
          tabItem: "realName",
          isShow: true,
          id: 2
        },
        {
          tabTh: "角色",
          tabItem: "roleName",
          isShow: true,
          id: 3
        },
        {
          tabTh: "角色所属",
          tabItem: "roleBelong",
          isShow: true,
          id: 4
        },
        {
          tabTh: "货主名称",
          tabItem: "groupCompany",
          isShow: true,
          id: 5
        },
        {
          tabTh: "手机号",
          tabItem: "userMobile",
          isShow: true,
          id: 7
        },
        {
          tabTh: "邮箱",
          tabItem: "email",
          isShow: true,
          id: 8
        },
        {
          tabTh: "添加时间",
          tabItem: "createTime",
          isShow: true,
          id: 9
        },
        {
          tabTh: "是否启用",
          tabItem: "userStatus",
          isShow: true,
          id: 10
        }
      ],
      //选择搜索条件
      options: [
        {
          value: "承运人",
          label: "承运人"
        },
        {
          value: "车牌号",
          label: "车牌号"
        },
        {
          value: " 车主电话",
          label: " 车主电话"
        }
      ],
      userselect: [], //新增用户时角色下拉菜单
      roleshuselect: [], //新增时角色所属下拉(只存在平台端)
      //表单验证
      rules: {
        userName: [
          // {
          //   required: true,
          //   message: "用户名不能为空",
          //   trigger: ["blur", "change"]
          // },
          {
            pattern: /^1[34578]\d{9}$/g,
            message: "用户名为您的手机号"
          }
        ],
        realName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        roleName: [
          {
            required: true,
            message: "角色不能为空",
            trigger: ["blur", "change"]
          }
        ],
        roleBelong: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        groupCompany: [
          {
            required: true,
            message: "货主名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        userLoginPwd: [
          {
            required: true,
            message: "请输入登陆密码",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 15,
            message: "密码长度为6~15个字符之间"
          }
        ],
        userMobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1[34578]\d{9}$/g,
            message: "请输入正确的手机号"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,
            message: "请输入正确的邮箱"
          }
        ],
        date: [{ required: true, message: "", trigger: ["blur", "change"] }],
        userStatus: [
          {
            required: true,
            message: "是否启用权限",
            trigger: ["blur", "change"]
          }
        ]
      },
      page: 1, //页数
      limit: 10, //每页条数
      total: 0 //数据总条数
    };
  },
  methods: {
    //获取平台角色所属
    roleIdBelong(event){
      
         console.log(event,555)
        if(event=="平台"){
          this.ShipperGroup=1;
          this.getList()
          this.jinyong=false
        // this.
      }else if(event=="货主"){
        this.ShipperGroup=2
        this.getList()
        this.jinyong=false
      }
     
     
    },
    //弹窗关闭回调
    closeDialogNewProject() {
      //表单的重置，每次点击 都是一个完整的表单
      this.$refs["platform"].resetFields(); // this.$refs.adduserform.resetFields();
      this.$nextTick(() => {});
    },
    //重置
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.page = 1;
        this.limit = 10;
        this.getList();
        this.formData.person = "";
        this.formData.value = "";
        this.formData.role = "";
      });
    },
    //新增用户
    newAddUser() {
      this.activeName = "新增用户";
      this.dialogFormVisible = true;
    },
    //编辑用户
    modifyAddUser() {
      let modifyUser = this.$store.state.selectData; //勾选的条数，下面做判断。只能勾选一个
      if (modifyUser.length > 1 || modifyUser.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进项修改",
          type: "error"
        });
        return false;
      }
      this.activeName = "编辑用户";
      this.UserId = modifyUser[0];
      this.$http
        .get(
          this.$api.PlatformUser.UserList + "?userId=" + modifyUser[0].userId,
          true
        )
        .then(res => {
          //需要修改的哪一行数据
          var data = res.data.data.list[0];
          // console.log(data.flag, 111);
          if (this.flag == 2) {
            //货主
            this.ShipperGroupFlag = false;
            this.Shippershu = false;
            this.UserIDdan = data.userId;
            // this.platform.userName = data.userName;
            this.platform.realName = data.realName;
            this.platform.roleName = data.roleName;
            // this.platform.groupCompany = data.groupCompany || "睿博龙";
            // this.platform.roleBelong = "平台";

            this.platform.userMobile = data.userMobile;
            this.platform.userLoginPwd = data.userLoginPwd;
            this.platform.email = data.email;
            this.platform.userStatus =
              data.userStatus == 0
                ? "未启用"
                : data.userStatus == 3
                ? "启用"
                : "";
            this.dialogFormVisible = true;
          } else {
            this.UserIDdan = data.userId;
            // this.platform.userName = data.userName;
            this.platform.realName = data.realName;
            this.platform.roleName = data.roleName;
            this.platform.groupCompany = data.groupCompany;
            this.platform.roleBelong = data.flag == 2 ? "货主" : "平台";
            this.platform.userMobile = data.userMobile;
            this.platform.userLoginPwd = data.userLoginPwd;
            this.platform.email = data.email;
            this.platform.userStatus =
              data.userStatus == 0
                ? "未启用"
                : data.userStatus == 3
                ? "启用"
                : "";
            this.dialogFormVisible = true;
          }
        });
    },
    //搜索
    searchData() {
      this.page = 1;
      this.limit = 10;
      this.getList();
    },
    //删除操作
    delUser() {
      let DelUserList = this.$store.state.selectData;
      if (DelUserList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择至少一项进项删除",
          type: "error"
        });
        return false;
      }
      let UserListArray;
      DelUserList.forEach((item, index) => {
        UserListArray = item.userId;
      });
      let param = new URLSearchParams();
      param.append("userId", UserListArray);
      this.$confirm("确定删除该用户吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.PlatformUser.DelUser, param, true)
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
    },
    //增加/修改用户操作
    submitForm() {
      // console.log(
      //   this.platform.roleBelong,
      //   this.platform.groupCompany,
      //   this.platform.roleName
      // );
      this.$refs["platform"].validate(valid => {
        // console.log(valid);
        if (!valid) {
          return;
        } else {
          let _this = this;
          //模态框里面添加和修改
          //定义所属机构、角色、角色所属三个变量进行循环赋值
          var groupId, roleId, flag;
          //所属机构
          this.mechanism.map(item => {
            if (this.platform.groupCompany == item.value) {
              groupId = item.key;
            }
          });
          //角色
          this.userselect.map(item => {
            if (this.platform.roleName == item.roleName) {
              roleId = item.roleId;
            }
          });
          //角色所属
          this.roleshuselect.map(item => {
            if (this.platform.roleBelong == item.flagDesc) {
              flag = item.flag;
            }
          });
          if (this.activeName == "新增用户") {
            this.dialogFormVisible = true;
            //新增数据创建的一个对象
            let userListAdd = new URLSearchParams();
            //机构、用户名、手机号。登录密码。是否启用、用户姓名、邮箱。角色ID

            //所属机构
            userListAdd.append("groupId",this.flag==2?this.ShipperGroup: groupId);
            // //用户名
            // userListAdd.append("userName", this.platform.userName);
            //用户姓名
            userListAdd.append("realName", this.platform.realName);
            //角色
            userListAdd.append("roleId", roleId);
            //角色所属
            userListAdd.append("flag", this.flag == 2 ? this.flag : flag);
            //手机号
            userListAdd.append("userMobile", this.platform.userMobile);
            //邮箱
            userListAdd.append("email", this.platform.email);
            //登录密码
            userListAdd.append("userLoginPwd", this.platform.userLoginPwd);
            //是否启用
            userListAdd.append(
              "userStatus",
              this.platform.userStatus == "未启用"
                ? 0
                : this.platform.userStatus == "启用"
                ? 3
                : ""
            );
            _this.$http
              .post(_this.$api.PlatformUser.AddUser, userListAdd, true)
              .then(res => {
                // console.log(res);
                if (res.data.code != 1) {
                  this.$message({
                    showClose: true,
                    message: "手机号已重复",
                    type: "error"
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  //重新获取用户列表
                  this.getList();
                }
              });
          } else if (this.activeName == "编辑用户") {
            //修改开始
            let userListModify = new URLSearchParams();
            //所属机构
            userListModify.append("groupId",this.flag==2?this.ShipperGroup: groupId);
            // //用户名
            // userListModify.append("userName", this.platform.userName);
            //用户姓名
            userListModify.append("realName", this.platform.realName);
            //角色
            userListModify.append("roleId", roleId);
            //角色所属
            userListModify.append("flag", this.flag == 2 ? this.flag : flag);
            //手机号
            userListModify.append("userMobile", this.platform.userMobile);
            //邮箱
            userListModify.append("email", this.platform.email);
            //登录密码
            userListModify.append("userLoginPwd", this.platform.userLoginPwd);
            //是否启用
            userListModify.append(
              "userStatus",
              this.platform.userStatus == "未启用"
                ? 0
                : this.platform.userStatus == "启用"
                ? 3
                : ""
            );
            //单行用户id
            userListModify.append("userId", this.UserIDdan);
            this.$http
              .post(this.$api.PlatformUser.ModifyUser, userListModify, true)
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: "success"
                  });
                  this.activeName = "新增用户";
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: "error"
                  });
                  this.activeName = "新增用户";
                }
                this.dialogFormVisible = false;
                this.getList();
              });
          }
        }
      });
    },
    //加载用户列表---加载下拉都调用
    usersListData() {
      this.tableData = [];
      this.$http.get(this.$api.PlatformUser.UserList, true).then(res => {
        var list = this.list; //获取的数据做一个处理
        // this.tableData = res.data.data.list;
        this.total = res.data.data.total;
        res.data.data.list.forEach((item, index, arr) => {
          // //用户名
          // list.userName = item.userName;
          //姓名
          list.realName = item.realName;
          //角色
          list.roleName = item.roleName;
          //角色所属
          list.roleBelong = item.roleBelong;
          //货主名称---机构
          list.groupId = item.groupId;
          //手机号
          list.userMobile = item.userMobile;
          //邮箱
          list.email = item.email;
          //添加时间
          list.createTime = item.createTime;
          //是否启用
          list.userStatus =
            item.userStatus == 0
              ? "未启用"
              : item.userStatus == 3
              ? "启用"
              : "";
        });
      });
    },
    //获取数据，搜索的时候
    getList() {
      var person = this.formData.person;
      var value = this.formData.value;
      var role =
        this.formData.role == "管理员"
          ? 1
          : this.formData.role == "货主"
          ? 2
          : "";
      var page = this.page;
      var rows = this.limit;
      var url;
      // console.log(role,666)
      url =
        this.$api.PlatformUser.UserList +
        "?page=" +
        page +
        "&rows=" +
        rows +
        "&realName=" +
        person +
        "&userMobile=" +
        value +
        "&roleId=" +
        role;
      this.$http.get(url, true).then(res => {
        res.data.data.list.forEach((item, index, arr) => {
          //启用状态
          item.userStatus == 3
            ? (item.userStatus = "启动")
            : (item.userStatus = "未启动");
          item.flag == 1
            ? (item.roleBelong = "平台")
            : item.flag == 2
            ? (item.roleBelong = "货主")
            : "";
        });
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
        this.$http
          .get(this.$api.BusinessTypeCode.userselect + "?roleBelong="+this.ShipperGroup, true)
          .then(res => {
            this.userselect = res.data.data.data;
          });
      });
      this.$http
        .post(this.$api.PlatformUser.mechanismselect, "", true)
        .then(res => {
          // console.log(res,"机构")
          this.mechanism = res.data.data;
        });
    }
  },
  created() {
    // alert(2222);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）

  mounted() {
    // alert(1111);
    // this.usersListData();
    this.ShipperGroup = localStorage.getItem("groupId"); //所属机构
    this.flag = localStorage.getItem("userFlag"); //角色所属
    //此处判断是平台端 还是货主端，如果为1 初始角色下拉框禁用
    if(this.flag==1){
        this.jinyong=true
        }else{
        this.jinyong=false
    }
    // console.log(this.flag===2);
    if (this.flag == 2) {
      // alert(111);
      //货主
      this.ShipperGroupFlag = false;
      this.Shippershu = false;
    } else {
      this.$http.get(this.$api.PlatformUser.roleshuselect, true).then(res => {
        this.roleshuselect = res.data.data;
      });
    }
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