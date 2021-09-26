<template>
  <el-scrollbar class="side-bar" view-class="side-bar-scroll">
    <div class="side-bar-select bar-hover" :style="checkSelected('/')">
      <router-link to="/" class="bar-link">
        <span class="iconfont">&#xe639; </span>
        <span>首页</span>
      </router-link>
    </div>
    <div class="side-bar-select bar-hover" :style="checkSelected('/t')">
      <router-link to="/" class="bar-link">
        <span class="iconfont">&#xe624; </span>
        <span>群打卡</span>
      </router-link>
    </div>
    <div class="side-bar-select bar-hover" :style="checkSelected('/t')">
      <router-link to="/" class="bar-link">
        <span class="iconfont">&#xe618; </span>
        <span>群收集</span>
      </router-link>
    </div>
    <div class="side-bar-select bar-hover" :style="checkSelected('/t')">
      <router-link to="/" class="bar-link">
        <span class="iconfont">&#xe614; </span>
        <span>自动打卡</span>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElScrollbar } from 'element-plus'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideBar',
  components: {
    ElScrollbar
  },
  setup() {
    const route = useRoute()
    // 判断当前选项是否被选中,并返回其对应样式
    const checkSelected = (path: string): string => {
      if (route.path === path) {
        // 被选中
        return 'background-color: #8cd5ff'
      } else {
        // 没有被选中,默认样式
        return ''
      }
    }

    return {
      checkSelected
    }
  }
})
</script>

<style lang="scss">
.bar-hover {
  transition: background-color 0.5s;
  &:hover {
    background-color: #8cd5ff;
  }
}
.side-bar-select {
  padding: 10px;
}
.bar-link {
  padding: 0 10px;
  text-decoration: none;
  font-size: 17px;
  color: white;
}
.side-bar-scroll {
  padding-bottom: 200px;
}
.side-bar {
  position: fixed;
  left: 0;
  width: 140px;
  height: 100vh;
  padding-bottom: 20px;
  background-color: #46a2ff;
}
</style>
