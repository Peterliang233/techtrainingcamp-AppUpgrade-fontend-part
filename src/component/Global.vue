<template>

</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Global",
  methods: {
    successOpen (msg) {
      Message({
        message: msg,
        type: 'success'
      });
    },
    failOpen (error) {
      Message.error(error);
    },
  }
}
</script>

<style scoped>

</style>
