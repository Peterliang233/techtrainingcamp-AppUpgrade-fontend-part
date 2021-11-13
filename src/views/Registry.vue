<template>
  <div class="login-wrap">
    <div class="main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>后台用户注册</h3>
        <el-divider></el-divider>
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <router-link to="/sign_in" style="float: right">注册完成，点我登录</router-link>
        <br>
        <el-form-item>
          <el-button type="success" icon="el-icon-magic-stick" @click="submitForm('ruleForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Global from "@/component/Global"
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        pass: [
          {
            required: true,
            pattern: '^[A-Za-z0-9]{6,12}$',
            message: '密码需要长度6-12的数字或英文字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            pattern: '^[A-Za-z]{5,10}$',
            message: '用户名只能是长度5-10的英文字符',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSignup()
        } else {
          return false;
        }
      });
    },
    handleSignup () {
      this.$axios.
      post('/user/sign_up', {
        username: this.ruleForm.name,
        password: this.ruleForm.pass,
      }).then(res => {
        if (res.data.code === 200) {
          Global.methods.successOpen('注册成功')
        }
      }).
      catch(error => { // 除了请求失败的情况
        Global.methods.failOpen(error.response.data.msg.detail)
      });
    }
  }
}
</script>

<style scoped>
h3 {
  color: #67C23A;
  font-size: 24px;
}
</style>
