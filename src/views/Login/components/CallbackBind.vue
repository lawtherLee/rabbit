<script lang="ts" name="CallbackBind" setup>
import { ref } from "vue";
import { QQUserInfo } from "@/types/user";
import { useField, useForm } from "vee-validate";
import { codeRule, mobileRule } from "@/utils/validate.ts";

const userInfo = ref<QQUserInfo>({} as QQUserInfo);
if (QC.Login.check()) {
  QC.api("get_user_info").success((resp: any) => {
    console.log(resp);
    userInfo.value = resp.data;
  });
}

// 表单功能
useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule,
  },
});
const { value: mobile, errorMessage: mobileErrMsg } = useField("mobile");
const { value: code, errorMessage: codeErrMsg } = useField("code");
</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="userInfo.figureurl_qq_2" alt="" />
      <p>
        Hi，{{ userInfo.nickname }}
        欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~
      </p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobile"
          class="input"
          placeholder="绑定的手机号"
          type="text"
        />
      </div>
      <div class="error">{{ mobileErrMsg }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="code"
          class="input"
          placeholder="短信验证码"
          type="text"
        />
        <span class="code">发送验证码</span>
      </div>
      <div class="error">{{ codeErrMsg }}</div>
    </div>
    <a class="submit" href="javascript:">立即绑定</a>
  </div>
</template>

<style lang="less" scoped>
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>
