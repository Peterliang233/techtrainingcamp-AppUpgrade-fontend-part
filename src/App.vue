<template>
  <router-view/>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
.main {
  text-align: center;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #42b983;
  font-size: 15px;
}
a:hover {
  color: coral;
}
</style>
