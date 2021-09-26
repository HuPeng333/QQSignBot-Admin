<template>
  <div class="nav">
    <div class="nav-title">
      <span>QQSignBotAdmin</span>
    </div>
    <div class="nav-tool-bar">
      <div class="nav-group-select">
        <el-select v-model="curGroupCode">
          <el-option v-for="(item, index) in allowedGroup" :key="index" :value="item.groupCode">
            <span style="float: left">{{ item.groupCode }}</span>
            <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.groupName }}</span>
          </el-option>
        </el-select>
      </div>
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
import { defineComponent, ref, toRef, watch } from 'vue'
import UserDownMenu from '@/components/Navigator/UserDownMenu.vue'
import { useStore } from 'vuex'
import { ElSelect, ElOption } from 'element-plus'

export default defineComponent({
  name: 'AdminNavigator',
  components: {
    UserDownMenu,
    ElSelect,
    ElOption
  },
  setup() {
    // vuex
    const store = useStore()
    // 获取userState
    // eslint-disable-next-line no-undef
    const user = store.state.user as UserState
    // 当前下拉框展示的群号
    const curGroupCode = ref<string>('LOADING!')
    // 是否显示下拉框
    const showDownMenu = ref(false)
    // 当前登录的账户允许管理的群
    const allowedGroup = toRef(user, 'allowedGroup')

    // 若vuex中没有数据,则重新发送请求
    if (allowedGroup.value.length === 0) {
      store.dispatch('initUserInfo').then((code) => {
        curGroupCode.value = code
      })
    } else {
      curGroupCode.value = store.state.curGroup
    }
    // 当选中的群号改变时,修改vuex中的数据
    watch(curGroupCode, () => {
      store.dispatch('setCurGroup', curGroupCode.value)
    })
    return {
      showDownMenu,
      curGroupCode,
      allowedGroup
    }
  }
})
</script>

<style lang="scss">
.nav-group-select {
  height: 30px;
}
.nav-tool-bar {
  display: flex;
}
.nav-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  font-size: 25px;
  width: 100px;
  height: 40px;
  color: white;
}
.nav-title {
  font-size: 22px;
  margin-left: 10px;
  color: white;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 40px;
  z-index: 9999;
  background-color: $color-main;
}
</style>
