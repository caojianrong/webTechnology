<!--  -->
<template>
  <div class="singularTable">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="4">
          <el-form-item label="公司名称" prop="orderName">
            <el-select class="select_default" v-model="formData.orderName" placeholder="请选择">
              <el-option
                v-for="item in getOptions"
                :key="item.orderName"
                :label="item.label"
                :value="item.orderName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
          <el-form-item label-width="0" prop="customText">
            <el-input placeholder="请输入内容" v-model="formData.customText" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col v-if="getIsShow" :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              v-model="formData.createTime"
              :picker-options="pickerOptions0"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
          <el-form-item label-width="0">
            <el-button size="medium" type="primary" @click="queryData('formData')">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
          <el-form-item label-width="0">
            <el-button size="medium" @click="resetData('formData')" class="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "singularTable",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },

      formData: {
        orderName: "",
        customText: "",
        createTime: ""
      },
      // 校验规则
      rules: { 
          
      }

    };
  },
  //监听属性 类似于data概念
  computed: {
    getOptions() {
      return this.$store.state.singularData;
    },
    getIsShow() {
      return this.$store.state.isShow;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //重置
    resetData(formName){
      this.$nextTick(() => {
       
        this.$refs[formName].resetFields();

      });
       
    },
    //查询 
    queryData(formData) {
      this.$refs[formName].validate(valid => {
          if(valid){
            //请求每个页面相应接口  
              
          }else {
              return false
          }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
   
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
</style>