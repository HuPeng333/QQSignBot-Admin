<template>
  <div class="note">
    <el-link>{{ title }}</el-link>
    <div class="note-time">
      <span>{{ submitTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElLink } from 'element-plus'

export default defineComponent({
  name: 'Note',
  props: {
    /**
     * 标题
     */
    title: String,
    /**
     * 提交事件
     */
    submitTime: String,
    /**
     * 重定向地址
     */
    redirectUrl: {
      type: String,
      required: false
    }
  },
  components: {
    ElLink
  }
})
</script>

<style lang="scss">
.note-time {
  display: inline-block;
  font-size: 14px;
  color: $color-info;
}
.note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid skyblue;
  padding-bottom: 4px;
}
</style>
