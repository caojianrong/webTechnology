<template>
  <div class="shipperAudit">
    
    <el-breadcrumb separator-class="el-icon-arrow-right" class="audited_tit">
      <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>基础管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="table_main">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <!-- 待审核 -->
        </el-tab-pane>
        <el-tab-pane label="已审核" name="second">
          <!-- 已审核 -->
        </el-tab-pane>
      </el-tabs>

      <div class="audit_search">
        <!-- 单行搜索引擎 -->
        <singularTable></singularTable>
      </div>

      <div class="tab_operation">
        <!-- 待审核显示 -->
        <el-button class="reset reset_tab" type="primary">审核</el-button>
        <!-- 已审核显示 -->
        <el-button class="reset reset_tab" type="primary">查看</el-button>
        <el-button class="reset reset_tab" type="primary">费率管理</el-button>
        <el-button class="reset reset_tab" type="primary">货主优惠</el-button>
        <el-button class="reset reset_tab" type="primary">押金额度</el-button>
      </div>

      <div class="table_com">
        <div class="list-box">
          <tabComp>
            <template v-if="tabIndex == 0">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                v-for="(item,index) in auditedName"
                :key="index"
                :prop="item.tabItem"
                :label="item.tabTh"
              ></el-table-column>
            </template>
            <template v-if="tabIndex == 1">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                v-for="(item,index) in auditedName1"
                :key="index"
                :prop="item.tabItem"
                :label="item.tabTh"
              ></el-table-column>
            </template>
          </tabComp>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import { MessageBox } from "element-ui";
export default {
  name: "shipperAudit",
  components: {
    tabComp,
    singularTable
  },
  data() {
    return {
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 1, //默认一次显示10条数据
      tableData: [
        {
          orderId: "123123EDFGFS",
          creatDate: "2016-05-03",
          bindOrder: "sdf23dsfasdf",
          typeOrder: "干线普通货运",
          customName: "王小虎",
          setMent: "有差额",
          chargingType: "大宗",
          freightType: "手动输入",
          freightTotal: "计费总量"
        }
      ],
      // 表头数据
      auditedName: [
        {
          tabTh: "ID",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "状态",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "公司名称",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "公司联系电话",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "公司地址",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "纳税人识别号",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "法人",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "企业类型",
          tabItem: "orderId",
          isShow: true
        }
      ],
      auditedName1: [
        {
          tabTh: "ID",
          tabItem: "exceptionDesc",
          isShow: true
        },
        {
          tabTh: "状态",
          tabItem: "exeCreateTime",
          isShow: true
        },
        {
          tabTh: "公司名称",
          tabItem: "exeCreateTime",
          isShow: true
        },
        {
          tabTh: "费率",
          tabItem: "shippingName",
          isShow: true
        },
        {
          tabTh: "押金额度",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "货主可享优惠",
          tabItem: "shippingCode",
          isShow: true
        },
        {
          tabTh: "公司地址",
          tabItem: "shippingDriverName",
          isShow: true
        },
        {
          tabTh: "纳税人识别号",
          tabItem: "shippingCarCode",
          isShow: true
        },
        {
          tabTh: "法人",
          tabItem: "shippingDriverMobile",
          isShow: true
        },
        {
          tabTh: "企业类型",
          tabItem: "createTime",
          isShow: true
        }
      ],
      tabIndex: 0, // 选项卡索引
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
          value: "1",
          label: "项目编号"
        },
        {
          value: "2",
          label: "项目名称"
        },
        {
          value: "3",
          label: "客户名称"
        }
      ],
      value: "",
      activeName: "first",
      input2: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      if (tab.index == 0) {
      } else if (tab.index == 1) {
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
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
@import url("../../../assets/css/singularTable.css");
.tab_operation {
  text-align: right;
  margin-bottom: 15px;
  padding-right: 5%;
  height: 30px;
  line-height: 30px;
}
.new_pro {
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 3px 10px;
}
</style>