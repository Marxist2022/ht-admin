<template>
  <el-container class="container">
    <!-- //------ 顶部导航栏 ------ -->
    <el-header>
      <span
        ><img
          src="@/assets/1B62E8F3-4E8A-458D-B75D-C44462C926AA_1_105_c.jpeg"
          alt=""
      /></span>
      <span class="titel">公司管理系统</span>
    </el-header>
    <el-container>
      <!-- //------ 侧边栏 ------ -->
      <el-aside width="200px">
        <el-menu background-color="#373d41" text-color="#fff" unique-opened>
          <!-- //------ 用户管理 ------ -->
          <!-- //------ 一级列表 ------ -->
          <el-submenu
            v-for="(item, index) in MenusList"
            :key="index"
            :index="item.order + ''"
          >
            <template #title>{{ item.authName }}</template>
            <!-- //------ 二级列表 ------ -->
            <el-menu-item
              v-for="(item2, index) in item.children"
              :key="item2.order"
              :index="+item.order + '-' + index"
              @click="$router.push({ name: item2.path })"
              >{{ item2.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--//3 ⬆⬆⬆⬆⬆ 左侧 ⬆⬆⬆⬆⬆-->
      <!-- //------ 主橱窗 ------ -->
      <el-main>
        <router-view>
          <!-- //------ 二级路由视口内容区 ------ -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import { getToken } from '@/utils/auth'
export default {
  async created () {
    // --- 页面创建的时候就出发请求获得侧边栏表单 ---
    await this.$store.dispatch('menus/getMenus')
    this.MenusList = this.$store.state.menus.AsideList
    console.log(this.MenusList)
  },
  data () {
    return {
      // --- 侧边栏表单 ---
      MenusList: []
    }
  },
  methods: {},
  computed: {

  },
  watch: {},
  filters: {},
  components: {},
  mounted () {
    console.log(this.$store.state.menus.AsideList)
  }
}
</script>

<style scoped lang='less'>
.container {
  //1布局容器
  height: 100vw;
  // 头部背景图
  ::v-deep .el-header {
    background-color: #373d41;
    height: 60px !important;
    color: #fff;
    // ------ logo ------
    img {
      width: 60px;
      height: 60px;
    }
    .titel {
      color: #fff;
      font-size: 40px;
    }
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
