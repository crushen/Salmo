<template>
  <div id="app">
    <button
      v-if="arrowPage && innerWidth < 1100"
      @click="$router.go(-1)"
      class="arrow-btn aria-btn">
      <img src="@/assets/icons/back.svg" class="arrow">
    </button>

    <div
      v-if="visible"
      :class="{ 'fast': waveAway, 'none': !transition }"
      class="wave"
      :style="{ 
        backgroundImage: `url(${require('@/assets/backgrounds/wave.svg')})`,
        backgroundPosition: `${waveX}px ${waveY}px`
      }" />

    <mobile-nav v-if="innerWidth < 600 && $route.meta.onlyVerifiedUser" />

    <!-- <sidebar-nav v-else /> -->

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
import mobileNav from '@/components/nav/MobileNav'
import sidebarNav from '@/components/nav/SidebarNav'

export default {
  components: {
    mobileNav
    // sidebarNav
  },
  data () {
    return {
      innerWidth: null,
      wavePosition: {
        x: -50,
        y: -800
      }
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('wave', ['waveFullScreen', 'waveAway', 'transition', 'signingIn']),
    waveX() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'home':
            return -50
          case 'sign-up':
            return 950
          case 'sign-in':
            return 1450
          case 'forgot-password':
            return 2450
          case 'link-sent':
            return 3450
          case 'sign-up-terms':
            return 1950
          case 'verify-email':
            return 2950
          default:
            return -50
        }
      } else if(this.waveFullScreen && this.signingIn) {
        return 2950
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
          case 'link-sent':
            return -420
          case 'sign-up-terms':
            return -420
          case 'verify-email':
            return -420
          default:
            return -800
        }
      } else {
        return 0
      } 
    },
    arrowPage() {
      switch(this.$route.name) {
        case 'sign-up':
          return true
        case 'sign-in':
          return true
        case 'forgot-password':
          return true
        case 'link-sent':
          return true
        default:
          return false;
      }
    },
    visible() {
      switch(this.$route.name) {
        case 'home':
          return true
        case 'sign-up':
          return true
        case 'sign-in':
          return true
        case 'forgot-password':
          return true
        case 'link-sent':
          return true
        case 'sign-up-terms':
          return true
        case 'verify-email':
          return true
        default:
          return false
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
}

body,
html {
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
  z-index: 0;
  opacity: 1;
  visibility: visible;

  &.fast {
    transition: 0.5s cubic-bezier(.26,.3,.36,.94);
    opacity: 0;
    visibility: hidden;
  }

  &.none {
    transition: 0s;
    opacity: 1;
    visibility: visible;
  }
}

.arrow-btn {
  background: none;
  padding: 0;
  width: 32px;
  position: absolute;
  top: 24px;
  left: 7.5vw;
  z-index: 5;

  img {
    width: 32px;
  }
}

.small-logo {
  width: 40px;
  position: absolute;
  top: 24px;
  right: 7.5vw;
  z-index: 5;
}

.content-wrapper {
  position: relative;
}

// Page transitions
main {
  transition: 0.5s;
  opacity: 1;

  &.fade {
    opacity: 0;
  }
}

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

// Alert and Modal transitions
.dialog-enter,
.dialog-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: 0.4s;
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
