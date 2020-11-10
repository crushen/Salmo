<template>
  <div
    v-if="visible"
    :class="{ 'fast': waveAway, 'none': !transition }"
    class="wave"
    :style="{ 
      backgroundImage: `url(${require('@/assets/backgrounds/wave.svg')})`,
      backgroundPosition: `${waveX}px ${waveY}px`
    }" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      wavePosition: {
        x: -50,
        y: -800
      }
    }
  },
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
          case 'register':
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
    }
  }
}
</script>