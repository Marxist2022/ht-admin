<template>
  <div class="Appcontainer">
    <!-- //--- 面包屑 ---- -->
    <Breadcrumb level1="权限管理" level2="权限列表"></Breadcrumb>
    <div>
      <el-card>
        <!-- //组件 --- 表格 --->
        <el-table :data="RightsList" border style="width: 100%">
          <!-- //--- 序号# --- -->
          <el-table-column type="index" label="#" width="180">
          </el-table-column>
          <!-- //--- 权限名称 --- -->
          <el-table-column prop="authName" label="权限名称"> </el-table-column>
          <!-- //--- 路径 --- -->
          <el-table-column prop="path" label="路径"> </el-table-column>
          <!-- //--- 权限等级 --- -->
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <!-- //--- 权限等级 标签 --- -->
              <el-tag :type="rigthType[scope.row.level]" disable-transitions>{{
                rigthLevel[scope.row.level]
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRightsList } from '@/api/vip_list'
export default {
  async created () {
    try {
      const res = await getRightsList('list')// 获取权限列表s
      console.log('right', res)
      this.RightsList = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      // 1 ---- 要发送的数据 -----

      // 1 ---- 接收的数据 -----
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      RightsList: [], // 权限列表
      rigthLevel: ['等级一', '等级二', '等级三', '等级四', '等级五'], // 权限等级
      rigthType: ['light', 'success', 'warning'] // 权限等级
      // 1 ---- 开关量 -----

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
//1 ---- 表格初始化样式 ----
.container {
  background-color: #eaedf1;
}
.el-table {
  margin: 15px 0;
  font-size: 12px;
}
//1 ---- 表格初始化样式 ----
</style>
