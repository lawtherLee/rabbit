<script lang="ts" name="LoginCallback" setup>
import LoginHeader from "@/views/Login/components/LoginHeader.vue";
import LoginFooter from "@/views/Login/components/LoginFooter.vue";
import { ref } from "vue";
import CallbackBind from "@/views/Login/components/CallbackBind.vue";
import CallbackPatch from "@/views/Login/components/CallbackPatch.vue";

const hasAccount = ref(true);

const isLogin = QC.Login.check();
if (isLogin) {
  QC.Login.getMe((openId: string) => {
    console.log(openId);
  });
}
</script>

<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        :class="{ active: hasAccount }"
        href="javascript:"
        @click="hasAccount = true"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        :class="{ active: !hasAccount }"
        href="javascript:"
        @click="hasAccount = false"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div v-if="hasAccount" class="tab-content">
      <CallbackBind />
    </div>
    <div v-else class="tab-content">
      <CallbackPatch />
    </div>
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
