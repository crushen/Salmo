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

        
          <section v-if="!user.profile.ilrPlan" class="margin-m top">
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
                
                @next-stage="stage++" />
            </transition>
          </section>
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
import stageThree from '@/components/ilrTracker/StageThree'


export default {
  components: { backButton, stageOne, stageTwo, stageThree },
  data() {
    return {
      stage: 1
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
