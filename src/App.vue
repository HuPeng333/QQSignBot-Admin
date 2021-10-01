<template>
  <navigator v-if="!$route.meta['hideNav']" />
  <side-bar v-if="!$route.meta['hideNav']" />
  <router-view v-if="showRouter" />
</template>
<script>
import { defineComponent, nextTick, provide, ref } from 'vue'
import Navigator from '@/components/Navigator/Navigator.vue'
import SideBar from '@/components/SideBar/SideBar'
export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    Navigator
  },
  setup() {
    const showRouter = ref(true)
    const flushPage = () => {
      showRouter.value = false
      nextTick(() => {
        showRouter.value = true
      })
    }
    provide('flushPage', flushPage)
    return {
      showRouter
    }
  }
})
</script>

<style lang="scss">
#app {
  @include scale-method;
}
</style>
