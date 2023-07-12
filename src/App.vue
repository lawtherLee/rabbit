<script lang="ts" setup>
import request from "@/utils/request.ts";

async function getData() {
  const res = await request.get('/home/index')
  console.log(res)
}

getData()
</script>

<template>
  <div>
    hello
    <button>login</button>

    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>

button {
  background-color: @xtxColor;
  .hoverShadow()
}
</style>
