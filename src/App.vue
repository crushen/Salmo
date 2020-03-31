<template>
  <div id="app">
    <app-header />
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header';

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

#app {
  font-family: 'sofia-pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-font;
}

#nav {
  padding: 30px;
}

#nav a.router-link-active {
  font-style: italic;
}
</style>
