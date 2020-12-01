<template>
  <div
    v-if="visible"
    :class="{ 'fast': waveAway, 'none': !transition }"
    class="wave"
    :style="{ 
      backgroundImage: `url(${require('@/assets/backgrounds/wave-desktop.svg')})`,
      backgroundPosition: `${waveXposition}px ${waveY}px`
    }" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  watch: {
    waveFullScreen(signIn) {
      if(signIn) {
        this.$store.commit('wave/moveWave', 2880)
      }
    }
  },
  computed: {
    ...mapState('wave', ['waveXposition', 'waveFullScreen', 'waveAway', 'transition', 'signingIn']),
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
