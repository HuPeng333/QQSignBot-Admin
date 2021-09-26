<template>
  <navigator v-if="!$route.meta['hideNav']" />
  <side-bar v-if="!$route.meta['hideNav']" />
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import Navigator from '@/components/Navigator/Navigator.vue'
import SideBar from '@/components/SideBar/SideBar'
export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    Navigator
  }
})
</script>

<style lang="scss">
#app {
  @include scale-method;
}
</style>
