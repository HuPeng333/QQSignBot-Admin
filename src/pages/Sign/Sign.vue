<template>
  <div class="sign">
    <div class="sign-title">
      <span>群打卡</span>
    </div>
    <el-divider></el-divider>
    <div class="sign-process">
      <div class="sign-h2-title">
        <span>打卡进度</span>
      </div>
      <el-progress
        :percentage="totalUsers === 0 ? 0 : Math.round((signedUsers / totalUsers) * 100)"
        type="dashboard"
        :width="300"
        class="sign-percentage"
      ></el-progress>
      <div class="sign-decoration">
        <span>还剩{{ totalUsers - signedUsers }}个人没有打卡 ({{ totalUsers === 0 ? '0 / 0' : `${signedUsers} / ${totalUsers}` }})</span>
      </div>
    </div>
    <el-divider></el-divider>
    <unsigned-user-table />
    <singed-user-table />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { ElDivider, ElMessage, ElProgress } from 'element-plus'
import UnsignedUserTable from '@/pages/Sign/UnsignedUserTable.vue'
import SingedUserTable from '@/pages/Sign/SingedUserTable.vue'
import { useStore } from 'vuex'
import { getSign } from '@/api/controller/SignController'
import safetyAjax from '@/hook/safetyAjax'

export default defineComponent({
  name: 'Sign',
  components: {
    SingedUserTable,
    UnsignedUserTable,
    ElDivider,
    ElProgress
  },
  setup() {
    /**
     * 获取打卡统计图表
     */
    // 当前选中的组
    const curGroup = toRef(useStore().state, 'curGroup')
    // 总人数
    const totalUsers = ref(0)
    // 打卡人数
    const signedUsers = ref(0)
    // 发送ajax请求
    const getSignFun = () => {
      getSign({ groupCode: curGroup.value }).then((resp) => {
        if (resp.code === 0) {
          totalUsers.value = resp.data.totalCount
          signedUsers.value = resp.data.signCount
        } else {
          ElMessage.error?.(resp.message)
        }
      })
    }
    safetyAjax(curGroup, getSignFun)
    return {
      totalUsers,
      signedUsers
    }
  }
})
</script>

<style lang="scss">
.sign-decoration {
  font-size: 14px;
  color: $color-info;
}
.sign-process {
  text-align: center;
}
.sign-picture {
  display: flex;
  flex-direction: column;
}
.sign-h2-title {
  text-align: start;
  font-size: 22px;
  color: $text-primary;
}
.sign-title {
  font-size: 28px;
  color: $color-main;
}
.sign {
  @include admin-content;
  padding-bottom: 50px;
  margin-bottom: 50px;
}
</style>
