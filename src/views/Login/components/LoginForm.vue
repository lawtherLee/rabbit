<script lang="ts" name="LoginForm" setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const loginType = ref<"account" | "mobile">("account");

const onChange = () => {
  console.log("复选框变化了");
};
// 表单数据和校验
// 定义校验
const simpleSchema = {
  account(value: string) {
    if (value && value.trim()) {
      return true;
    }
    return "用户名不合法";
  },
  password(value: string) {
    if (value && value.trim()) {
      return true;
    }
    return "密码不合法";
  },
  isAgree(value: boolean) {
    if (value) {
      return true;
    }
    return "请勾选协议";
  },
};
useForm({
  validationSchema: simpleSchema,
});
// 创建校验
const { value: account, errorMessage: accountErr } = useField("account");
const { value: password, errorMessage: passwordErr } = useField("password");
const { value: isAgree, errorMessage: isAgreeErr } =
  useField<boolean>("isAgree");
const onLogin = () => {
  console.log("发送请求");
};
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a
        href="javascript:"
        @click="loginType = loginType === 'account' ? 'mobile' : 'account'"
      >
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
            <input placeholder="请输入手机号" type="text" />
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input placeholder="请输入验证码" type="password" />
            <span class="code">发送验证码</span>
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
      <img
        alt=""
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
      />
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
