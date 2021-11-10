<template>
  <div>
    <div style="height: 30%">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1" style="float: right;">
          <template slot="title">{{username}}</template>
          <el-menu-item index="1">注册账户</el-menu-item>
          <el-menu-item index="2">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div>
      这个是规则配置的界面
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      username: localStorage.getItem("username"),
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if(keyPath[1] === "1") {
        this.$router.push('/sign_up')
      }else{
        localStorage.removeItem("token")
        this.$router.push('/sign_in')
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
