<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    level1: {
      required: true,
      type: String
    },
    level2: {
      required: true,
      type: String
    }
  },
  created () { },
  data () {
    return {
      // ⬇⬇⬇⬇⬇ 开关量 ⬇⬇⬇⬇⬇

      // ⬆⬆⬆⬆⬆ 开关量 ⬆⬆⬆⬆⬆
      // ⬇⬇⬇⬇⬇ 数据 ⬇⬇⬇⬇⬇

      // ⬆⬆⬆⬆⬆ 数据 ⬆⬆⬆⬆⬆
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
