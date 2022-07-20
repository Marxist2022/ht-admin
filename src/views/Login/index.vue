<template>
  <!-- 底图 -->
  <div class="login-container">
    <!-- 中间框 -->
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <!-- //--------------------账号---------------------- -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- //--------------------密码---------------------- -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- //--------------------登录 按钮---------------------- -->
        <el-form-item class="btn-item">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      // --------------------用户信息----------------------
      loginForm: {
        username: 'admin', // 用户名称
        password: '123456'// 用户密码
      },
      // --------------------表单验证规则----------------------
      rules: { // 2.表单校验规则
        username: [// 用户名校验规则
          // 表单必须填写不能为空
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          // 表达输入长度3-8个字
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [// 密码校验规则
          // 表单必须填写不能为空
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // --------------------重置表单----------------------
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // --------------------登录----------------------
    async handleLogin () {
      try {
        // 等待dom生效才下一步
        await this.$refs.loginFormRef.validate()
        // console.log('校验成功')
        // 2.1登录
        try {
          // ----- 发起登录之后 再跳转 -----
          await this.$store.dispatch('user/login', this.loginForm)
          // todo待办 把token存在vuex中，并且持久化 localStorage
          this.$router.push('/home')
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        // 失败就弹框
        this.$message.error('登录表单校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
.login-container {
  // *背景
  width: 100vw; //背景宽度
  height: 100vh; //背景高度
  background: #2b4b6b; //背景底色
  display: flex; //让登录框模式
  justify-content: center; //让登录框水平剧中
  align-items: center; //让登录框垂直居中
  .form-box {
    //*中间登录框设置
    width: 28.125rem; //登录框宽度
    height: 15rem; //登录框高度
    background-color: #fff; //登录框背景色
    padding: 1.875rem 3.125rem; //登录框内边距
    border-style: border-box; //边框类型
    .btn-item {
      //*设置两个按钮
      text-align: right; //登录和重置按钮靠右边
    }
  }
}
</style>
