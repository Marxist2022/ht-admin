<template>
  <div class="Appcontainer">
    <!-- //--- 面包屑 ---- -->
    <Breadcrumb level1="权限管理" level2="角色列表"></Breadcrumb>
    <div>
      <!-- 卡片 -->
      <el-card>
        <!-- //组件 添加角色按钮 -->
        <el-button type="primary" @click="addFormVisible = true"
          >添加角色</el-button
        >
        <!-- //-----表格 -->
        <el-table :data="RoleList" border style="width: 100%">
          <!-- ---- -->
          <el-table-column type="expand" prop="children">
            <!-- //组件 下拉框 -->
            <template slot-scope="prop">
              <el-form
                inline
                class="demo-table-expand"
                style="padding: 20px 50px"
              >
                <!-- 一大行  ---->
                <el-row
                  style="
                    border-bottom: 1px solid #ebeef5;
                    border-top: 1px solid #ebeef5;
                  "
                  type="flex"
                  justify="space-between"
                  align="middle"
                  v-for="(level1, index) in prop.row.children"
                  :key="index"
                >
                  <!-- 1/2竖排 -->
                  <el-col :span="6">
                    <el-row>
                      <el-tag>
                        {{ level1.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-row>
                  </el-col>
                  <!-- 2/2竖排 -->
                  <el-col :span="18">
                    <el-row
                      style="padding: 10px 0; border-top: 1px solid #ebeef5"
                      type="flex"
                      justify="space-between"
                      align="middle"
                      v-for="(level2, index) in level1.children"
                      :key="index"
                    >
                      <el-col :span="4">
                        <el-tag type="success"> {{ level2.authName }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="20">
                        <el-tag
                          v-for="(level3, index) in level2.children"
                          :key="index"
                          style="margin: 8px"
                          @click="delRoleRightFn(prop.row.id, level3.id)"
                          v-show="level3.id === isDel ? false : true"
                        >
                          {{ level3.authName }}
                          <i class="el-icon-close"></i>
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <!-- ---- -->
          <el-table-column type="index" label="#" width="50px">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
          <el-table-column prop="address" label="操作">
            //--- 三个按钮 ---
            <template slot-scope="scope">
              <el-row :gutter="10">
                <!-- //-编辑 按钮-->
                <el-col :span="8">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="editRoleId(scope.row.id)"
                    >编辑</el-button
                  ></el-col
                >
                <!-- //-删除 按钮-->
                <el-col :span="8">
                  <el-button
                    @click="deleteRoleId(scope.row.id)"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    >删除</el-button
                  ></el-col
                >
                <!-- //-设置 按钮 -->
                <el-col :span="8">
                  <el-button
                    @click="setPermissions(scope.row.id)"
                    type="warning"
                    icon="el-icon-setting"
                    size="mini"
                    >分配权限</el-button
                  ></el-col
                >
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- //组件 添加角色 -->
    <el-dialog title="添加角色对话框" :visible.sync="addFormVisible">
      <!-- //& 有问题为什么v-if不能消失表格的数据 -->
      <el-form
        label-width="80px"
        :model="newRoleListInfo"
        :rules="rules"
        ref="newRoleListInfo"
        v-if="addFormVisible"
      >
        <!-- //---- 添加角色1/2 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newRoleListInfo.roleName"></el-input>
        </el-form-item>
        <!-- //---- 添加角色2/2 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="newRoleListInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- //---弹出框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- //组件 编辑弹框 -->
    <el-dialog title="编辑角色" :visible.sync="etidFormVisible">
      <!-- //& 有问题为什么v-if不能消失表格的数据 -->
      <el-form
        label-width="80px"
        :model="editRoleInfo"
        :rules="editRoleRules"
        ref="editRoleInfo"
        v-if="etidFormVisible"
      >
        <!-- //---- 添加角色1/2 角色名称 -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleInfo.roleName"></el-input>
        </el-form-item>
        <!-- //---- 添加角色2/2 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- //---弹出框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="etidFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- //组件 分配权限 -->

    <el-dialog
      title="分配权限"
      :visible.sync="setFormVisible"
      width="30%"
      v-if="setFormVisible"
    >
      <el-tree
        ref="myTree"
        :data="permissions"
        :props="{ label: 'authName' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectPedermissions"
      ></el-tree>
      <template #footer>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="setFormVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import { addRoleInfo, getRolesList, delRoleInfo, findRoleApi, editRoleApi, getPermissions, setRights, delRoleRight } from '@/api/role_list'
export default {
  async created () {
    this.getRolesList()
  },
  // ===== 数据 =====
  data () {
    return {
      // 1 ---- 要发送的数据 -----
      //= ====== 1添加角色数据 ======
      // ---ajax 添加用户对话框表单信息 ---
      newRoleListInfo: {
        roleName: '', // 角色名称
        roleDesc: ''// 角色描述
      },
      // --- 添加用户对话框表单校验 ---
      rules: {
        roleName: [// 角色名称校验
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [// 角色描述校验

        ]
      },
      //= ====== 2编辑角色数据 =======
      // ---ajax 添加用户对话框表单信息 ---
      editRoleInfo: {
        roleName: '', // 角色名称
        roleDesc: ''// 角色描述
      },
      // --- 添加用户对话框表单校验 ---
      editRoleRules: {
        roleName: [// 角色名称校验
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [// 角色描述校验
        ]
      },

      editId: null, // 编辑id
      permissionId: null, // 编辑id
      // 1 ---- 接收的数据 -----
      RoleList: [], // 角色列表
      permissions: [], // 权限列表
      idRole: [],
      selectPedermissions: [], // 选中的权限
      MenusList: [], // 菜单列表
      // 1 ---- 开关量 -----
      addFormVisible: false, // 添加角色弹窗
      etidFormVisible: false, // 编辑角色弹窗
      setFormVisible: false, // 分配权限
      delFormVisible: false, // 分配权限
      isDel: true // 删除按钮
    }
  },
  // ===== 方法 =====
  methods: {
    // --- 删除角色指定权限--
    delRoleRightFn (roleId, rightId) {
      console.log(roleId, rightId)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(roleId, rightId)

        try {
          const res = await delRoleRight(roleId, rightId)
          console.log(res)
          // this.RoleList.children.res
          this.isDel = rightId
          console.log('998', this.RoleList)
          const index = this.RoleList.findIndex(item => item.id === roleId)
          this.RoleList[index].children = res.data.data
          console.log(index)
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

    // ---确认树状图--
    async save () {
      try {
        // console.log(this.$refs.myTree.getCheckedKeys())
        const arr = this.$refs.myTree.getCheckedKeys()
        // console.log(arr.toString())
        await setRights(this.permissionId, arr.toString())// 发送权限设置
        // console.log(res.meta.msg)
        this.setFormVisible = false
        this.getRolesList()
      } catch (error) {
        console.log(error)
      }
    },
    // --- 获取权限 和 树状图-----
    async setPermissions (id) {
      this.permissionId = id// 获取被点击id
      this.setFormVisible = true
      const res = await getPermissions()// 获取树状图
      console.log('getPermissions', res)
      this.permissions = res.data.data// 树状图

      console.log('RoleList', this.RoleList)
      // 根据id在寻找
      const idFind = []// 中继数组 存放根据id查找的到数组
      this.RoleList.forEach(findid => {
        if (findid.id === id) {
          idFind.push(findid)
        }
      })
      // console.log('根据id查找的到数组', idFind)
      // 获取前面打勾的 递归
      idFind.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            level3.children.forEach(level4 => {
              this.selectPedermissions.push(level4.id)
            })
          })
        })
      })

      // & 分配权限
    },
    // --- 编辑 按钮按下之后弹出框1/2 ---
    async editRoleId (id) {
      console.log(id)
      this.editId = id// 设置编辑id
      try {
        const res = await findRoleApi(this.editId)
        console.log('查询角色', res)
        this.editRoleInfo.roleName = res.data.data.roleName// 设置编辑角色名称
        this.editRoleInfo.roleDesc = res.data.data.roleDesc// 设置编辑角色描述
        this.$nextTick(function () {
          this.etidFormVisible = true// 显示编辑弹框
        })
      } catch (error) {
        console.log(error)
      }
      console.log(this.editRoleInfo.roleName)
    },
    // --- 编辑 角色 确定2/2 ---
    async editRoleFn () {
      try {
        await editRoleApi(this.editId, this.editRoleInfo)// 发送编辑角色信息
        this.getRolesList()// 刷新角色列表
        this.etidFormVisible = false// 关闭编辑弹框
      } catch (error) {
        console.log(error)
      }
    },
    // --- 确定添加按钮1/1 ---
    addNewUser () {
      // 表单校验
      this.$refs.newRoleListInfo.validate(async (valid) => {
        if (valid) { // 如果成功
          try {
            // 发送请求
            console.log('1231231', this.newRoleListInfo.roleName, this.newRoleListInfo.roleDesc)
            const res = await addRoleInfo(this.newRoleListInfo.roleName, this.newRoleListInfo.roleDesc)
            console.log('1', res)
            // 刷新列表
            this.getRolesList()
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
        } else {
          this.$message.error({
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    // ----- 删除角色 事件1/1 ----
    async deleteRoleId (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoleInfo(id).then(res => {
          if (res.data.meta.status === 200) { // 删除成功
            console.log(res)
            this.$message.success(res.data.meta.msg)
            this.getRolesList()//! 有问题
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
    // ---- 获取 角色列表 -----
    async getRolesList () {
      try {
        const res = await getRolesList()
        console.log('角色列表', res)
        this.RoleList = res.data.data
      } catch (error) {
        console.log(error)
      }
    }

  },
  // ===== 计算属性 =====
  computed: {},
  // ===== 监听 =====
  watch: {},
  // ===== 过滤 =====
  filters: {},
  // ===== 组件 =====
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
