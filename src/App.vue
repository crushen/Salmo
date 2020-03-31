<template>
  <div id="app">
    <app-navigation />
    <router-view/>
  </div>
</template>

<script>
import AppNavigation from '@/components/Navigation';

export default {
  components: {
    AppNavigation
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: $sans-serif;
  color: $dark-font;
}
</style>
