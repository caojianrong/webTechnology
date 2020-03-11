<template>
  <div class="addmodify">
    <h2 class="font_size">{{title}}</h2>
    <el-form :inline="true" class="demo-form-inline" :model="searchData">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入名称" v-model="searchData.roleName"></el-input>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select placeholder="启用" v-model="searchData.status">
          <el-option v-for="(item) in status" :label="item.text" :key="item.id" :value="item.text"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色所属">
        <el-select
          placeholder="平台"
          v-model="searchData.roleshu"
          @input="onChange(searchData.roleshu)"
        >
          <el-option v-for="item in roleshu" :key="item.id" :label="item.text" :value="item.text"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          placeholder="请输入备注内容"
          v-model="searchData.value"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <!--------------------以上为新增---------------------------->
    <h2 class="font_size">权限菜单</h2>

    <!-- 平台端 -->
    <el-tree
      :data="platform"
      show-checkbox
      default-expand-all
      node-key="permId"
      ref="treeS"
      highlight-current
      v-show="SisShow"
      :draggable="true"
      :props="defaultProps"
      :default-checked-keys="checked"
    ></el-tree>
    <!-- 平台端 -->

    <!-- 货主端 -->
    <el-tree
      :data="Shipper"
      show-checkbox
      default-expand-all
      node-key="permId"
      ref="treeR"
      highlight-current
      v-show="RisShow"
      :draggable="true"
      :props="defaultProps"
      :default-checked-keys="checked"
    ></el-tree>
    <!-- 货主端 -->

    <!-- 车主端 -->
    <el-tree
      :data="Carmain"
      show-checkbox
      default-expand-all
      node-key="permId"
      ref="treeC"
      highlight-current
      v-show="CisShow"
      :draggable="true"
      :props="defaultProps"
      :default-checked-keys="checked"
    ></el-tree>
    <!-- 车主端 -->

    <!-- 下方提交按钮 -->
    <el-button
      type="success"
      round
      size="mini"
      @click="getCheckedKeys"
      style="margin-top:20px;margin-left:45%"
    >提交</el-button>
    <!-- 下方提交按钮 -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  //新增/修改角色
  name: "shipperbill",

  data() {
    return {
      title: "新增角色",
      dataFlag: this.$route.params.dataFlag,
      //货主
      Shipper: [],
      //平台
      platform: [],
      //车主
      Carmain: [],
      checked: [], //默认选中的数组
      //控制 tree组件的渲染
      defaultProps: {
        children: "children",
        label: "permName",
        id: "permId"
      },
      //货主端显示与隐藏对应的下拉选项
      RisShow: false,
      //平台端显示与隐藏对应的下拉选项
      SisShow: true,
      //车主端显示与隐藏对应的下拉选项
      CisShow: false,
      //搜索
      searchData: {
        //角色名称
        roleName: "",
        //角色所属
        roleshu: "",
        //状态
        status: "",
        //备注,三十字输入框
        value: ""
      },
      //判断显示那个权限列表
      flagdata: null,
      //三十字输入框
      textarea: "",
      //启用状态
      status: [
        {
          text: "启用",
          id: 1
        },
        {
          text: "未启用",
          id: 0
        }
      ],
      //角色所属
      roleshu: [
        {
          text: "平台",
          id: 1
        },
        {
          text: "货主",
          id: 2
        },
        {
          text: "车主",
          id: 3
        }
      ],
      //修改角色,带有ID
      modifyrole: {},
      //需要修改的角色ID，通过这个ID获取当初此角色创建时的权限菜单(回显数据用)
      modifyroleID: null,
      //判断修改的角色属于 平台 1 货主 2 还是 车主3
      roleshuyu: null
    };
  },
  methods: {
    //这里是新增角色
    //监控显示平台(1)还是货主(2)还是车主(3)界面
    onChange(data) {
      this.flagdata = data;
      if (this.flagdata == "平台") {
        this.SisShow = true;
        this.RisShow = false;
        this.CisShow = false;
        this.JurisdictionMenu(1);
      } else if (this.flagdata == "货主") {
        this.RisShow = true;
        this.SisShow = false;
        this.CisShow = false;
        this.JurisdictionMenu(2);
      } else if (this.flagdata == "车主") {
        this.RisShow = false;
        this.SisShow = false;
        this.CisShow = true;
        this.JurisdictionMenu(3);
      }
    },
    //提交按钮
    getCheckedKeys() {
      let that = this;
      //这个list对象是存放id用
      var list = {};
      //拿到下方权限被勾选的每一项的ID(也就是list)
      var records = [];
      //拿到新增角色的内容
      //所属
      var roleBelong =
        this.searchData.roleshu == "平台"
          ? 1
          : this.searchData.roleshu == "货主"
          ? 2
          : "";
      //名称
      var roleName = this.searchData.roleName;
      //状态
      var roleStatus =
        this.searchData.status == "未启用"
          ? 0
          : this.searchData.status == "启用"
          ? 1
          : "";
      //描述
      var roleDesc = this.searchData.value;
      //SisShow为平台
      if (this.SisShow == true) {
        var data = this.$refs.treeS.getCheckedKeys();
        // console.log(data);
        data.map(item => {
          list.permId = item;
          records.push(list);
          list = {};
        });
        //RisShow为货主
      } else if (this.RisShow == true) {
        var data = this.$refs.treeR.getCheckedKeys();
        // console.log(data, "货主");
        data.map(item => {
          list.permId = item;
          records.push(list);
          list = {};
        });
        //CisShow为车主
      } else if (this.CisShow == true) {
        var data = this.$refs.treeC.getCheckedKeys();
        // console.log(data, "车主");
        data.map(item => {
          list.permId = item;
          records.push(list);
          list = {};
        });
      }

      //此处传给后端一个对象
      if (this.$route.query.dataFlag == "ADD") {
        var tmsrole = {};
        tmsrole.roleName = roleName;
        tmsrole.roleBelong = roleBelong;
        tmsrole.records = records;
        tmsrole.roleDesc = roleDesc;
        tmsrole.roleStatus = roleStatus;
        axios
          .post(this.$api.PlatformUser.AddRole, tmsrole, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
          .then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            });
            this.$router.push({
              path: "/platform/platformuser/rolepermissionlist"
            });
          });
      } else {
        var tmsrole = {};
        tmsrole.roleId = this.modifyroleID;
        tmsrole.roleName = roleName;
        tmsrole.roleBelong = roleBelong;
        tmsrole.records = records;
        tmsrole.roleDesc = roleDesc;
        tmsrole.roleStatus = roleStatus;
        // console.log(JSON.stringify(tmsrole));
        axios
          .post(this.$api.PlatformUser.ModifyRole, tmsrole, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
          .then(res => {
            this.$message({
              showClose: true,
              message: "更新成功",
              type: "success"
            });
            this.$router.push({
              path: "/platform/platformuser/rolepermissionlist"
            });
          });
      }
    },
    //获取权限菜单
    JurisdictionMenu(id) {
      //角色所属初始值为 1
      var belongRole = id || 1;
      //获取是否带按钮默认 0
      var menuType = 0;
      this.$http
        .get(
          this.$api.PlatformUser.InitMenu +
            "?belongRole=" +
            belongRole +
            "&menuType=" +
            menuType,
          true
        )
        .then(res => {
          //在此处判断belongRole的值  1 平台  2  货主 3  车主(获得平台跟货主所有菜单)
          if (belongRole == 1) {
            localStorage.setItem("platform", JSON.stringify(res.data.data));
            this.platform = JSON.parse(localStorage.getItem("platform"));
          } else if (belongRole == 2) {
            localStorage.setItem("Shipper", JSON.stringify(res.data.data));
            this.Shipper = JSON.parse(localStorage.getItem("Shipper"));
          } else {
            var Carmain = [];
            localStorage.setItem(
              "Carmain",
              JSON.stringify(
                JSON.parse(localStorage.getItem("platform")).concat(
                  JSON.parse(localStorage.getItem("Shipper"))
                )
              )
            );
            this.Carmain = JSON.parse(localStorage.getItem("Carmain"));
          }
        });
    }
  },
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.JurisdictionMenu();
    if (this.$route.query.dataFlag == "MODIFY1") {
      this.title = "编辑角色";
      if (typeof this.$route.query.roledata != "string") {
        this.checked = this.$route.query.roledata.tmsPermissions;
        this.modifyrole = this.$route.query.roledata;
        this.modifyroleID =
          this.modifyrole.tmsRole.roleId == "undefined"
            ? ""
            : this.modifyrole.tmsRole.roleId;
        //角色名称
        this.searchData.roleName = this.modifyrole.tmsRole.roleName;
        //启用状态
        this.searchData.status =
          this.modifyrole.tmsRole.roleStatus == 1 ? "启用" : "未启用";
        //角色所属
        this.searchData.roleshu =
          this.modifyrole.tmsRole.roleBelong == 1
            ? "平台"
            : this.modifyrole.tmsRole.roleBelong == 2
            ? "货主"
            : "车主";
        //备注
        this.searchData.value = this.modifyrole.tmsRole.roleDesc;
        this.flagdata =
          this.modifyrole.tmsRole.roleBelong == 1
            ? "平台"
            : this.modifyrole.tmsRole.roleBelong == 2
            ? "货主"
            : "车主";
        if (this.flagdata == "平台") {
          this.SisShow = true;
          this.RisShow = false;
          this.CisShow = false;
          this.JurisdictionMenu(1);
        } else if (this.flagdata == "货主") {
          this.RisShow = true;
          this.SisShow = false;
          this.CisShow = false;
          this.JurisdictionMenu(2);
        } else if (this.flagdata == "车主") {
          this.RisShow = false;
          this.SisShow = false;
          this.CisShow = true;
          this.JurisdictionMenu(3);
        }
      } else {
        // alert(222);
        // console.log(typeof "[object Object]");
      }
    }
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
.addmodify {
  padding: 30px;
  padding-top: 0;
}
.font_size {
  font-size: 20px;
  padding: 20px 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>