<template>
  <div style="height: 30%">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color= "#000000"
      active-text-color="#ffd04b">
      <el-menu-item index="1">添加新版本规则</el-menu-item>
      <el-menu-item index="2">添加规则白名单</el-menu-item>
      <el-submenu index="3" style="float: right;">
        <template slot="title">{{username}}</template>
        <el-menu-item index="1">注册账户</el-menu-item>
        <el-menu-item index="2">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      username: localStorage.getItem("username"),
      activeIndex: '3',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (keyPath[0]){
        case '3':
          if(keyPath[1] === "1") {
            this.$router.push('/sign_up')
          }else{
            localStorage.removeItem("token")
            this.$router.push('/sign_in')
          }
          break
        case '2':
          this.$router.push('/whitelist')
          break
        default:
          this.$router.push('/rule')
      }
    }
  }
}
</script>

<style>
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 100px!important;
}
body{
  margin: 0px;
  padding: 0px;
}
</style>
