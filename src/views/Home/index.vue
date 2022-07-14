<template>
  <!--//1.0 ⬇⬇⬇⬇⬇ 布局容器 ⬇⬇⬇⬇⬇-->
  <el-container class="container">
    <!--//2 ⬇⬇⬇⬇⬇ 头部 ⬇⬇⬇⬇⬇-->
    <el-header>Header</el-header>
    <!--//2 ⬆⬆⬆⬆⬆ 头部 ⬆⬆⬆⬆⬆-->
    <!--//1.1 ⬇⬇⬇⬇⬇ 布局容器 ⬇⬇⬇⬇⬇-->
    <el-container>
      <!-- //3 ⬇⬇⬇⬇⬇ 左侧 ⬇⬇⬇⬇⬇-->
      <el-aside width="200px">
        <el-menu background-color="#373d41" text-color="#fff" unique-opened>
          <el-submenu index="1">
            <template #title>我的工作台</template>
            <el-menu-item index="1-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>我的工作台</template>
            <el-menu-item index="2-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>我的工作台</template>
            <el-menu-item index="3-1">111</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--//3 ⬆⬆⬆⬆⬆ 左侧 ⬆⬆⬆⬆⬆-->
      <!--//4 ⬇⬇⬇⬇⬇ 右下 ⬇⬇⬇⬇⬇-->
      <el-main>Main</el-main>
      <!--//4 ⬆⬆⬆⬆⬆ 右下 ⬆⬆⬆⬆⬆-->
    </el-container>
    <!--//1.1 ⬆⬆⬆⬆⬆ 布局容器 ⬆⬆⬆⬆⬆-->
  </el-container>
  <!--//1.0 ⬆⬆⬆⬆⬆ 布局容器 ⬆⬆⬆⬆⬆-->
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  //1布局容器
  height: 100vw;
  // 头部背景图
  .el-header {
    background-color: #373d41;
  }
  // 侧边栏背景图
  .el-aside {
    background-color: #373d41;
  }
  // 主页背景图
  .el-main {
    background-color: #eaedf1;
  }
  // 修复侧边栏突出的bug
  .el-menu {
    border-right: none;
  }
}
</style>
