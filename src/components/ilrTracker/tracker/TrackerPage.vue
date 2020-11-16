<template>
  <div>
    <div class="content">
      <h2 class="margin-s top">{{ user.profile.ilrTracker.plan }}</h2>

      <div class="header-text" >
        <p class="margin-s top">This tracker will help you record* your travel days outside the UK and does the maths to let you know how many days left you can travel.</p>
        <p class="margin-s top">*Indefinite Leave to Remain requires the applicant to only leave the country for certain amount of days within either 5 or 10 years. </p>
      </div>
    </div>

    <transition name="slide" mode="out-in">
      <tabbed-card v-if="!settingsOpen" class="margin-m top" />

      <settings
        v-else :profileToUpdate="profileToUpdate"
        @cancel="$emit('cancel')"
        class="margin-m top" />
    </transition>
  </div>
</template>

<script>
import tabbedCard from '@/components/ilrTracker/tracker/TabbedCard'
import settings from '@/components/ilrTracker/tracker/Settings'

export default {
  components: { tabbedCard, settings },
  props: {
    settingsOpen: { type: Boolean, required: false }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.header-text {
  margin-left: 30px;

  p:last-of-type {
    font-size: 12px;
  }
}
</style>
