<template>
  <div
    v-if="visible"
    :class="{ 'fast': waveAway, 'none': !transition }"
    class="wave"
    :style="{ 
      backgroundImage: `url(${require('@/assets/backgrounds/wave-tablet.svg')})`,
      backgroundPosition: `${waveXposition}px ${waveY}px`
    }" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  watch: {
    waveFullScreen(signIn) {
      if(signIn) {
        this.$store.commit('wave/moveWave', 1000)
      }
    }
  },
  computed: {
    ...mapState('wave', ['waveXposition', 'waveFullScreen', 'waveAway', 'transition', 'signingIn']),
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
    },
    waveY() {
      if(!this.waveFullScreen) {
        switch(this.$route.name) {
          case 'home':
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
