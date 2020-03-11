<template>
  <div class="settle">
    <div class="table_main">
        <!-- 头部筛选 -->
        <div class="table_main_head">
          <div class="auditSolid">
            <div class="audiafter">筛选查询</div>
            <div class="auditheadright">
              <div class="audited_down">
                <i class="el-icon-download"></i>
                导出信息
              </div>
              <!-- <div class="senior_search">
                高级检索
                <i class="el-icon-d-arrow-right"></i>
              </div> -->
            </div>
          </div>
        </div>
        <!-- 单行搜索 -->
        <div class="audit_search">
          <el-form ref="searchData" :model="searchData" label-width="80px">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <el-form-item label="项目名称" prop="value">
                  <el-input placeholder="请输入内容" v-model="searchData.projName" clearable></el-input>
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

        <!-- 表格组件 -->
        <div class="table_com">
          <!-- 头部按钮 -->
          <div class="tab_operation">
            <el-button
              class="reset reset_tab"
              type="primary"
              @click="newAddRisk()"
            >新增</el-button>
            <el-button
              class="reset reset_tab"
              type="primary"
              @click="editRisk()"
            >修改</el-button>
            <el-button
              class="reset reset_tab"
              type="primary"
              @click="changeRisk()"
            >状态变更</el-button>
            <el-button
              class="reset reset_tab"
              type="primary"
              @click="delRisk()"
            >删除</el-button>
          </div>
          <!-- 表单组件 -->
          <!-- <div class="list-box">
            <tabComp :tableHeader="auditedName" :tableData1="list"></tabComp>
            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="page"
              :limit.sync="limit"
              @pagination="getList"
            />
          </div>   -->
        </div>
        <div>
          敬请期待
        </div>

    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "index",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      searchData: {
        projName: "" //项目名称
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        // this.page = 1;
        // this.limit = 1;
        // this.getList();
      });
    },
    newAddRisk() {

    },
    editRisk() {

    },
    changeRisk() {

    },
    delRisk(){
      
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
/* @import url("../../../../assets/css/singularTable.css"); */
</style>
