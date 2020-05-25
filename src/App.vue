<template>
  <div id="app">
    <a v-if="arrowPage" @click="$router.go(-1)">
      <img :src="arrow" class="arrow">
    </a>
    <app-navigation />
    <div id="overlay"></div>
    <div v-if="$route.path !== '/about' && $route.path !== '/'" class="small-logo"></div>
    <router-view/>
  </div>
</template>

<script>
import AppNavigation from '@/components/Navigation';
import arrow from '@/assets/icons/chevron-left-solid.svg';

export default {
  components: {
    AppNavigation
  },
  data () {
    return {
      arrow
    }
  },
  computed: {
    arrowPage() {
      switch(this.$route.name) {
        case 'questionnaire':
          return true;
        case 'results':
          return true;
        case 'update-profile':
          return true;
        case 'visa-planner':
          return true;
        case 'non-eu-category':
          return true;
        case 'visa-info-eu':
          return true;
        case 'eu-options':
          return true;
        case 'non-eu':
          return true;
        case 'visa-page':
          return true;
        case 'settings':
          return true;
        case 'delete-account':
          return true;
        case 'forgot-password':
          return true;
        default:
          return false;
      }
    }
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

#overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 30;
  display: none;
  background: rgba($color: $dark-grey, $alpha: 0.6);
  pointer-events: all;
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

p {
  margin: 0;
  padding: 0;
}

// For date picker
.unstyled {
    -webkit-appearance: none;
}
.unstyled::-webkit-inner-spin-button,
.unstyled::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}

input.form,
textarea.form {
  border: none !important;
  background: $lightest-grey !important;
  border-radius: 4px !important;
  padding: 14px $spacing !important;
}

input.form:focus,
textarea.form:focus {
  box-shadow: 0 0 0 3px $primary-yellow !important;
}

select.form:not([multiple]) {
  border: none !important;
  border-radius: 4px !important;
  padding: 14px $spacing !important;
  background-color: $lightest-grey;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='41' height='26' viewBox='0 0 41 26'%3E%3Cpath fill='%23606060' d='M0 5.382l19.983 19.983L40.14 5.208 34.932 0 19.869 15.062 4.84.032z' fill-rule='evenodd' style='&%2310; fill: %23b8c2cc;&%2310;'/%3E%3C/svg%3E");
}

select.form:not([multiple]):focus {
  box-shadow: 0 0 0 3px $primary-yellow !important;
}

label {
  line-height: 26px;
  color: $grey;
  font-weight: 500;
}
</style>
