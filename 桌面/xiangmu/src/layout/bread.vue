<template>
  <div class="bread_container">
    <span class="bread-t">当前位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>


<script>
export default {
  data() {
    return {
      breadList: []
    };
  },
  created() {
    //在这结束loading，还做一些初始化，实现函数自执行
    //console.group('created 创建完毕状态===============》');
    this.getBreadcrumb();
  },
  computed: {},
  mounted() {},
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.breadList = matched;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
.bread_container {
  width: 100%;
  border-bottom: 1px solid #bfbfbf;
  background-color: #f8f8f8;
  color: #666666;
  line-height: 2.5em;
}
.bread-t {
  padding-left: 20px;
}
.bread-t,
.bread_container > .el-breadcrumb {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px !important;
}
.bread_container .el-breadcrumb__item {
  line-height: 2.5em !important;
}
</style>
