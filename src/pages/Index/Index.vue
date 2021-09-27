<template>
  <div class="index">
    <div>
      <div class="index-title">
        <span>欢迎!</span>
      </div>
      <div class="index-decoration">
        <span>您可以现在查看所有机器人的数据,或者在此控制台上操纵机器人!</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="index-h2-title">
        <span>今日打卡进度</span>
      </div>
      <div class="index-decoration">
        <span>打卡进度 ({{ signCount }} / {{ totalCount }})</span>
      </div>
      <el-progress :percentage="totalCount === 0 ? 0 : Math.round((signCount / totalCount) * 100)" :stroke-width="20" :text-inside="true"></el-progress>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="index-h2-title">
        <span>收集任务进度</span>
      </div>
      <div>
        <div class="index-decoration">
          <span>{{ collectionTitle }} (激活中) ({{ collectionSubmitCount }} / {{ collectionTotal }})</span>
        </div>
        <el-progress
          :percentage="collectionTotal === 0 ? 0 : Math.round((collectionSubmitCount / collectionTotal) * 100)"
          :stroke-width="20"
          :text-inside="true"
        ></el-progress>
      </div>
      <div v-for="(item, index) in finishedCollections" :key="index">
        <div class="index-decoration">
          <span>{{ item.name }} (已经结束) ({{ item.submitCount }} / {{ item.totalCount }})</span>
        </div>
        <el-progress :percentage="Math.round((item.submitCount / item.totalCount) * 100)" status="success" :stroke-width="20" :text-inside="true"></el-progress>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="index-h2-title">
        <span>公告</span>
      </div>
      <div class="index-note">
        <note title="我是标题" submit-time="2021-09-25" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { ElDivider, ElProgress } from 'element-plus'
import { getSign } from '@/api/controller/SignController'
import { getAliveGroupStatistic, getFinishedStatistic } from '@/api/controller/StatisticController'
import Note from '@/pages/Index/Note.vue'
import { useStore } from 'vuex'
import safetyAjax from '@/hook/safetyAjax'
import { GroupStatistic } from '@/api/Response'

export default defineComponent({
  name: 'Index',
  components: {
    Note,
    ElDivider,
    ElProgress
  },
  setup() {
    const curGroup = toRef(useStore().state, 'curGroup')
    /**
     * 获取打卡情况
     */
    // 打卡人数
    const signCount = ref(0)
    //  一共的人数
    const totalCount = ref(0)

    // 发送打卡请求,获取数据
    const getSignStatus = () => {
      getSign({ groupCode: curGroup.value }).then((resp) => {
        signCount.value = resp.data.signCount
        totalCount.value = resp.data.totalCount
      })
    }
    // 判断vuex中有没有数据
    safetyAjax(curGroup, getSignStatus)

    /**
     * 收集情况
     */
    // 收集任务标题
    const collectionTitle = ref<string>()
    // 收集任务需要提交的数量
    const collectionTotal = ref(0)
    // 收集任务已经提交的数量
    const collectionSubmitCount = ref(0)
    const getAliveGroupStatisticStatus = () => {
      getAliveGroupStatistic({ groupCode: curGroup.value }).then((resp) => {
        collectionTitle.value = resp.data.name
        collectionTotal.value = resp.data.totalCount
        collectionSubmitCount.value = resp.data.submitCount
      })
    }
    safetyAjax(curGroup, getAliveGroupStatisticStatus)
    const finishedCollections = ref<Array<GroupStatistic>>([])
    getFinishedStatistic({ groupCode: '123' }).then((resp) => {
      finishedCollections.value = resp.data
    })
    return {
      signCount,
      totalCount,
      collectionTitle,
      collectionTotal,
      collectionSubmitCount,
      finishedCollections
    }
  }
})
</script>

<style lang="scss">
.index-note {
  margin-top: 10px;
}
.index-decoration {
  color: $color-info;
  font-size: 15px;
  margin: 10px 0;
}
.index-h2-title {
  font-size: 22px;
}
.index {
  @include admin-content;
}
.index-title {
  font-size: 30px;
  color: $color-main;
}
</style>
