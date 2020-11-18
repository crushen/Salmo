<template>
  <section id="user-info" class="page padding top bottom">
    <button
      v-if="stage > 1 && stage < 4"
      @click="prev"
      class="back">
      <img src="@/assets/icons/blue/arrow-left.svg" alt="">
      Back
    </button>

    <transition name="slide" mode="out-in">
      <stage-one v-if="stage === 1" @nextStage="next" :form="form" key="one" />

      <stage-two v-else-if="stage === 2" @nextStage="next" :form="form" key="two" />

      <stage-three v-else-if="stage === 3" @nextStage="next" :form="form" key="three" />

      <completed v-else :user="user" key="four" />
    </transition>
  </section>
</template>

<script>
import stageOne from '@/components/profile/userInfo/StageOne'
import stageTwo from '@/components/profile/userInfo/StageTwo'
import stageThree from '@/components/profile/userInfo/StageThree'
import completed from '@/components/profile/userInfo/Completed'

export default {
  components: {
    stageOne,
    stageTwo,
    stageThree,
    completed
  },
  data() {
    return {
      stage: 1,
      form: {
        name: null,
        birthday: null,
        nationality: null,
        dependants: null,
        currentVisa: {
          name: null,
          start: null,
          end: null,
          appliedDate: null,
          locationApplied: null,
          entryDate: null
        },
        planningTo: [],
        permanentResidency: null,
        newVisaOptions: null,
        whichVisa: null
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    prev() {
      if(this.stage > 1) {
        this.stage--
      }
    },
    next() {
      this.stage++
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.back {
  left: 7.5vw;
}
</style>
