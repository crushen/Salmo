<template>
  <section id="profile">
    <stage-one v-if="stage === 1" @nextStage="stage++" />

    <stage-two v-else-if="stage === 2" @nextStage="stage++" />

    <stage-three v-else-if="stage === 3" @nextStage="stage++" />

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
      stage: 1
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>
