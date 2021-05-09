<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="title">云E办系统</div>

      <el-form ref="ruleForm" :model="form" label-width="80px">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user-solid"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-unlock"
            show-password
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="code">
          <div class="kaptcha-box">
            <el-input
              v-model="form.code"
              class="code-input"
              placeholder="验证码"
            />
            <div class="kaptcha">
              <img
                v-if="toggleRefresh"
                src="/api/unauth/kaptcha"
                @click="toggleRefresh = !toggleRefresh"
              />
              <img
                v-else
                src="/api/unauth/kaptcha"
                @click="toggleRefresh = !toggleRefresh"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loginLoading"
            :disabled="!form.username || !form.password || !form.code"
            type="primary"
            @click="onLogin()"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import http from '@/utils/http'
import { reactive, ref } from 'vue'
import { local } from '@/utils/storage'
import { useRouter } from 'vue-router'


export default {
  setup() {
    const form = reactive({
      username: '',
      password: '',
      code: ''
    })

    const toggleRefresh = ref(false)
    const loginLoading = ref(false)
    const router = useRouter()

    const onLogin = () => {
      loginLoading.value = true
      http.post<{token:string,tokenHead:string}>('/unauth/login', form)
          .then((res) => {
            local.setItem("TOKEN",res.token)
            local.setItem("TOKENHEAD",res.tokenHead)
            router.push('/welcome')
          })
          .catch(() => {
            toggleRefresh.value = !toggleRefresh.value
          })
          .finally(() => {
            loginLoading.value = false
          })
    }

    return {
      form,
      toggleRefresh,
      onLogin,
      loginLoading
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 420px;
    height: 320px;
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.075);
    padding: 16px;
    padding-right: 80px;
    .title {
      height: 64px;
      text-align: center;
      line-height: 64px;
      font-size: 20px;
      font-weight: bold;
    }
    button {
      width: 100%;
    }
    .kaptcha-box {
      display: flex;
      .code-input {
        width: 80%;
      }
      .kaptcha {
        width: 150px;
        text-align: right;
      }
    }
  }
}
</style>
