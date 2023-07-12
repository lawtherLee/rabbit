<script lang="ts" setup>
import request from "@/utils/request.ts"

async function getData() {
  const res = await request.get('/home/index')
  console.log(res)
}

getData()
</script>

<template>
  <div>
    hello
  </div>
</template>

<style scoped>

</style>
