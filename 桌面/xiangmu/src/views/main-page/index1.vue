<!--  -->
<template>
  <div class="index1">

    <el-row class="block-col-2">
      <el-col :span="12">
        <span class="demonstration">click 激活</span>
        <el-dropdown trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              项目编号
              <div class="checkboxTwo">
                <input
                  type="checkbox"
                  value="1"
                  id="checkboxTwoInput"
                  name
                  checked
                  @click="changeHide(0)"
                />
                <label for="checkboxTwoInput"></label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              项目名称
              <div class="checkboxTwo">
                <input
                  type="checkbox"
                  value="1"
                  id="checkboxTwoInput1"
                  name
                  checked
                  @click="changeHide(1)"
                />
                <label for="checkboxTwoInput1"></label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              项目业务类型
              <div class="checkboxTwo">
                <input
                  type="checkbox"
                  value="1"
                  id="checkboxTwoInput2"
                  name
                  checked
                  @click="changeHide(2)"
                />
                <label for="checkboxTwoInput2"></label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              客户名称
              <div class="checkboxTwo">
                <input
                  type="checkbox"
                  value="1"
                  id="checkboxTwoInput3"
                  name
                  checked
                  @click="changeHide(3)"
                />
                <label for="checkboxTwoInput3"></label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              结算模式
              <div class="checkboxTwo">
                <input
                  type="checkbox"
                  value="1"
                  id="checkboxTwoInput4"
                  name
                  checked
                  @click="changeHide(4)"
                />
                <label for="checkboxTwoInput4"></label>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <tabComp>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="(item,index) in auditedName"
        :prop="item.tabItem"
        :label="item.tabTh"
        :key="index"
      ></el-table-column>
    </tabComp>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../compontes/tabComp";
import singularTable from "../../compontes/singularTable";
export default {
  name: "index1",
  //import引入的组件需要注入到对象中才能使用
  components: { tabComp, singularTable },
  data() {
    //这里存放数据
    return {
      checked: true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 表头数据
      auditedName: [
        {
          tabTh: "项目编号",
          tabItem: "date",
          isShow: true
        },
        {
          tabTh: "项目名称",
          tabItem: "name",
          isShow: true
        },
        {
          tabTh: "项目业务类型",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "客户名称",
          tabItem: "address",
          isShow: true
        },
        {
          tabTh: "结算模式",
          tabItem: "address",
          isShow: true
        }
      ],
      value1: "",
      input: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //控制表格显示隐藏
    changeHide(value) {
      console.log(this.auditedName[value].isShow);
      this.auditedName[value].isShow = !this.auditedName[value].isShow;
      console.log(123213);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
/* @import url(); 引入公共css类 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.checkboxTwo {
  width: 40px;
  height: 20px;
  background: #efefef;
  float: right;
  margin-left: 16px;
  margin-top: 8px;
  border-radius: 50px;
  position: relative;
}
/**
 * Create the line for the circle to move across
 */

.checkboxTwo:before {
  content: "";
  position: absolute;
  top: 9px;
  left: 8px;
  height: 2px;
  width: 26px;
  background: #ccc;
}

.checkboxTwo label {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
  cursor: pointer;
  position: absolute;
  top: 5px;
  z-index: 1;
  left: 7px;
  background: #fff;
}

.checkboxTwo input[type="checkbox"]:checked + label {
  left: 25px;
  background: #659cfe;
}
.checkboxTwo input {
  visibility: hidden;
}
</style>