<!--  -->
<template>
  <div class="tableMain">
    <!-- 表头 -->
    <div class="table-sort">
      <!-- 表头显示隐藏 -->
      <el-button id="btn-sort" @click="toggleMenu">
        <span class="menu-type">列表显示</span>
        <i class="el-icon-caret-bottom"></i>
      </el-button>
    </div>
    <div v-show="menuVisible" class="menu-sort" id="menu-box">
      <!-- v-model中的会默认选中 -->
      <el-checkbox-group v-model="tableColumn" @change="handleCheckedMenuChange">
        <el-checkbox v-for="(item,key) in tableHeader" :key="key" :label="item">{{item.tabTh}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData1"
      tooltip-effect="dark"
      style="width: 100%"
      border
      stripe
      :fit="true"
      :show-header="true"
      header-cell-class-name="headerClass"
      show-overflow-tooltip
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <af-table-column
        v-for="(item,key) in tableColumn"
        :key="key"
        :prop="item.tabItem"
        :label="item.tabTh"
        align="center"
      ></af-table-column>
      <!--
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="(item,key) in tableColumn"
        :key="key"
        :prop="item.tabItem"
        :label="item.tabTh"
        align="center"
      ></el-table-column>
      -->
    </el-table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { sortByKey } from "../../tests/unit/public";
export default {
  name: "tableMain",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      currentPage4: 1,
      total: 6, //数据总条数
      page: 1, //默认显示第1页
      limit: 1, //默认一次显示10条数据
      currentRows: "",
      menuVisible: false,
      tableColumn: null,
      multipleSelection: []
    };
  },
  props: ["tableData1", "tableHeader"],
  //监听属性 类似于data概念
  computed: {
    tableData() {
      // console.log(this.$store.state.tabData);

      return this.$store.state.tabData;
    }
  },
  //监控data中的数据变化
  watch: {
    // 监听父组件传过来的表头变化 过滤isShow为false的值
    tableHeader: function(data) {
      // console.log(data,555,'父组件传过来的表头变化')
      this.tableColumn = data.filter(item => {
        return item.isShow;
      });
    }
  },
  //方法集合
  methods: {
    toggleMenu() {
      this.menuVisible ? this.hide() : this.show();
    },
    show() {
      this.menuVisible = true;
      document.addEventListener("click", this.hidePanel, false);
    },
    hide() {
      this.menuVisible = false;
      document.removeEventListener("click", this.hidePanel, false);
    },

    // 隐藏表头条目
    handleCheckedMenuChange(val) {
      this.tableColumn = sortByKey(val, "sortNum");
    },
    //分页、
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    //分页结束
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取选中的数据
    handleSelectionChange(val) {
      // console.log(val,555, '我被选中啦')
      this.multipleSelection = val;
      this.$store.commit("getSelectData", this.multipleSelection);
      // console.log(this.multipleSelection,"这里是 选中");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //this.tableData = this.$store.state.tabData
    // 过滤isShow为false的值
    this.tableColumn = this.tableHeader.filter(item => {
      return item.isShow;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 初始化选中数据防止初始化时点击删除获取不到length
    let arr = [];
    this.$store.commit("getSelectData", arr);
    // console.log(this.tableData1);
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
<style>
/* @import url(); 引入公共css类 */
.headerClass {
  font-weight: 700 !important;
  background-color: #dde9fe !important;
}
/*表格*/
.tableMain .el-table th.gutter {
  display: table-cell !important;
}
.headerClass {
  background-color: #dde9fe !important;
}
.tableMain .el-table thead {
  color: #000000 !important;
}
.tableMain .el-table td,
.tableMain .el-table th {
  padding: 8px 0 !important;
}
/*排序按钮*/
.table-sort {
  margin-bottom: 10px;
  width: 100%;
  text-align: right;
}

.table-sort .el-button {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-right: 0;
  width: 150px;
  height: 32px;
  line-height: 32px;
}
.menu-type {
  display: inline-block;
  width: 90%;
  text-align: left;
}
.menu-sort {
  position: absolute;
  z-index: 111;
  top: 32px;
  right: 0;
  padding: 10px 5px 10px 10px;
  width: 150px;
  max-height: 400px;
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.menu-sort .el-checkbox__label {
  line-height: 25px !important;
  font-size: 14px !important;
}
</style>