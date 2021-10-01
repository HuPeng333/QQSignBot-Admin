<template>
  <div class="statistic-h2-title">
    <span>已经完成的收集</span>
  </div>
  <el-table :data="tableData" empty-text="加载中">
    <el-table-column label="收集名称" prop="name"></el-table-column>
    <el-table-column label="提交数" prop="submitCount"></el-table-column>
    <el-table-column label="未提交数" prop="totalCount"></el-table-column>
    <el-table-column label="发布时间" prop="startTime" :formatter="plusTableTimeFormat"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-link type="primary" @click="openDialog(scope.row.id)">查看详细</el-link>
      </template>
    </el-table-column>
  </el-table>
  <el-divider />
  <el-pagination
    background
    layout="prev, pager, next"
    :total="statisticMaxPageLength"
    v-model:current-page="currentPage"
    class="statistic-pagination"
    v-if="tableData.length"
  />
  <suspense>
    <template #default>
      <div v-if="showDialog">
        <statistic-detail-dialog :id="curId" v-model:showDetail="showDialog" />
      </div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, watchEffect } from 'vue'
import { ElTable, ElTableColumn, ElLink, ElPagination, ElDivider } from 'element-plus'
import { useStore } from 'vuex'
import { getMaxStatisticPageLength, getStatistics } from '@/api/controller/StatisticController'
import { GroupStatistic } from '@/api/Response'
import plusTableTimeFormat from '@/hook/plusTableTimeFormat'
const StatisticDetailDialog = defineAsyncComponent(() => import('./Dialog/StatisticDetailDialog.vue'))

export default defineComponent({
  name: 'StatisticTable',
  components: {
    StatisticDetailDialog,
    ElTable,
    ElTableColumn,
    ElLink,
    ElPagination,
    ElDivider
  },
  setup() {
    const curGroupCode = useStore().state.curGroup
    const tableData = ref<Array<GroupStatistic>>([])
    // 发送ajax请求,获取列表数据
    const getTableData = (curPage?: number) => {
      // 清除数据
      tableData.value = []
      getStatistics({ groupCode: curGroupCode, page: curPage }).then((resp) => {
        if (resp.code === 0) {
          tableData.value = resp.data
        } else {
          console.error(resp.data)
        }
      })
    }

    // 查看收集的详细页面
    const curId = ref<number>(0)
    // 设置当前选中的表格id
    const openDialog = (id: number) => {
      curId.value = id
      showDialog.value = true
    }
    // 是否打卡对话框,用于显示收集详细信息
    const showDialog = ref(false)

    // 分页的最大值
    const statisticMaxPageLength = ref(0)
    getMaxStatisticPageLength({ groupCode: curGroupCode }).then((resp) => {
      if (resp.code === 0) {
        // element-plus这里, 50表示一共有5页
        statisticMaxPageLength.value = resp.data * 10
      } else {
        console.error(resp.message)
      }
    })
    // 当前选中的页码
    const currentPage = ref(1)

    // 检查页码变化,重新执行ajax请求
    watchEffect(() => getTableData(currentPage.value))

    return {
      tableData,
      plusTableTimeFormat,
      curId,
      showDialog,
      openDialog,
      currentPage,
      statisticMaxPageLength
    }
  }
})
</script>

<style lang="scss"></style>
