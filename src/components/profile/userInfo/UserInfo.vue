<template>
  <section id="user-info" class="page padding top bottom">
    <button v-if="stage > 1 && stage < 4" @click="prev">
      <img src="@/assets/icons/back-blue.svg" alt="">
      Back
    </button>

    <stage-one v-if="stage === 1" @nextStage="next" :form="form" />

    <stage-two v-else-if="stage === 2" @nextStage="next" :form="form" />

    <stage-three v-else-if="stage === 3" @nextStage="next" :form="form" />

    <completed v-else :user="user" />
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
          end: null
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

button {
  background: none;
  padding: 0;
  position: absolute;
  top: 2em;
  left: 7.5vw;
  color: $blue;
  display: flex;
  align-content: center;
  justify-content: center;

  img {
    display: inline-block;
    width: 1.2em;
    padding-top: .1em;
  }
}
</style>
