<template>
  <div class="statistic-h2-title">
    <span>正活跃中的收集</span>
  </div>
  <div v-if="aliveStatistic" class="alive-statistic">
    <div class="alive-process">
      <el-progress :percentage="Math.round((aliveStatistic?.submitCount / aliveStatistic?.totalCount) * 100)" type="dashboard" :width="300" />
    </div>
    <div class="alive-statistic-desc">
      <div class="alive-title">
        <span>{{ aliveStatistic?.name }}</span>
      </div>
      <div class="alive-decoration">
        <span>提交人数: {{ aliveStatistic?.submitCount }}</span>
      </div>
      <div class="alive-decoration">
        <span>未提交人数: {{ aliveStatistic?.totalCount - aliveStatistic?.submitCount }}</span>
      </div>
      <div class="alive-detail-buttons">
        <el-button type="primary" round @click="showDialog = true">查看详细</el-button>
        <el-button type="danger" round @click="stopCollection">停止收集</el-button>
      </div>
    </div>
  </div>
  <el-empty description="目前没有激活的收集" v-else></el-empty>
  <statistic-detail-dialog v-model:showDetail="showDialog" :id="aliveStatistic?.id" v-if="showDialog" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, toRef } from 'vue'
import { ElEmpty, ElProgress, ElButton, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { getAliveStatisticProcess, stopStatistic } from '@/api/controller/StatisticController'
import { useStore } from 'vuex'
const StatisticDetailDialog = defineAsyncComponent(() => import('./Dialog/StatisticDetailDialog.vue'))

export default defineComponent({
  name: 'AliveStatisticTable',
  components: {
    ElEmpty,
    ElProgress,
    ElButton,
    StatisticDetailDialog
  },
  async setup() {
    const curGroupCode = toRef(useStore().state, 'curGroup')
    const aliveStatistic = (await getAliveStatisticProcess({ groupCode: curGroupCode.value })).data
    const showDialog = ref(false)
    // 停止收集
    const stopCollection = () => {
      ElMessageBox.confirm('确认要停止收集吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = ElLoading.service({ fullscreen: true })
        if (aliveStatistic?.id) {
          stopStatistic(aliveStatistic.id).then((resp) => {
            if (resp.code === 0) {
              loading.close()
              ElMessage({
                type: 'info',
                message: '已停止收集!'
              })
            } else {
              ElMessage({
                type: 'error',
                message: resp.message
              })
            }
          })
        }
      })
    }
    return {
      aliveStatistic,
      showDialog,
      stopCollection
    }
  }
})
</script>

<style lang="scss">
.alive-detail-buttons {
  margin-top: 20px;
}
.alive-decoration {
  font-size: 15px;
  margin-top: 15px;
  color: $color-info;
}
.alive-process {
  padding-right: 200px;
}
.alive-statistic-desc {
  padding-right: 100px;
}
.alive-statistic {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.alive-title {
  margin-top: 40px;
  font-size: 22px;
}
</style>
