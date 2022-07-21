<template>
  <div class="user_list_container">
    <!-- //--- 面包屑 ---- -->
    <Breadcrumb level1="订单管理" level2="订单列表"></Breadcrumb>
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
        </el-row>
        <!-- //-----表格 -->
        <!-- //注：搜索列表为空的时候 就把原来的放上去 -->
        <el-table :data="userList" stripe style="width: 100%" border>
          <!-- //-# -->
          <el-table-column type="index" label="#"> </el-table-column>
          <!-- //-订单编号 -->
          <el-table-column
            prop="order_number"
            label="订单编号"
            style="width: 70px"
          ></el-table-column>
          <!-- //-订单价格 -->
          <el-table-column prop="order_price" label="订单价格">
          </el-table-column>
          <!-- //-是否付款 -->
          <el-table-column prop="order_pay" label="是否付款">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.order_pay === '3' ? 'success' : 'danger'"
                >{{ scope.row.order_pay === "3" ? "已支付" : "未支付" }}</el-tag
              >
            </template>
          </el-table-column>
          <!-- //-是否发货 -->
          <el-table-column prop="is_send" label="是否发货"> </el-table-column>

          <el-table-column prop="create_time" label="下单时间">
            <template slot-scope="scope">
              {{ scope.row.create_time | relativeTime }}</template
            >
          </el-table-column>
          <!-- //& -后面按钮操作 -->
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
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="修改收货地址" :visible.sync="editFormVisible">
      <el-cascader :options="cityOptions" :value="city" change-on-select>
      </el-cascader>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from '@/utils/city_data2017_element.js'
import { getOrdersListApi, editUserInfo } from '@/api/order_list'
export default {
  created () {
    // --- 页面创建就获取用户列表 ---
    this.getOrdersList()
  },
  data () {
    return {
      // --- 添加用户对话框开关 ---
      editFormVisible: false,

      // --- 上传所需要的数据 ---
      page: { // 上传数据
        query: null, // 查询条件 绑定的是搜索框的值
        pagenum: 1, // 当前页码
        pagesize: 10 // 1 设置默认显示 每页显示条数
      },
      // --- 获取回来的userList ---
      userList: [], // 用户列表
      pagenum: null, // 返回回来的当前页码
      totalpage: null, // 返回回来的总记录数
      // --- 获取回来的 editId ---
      editId: '',
      cityOptions: cityOptions,
      city: ''
    }
  },
  // 1 ---------------分界----------------------
  methods: {
    // 1 -----编辑用户信息按钮模块------
    editFn () {
      console.log('city', this.city)
      this.editFnFormVisible = false
    },
    // --- 获取 要编辑 用户信息  ---
    async getEditUserInfo (editInfo) {
      this.editFormVisible = true// 显示编辑用户对话框
      console.log(editInfo)
    },

    // --- 编辑用户信息提交  ---
    async editUserInfo () {
      try {
        await editUserInfo(this.editId, this.newUserListInfo.email, this.newUserListInfo.mobile)
        this.getOrdersList()
        this.editFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    // 1 --------- 下面组件  -------------

    // --- 搜索按钮事件 ---
    async search_btn () {
      // --- 搜索关键词过滤返回赋给表格数组 ---
      this.getOrdersList()
    },
    // --- 请求用户列表函数 ---
    async getOrdersList () {
      try {
        // 发送ajax
        const res = await getOrdersListApi(this.page)
        // console.log('用户列表', res)
        this.userList = await res.data.data.goods// 列表
        this.pagenum = await res.data.data.pagenum// 返回回来的当前页码
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
.user_list_container {
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
