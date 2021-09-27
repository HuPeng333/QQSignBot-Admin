<template>
  <div class="sign-users">
    <div class="sign-h2-title">
      <span>已打卡成员</span>
    </div>
    <el-table class="sign-table" :data="signedGroupUser" :default-sort="{ prop: 'lastSign', order: 'descending' }">
      <el-table-column label="排序" type="index" width="150"></el-table-column>
      <el-table-column label="QQ" prop="qq"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="打卡时间" prop="lastSign" :formatter="timeFormat" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { GroupUserInfo } from '@/api/Response'
import { useStore } from 'vuex'
import { getSignedUser } from '@/api/controller/SignController'
import safetyAjax from '@/hook/safetyAjax'

export default defineComponent({
  name: 'SingedUserTable',
  components: {
    ElTableColumn,
    ElTable
  },
  setup() {
    const store = useStore()
    /**
     * ===========发送ajax,获取已打卡成员===========
     */
    // 当前选中的组
    const curGroup = toRef(useStore().state, 'curGroup')
    // 已经打卡了的成员列表
    const signedGroupUser = ref<Array<GroupUserInfo>>([])
    // 发送ajax请求
    const getSignedUserFun = () => {
      getSignedUser({ groupCode: store.state.curGroup }).then((resp) => {
        if (resp.code === 0) {
          signedGroupUser.value = resp.data
        } else {
          ElMessage.error?.(resp.message)
        }
      })
    }
    safetyAjax(curGroup, getSignedUserFun)
    // 格式化日期 格式为: 月-日 时:分
    const timeFormat = (row: number, column: number, cellValue: string) => {
      const date = new Date(Number.parseInt(cellValue))
      const fixZero = (num: number): string => (num < 10 ? '0' + num : num.toString())
      return `${fixZero(date.getMonth())}-${fixZero(date.getDate())} ${fixZero(date.getHours())}:${fixZero(date.getMinutes())}`
    }
    return {
      signedGroupUser,
      timeFormat
    }
  }
})
</script>

<style lang="scss"></style>
