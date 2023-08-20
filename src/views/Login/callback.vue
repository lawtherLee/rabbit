<script lang="ts" name="LoginCallback" setup>
import LoginHeader from "@/views/Login/components/LoginHeader.vue";
import LoginFooter from "@/views/Login/components/LoginFooter.vue";
</script>

<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div v-if="true" class="tab-content">绑定手机</div>
    <div v-else class="tab-content">完善资料</div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style lang="less" scoped>
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
