<template>
  <div id="app">
    <div class="overlay"></div>
    <div v-if="$route.path !== '/'" class="small-logo"></div>
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

.overlay {
  display: none;
  width: 100%;
  position: fixed;
  z-index: 30;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: $dark-grey, $alpha: 0.8);
}

.small-logo {
  width: 35px;
  height: 35px;
  background: $light-grey;
  border-radius: 50px;
  position: absolute;
  top: 24px;
  right: 6vw;
}
</style>
