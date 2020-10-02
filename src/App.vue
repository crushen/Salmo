<template>
  <div id="app">
    <!-- <button
      v-if="arrowPage && innerWidth < 1100"
      @click="$router.go(-1)"
      class="arrow-btn aria-btn">
      <img :src="arrow" class="arrow">
    </button> -->

    <mobile-nav v-if="innerWidth < 600" />
    <sidebar-nav v-else />

    <div id="overlay"></div>

    <!-- <img 
      v-if="$route.path !== '/about' && $route.path !== '/'"
      src="@/assets/logo/colour.svg" 
      alt="Salmo logo"
      class="small-logo"> -->

    <div class="content-wrapper">
      <!-- <transition name="page" mode="out-in"> -->
        <router-view />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import mobileNav from '@/components/nav/MobileNav';
import sidebarNav from '@/components/nav/SidebarNav';
import arrow from '@/assets/icons/back.svg';

export default {
  components: {
    mobileNav,
    sidebarNav
  },
  data () {
    return {
      innerWidth: null,
      arrow
    }
  },
  computed: {
    arrowPage() {
      switch(this.$route.name) {
        case 'home':
          return false;
        case 'profile':
          return false;
        case 'login':
          return false;
        case 'about':
          return false;
        case 'visa-info':
          return false;
        // case 'results':
        //   return false;
        default:
          return true;
      }
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    })

    window.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    })

    window.addEventListener('keydown', event => {
      if(event.keyCode === 9) {
        document.body.classList.remove('using-mouse');
      }
    });
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

:focus {
  outline: auto;
}

body.using-mouse :focus {
  outline: none;
}

.page-enter-active,
.page-leave-active {
  transition: 0.4s;
}

.page-enter, 
.page-leave-to {
  opacity: 0;
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
  opacity: 0;
  visibility: hidden;
  background: rgba($color: $dark-grey, $alpha: 0.5);
  pointer-events: all;
  transition: 0.4s;
  pointer-events: none;
}

.small-logo {
  width: 35px;
  opacity: 0.8;
  position: absolute;
  top: 24px;
  right: 6vw;
}

p {
  margin: 0;
  padding: 0;
}

// Alert transitions
.alert-enter,
.alert-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.alert-enter-active,
.alert-leave-active {
  transition: 0.6s;
}

.alert-enter-active {
  transition-delay: 0.2s;
}

// For date picker
// .unstyled {
//     -webkit-appearance: none;
// }
// .unstyled::-webkit-inner-spin-button,
// .unstyled::-webkit-calendar-picker-indicator {
//     display: none;
//     -webkit-appearance: none;
// }

// input.form,
// textarea.form {
//   border: none !important;
//   background: $lightest-grey !important;
//   border-radius: 4px !important;
//   padding: 14px $spacing !important;
// }

// input.form:focus,
// textarea.form:focus {
//   box-shadow: 0 0 0 3px $primary-yellow !important;
// }

// select.form:not([multiple]) {
//   border: none !important;
//   border-radius: 4px !important;
//   padding: 14px $spacing !important;
//   background-color: $lightest-grey;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='41' height='26' viewBox='0 0 41 26'%3E%3Cpath fill='%23606060' d='M0 5.382l19.983 19.983L40.14 5.208 34.932 0 19.869 15.062 4.84.032z' fill-rule='evenodd' style='&%2310; fill: %23b8c2cc;&%2310;'/%3E%3C/svg%3E");
// }

// select.form:not([multiple]):focus {
//   box-shadow: 0 0 0 3px $primary-yellow !important;
// }

// label {
//   line-height: 26px;
//   color: $grey;
//   font-weight: 500;
// }

// Tablet
@media screen and (min-width: 600px) {
  .content-wrapper {
    margin-left: 100px;
  }

  .small-logo {
    display: none;
  }
}
</style>
