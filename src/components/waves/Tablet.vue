<template>
  <div
    v-if="visible"
    :class="{ 'fast': waveAway, 'none': !transition }"
    class="wave"
    :style="{ 
      backgroundImage: `url(${require('@/assets/backgrounds/wave-tablet.svg')})`,
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
            return 1950
          case 'sign-in':
            return 2950
          case 'forgot-password':
            return 3950
          case 'link-sent':
            return 4950
          case 'sign-up-terms':
            return 2950
          case 'verify-email':
            return 3950
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
            return -950
          case 'sign-up':
            return -750
          case 'sign-in':
            return -750
          case 'forgot-password':
            return -550
          case 'link-sent':
            return -520
          case 'sign-up-terms':
            return -470
          case 'verify-email':
            return -470
          default:
            return -950
        }
      } else {
        return 0
      } 
    }
  }
}
</script>
