<script lang="ts" name="CallbackPatch" setup>
import {
  useField,
  useForm,
  useValidateField,
  useValidateForm,
} from "vee-validate";
import {
  accountRule,
  codeRule,
  mobileRule,
  passwordRule,
  rePasswordRule,
} from "@/utils/validate";
import { useCountDown } from "@/hooks";
import Message from "@/components/message";
import useStore from "@/store";
import { useRouter } from "vue-router";

const { userStore } = useStore();
const router = useRouter();
// 1. 获取openId
let openId = "";
// 判断QQ是否登录
if (QC.Login.check()) {
  // 获取openId
  QC.Login.getMe((id: string) => {
    openId = id;
  });
}

// 表单校验

useForm({
  validationSchema: {
    account: accountRule,
    mobile: mobileRule,
    code: codeRule,
    password: passwordRule,
    repassword: rePasswordRule,
  },
});

const { errorMessage: accountError, value: account } =
  useField<string>("account");

const { errorMessage: passwordError, value: password } =
  useField<string>("password");
const { errorMessage: mobileError, value: mobile } = useField<string>("mobile");
const { errorMessage: codeError, value: code } = useField<string>("code");
const { errorMessage: repasswordError, value: repassword } =
  useField<string>("repassword");

const validForm = useValidateForm();
const bind = async () => {
  const res = await validForm();
  if (!res.valid) return;
  await userStore.qqPatchLogin({
    openId,
    mobile: mobile.value,
    code: code.value,
    account: account.value,
    password: password.value,
  });
  Message.success("注册成功");
  await router.push("/");
};

// 获取验证码
const validMobile = useValidateField("mobile");
const { time, start } = useCountDown(60);
const send = async () => {
  if (time.value > 0) return;
  // console.log('获取验证码')
  // 单独校验手机号
  const res = await validMobile();
  if (!res.valid) {
    return;
  }
  await userStore.sendQQPathMsg(mobile.value);
  Message.success("获取验证码成功");

  start();
};
</script>
<template>
  <div class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          v-model="account"
          class="input"
          placeholder="请输入用户名"
          type="text"
        />
      </div>
      <div class="error">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobile"
          class="input"
          placeholder="请输入手机号"
          type="text"
        />
      </div>
      <div class="error">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="code"
          class="input"
          placeholder="请输入验证码"
          type="text"
        />
        <span class="code" @click="send">
          {{ time === 0 ? "发送验证码" : `${time}s后发送` }}
        </span>
      </div>
      <div class="error">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="password"
          class="input"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="error">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="repassword"
          class="input"
          placeholder="请确认密码"
          type="password"
        />
      </div>
      <div class="error">{{ repasswordError }}</div>
    </div>
    <a class="submit" href="javascript:" @click="bind">立即提交</a>
  </div>
</template>

<style lang="less" scoped>
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