<template>
  <div id="app">
    <!-- <button
      v-if="arrowPage && innerWidth < 1100"
      @click="$router.go(-1)"
      class="arrow-btn aria-btn">
      <img :src="arrow" class="arrow">
    </button> -->

    <div
      :class="waveAway ? 'fast' : ''"
      class="wave"
      :style="{ 
        backgroundImage: `url(${require('@/assets/backgrounds/wave.svg')})`,
        backgroundPosition: `${waveX}px ${waveY}px`
      }" />

    <!-- <mobile-nav v-if="innerWidth < 600" />
    <sidebar-nav v-else /> -->

    <div id="overlay"></div>

    <img
      src="@/assets/logo/colour.svg" 
      alt="Salmo logo"
      class="small-logo">
      <!-- v-if="$route.path !== '/about' && $route.path !== '/'" -->

    <div class="content-wrapper">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mobileNav from '@/components/nav/MobileNav';
import sidebarNav from '@/components/nav/SidebarNav';
import arrow from '@/assets/icons/back.svg';

export default {
  components: {
    // mobileNav,
    // sidebarNav
  },
  data () {
    return {
      innerWidth: null,
      arrow,
      wavePosition: {
        x: -50,
        y: -800
      }
    }
  },
  computed: {
    ...mapState(['waveFullScreen', 'waveAway']),
    waveX() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'home':
            return -50
          case 'sign-up':
            return 950
          case 'sign-in':
            return 950
          case 'forgot-password':
            return 1950
          case 'sign-up-terms':
            return 1950
          case 'verify-email':
            return 2950
          default:
            return -50
        }
      } else {
        return 3950
      }
    },
    waveY() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'home':
            return -800
          case 'sign-up':
            return -650
          case 'sign-in':
            return -650
          case 'forgot-password':
            return -550
          case 'sign-up-terms':
            return -450
          case 'verify-email':
            return -450
          default:
            return -800
        }
      } else {
        return 0
      } 
    },
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
      this.innerWidth = window.innerWidth
    })

    window.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse')
    })

    window.addEventListener('keydown', event => {
      if(event.keyCode === 9) {
        document.body.classList.remove('using-mouse')
      }
    })
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
  overflow-x: hidden;
}

:focus {
  outline: auto;
}

body.using-mouse :focus {
  outline: none;
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

.wave {
  height: 100vh;
  position: absolute;
  width: 100%;
  z-index: 12;
  left: 0;
  top: 0;
  background-repeat: repeat-x;
  pointer-events: none;
  transition: 1.7s cubic-bezier(.26,.3,.36,.94);
  z-index: 1;
  opacity: 1;
  visibility: visible;

  &.fast {
    transition: 0.5s cubic-bezier(.26,.3,.36,.94);
    opacity: 0;
    visibility: hidden;
  }
}

// @keyframes wave-animation {
//   0%   { background-position: 0 -800px; }
//   100% {background-position: 998px -800px;}
// }

.small-logo {
  width: 40px;
  position: absolute;
  top: 24px;
  right: 7.5vw;
  z-index: 5;
}

p {
  margin: 0;
  padding: 0;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

// Page transitions
.slide-enter,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.7s;
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
}

.slide-enter-active {
  transition-delay: 0.5s;
}

// .page-enter-active,
// .page-leave-active {
//   transition: 0.4s;
// }

// .page-enter, 
// .page-leave-to {
//   opacity: 0;
// }

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
