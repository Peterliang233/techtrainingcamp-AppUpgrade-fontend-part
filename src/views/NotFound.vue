<template>
  <div style="text-align: center">
    访问界面无效,请重试......<br>
    {{time}}秒后跳转到登录界面
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      time: 0,
    }
  },
  methods: {
    countDown() {
      this.time --;
    },
  },
  mounted() {
    this.time = 5;
    setInterval(this.countDown, 1000);
  },
  watch: {
    time: function (newVal) {
      if (newVal === 0) {
        this.$router.push('/sign_in');
      }
    }
  }
}
</script>

<style scoped>

</style>
