<template>
  <div class="tools-pages">
    <transition name="dialog" mode="out-in">
      <five-tip
        v-if="user.profile.ilrTracker.plan === '5 year plan' && tipOpen"
        @closeModal="tipOpen = false" />
    </transition>

    <transition name="dialog" mode="out-in">
      <ten-tip
        v-if="user.profile.ilrTracker.plan === '10 year plan' && tipOpen"
        @closeModal="tipOpen = false" />
    </transition>

    <main class="tools-pages page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.profile.username } })"
        text="Profile" />

      <div class="background blue">
        <div class="header content margin-m top">
          <h1>ILR Tracker</h1>

          <div v-if="user.profile.ilrTracker.startDate" class="buttons">
            <button class="none" @click="tipOpen = true">
              <img src="@/assets/icons/red/lightbulb.svg" alt="">
            </button>

            <button class="none">
              <img src="@/assets/icons/red/edit.svg" alt="">
            </button>
          </div>
        </div>

        <transition name="slide" mode="out-in">
          <section
            v-if="!user.profile.ilrTracker.startDate"
            class="margin-m top"
            key="sect-one">
            <transition name="slide" mode="out-in">
              <stage-one
                v-if="stage === 1"
                key="one"
                @next-stage="stage++" />

              <stage-two
                v-if="stage === 2"
                key="two"
                :user="user"
                :profileToUpdate="profileToUpdate"
                @next-stage="stage++" />

              <stage-three
                v-if="stage === 3"
                key="three"
                :profileToUpdate="profileToUpdate"
                @next-stage="stage++" />

              <stage-four
                v-if="stage === 4"
                key="four"
                :profileToUpdate="profileToUpdate" />
            </transition>
          </section>

          <section v-else key="sect-2">
            <tracker-page />
          </section>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
// import tracker from '@/components/ilrTracker/Tracker'
// import results from '@/components/ilrTracker/Results'
// import prCalc from '@/components/profile/prCalc/PrCalculator'
import fiveTip from '@/components/modals/ilrTracker/tips/Five'
import tenTip from '@/components/modals/ilrTracker/tips/Ten'

import backButton from '@/components/BackButton'

import stageOne from '@/components/ilrTracker/setup/StageOne'
import stageTwo from '@/components/ilrTracker/setup/StageTwo'
import stageThree from '@/components/ilrTracker/setup/StageThree'
import stageFour from '@/components/ilrTracker/setup/StageFour'

import trackerPage from '@/components/ilrTracker/tracker/TrackerPage'


export default {
  components: {
    backButton,
    fiveTip,
    tenTip,
    stageOne, stageTwo,
    stageThree, stageFour,
    trackerPage
  },
  data() {
    return {
      stage: 1,
      tipOpen: false
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

.header {
  display: flex;
  justify-content: space-between;

  button {
    margin-left: 1rem;
  }
}

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
