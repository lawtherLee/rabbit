<script lang="ts" setup>
import { useRouter } from "vue-router";
import useStore from "@/store";
import Confirm from "@/components/confirm/index.ts";

const router = useRouter();
const { userStore } = useStore();

const onLogout = async () => {
  await Confirm("小兔", "确认退出吗");
  userStore.logout();
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li>
          <a href="javascript:">
            <i class="iconfont icon-user"></i>
            {{ userStore.profile.nickname || userStore.profile.account }}
          </a>
        </li>
        <li><a href="javascript:" @click="onLogout">退出登录</a></li>
        <li>
          <a href="javascript:" @click="router.push('/login')">请先登录</a>
        </li>
        <li><a href="javascript:">免费注册</a></li>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>