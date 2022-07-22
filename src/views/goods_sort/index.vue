<template>
  <div class="user_list_container">
    <!-- //--- 面包屑 ---- -->
    <Breadcrumb level1="商品管理" level2="商品分类"></Breadcrumb>
    <div class="body">
      <el-card class="box-card">
        <!-- //-- 头部 -->
        <el-row :gutter="10">
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <!-- //-添加按钮 -->
              <el-button type="primary" @click="addSortBtn">
                添加分类</el-button
              >
            </div>
          </el-col>
        </el-row>
        <!-- //-----表格 -->
        <!-- //注：搜索列表为空的时候 就把原来的放上去 -->
        <el-table
          :data="goodsSortList"
          stripe
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          style="width: 100%"
          border
          lazy
          row-key="cat_id"
          icon-class="el-icon-tree"
        >
          <!-- //-# 1/5-->
          <el-table-column type="index" label="#"> </el-table-column>
          <!-- //-分类名称 2/5 ok-->
          <el-table-column prop="cat_name" label="分类名称" style="width: 70px">
          </el-table-column>
          <!-- //-是否有效 3/5 ok-->
          <el-table-column
            prop="cat_deleted"
            label="是否有效"
            style="width: 70px"
          >
            <template slot-scope="scopes">
              <i
                :class="
                  scopes.row.cat_deleted !== 'ture'
                    ? 'el-icon-success'
                    : 'el-icon-error'
                "
                :style="{
                  color: scopes.row.cat_deleted !== 'ture' ? 'green' : 'red',
                }"
              >
              </i>
            </template>
          </el-table-column>
          <!-- //-排序 4/5 ok-->
          <el-table-column prop="cat_level" label="排序" style="width: 70px"
            ><template slot-scope="scopes">
              <el-tag :type="levelListType[scopes.row.cat_level]">
                {{ levelList[scopes.row.cat_level] }}</el-tag
              ></template
            ></el-table-column
          >
          <!-- //ok-操作 5/5-->
          <el-table-column prop="username" label="操作" style="width: 70px"
            ><template slot-scope="scopes">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="eidtSortVisibleFn(scopes.row.cat_id)"
                  >
                    编辑</el-button
                  ></el-col
                >
                <el-col :span="12">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="delFn(scopes.row.cat_id)"
                    >删除</el-button
                  ></el-col
                >
              </el-row>
            </template></el-table-column
          >
        </el-table>
        <!-- //组件：下面页码 ok-->
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <div class="block">
                <!-- //-页码 -->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagenum"
                  :page-sizes="[1, 2, 4, 6, 10]"
                  :page-size="page.pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalpage"
                >
                </el-pagination>
              </div></div
          ></el-col>
        </el-row>
        <!-- //组件：编辑分类弹窗 ok-->
        <el-dialog
          :visible="eidtSortVisible"
          title="编辑分类"
          :before-close="handleCloseEdit"
        >
          <el-form>
            <el-form-item label="分类名称" label-width="100px">
              <el-input
                v-model="eidtNewSort"
                placeholder="请输入分类"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="eidtSortFn()">提交</el-button>
              <el-button @click="eidtSortVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- //组件：添加分类 -->
        <el-dialog
          :visible="addSortVisible"
          title="添加商品分类"
          :before-close="handleCloseadd"
        >
          <el-form
            :model="addSoreForm"
            v-if="addSortVisible"
            :rules="addSoreRules"
          >
            <!-- //--- 分类名称 -- -->
            <el-form-item label="分类名称" label-width="90px" prop="cat_name">
              <el-input
                v-model="addSoreForm.cat_name"
                placeholder="请输入分类"
              ></el-input>
            </el-form-item>
            <!-- //--- 父级分类 -- -->
            <el-form-item label="父级分类:" label-width="90px">
              <div class="block">
                <el-cascader
                  :options="SortLevelList"
                  @change="handleChange"
                  @expand-change="handleExpan"
                  :props="{
                    label: 'cat_name',
                    value: 'cat_id',
                    checkStrictly: true,
                  }"
                  clearable
                ></el-cascader>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addNewSortFn()">提交</el-button>
            <el-button @click="addSortVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getGoodsRortList, delSortApi, eidtSortApi, addNewSortBtnApi, addNewSortApi } from '@/api/goods_sort'
