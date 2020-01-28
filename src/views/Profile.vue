<template>
  <section>
    <div v-if="user.emailVerified">

      <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Email verified: {{ user.emailVerified }}</p>

      <questionnaire />

    </div>

    <div v-else>
      <p>Please verify your email to continue</p>
    </div>

  </section>
</template>

<script>
import questionnaire from '@/components/questionnaire/Questionnaire';

export default {
  components: {
    questionnaire
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  created() {
    this.$store.dispatch('questions/getQuestions');
  }
}
</script>

<style scoped>

</style>
