<script lang="ts" name="LoginForm" setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import useStore from "@/store";
import { useRouter } from "vue-router";
import Message from "@/components/message/index.ts";
import { useCountDown } from "@/hooks";

const router = useRouter();
const { userStore, cartStore } = useStore();
const loginType = ref<"account" | "mobile">("account");

const onChange = () => {
  console.log("复选框变化了");
};

// 点击切换登录方式
const onCheckLogin = () => {
  loginType.value = loginType.value === "account" ? "mobile" : "account";
  resetForm();
};
// 表单数据和校验
// 定义校验
const simpleSchema = {
  account(value: string) {
    if (!value) return "请输入用户名";
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
    return true;
  },
  password(value: string) {
    if (!value) return "请输入密码";
    if (!/^\w{6,12}$/.test(value)) return "密码必须是6-24位字符";
    return true;
  },
  mobile(value: string) {
    if (!value) return "请输入手机号";
    if (!/^1[3-9]\d{9}$/.test(value)) return "手机号格式错误";
    return true;
  },
  code(value: string) {
    if (!value) return "请输入验证码";
    if (!/^\d{6}$/.test(value)) return "验证码是6个数字";
    return true;
  },
  isAgree(value: boolean) {
    if (!value) return "请同意隐私条款";
    return true;
  },
};
const { validate: validateForm, resetForm } = useForm({
  validationSchema: simpleSchema, // 提供校验规则
  initialValues: {
    // 配置默认值
    account: "xiaotuxian001",
    password: "123456",
    mobile: "13666666666",
    // code: "123456",
    isAgree: false,
  },
});
// 创建校验
const {
  value: account,
  errorMessage: accountErr,
  validate: accountValidate,
} = useField<string>("account");
const {
  value: password,
  errorMessage: passwordErr,
  validate: passwordValidate,
} = useField<string>("password");
const {
  value: isAgree,
  errorMessage: isAgreeErr,
  validate: isAgreeValidate,
} = useField<boolean>("isAgree");

// 短信登录
// const { validate: mobileValidate } = useForm({
//   validationSchema: {},
//   initialValues: {},
// });
const {
  value: mobile,
  errorMessage: mobileErr,
  validate: mobileValidate,
} = useField<string>("mobile");
const {
  value: code,
  errorMessage: codeErr,
  validate: codeValidate,
} = useField<string>("code");

// 点击登录
const onLogin = async () => {
  // 对表单所有项统一校验
  // const { valid } = await validateForm();
  // if (!valid) return;
  // 对表单所有项分开校验
  const { valid: accountValid } = await accountValidate();
  const { valid: passwordValid } = await passwordValidate();
  const { valid: isAgreeValid } = await isAgreeValidate();
  // 账号登录
  if (loginType.value === "account") {
    if (!accountValid || !passwordValid || !isAgreeValid) return;
    try {
      await userStore.accountLogin(account.value, password.value);
    } catch (err) {
      Message.error("用户名或密码错误");
    }
  } else {
    // 短信登录
    const { valid: mobileValid } = await mobileValidate();
    const { valid: codeValid } = await codeValidate();
    if (!mobileValid || !codeValid) return;
    await userStore.mobileLogin(mobile.value, code.value);
  }
  await router.push("/");
  Message.success("登录成功");
  // 合并购物车
  await cartStore.mergeStorageCart();
};

// 发送验证码
const mobileRef = ref<HTMLInputElement | null>(null);
// 倒计时
// let timer = -1;
const { time, start } = useCountDown(60);
const sendCode = async () => {
  if (time.value > 0) return;
  const { valid } = await mobileValidate();
  if (!valid) {
    return mobileRef.value?.focus();
  }
  await userStore.getCode(mobile.value);
  Message.success("验证码已发送");
  start();
  // time.value = 60;
  // // 倒计时
  // timer = window.setInterval(() => {
  //   time.value--;
  //   if (time.value === 0) {
  //     clearInterval(timer);
  //   }
  // }, 1000);
};
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:" @click="onCheckLogin">
        <i
          :class="{
            'icon-user': loginType === 'account',
            'icon-msg': loginType === 'mobile',
          }"
          class="iconfont icon-user"
        ></i>
        {{ loginType === "account" ? "使用短信登录" : "使用账号登录" }}
      </a>
    </div>
    <!--    表单-->
    <div class="form">
      <template v-if="loginType === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              v-model="account"
              placeholder="请输入用户名或手机号"
              type="text"
            />
          </div>
          <div v-show="accountErr" class="error">
            <i class="iconfont icon-warning" />{{ accountErr }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              v-model="password"
              placeholder="请输入密码"
              type="password"
            />
          </div>
          <div v-show="passwordErr" class="error">
            <i class="iconfont icon-warning" />{{ passwordErr }}
          </div>
        </div>
      </template>
      <!--      短信登录-->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              ref="mobileRef"
              v-model="mobile"
              placeholder="请输入手机号"
              type="text"
            />
          </div>
          <div v-show="mobileErr" class="error">
            <i class="iconfont icon-warning" />{{ mobileErr }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" placeholder="请输入验证码" type="password" />
            <span class="code" @click="sendCode">
              {{ time ? time + "s" : "发送验证码" }}
            </span>
          </div>
          <div v-show="codeErr" class="error">
            <i class="iconfont icon-warning" />{{ codeErr }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!--          复选框-->
          <XtxCheckbox v-model="isAgree" @change="onChange"
            >我同意
          </XtxCheckbox>
          <a href="javascript:">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:">《服务条款》</a>
        </div>
        <div v-show="isAgreeErr" class="error">
          <i class="iconfont icon-warning" />{{ isAgreeErr }}
        </div>
      </div>
      <a class="btn" href="javascript:" @click="onLogin">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
        ><img
          alt="QQ登录"
          border="0"
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
      /></a>

      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>