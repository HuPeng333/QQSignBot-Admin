<template>
  <transition name="user-down-menu">
    <div v-if="showDownMenu" class="user-down-menu">
      <div>
        <el-link>消息</el-link>
      </div>
      <div>
        <el-link>个人中心</el-link>
      </div>
      <div>
        <el-link type="danger">退出登录</el-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElLink } from 'element-plus'

export default defineComponent({
  props: {
    showDownMenu: Boolean
  },
  components: {
    ElLink
  }
})
</script>

<style lang="scss">
.user-down-menu {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  font-size: 20px;
  opacity: 1;
  padding-top: 8px;
  box-sizing: border-box;
  text-wrap: none;
  line-height: normal;
  background-color: white;
  > div {
    width: 80px;
    margin: 4px auto;
    text-align: center;
  }
}
.user-down-menu-enter-from {
  width: 0;
  height: 0;
  opacity: 0;
}
.user-down-menu-enter-active {
  transition-property: height, width, opacity;
  transition-duration: 0.5s;
}
.user-down-menu-enter-to {
  @extend .user-down-menu;
}
.user-down-menu-leave-from {
  opacity: 1;
}
.user-down-menu-leave-active {
  transition: opacity 0.5s;
}
.user-down-menu-leave-to {
  opacity: 0;
}
</style>
