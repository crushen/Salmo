<template>
  <div class="tools-pages">
    <main class="tools-pages page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.profile.username } })"
        text="Profile" />

      <div class="background blue">
        <div class="content margin-m top">
          <h1>ILR Tracker</h1>
        </div>

        <transition name="slide" mode="out-in">
          <section v-if="!user.profile.ilrPlan" class="margin-m top" key="stageOne">
            <stage-one :user="user" :profileToUpdate="profileToUpdate" />
          </section>

          <section v-else key="stageTwo">
            <stage-two />
          </section>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import tracker from '@/components/ilrTracker/Tracker'
import results from '@/components/ilrTracker/Results'
import backButton from '@/components/BackButton'
import prCalc from '@/components/profile/prCalc/PrCalculator'

import stageOne from '@/components/ilrTracker/StageOne'
import stageTwo from '@/components/ilrTracker/StageTwo'


export default {
  components: { backButton, stageOne, stageTwo },
  data() {
    return {
      showResults: false,
      pre2016: [],
      post2016: [],
      pre2016visas: [],
      post2016holiday: [],
      modalOpen: false,
      editHoliday: false,
      readMoreOpen: false,
      editOpen: false,
      index: null,
      showAlert: false
    }
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

.inner {
  width: 85%;
  margin: auto;
}


.year-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
