<template>
  <div class="container">
    <!-- //组件 --- 面包屑 1---- -->
    <Breadcrumb level1="商品管理" level2="商品列表"></Breadcrumb>
    <!-- //组件 主体卡片 -->
    <div class="body">
      <el-card class="box-card">
        <!-- //-- 头部 -->
        <el-row :gutter="10">
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <!-- //-搜索框 -->
              <el-input
                placeholder="请输入内容"
                v-model="page.query"
                class="input-with-select"
              >
                <!-- //-搜索按钮 -->
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="search_btn"
                ></el-button>
              </el-input></div
          ></el-col>
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <!-- //-添加按钮 -->
              <el-button type="primary" @click="addUser"> 添加商品</el-button>
            </div></el-col
          >
        </el-row>
        <!-- //-----表格 -->
        <!-- //注：搜索列表为空的时候 就把原来的放上去 -->
        <el-table :data="goodsList" stripe style="width: 100%" border>
          <!-- //-# -->
          <el-table-column type="index" label="#"> </el-table-column>
          <!-- //-姓名 -->
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
          </el-table-column>
          <!-- //-后面三个按钮操作 -->
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <!-- //-编辑 按钮-->
                <el-col :span="8">
                  <el-button
                    @click="getEditUserInfo(scope.row)"
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                  ></el-button
                ></el-col>
                <!-- //-删除 按钮-->
                <el-col :span="8">
                  <el-button
                    @click="deleteUserId(scope.row.id)"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                  ></el-button
                ></el-col>
                <!-- //-设置 按钮 -->
                <el-col :span="8">
                  <el-button
                    @click="getSetUserInfo(scope.row)"
                    type="warning"
                    icon="el-icon-setting"
                    size="mini"
                  ></el-button
                ></el-col>
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
    </div>
    <!-- //组件：添加用户卡片组件 -->
    <el-dialog title="添加用户对话框" :visible.sync="addFormVisible">
      <el-form
        label-width="80px"
        :model="newgoodsListInfo"
        :rules="rules"
        ref="newgoodsListInfo"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newgoodsListInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newgoodsListInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newgoodsListInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="newgoodsListInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- //---弹出框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUser('newgoodsListInfo')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- //组件： 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form
        label-width="80px"
        :model="newgoodsListInfo"
        :rules="rules"
        ref="newgoodsListInfo"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="newgoodsListInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newgoodsListInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="newgoodsListInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- //--- 编辑用户弹出框  确定 取消按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="setFormVisible">
      <p>当前的用户:{{ setUserInfo.username }}</p>
      <p>当前的角色:{{ setUserInfo.nowRole }}</p>
      <p>
        <span>分配新角色:</span>
        <el-select v-model="setUserInfo.serRole" placeholder="请选择">
          <el-option
            v-for="(role, index) in roleList"
            :key="index"
            :label="role.roleName"
            :value="role.id"
          >
          </el-option>
        </el-select>
      </p>
      <!-- //--- 编辑用户弹出框  确定 取消按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="setFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SetUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, setSwitchType, addNewUserApi, delUserInfo, editUserInfo, setUserInfo, getrolesList } from '@/api/goods_list.js'
export default {
  created () {
    // --- 页面创建就获取用户列表 ---
    this.getGoodsList()
  },
  data () {
    return {
      // ---ajax 添加用户对话框表单信息 ---
      newgoodsListInfo: {
        username: '卷卷',
        password: '123456',
        email: '123@qq.com',
        mobile: '13132324334'
      },
      // --- 添加用户对话框表单校验 ---
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2到7个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2到7个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
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
        userId: '', // 用户id
        username: '', // 用户名称
        nowRole: '', // 当前角色
        serRole: '', // 分配新角色
        setRoleName: ''// 分配新角色名称
      },
      // --- 获取来的角色列表 ---
      roleList: [] // 角色列表
    }
  },
  // 1 ---------------分界----------------------
  methods: {
    // --- 后台获取角色列表 获取单条信息 齿轮按钮  ---
    async getSetUserInfo (setInfo) {
      try {
        const res = await getrolesList()// 获取角色列表
        // console.log('获取角色列表', res)
        // console.log('列表', setInfo)
        this.roleList = res.data.data// 角色列表
        console.log('分配按钮单条信息', setInfo)
        this.setUserInfo.username = setInfo.username// 用户名称
        this.setUserInfo.userId = setInfo.id// 用户id
        this.setUserInfo.nowRole = setInfo.role_name// 当前角色
        this.setFormVisible = true// 显示分配角色对话框
      } catch (error) {
        console.log(error)
      }
    },
    // --- 设置最新的角色  ---
    async SetUserInfo () {
      this.setFormVisible = false// 关闭分配角色对话框
      try {
        console.log('role', this.setUserInfo.serRole, 'userid', this.setUserInfo.username)
        const res = await setUserInfo(this.setUserInfo.userId, this.setUserInfo.username)// 传递用户id和角色id
        console.log('提交新角色的结果返回', res)
        if (res.data.meta.status === 200) { // 更新成功
          this.$message.success(res.data.meta.msg)
        } else { // 更新失败
          this.$message.error(res.data.meta.msg)
        }
        this.getGoodsList()
      } catch (error) {
        console.log(error)
      }
    },
    // 1 ---------------编辑用户信息按钮模块----------------------
    // --- 获取 要编辑 用户信息  ---
    async getEditUserInfo (editInfo) {
      this.editFormVisible = true// 显示编辑用户对话框
      this.editId = editInfo.id
      this.newgoodsListInfo.username = editInfo.username
      this.newgoodsListInfo.email = editInfo.email
      this.newgoodsListInfo.mobile = editInfo.mobile
    },

    // --- 编辑用户信息提交  ---
    async editUserInfo () {
      try {
        await editUserInfo(this.editId, this.newgoodsListInfo.email, this.newgoodsListInfo.mobile)
        this.getGoodsList()
        this.editFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    // 1 ---------------####----------------------
    // --- 删除用户信息按钮  包含了弹出框---
    async deleteUserId (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserInfo(id).then(res => {
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
    // --- 确定添加按钮 ---
    addNewUser () {
      // 表单校验
      this.$refs.newgoodsListInfo.validate((valid) => {
        if (valid) { // 如果成功
          this.addNewUserApi()
        } else {
          this.$message.error({
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    // --- 添加用户api 请求 ---
    async addNewUserApi () {
      try {
        // 发送请求
        const res = await addNewUserApi(this.newgoodsListInfo)
        // 刷新列表
        this.getGoodsList()
        // 提示
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
        this.addFormVisible = false
      } catch (error) {
        console.log(error)
        this.$message.error({
          message: error.data.meta.msg
        })
      }
    },
    // --- 添加用户按钮事件 ---
    addUser () {
      this.addFormVisible = true
    },
    // --- 搜索按钮事件 ---
    async search_btn () {
      // --- 搜索关键词过滤返回赋给表格数组 ---
      this.getGoodsList()
    },
    // --- 状态开关 事件 ---
    async switchFn (uId, type) {
      try {
        await setSwitchType(uId, type)// 1 修改状态
        this.$message({
          message: '修改用户状态成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    },
    // --- 设置每页条数函数 ---
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getGoodsList()
    },
    // --- 设置当前页面函数 ---
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.getGoodsList()
    },
    // --- 请求用户列表函数 ---
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
