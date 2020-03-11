<template>
  <div class="shipper">
    <div class="table_main">
      <!-- 头部 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">

                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="商户名称" prop="groupCompany">
                    <el-input placeholder="请输商户名称" v-model="searchData.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>

                 <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="联系电话" prop="groupMobile">
                    <el-input placeholder="请输入联系电话" v-model="searchData.groupMobile" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="searchData1()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toAudit()">审核</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit()">查看明细</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="third">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                 <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="商户名称" prop="groupCompany">
                    <el-input placeholder="请输商户名称" v-model="searchData.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>

                 <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="联系电话" prop="groupMobile">
                    <el-input placeholder="请输入联系电话" v-model="searchData.groupMobile" clearable></el-input>
                  </el-form-item>
                </el-col>

                  <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                    <el-form-item label-width="0">
                      <el-button size="medium" type="primary" @click="searchData1()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toAudit()">查看</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="异常" name="second">
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <!-- <singularTable></singularTable> -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="商户名称" prop="groupCompany">
                    <el-input placeholder="请输商户名称" v-model="searchData.groupCompany" clearable></el-input>
                  </el-form-item>
                </el-col>

                 <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="联系电话" prop="groupMobile">
                    <el-input placeholder="请输入联系电话" v-model="searchData.groupMobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                <el-form-item label-width="0">
                  <el-button size="medium" type="primary" @click="searchData1()">查询</el-button>
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
            <el-button class="reset reset_tab" type="primary" @click="toAudit()">查看异常</el-button>
            <el-button class="reset reset_tab" type="primary" @click="toAudit()">恢复</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 表格 -->
      <div class="table_com">
        <div class="list-box">
          <!-- <tabComp :tableHeader="auditedName" :tableData1="tabIndex == 0 ? shpperWaited : tabIndex == 1 ? shpperApproved : shpperAbnormal"></tabComp> -->
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
                  <el-select v-model="auditDetail.groupStatus" placeholder="请选择">
                    <el-option
                      v-for="item in options"
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
            <el-button type="primary" @click="confirmAudit">确 定</el-button>
          </div>
        </el-dialog>
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
      activeName: "first",
      searchData: { // 搜索的字段
        ownerName: "",
        diverName: "",
        diverTel: "",
        groupCompany:'',//名称
        groupMobile:'',//电话
      },
      tabIndex: 0, // 选项卡索引
      setAuditedData: [], //最终表头数据

      groupFlag: 5, // 机构标识 1平台、2货主甲方、3货主、4车主、5商户
      groupStatus: 2, // 机构状态
      list: [], //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据

      // 表头数据   接口在修改
      auditedName: [
        {
          tabTh: "货主ID",
          tabItem: "groupId",
          isShow: true,
          sortNum: 1
        },
        {
          tabTh: "公司全称",
          tabItem: "groupCompany",
          isShow: false,
          sortNum: 2
        },
        {
          tabTh: "联系电话",
          tabItem: "groupMobile",
          isShow: true,
          sortNum: 3
        },
        {
          tabTh: "注册时间",
          tabItem: "createTime",
          isShow: true,
          sortNum: 4
        },
        {
          tabTh: "审核通过时间",
          tabItem: "groupAuditTime",
          isShow: true,
          sortNum: 5
        },
        {
          tabTh: "异常时间",
          tabItem: "exceptionTime",
          isShow: false,
          sortNum: 6
        },
        {
          tabTh: "操作人",
          tabItem: "updateUserName",
          isShow: false,
          sortNum: 7
        },
        {
          tabTh: "状态",
          tabItem: "groupStatus",
          isShow: true,
          sortNum: 8
        },
        {
          tabTh: "最后操作人",
          tabItem: "updateUserName",
          isShow: true,
          sortNum: 9
        },
        {
          tabTh: "最后审核人",
          tabItem: "groupAuditorName",
          isShow: true,
          sortNum: 10
        }
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
      options: [{
          value: '0',
          label: '逻辑删除'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '审核通过'
        }, {
          value: '3',
          label: '禁止登陆'
        }, {
          value: '4',
          label: '审核未通过'
        }]
    };
  },
  //监听属性 类似于data概念
  computed: {
    shpperWaited() {
      return this.list.filter((item) => {
        return item.groupStatus == '待审核';
      })
    },
    shpperApproved() {
      return this.list.filter((item) => {
        return item.groupStatus == '审核通过';
      })
    },
    shpperAbnormal() {
      return this.list.filter((item) => {
        return (item.groupStatus != '待审核' && item.groupStatus != '审核通过');
      })
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //查询
    searchData1(){
      // alert(111)
      this.getList()
    },
    //重置
   resetData(searchData) {
        this.$refs[searchData].resetFields();
        this.page=1;
        this.rows=10;
        this.getList()
    },
    // handleClick(tab, event) {
    //     console.log(tab.index,555)
    //   this.tabIndex = tab.index;
    //   if (tab.index == 0 || tab.index == 1) {
    //     // console.log(this.list.filter((item) => {
    //     //   return item.groupStatus == 1;
    //     // }), '未通过列表')
    //     // console.log(this.list.filter((item) => {
    //     //   return item.groupStatus == 2;
    //     // }), '已经通过列表')
    //     this.auditedName.splice(1, 6, 
    //       {
    //         tabTh: "公司全称",
    //         tabItem: "groupCompany",
    //         isShow: false,
    //         sortNum: 2
    //       },
    //       {
    //         tabTh: "联系电话",
    //         tabItem: "groupMobile",
    //         isShow: true,
    //         sortNum: 3
    //       },
    //       {
    //         tabTh: "注册时间",
    //         tabItem: "createTime",
    //         isShow: true,
    //         sortNum: 4
    //       },
    //       {
    //         tabTh: "审核通过时间",
    //         tabItem: "groupAuditTime",
    //         isShow: true,
    //         sortNum: 5
    //       },
    //       {
    //         tabTh: "异常时间",
    //         tabItem: "exceptionTime",
    //         isShow: false,
    //         sortNum: 6
    //       },
    //       {
    //         tabTh: "操作人",
    //         tabItem: "updateUserName",
    //         isShow: false,
    //         sortNum: 7
    //       }
    //     )
    //   } else {
    //     // console.log(this.list.filter((item) => {
    //     //   return (item.groupStatus != 1 && item.groupStatus != 2);
    //     // }), '异常列表')
    //     this.auditedName.splice(1, 6, 
    //       {
    //         tabTh: "公司全称",
    //         tabItem: "groupCompany",
    //         isShow: true,
    //         sortNum: 2
    //       },
    //       {
    //         tabTh: "联系电话",
    //         tabItem: "groupMobile",
    //         isShow: true,
    //         sortNum: 3
    //       },
    //       {
    //         tabTh: "注册时间",
    //         tabItem: "createTime",
    //         isShow: true,
    //         sortNum: 4
    //       },
    //       {
    //         tabTh: "审核通过时间",
    //         tabItem: "groupAuditTime",
    //         isShow: true,
    //         sortNum: 5
    //       },
    //       {
    //         tabTh: "异常时间",
    //         tabItem: "exceptionTime",
    //         isShow: true,
    //         sortNum: 6
    //       },
    //       {
    //         tabTh: "操作人",
    //         tabItem: "updateUserName",
    //         isShow: true,
    //         sortNum: 7
    //       }
    //     )
    //   }

    //   // if (tab.index == 0 || tab.index == 1) {
    //   // // console.log(this.list.filter((item) => {
    //   // //   return item.groupStatus == 1;
    //   // // }), '未通过列表')
    //   // // console.log(this.list.filter((item) => {
    //   // //   return item.groupStatus == 2;
    //   // // }), '已经通过列表')
    //   //   this.$set(this.auditedName, 5 ,{
    //   //     tabTh: "异常原因",
    //   //     tabItem: "exceptionReason",
    //   //     isShow: false,
    //   //     sortNum: 1
    //   //   })
    //   // } else {
    //   //   // console.log(this.list.filter((item) => {
    //   //   //   return (item.groupStatus != 1 && item.groupStatus != 2);
    //   //   // }), '异常列表')
    //   //   this.$set(this.auditedName, 5 ,{
    //   //     tabTh: "异常原因",
    //   //     tabItem: "exceptionReason",
    //   //     isShow: true,
    //   //     sortNum: 1
    //   //   })
    //   // }
    // },
    handleClick(tab, event) {
        // console.log(tab.index,555)
      // this.tabIndex = tab.index;
     
        // console.log(this.list.filter((item) => {
        //   return item.groupStatus == 1;
        // }), '未通过列表')
        // console.log(this.list.filter((item) => {
        //   return item.groupStatus == 2;
        // }), '已经通过列表')

      
        // console.log(this.list.filter((item) => {
        //   return (item.groupStatus != 1 && item.groupStatus != 2);
        // }), '异常列表')
        this.auditedName.splice(1, 6, 
          {
            tabTh: "公司全称",
            tabItem: "groupCompany",
            isShow: true,
            sortNum: 2
          },
          {
            tabTh: "联系电话",
            tabItem: "groupMobile",
            isShow: true,
            sortNum: 3
          },
          {
            tabTh: "注册时间",
            tabItem: "createTime",
            isShow: true,
            sortNum: 4
          },
          {
            tabTh: "审核通过时间",
            tabItem: "groupAuditTime",
            isShow: true,
            sortNum: 5
          },
          {
            tabTh: "异常时间",
            tabItem: "exceptionTime",
            isShow: true,
            sortNum: 6
          },
          {
            tabTh: "操作人",
            tabItem: "updateUserName",
            isShow: true,
            sortNum: 7
          }
        
        )

      // if (tab.index == 0 || tab.index == 1) {
      // // console.log(this.list.filter((item) => {
      // //   return item.groupStatus == 1;
      // // }), '未通过列表')
      // // console.log(this.list.filter((item) => {
      // //   return item.groupStatus == 2;
      // // }), '已经通过列表')
      //   this.$set(this.auditedName, 5 ,{
      //     tabTh: "异常原因",
      //     tabItem: "exceptionReason",
      //     isShow: false,
      //     sortNum: 1
      //   })
      // } else {
      //   // console.log(this.list.filter((item) => {
      //   //   return (item.groupStatus != 1 && item.groupStatus != 2);
      //   // }), '异常列表')
      //   this.$set(this.auditedName, 5 ,{
      //     tabTh: "异常原因",
      //     tabItem: "exceptionReason",
      //     isShow: true,
      //     sortNum: 1
      //   })
      // }
    },
    // 获取货主管理列表
    getList() {
      var start = this.page;
      var end = this.limit;
      
      // let param = new URLSearchParams();
      // param.append("groupFlag", this.groupFlag);
      // param.append("groupStatus", this.groupStatus);

      this.$http
        .get(
          this.$api.Risks.getShipperList + "?groupFlag=" + this.groupFlag + "&page=" + start + "&rows=" + end+"&groupCompany="+this.searchData.groupCompany+"&groupMobile="+this.searchData.groupMobile,
          true
        )
        .then(res => {
          //表格数据
          if(res.data.code == 1) {
            for(let val of res.data.data.list) {
              if(val.groupStatus == 0) {
                val.groupStatus = '逻辑删除'
              } else if(val.groupStatus == 1) {
                val.groupStatus = '待审核'
              } else if(val.groupStatus == 2) {
                val.groupStatus = '审核通过'
              } else if(val.groupStatus == 3) {
                val.groupStatus = '禁止登陆'
              } else {
                val.groupStatus = '审核未通过'
              }
            }
            this.list = res.data.data.list;
            this.total = res.data.data.total;
            // console.log(res.data.data.list, '商户审核列表数据')
          // this.$store.commit("getTableData", this.list);
          } else {
            this.$message({
              showClose: true,
              message: "获取管理列表失败",
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

    // 点击审核
    toAudit() {
      var that = this;
      var projectIdList = this.$store.state.selectData;
      if (projectIdList.length > 1 || projectIdList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行审核",
          type: "error"
        });
        return false;
      }
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
          this.promptText = '确定修改为 “逻辑删除” 状态吗';
        } else if(this.auditDetail.groupStatus == 1) {
          this.promptText = '确定修改为 “待审核” 状态吗';
        } else if(this.auditDetail.groupStatus == 2) {
          this.promptText = '确定修改为 “审核通过” 状态吗';
        } else if(this.auditDetail.groupStatus == 3) {
          this.promptText = '确定修改为 “禁止登陆” 状态吗';
        } else if(this.auditDetail.groupStatus == 4) {
          this.promptText = '确定修改为 “审核未通过” 状态吗';
        }
        this.innerConfirm = !this.innerConfirm;
      }
    },
    // 最终修改审核状态
    confirmAudit() {
      let that = this;
      this.toAuditDialog = !this.toAuditDialog;
      this.innerConfirm = !this.innerConfirm;
      var param = new URLSearchParams();
      param.append("groupId", this.auditDetail.groupId);
      param.append("groupStatus", this.auditDetail.groupStatus);
      this.$http
        .post(this.$api.Risks.sendShipperAudit, param, true)
        .then(res => {
          console.log(res)
          if(res.data.code == 1) {
            this.originalStatus = this.auditDetail.groupStatus;
            this.getList()
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
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
  height: 40px;
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