export default {
  created () {
    this.getGoodsRortList()// 初始化获取数据
  },
  data () {
    return {
      //= ===== 要发送的数据 ======
      page: { // 上传数据
        pagenum: 1, // 当前页码
        pagesize: 4, // 1 设置默认显示 每页显示条数
        query: null// 查询条件 绑定的是搜索框的值
      },
      //= ===== 接收回来的数据 ======
      // --- 获取回来的goodsSortList ---
      goodsSortList: [], // 商品分类列表
      pagenum: null, // 返回回来的当前页码
      totalpage: null, // 返回回来的总记录数
      //= ===== 开关量 ======
      eidtSortVisible: false, // 编辑
      addSortVisible: false, // 添加分类
      //= ===== 中继数据 ======
      levelList: ['一级', '二级', '三级'], // 分类级别
      levelListType: ['light', 'success', 'warning'], // 分类级别
      eidtNewSort: '', // 编辑新的分类
      editId: '', // 获取要编辑的id
      SortLevelList: [], // 分类级别
      options: [], // 级联选择器
      //= ===== 表单验证 ======
      addSoreForm: {
        cat_name: '', // 添加分类名称
        cat_level: '0', // 分类层级默认为0
        cat_pid: '0'// 分类父 ID
      },
      addSoreRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        cat_level: [
          { required: false, message: '请输入父级分类', trigger: 'blur' }
        ],
        cat_pid: [
          { required: true, message: '请输入添加分类父 ID', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    // ok 联机选择器 展开的时候改变 数据的层级
    handleExpan (val) {
      console.log('val', val.length + 1)
      this.addSoreForm.cat_level = val.length + 1
    },
    // ok -- 添加新分类 确定按钮---
    async addNewSortFn () {
      try {
        const res = await addNewSortApi(this.addSoreForm)
        console.log(res)
        await this.getGoodsRortList()
        // console.log(this.addSoreForm)
        this.addSortVisible = false
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error)
      }
    },
    // ok--- 联机选择器选择数据变化 ---
    handleChange (value) {
      // console.log(value[value.length - 1])
      // 添加联机选择前选中的父级的id
      this.addSoreForm.cat_pid = value[value.length - 1]
    },
    // ok--- 添加分类 按钮时间----
    async addSortBtn () {
      this.addSoreForm.cat_name = ''
      this.addSoreForm.cat_level = '0' // 添加分类名称
      this.addSoreForm.cat_pid = '0' // 分类层级默认为0
      try {
        const res = await addNewSortBtnApi()
        console.log('获取2级列表', res)
        this.SortLevelList = res.data.data// 获取2级列表
        this.addSortVisible = true
      } catch (error) {
        console.log(error)
      }
    },
    // ok---  添加分类弹框的x ---
    handleCloseadd () {
      this.addSortVisible = false// 关闭添加分类弹框
    },
    // ok--- 编辑按钮事件 ---
    async eidtSortFn () {
      try {
        const res = await eidtSortApi(this.editId, this.eidtNewSort)
        console.log(res)
        this.eidtSortVisible = false
        this.getGoodsRortList()
      } catch (error) {
        console.log(error)
      }
    },
    eidtSortVisibleFn (id) {
      this.eidtSortVisible = true
      this.editId = id
    },
    // ok--- 编辑弹框的x ---
    handleCloseEdit () {
      this.eidtSortVisible = false
    },
    // ok --- 删除商品分类 ---
    delFn (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delSortApi(id)
          await this.getGoodsRortList()
        } catch (error) {
          console.log(error)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // ok --- 设置每页条数函数 ---
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getGoodsRortList()
    },
    // ok --- 设置当前页面函数 ---
    handleCurrentChange (val) {
      console.log(val)
      this.page.pagenum = val
      this.getGoodsRortList()
    },
    // ok --- 请求用户列表函数 ---
    async getGoodsRortList () {
      try {
        // 发送ajax
        const res = await getGoodsRortList(this.page)
        // console.log('用户列表', res)
        this.goodsSortList = await res.data.data.result// 列表
        this.pagenum = await res.data.data.pagenum + 1// & 返回回来的当前页码 返回的数据有问题 需要+1
        this.totalpage = await res.data.data.total// 返回回来的总记录数
        // console.log('列表', this.goodsSortList)
        // console.log('返回回来的当前页码', this.pagenum)
        // console.log('返回回来的总记录数', this.total)
      } catch (error) {
        console.log(error)
      }
    }
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
