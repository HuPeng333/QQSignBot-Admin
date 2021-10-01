<template>
  <el-dialog :title="`收集:${detail.name}`" v-model="show" :lock-scroll="false" width="70%" append-to-body>
    <div>
      <h2>已经提交的数据</h2>
    </div>
    <el-table :data="detail.submittedData" :height="350">
      <el-table-column prop="qq" label="用户qq"></el-table-column>
      <el-table-column prop="text" label="提交内容"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" :formatter="plusTableTimeFormat"></el-table-column>
    </el-table>
    <div>
      <h2>以下成员未提交(QQ号)</h2>
      <div class="detail-uncommitted">
        <span v-for="(item, index) in detail.uncommittedUsers" :key="index">{{ item.qq }}({{ item.nickName }})</span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { ElDialog, ElLoading, ElTable, ElTableColumn } from 'element-plus'
import { getStatisticDetail } from '@/api/controller/StatisticController'
import plusTableTimeFormat from '@/hook/plusTableTimeFormat'

export default defineComponent({
  name: 'StatisticDetailDialog',
  components: {
    ElDialog,
    ElTable,
    ElTableColumn
  },
  props: {
    /**
     * 当前统计的id
     */
    id: {
      type: Number,
      required: true
    },
    showDetail: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:showDetail', 'update:id'],
  async setup(props, { emit }) {
    const loading = ElLoading.service({ fullscreen: true })
    const show = ref(props.showDetail)
    watchEffect(() => emit('update:showDetail', show.value))
    watchEffect(() => (show.value = props.showDetail))
    const detail = (await getStatisticDetail(props.id)).data
    loading.close()
    return {
      show,
      detail,
      plusTableTimeFormat
    }
  }
})
</script>

<style lang="scss">
.detail-uncommitted {
  font-size: 15px;
  color: $color-info;
  > span {
    margin-left: 10px;
  }
}
</style>
