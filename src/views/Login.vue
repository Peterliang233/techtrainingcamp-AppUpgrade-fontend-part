<template>
  <div class="login-wrap">
    <div class="main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>后台用户登录</h3>
        <el-divider></el-divider>
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-user-solid"  @click="submitForm('ruleForm')">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        pass: '',
        name: ''
      },
      rules: {
        pass: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    open2 () {
      this.$message({
        message: '注册成功',
        type: 'success'
      });
    },
    open4 () {
      this.$message.error("登录失败");
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLogin()
        } else {
          return false;
        }
      });
    },
    handleLogin () {
      this.$axios.
      post('/sign_in', {
        username: this.ruleForm.name,
        password: this.ruleForm.pass,
      }).then(res => {
        if (res.status === 200) {
          this.open2()
          localStorage.setItem('token', res.data.msg.token)
          localStorage.setItem('username', this.ruleForm.name)
          this.$router.replace({
            path: '/'
          })
        }
      }).catch(error => {
        this.open4(error)
      })
    }
  }
}
</script>

<style scoped>
h3 {
  color: #409EFF;
  font-size: 24px;
}
</style>
