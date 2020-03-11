<template>
  <el-container class="home-box">
    <el-header id="nav-fixed" :class="{nav_fixed : isFixed}">
      <TopMenu></TopMenu>
    </el-header>
    <el-container class="nav-top">
      <!-- 左侧导航 -->
      <el-aside width="250px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <Bread></Bread>
        <div class="home-content">
          <div class="home-main">
            <transition name="move" mode="out-in">
              <router-view></router-view>
              <!--页面渲染入口-->
            </transition>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopMenu from "./topMenu.vue";
import LeftMenu from "./leftMenu.vue";
import Bread from "./bread.vue";

export default {
  data() {
    return {
      isFixed: false,
      offsetTop: 0
    };
  },
  components: {
    LeftMenu,
    TopMenu,
    Bread
  },
  methods: {
    // 滚动监听  滚动触发的效果写在这里
    // handleScroll() {
    //     var scrollTop =
    //         window.pageYOffset ||
    //         document.documentElement.scrollTop ||
    //         document.body.scrollTop;
    //     console.log(scrollTop, this.offsetTo);
    //     if (scrollTop >= this.offsetTop) {
    //         this.isFixed = true;
    //     } else {
    //         this.isFixed = false;
    //     }
    // }
  },
  beforeCreate: function() {
    //可以在这加个loading事件
    //console.group('beforeCreate 创建前状态===============》');
  },
  created: function() {
    //在这结束loading，还做一些初始化，实现函数自执行
    //console.group('created 创建完毕状态===============》');
  },
  beforeMount: function() {
    //console.group('beforeMount 挂载前状态===============》');
  },
  mounted: function() {
    //在这发起后端请求，拿回数据，配合路由钩子做一些事情
    //console.group('mounted 挂载结束状态===============》');
    // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
    // this.offsetTop = document.querySelector("#nav-fixed").offsetTop;
    // 开启滚动监听
    // window.addEventListener("scroll", this.handleScroll);
  },
  beforeUpdate: function() {
    //console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    //console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // 你确认删除XX吗？  当前组件已被删除，清空相关内容
    //console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    //console.group('destroyed 销毁完成状态===============》');
    // 离开页面 关闭监听 不然会报错
    //  window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>


<style scoped>
.home-box {
  height: 100%;
  overflow-y: auto;
  background-color: #f1f1f1;
}
.el-header {
  padding: 0;
}
.el-aside {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  background-color: #ffffff;
}
.el-aside::after {
  content: "";
  position: absolute;
  z-index: 111;
  top: 0;
  right: -20px;
  width: 15px;
  height: 100%;
  box-shadow: 0px 4px 15px 4px rgba(131, 135, 142, 0.18);
}
.el-main {
  padding: 0;
  overflow: hidden;
}
.home-content {
  /* padding: 20px; */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
  /* overflow: auto; */
}
.home-main {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.nav_fixed {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
}
#nav-fixed {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.nav-top {
  margin-top: 60px;
}
</style>
