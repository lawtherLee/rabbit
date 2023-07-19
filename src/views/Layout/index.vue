<script lang="ts" name="layout" setup>
import AppTopNav from "@/views/Layout/components/AppTopNav.vue";
import AppHeader from "@/views/Layout/components/AppHeader.vue";
import AppFooter from "@/views/Layout/components/AppFooter.vue";
import AppHeaderSticky from "@/views/Layout/components/AppHeaderSticky.vue";
</script>
<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <div style="height: 1000px">
    <router-view />
  </div>
  <AppFooter />
</template>

<style></style>
