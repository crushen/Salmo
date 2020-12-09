<template>
  <div id="app">
    <button
      v-if="arrowPage"
      @click="$router.go(-1)"
      class="arrow-btn aria-btn">
      <img src="@/assets/icons/white/arrow-left.svg" class="arrow">
    </button>

    <mobile-wave v-if="innerWidth < 600" />

    <tablet-wave v-else-if="innerWidth >= 600 && innerWidth < 1200" />

    <desktop-wave v-else />

    <transition name="nav" mode="out-in">
      <mobile-nav v-if="user && user.emailVerified && innerWidth < 1200"  />
    </transition>

    <transition name="nav" mode="out-in">
      <sidebar-nav v-if="user && user.emailVerified && innerWidth >= 1200" />
    </transition>

    <transition name="slide-logo" mode="out-in">
      <img
        v-if="$route.name !== 'home'"
        src="@/assets/logo/colour.svg" 
        alt="Salmo logo"
        class="small-logo">
    </transition>

    <div :class="{'content-wrapper': user}">
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

import mobileWave from '@/components/waves/Mobile'
import tabletWave from '@/components/waves/Tablet'
import desktopWave from '@/components/waves/Desktop'

export default {
  components: {
    mobileNav,
    mobileWave,
    tabletWave,
    desktopWave,
    sidebarNav
  },
  data () {
    return {
      innerWidth: null
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
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
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth
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

p {
  overflow: visible;
}

.wave {
  height: 100vh;
  position: absolute;
  width: 100%;
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
  z-index: 1;
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

.slide-logo-enter,
.slide-logo-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-logo-enter-active,
.slide-logo-leave-active {
  transition: 0.7s;
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
}

.slide-logo-enter-active {
  transition-delay: 1.3s;
}

.nav-enter,
.nav-leave-to {
  opacity: 0;
}
.nav-enter-active,
.nav-leave-active {
  transition: 0.4s;
}

.nav-enter-active {
  transition-delay: 1.5s;
}

// Alert and Modal transitions
.dialog-enter,
.dialog-leave-to {
  transform: translateY(-20px);
  opacity: 0;
  z-index: 50;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: 0.4s;
}

@media screen and (min-width: 1200px) {
  .content-wrapper {
    margin-left: 100px;
  }
}
</style>
