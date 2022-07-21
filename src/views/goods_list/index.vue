<template>
  <div class="container">
    <!-- //组件 --- 面包屑 1---- -->
    <Breadcrumb level1="商品管理" level2="商品列表"></Breadcrumb>
    <!-- //组件 主体卡片 -->
    <div class="body">
      <el-card class="box-card" v-show="!addFormVisible">
        <!-- //-- 头部 -->
        <el-row :gutter="10">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <!-- //组件 -搜索框 1-->
              <el-input
                placeholder="请输入内容"
                v-model="page.query"
                class="input-with-select"
              >
                <!-- //组件 -搜索按钮 1-->
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="search_btn"
                ></el-button>
              </el-input></div
          ></el-col>
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <!-- //组件 -添加按钮 -->
              <el-button type="primary" @click="addGoods"> 添加商品</el-button>
            </div></el-col
          >
        </el-row>
        <!-- //-----表格 -->
        <!-- //注：搜索列表为空的时候 就把原来的放上去 -->
        <el-table :data="goodsList" stripe style="width: 100%" border>
          <!-- //-# -->
          <el-table-column type="index" label="#"> </el-table-column>
          <!-- //-商品名称 -->
          <el-table-column
            prop="goods_name"
            label="商品名称"
            style="width: 70px"
          ></el-table-column>
          <!-- //-商品价格(元) -->
          <el-table-column prop="goods_price" label="商品价格(元)">
          </el-table-column>
          <!-- //-商品重量 -->
          <el-table-column prop="goods_weight" label="商品重量">
          </el-table-column>
          <!-- //-创建时间 -->
          <el-table-column prop="add_time" label="创建时间">
            <!-- //-状态 开关插槽 -->
            <template slot-scope="scope">
              {{ scope.row.add_time | relativeTime }}</template
            >
          </el-table-column>
          <!-- //-后面2个按钮操作 -->
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <!-- //-编辑 按钮-->
                <el-col :span="12">
                  <el-button
                    @click="getEditGoodsInfo(scope.row)"
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    >编辑</el-button
                  ></el-col
                >
                <!-- //-删除 按钮-->
                <el-col :span="12">
                  <el-button
                    @click="deleteGoodsId(scope.row.goods_id)"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    >删除</el-button
                  ></el-col
                >
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!-- //组件：下面页码 -->
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <div class="block">
                <!-- //-页码 -->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagenum - 0"
                  :page-sizes="[1, 2, 5, 10]"
                  :page-size="page.pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalpage"
                >
                </el-pagination>
              </div></div
          ></el-col>
        </el-row>
      </el-card>
      <!-- //---添加商品 按钮--- -->
      <el-card class="box-card" v-show="addFormVisible">
        <!-- //组件 上面灰色的提示栏 -->
        <el-alert title="添加商品信息" center type="info" show-icon> </el-alert>
        <!-- //组件 步骤栏 -->
        <el-steps
          :space="200"
          :active="0"
          style="padding: 15px 0"
          finish-status="success"
          align-center
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- //组件  侧边滑动开关 -->
        <el-tabs :tab-position="'left'" @tab-click="getGoodsAttr('formName1')">
          <!-- //--- 左边滑框 基本信息 1/5-->
          <el-tab-pane label="基本信息">
            <!-- //组件 表格 -->
            <el-form :model="newgoodsListInfo" ref="formName1" :rules="rules">
              <!-- //--- 商品名称 -->
              <el-form-item prop="goods_name" label="商品名称">
                <el-input v-model="newgoodsListInfo.goods_name"></el-input>
              </el-form-item>
              <!-- //--- 商品价格 -->
              <el-form-item prop="goods_price" label="商品价格">
                <el-input
                  type="number"
                  v-model="newgoodsListInfo.goods_price"
                ></el-input>
              </el-form-item>
              <!-- //--- 商品重量 -->
              <el-form-item prop="goods_weight" label="商品重量">
                <el-input
                  type="number"
                  v-model="newgoodsListInfo.goods_weight"
                ></el-input>
              </el-form-item>
              <!-- //& 数据绑定和 表单校验规则 -->
              <!-- //--- 商品数量 -->
              <el-form-item prop="goods_number" label="商品数量">
                <el-input
                  type="number"
                  v-model="newgoodsListInfo.goods_number"
                ></el-input>
              </el-form-item>
              <!-- //--- 商品分类 -->
              <el-form-item prop="goods_cat" label="商品分类">
                <el-cascader
                  v-model="value"
                  :props="{ label: 'cat_name', value: 'cat_id', children }"
                  :options="options"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- //--- 左边滑框 商品参数 2/5-->
          <el-tab-pane label="商品参数">
            <el-form>
              <el-form-item prop="goods_attr" label="商品参数"> </el-form-item>
              <el-form-item prop="goods_attr" label="商品参数"> </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- //--- 左边滑框 商品属性 3/5-->
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <!-- //--- 左边滑框 商品图片 4/5-->
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <!-- //--- 左边滑框 商品内容 5/5-->
          <el-tab-pane label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- //组件： 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form
        label-width="80px"
        :model="newgoodsListInfo"
        :rules="rules"
        ref="newgoodsListInfo"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="newgoodsListInfo.goods_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="goods_price">
          <el-input v-model="newgoodsListInfo.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goods_weight">
          <el-input v-model="newgoodsListInfo.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <!-- //--- 编辑用户弹出框  确定 取消按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, getGoodsCategoriesListApi, delGoodsInfo, editGoodsInfo, getattributesListApi } from '@/api/goods_list.js'
