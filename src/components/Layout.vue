<template>
  <el-container class="page-container">
    <el-header>
      <div class="logo">云E办</div>
      <div class="action-header">
        <span> {{ userInfo.name }}</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="circleUrl" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus" @click="onLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import http from '@/utils/http'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { local } from '@/utils/storage'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const userInfo = ref<any>({})
    http.get('/adminInfo').then((res) => {
      userInfo.value = res
    })

    const router = useRouter()

    const onLogout = () => {
      ElMessageBox.confirm('确认要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        local.removeItem('TOKEN')
        local.removeItem('TOKENHEAD')
        router.push('/login')
      })
    }

    return {
      userInfo,
      onLogout
    }
  }
}
</script>

<style lang="less">
.page-container {
  height: 100%;
  .el-header {
    width: 100%;
    background-color: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 200px;
    }
    .action-header, .el-dropdown-link {
        display: flex;
        align-items: center;
        .el-dropdown {
            margin-left: 8px;
        }
    }
  }
}
</style>
