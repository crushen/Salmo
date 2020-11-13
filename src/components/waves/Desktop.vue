<template>
  <div
    v-if="visible"
    :class="{ 'fast': waveAway, 'none': !transition }"
    class="wave"
    :style="{ 
      backgroundImage: `url(${require('@/assets/backgrounds/wave-desktop.svg')})`,
      backgroundPosition: `${waveX}px ${waveY}px`
    }" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('wave', ['waveFullScreen', 'waveAway', 'transition', 'signingIn']),
    visible() {
      switch(this.$route.name) {
        case 'register':
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
    },
    waveX() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'register':
            return 0
          case 'sign-up':
            return 2950
          case 'sign-in':
            return 2950
          case 'forgot-password':
            return 5950
          case 'link-sent':
            return 8950
          case 'sign-up-terms':
            return 5950
          case 'verify-email':
            return 8950
          default:
            return 0
        }
      } else if(this.waveFullScreen && this.signingIn) {
        return 4550
      } else {
        return 5550
      }
    },
    waveY() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'register':
            return -1100
          case 'sign-up':
            return -900
          case 'sign-in':
            return -900
          case 'forgot-password':
            return -800
          case 'link-sent':
            return -800
          case 'sign-up-terms':
            return -700
          case 'verify-email':
            return -800
          default:
            return -1100
        }
      } else {
        return 0
      } 
    }
  }
}
</script>
