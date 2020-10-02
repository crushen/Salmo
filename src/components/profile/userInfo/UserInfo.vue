<template>
  <section id="profile">
    <button @click="prev">Back</button>

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
