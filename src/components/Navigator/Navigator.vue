<template>
  <div class="nav">
    <div class="nav-title">
      <span>QQSignBotAdmin</span>
    </div>
    <div>
      <div class="nav-user" @mouseenter="showDownMenu = true" @mouseleave="showDownMenu = false">
        <div>
          <span class="iconfont">&#xe623;</span>
        </div>
        <!-- 下拉菜单 -->
        <user-down-menu :showDownMenu="showDownMenu" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserDownMenu from '@/components/Navigator/UserDownMenu.vue'
export default defineComponent({
  name: 'AdminNavigator',
  components: { UserDownMenu },
  setup() {
    const showDownMenu = ref(false)
    return {
      showDownMenu
    }
  }
})
</script>

<style lang="scss">
.nav-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  font-size: 25px;
  width: 100px;
  color: white;
}
.nav-title {
  font-size: 22px;
  color: white;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: $color-main;
}
</style>