export default {
  created () {
    // --- 页面创建就获取用户列表 ---
    this.getGoodsList()
    this.getGoodsCategoriesList()
  },
  data () {
    return {
      // ---ajax 添加用户对话框表单信息 ---
      newgoodsListInfo: {
        goods_name: '卷卷', // 商品名称*
        goods_cat: '123456', // 分类列表*
        goods_price: '123456', // 价格*
        goods_number: '', // 数量*
        goods_weight: '123@qq.com', // 重量*
        goods_introduce: '', // 介绍
        pics: '', // 上传的图片临时路径（对象）
        attrs: '' // 商品的参数（数组）
      },
      // --- 添加用户对话框表单校验 ---
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
        // add_time: [
        //   { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
        //   { required: true, message: '请输入手机号', trigger: 'blur' }
        // ]
      },
      // --- 添加用户对话框开关 ---
      addFormVisible: false, // 添加新用户对话框开关
      editFormVisible: false, // 编辑用户对话框开关
      setFormVisible: false, //  设置用户对话框开关 分配角色
      // --- 上传所需要的数据 ---
      page: { // 上传数据
        pagenum: 1, // 当前页码
        pagesize: 5, // 1 设置默认显示 每页显示条数
        query: null// 查询条件 绑定的是搜索框的值
      },
      // --- 获取回来的goodsList ---
      goodsList: [], // 用户列表
      pagenum: null, // 返回回来的当前页码
      totalpage: null, // 返回回来的总记录数
      // --- 获取回来的 editId ---
      editId: '',
      // --- 获取回来的 setId ---
      setUserInfo: {
        goods_id: '', // 用户id
        goods_name: '', // 商品名称
        goods_price: '', // 价格
        goods_number: '', // 数量
        goods_weight: '', // 重量
        goods_introduce: ''// 介绍
      },
      // --- 获取来的角色列表 ---
      roleList: [], // 角色列表
      options: [], // 商品分类列表
      value: [], // 商品分类列表
      GoodsCategoriesList: []// 商品分类列表
    }
  },
  // 1 ------- 分界 ----------
  methods: {

    // --- 商品参数tab 被点击 1 ---
    getGoodsAttr (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await getattributesListApi(this.value[this.value.length - 1])
            console.log('7878', res)
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // --- 商品分类 下拉框 变化 2/2---
    handleChange (value) {
      console.log(value)
      this.newgoodsListInfo.goods_cat = value
      console.log(value)
    },
    // --- 基本信息1/2 ---
    async getGoodsCategoriesList () {
      try {
        const res = await getGoodsCategoriesListApi()
        this.options = res.data.data
        console.log('商品分类列表', res)
        this.GoodsCategoriesList = res.data.data
      } catch (error) {
        console.log(error)
      }
    },

    // 1 ---------------编辑用户信息按钮模块----------------------
    // --- 获取 要编辑 goods信息  ---
    async getEditGoodsInfo (editInfo) {
      console.log('编辑的用户信息', editInfo)
      this.editFormVisible = true// 显示编辑用户对话框
      this.editId = editInfo.goods_id// id
      this.newgoodsListInfo.goods_name = editInfo.goods_name// 名称
      this.newgoodsListInfo.goods_price = editInfo.goods_price// 价格
      this.newgoodsListInfo.goods_number = editInfo.goods_number// 数量
      this.newgoodsListInfo.goods_weight = editInfo.goods_weight// 重量
    },

    // --- 编辑用户信息提交  ---
    async editGoodsInfo () {
      try {
        await editGoodsInfo(this.editId,
          this.newgoodsListInfo.goods_name,
          this.newgoodsListInfo.goods_price,
          this.newgoodsListInfo.goods_number,
          this.newgoodsListInfo.goods_weight)
        this.getGoodsList()
        this.editFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    // 1 ---------------####----------------------
    // --- 删除用户信息按钮  包含了弹出框---
    async deleteGoodsId (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGoodsInfo(id).then(res => {
          if (res.data.meta.status === 200) { // 删除成功
            this.$message.success(res.data.meta.msg)
            this.getGoodsList()
          } else { // 删除失败
            this.$message.error(res.data.meta.msg)
          }
        })
      }).catch(() => { // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // --- 添加商品 按钮事件 1---
    addGoods () {
      this.addFormVisible = true
    },
    // --- 搜索按钮事件 1---
    async search_btn () {
      // --- 搜索关键词过滤返回赋给表格数组 1---
      this.getGoodsList()
    },
    // --- 设置每页条数函数 1---
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getGoodsList()
    },
    // --- 设置当前页面函数 1---
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.getGoodsList()
    },
    // --- 请求用户列表函数 1---
    async getGoodsList () {
      try {
        // 发送ajax
        const res = await getGoodsList(this.page)
        console.log('用户列表', res)
        this.goodsList = await res.data.data.goods// 列表
        this.pagenum = await res.data.data.pagenum// 返回回来的当前页码
        this.totalpage = await res.data.data.total// 返回回来的总记录数
        // console.log('列表', this.goodsList)
        // console.log('返回回来的当前页码', this.pagenum)
        // console.log('返回回来的总记录数', this.total)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  background-color: #eaedf1;
}

::v-deep .top {
  height: 40px;
  display: flex;
  align-items: center;
  &:nth-child(3) {
    margin-right: 20px;
  }
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
