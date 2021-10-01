<template>
  <div class="statistic">
    <div class="statistic-title">
      <span>群收集</span>
    </div>
    <el-divider />
    <suspense>
      <template #default>
        <alive-statistic-table />
      </template>
      <template #fallback>
        <el-skeleton :rows="5" animated />
      </template>
    </suspense>
    <statistic-table />
    <el-divider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDivider, ElSkeleton } from 'element-plus'
import StatisticTable from '@/pages/GroupStatistic/StatisticTable.vue'
import AliveStatisticTable from '@/pages/GroupStatistic/AliveStatisticTable.vue'

export default defineComponent({
  name: 'GroupStatistic',
  components: {
    AliveStatisticTable,
    StatisticTable,
    ElDivider,
    ElSkeleton
  }
})
</script>

<style lang="scss">
.statistic-pagination {
  margin-top: 40px;
  text-align: center;
}
.statistic-h2-title {
  font-size: 22px;
}
.statistic-title {
  font-size: 28px;
  color: $color-main;
}
.statistic {
  @include admin-content;
}
</style>
