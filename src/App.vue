<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="scss">
#app {
  font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
  @include scale-method;
}
</style>
