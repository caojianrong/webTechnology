



<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus">
      <el-menu-item
        v-if="navMenu.children==null&&navMenu&&navMenu.state==='ENABLE'"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.permRequest"
        :route="navMenu.value"
        disabled
      >
        <i :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.permName}}</span>
      </el-menu-item>

      <el-submenu
        v-if="navMenu.children&&navMenu&&navMenu.state==='ENABLE'"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.permRequest"
      >
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span>{{navMenu.permName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </label>
  </div>
</template>
 
<script>
export default {
  name: "NavMenu",
  props: ["navMenus"],
  data() {
    return {};
  },
  methods: {}
};
</script>
