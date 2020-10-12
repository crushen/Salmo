<template>
  <div id="app">
    <!-- <button
      v-if="arrowPage && innerWidth < 1100"
      @click="$router.go(-1)"
      class="arrow-btn aria-btn">
      <img :src="arrow" class="arrow">
    </button> -->

    <div
      @click="morph"
      class="wave"
      :style="{ 
        backgroundImage: `url(${require('@/assets/backgrounds/wave.svg')})`,
        backgroundPosition: `${waveX}px ${waveY}px`
      }" />

    <mobile-nav v-if="innerWidth < 600" />
    <sidebar-nav v-else />

    <div id="overlay"></div>

    <img
      src="@/assets/logo/outline-2.svg" 
      alt="Salmo logo"
      class="small-logo">
      <!-- v-if="$route.path !== '/about' && $route.path !== '/'" -->

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
      arrow,
      wavePosition: {
        x: -50,
        y: -800
      }
    }
  },
  computed: {
    waveX() {
      switch(this.$route.name) {
        case 'home':
          return -50
        case 'sign-up':
          return 950
        case 'sign-in':
          return 950
        default:
          return -50
      }
    },
    waveY() {
      switch(this.$route.name) {
        case 'home':
          return -800
        case 'sign-up':
          return -650
        case 'sign-in':
          return -650
        default:
          return -800
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
  methods: {
    morph() {
      this.wavePosition.x += 1000
      this.wavePosition.y += 300
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

.wave {
  height: 100vh;
  position: absolute;
  width: 100%;
  z-index: 12;
  left: 0;
  top: 0;
  background-repeat: repeat-x;
  pointer-events: none;
  transition: 2s cubic-bezier(.26,.3,.36,.94);
  z-index: 1;
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
