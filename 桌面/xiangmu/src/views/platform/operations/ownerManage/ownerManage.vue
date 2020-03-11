<template>
  <div class="owner">
    <div class="table_main">
      <!-- 头部 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车主姓名" prop="carOwner">
                    <el-input placeholder="请输车主姓名" v-model="searchData.carOwner" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机姓名" prop="idcardRealname">
                    <el-input placeholder="请输入司机姓名" v-model="searchData.idcardRealname" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机手机号" prop="userMobile">
                    <el-input placeholder="请输入手机号" v-model="searchData.userMobile" clearable></el-input>
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
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="ownerAudit(1)">审核</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="third">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车主姓名" prop="carOwner">
                    <el-input placeholder="请输车主姓名" v-model="searchData.carOwner" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机姓名" prop="idcardRealname">
                    <el-input placeholder="请输入司机姓名" v-model="searchData.idcardRealname" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机手机号" prop="userMobile">
                    <el-input placeholder="请输入手机号" v-model="searchData.userMobile" clearable></el-input>
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
          <div class="tab_operation">
            <el-button class="reset reset_tab"  type="primary" @click="ownerAudit(2)">查看详情</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="异常" name="second">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车主姓名" prop="carOwner">
                    <el-input placeholder="请输车主姓名" v-model="searchData.carOwner" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机姓名" prop="idcardRealname">
                    <el-input placeholder="请输入司机姓名" v-model="searchData.idcardRealname" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
                  <el-form-item label="司机手机号" prop="userMobile">
                    <el-input placeholder="请输入手机号" v-model="searchData.userMobile" clearable></el-input>
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
          <div class="tab_operation">
            <el-button class="reset reset_tab"  type="primary" @click="ownerAudit(3)">查看异常</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
      <div class="table_com">
        <div class="list-box">
          <!--
          <tabComp :tableHeader="auditedName" :tableData1="tabIndex == 0 ? ownerWaited : tabIndex == 1 ? ownerApproved : ownerAbnormal"></tabComp>
          -->
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
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../../compontes/tabComp";
import pagination from "../../../../compontes/pagtion";

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
      activeName: "first",
      searchData: { // 搜索的字段
        carOwner: "",
        idcardRealname: "",
        userMobile: "",
        userArrayStatus: [2]  //用户审核状态
      },
      tabIndex: 0, // 选项卡索引
      setAuditedData: [], //最终表头数据

      list: [], //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据

      // 表头数据
      auditedName: [
        {
          tabTh: "车主ID",
          tabItem: "userId",
          isShow: true,
          sortNum: 1
        },
        {
          tabTh: "手机号",
          tabItem: "userMobile",
          isShow: true,
          sortNum: 2
        },
        {
          tabTh: "司机姓名",
          tabItem: "idcardRealname",
          isShow: true,
          sortNum: 3
        },
        {
          tabTh: "绑定车辆",
          tabItem: "carCode",
          isShow: true,
          sortNum: 4
        },
        {
          tabTh: "车主姓名",
          tabItem: "carOwner",
          isShow: true,
          sortNum: 5
        },
        {
          tabTh: "状态",
          tabItem: "userStatusName",
          isShow: true,
          sortNum: 6
        },
        {
          tabTh: "异常原因",
          tabItem: "exceptionReason",
          isShow: false,
          sortNum: 7
        },
        {
          tabTh: "注册时间",
          tabItem: "createTime",
          isShow: true,
          sortNum: 8
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //重置功能
    resetData(searchData){
      this.$refs[searchData].resetFields();
      this.page = 1;
      this.limit = 10;
      this.getList()
    },
    handleClick(tab,event){
        //0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆
        if (tab.index == 0){
            this.searchData.userArrayStatus = [2]; //待审核、审核不通过、认证未审核
            this.$set(this.auditedName, 6 ,{
                tabTh: "异常原因",
                tabItem: "exceptionReason",
                isShow: false,
                sortNum: 1
            })
            this.getList();
        }else if(tab.index == 1){
            this.searchData.userArrayStatus = [3]; //审核通过
            this.$set(this.auditedName, 6 ,{
                tabTh: "异常原因",
                tabItem: "exceptionReason",
                isShow: false,
                sortNum: 1
            })
            this.getList();
        }else if(tab.index == 2){
            this.searchData.userArrayStatus = [4,5,6]; //审核不通过
            this.$set(this.auditedName, 6 ,{
                tabTh: "异常原因",
                tabItem: "exceptionReason",
                isShow: true,
                sortNum: 1
            })
            this.getList();
        }
    },
    //搜索列表
    toSearch(){
        this.getList();
    },
    // 获取车主管理列表
    getList() {
        var param = new URLSearchParams();
        param.append("carOwner",this.searchData.carOwner);
        param.append("idcardRealname",this.searchData.idcardRealname);
        param.append("userMobile",this.searchData.userMobile);
        param.append("page", this.page);
        param.append("rows", this.limit);
        param.append("userArrayStatus",this.searchData.userArrayStatus);
      this.$http
          .post(
              this.$api.Risks.getOwnerList,param,true
          )
        .then(res => {
          //表格数据
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          // console.log(res.data.data.list, '车主审核列表数据');

          // this.$store.commit("getTableData", this.list);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          });
        })
    },
    ownerAudit(flag) {
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
      // console.log(flag,999)
      
      //为3跳异常修复
      if(flag==3){
          this.$router.push({
          path: "ownerabnormal",
          // name: "Ownerabnormal",
          params: {
              id: projectIdList[0].userId,
          }
        })
      }else{
        this.$router.push({
        path: "ownertoaudit",
        name: "OwnerToAudit",
        params: {
            id: projectIdList[0].userId,
            flag: flag   //1审核  2查看详情  3查看异常
        }
        // params: {
        //   id: 93
        // }
      })
      }
    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
</style>
