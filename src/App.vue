<template>
  <div id="app">
<<<<<<< HEAD
    <div id="overlay"></div>
    <div v-if="$route.path !== '/'" class="small-logo"></div>
=======
    <div class="overlay"></div>
>>>>>>> parent of 33f1bf5... Added logo to top of page when not on home page
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
  background: white;
  min-height: 100vh;
}

// .overlay {
//   visibility: hidden;
//   opacity: 0;
//   width: 100%;
//   position: fixed;
//   z-index: 30;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background: rgba($color: $dark-grey, $alpha: 0.8);
//   transition: 0.2s;
//   transition-delay: 0.3s;
// }

#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.2s;
  transition-delay: 1s;
  z-index: -10;

  &.is-active {
    background: rgba($color: $dark-grey, $alpha: 0.8);
    pointer-events: all;
    transition-delay: 0.45s;
  }
}
<<<<<<< HEAD



.small-logo {
  width: 35px;
  height: 35px;
  background: $light-grey;
  border-radius: 50px;
  position: absolute;
  top: 24px;
  right: 6vw;
}
=======
>>>>>>> parent of 33f1bf5... Added logo to top of page when not on home page
</style>
