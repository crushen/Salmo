<template>
  <div>
    <div class="content">
      <h2 class="margin-s top">{{ user.profile.ilrTracker.plan }}</h2>

      <div class="header-text" >
        <p class="margin-s top">This tracker will help you record* your travel days outside the UK and does the maths to let you know how many days left you can travel.</p>
        <p class="margin-s top">*Indefinite Leave to Remain requires the applicant to only leave the country for certain amount of days within either 5 or 10 years. </p>
      </div>
    </div>

    <tabbed-card class="margin-m top" />
  </div>
</template>

<script>
import tabbedCard from '@/components/ilrTracker/tracker/TabbedCard'

export default {
  components: { tabbedCard },
  computed: {
    user() {
      return this.$store.state.auth.user
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
