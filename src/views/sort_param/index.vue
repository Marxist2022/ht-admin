<template>
  <div class="user_list_container">
    <!-- //--- 面包屑 ---- -->
    <Breadcrumb level1="用户管理" level2="用户列表"></Breadcrumb>
    <div class="body">
      <el-card class="box-card"> </el-card>
    </div>
  </div>
</template>

<script>
// 组件
// - 标签分割
// 注 解释给以后自己看的
// & 可以调整的数据
export default {
  created () { },
  data () {
    return {
      //= ===== 要发送的数据 ======

      //= ===== 接收回来的数据 ======

      //= ===== 开关量 ======

      //= ===== 中继数据 ======

    }
  },
  methods: {

  },
  //= ===== 计算属性 ======
  computed: {},
  //= ===== 监听 ======
  watch: {},
  //= ===== 过滤器 ======
  filters: {},
  //= ===== 组件 ======
  components: {}
}
</script>

<style scoped>
.user_list_container {
  background-color: #eaedf1;
}

.el-table {
  margin: 15px 0;
  font-size: 12px;
}
.el-icon-warning {
  color: #e6a23c;
  font-size: 25px;
}
</style>
