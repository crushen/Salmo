<template>
  <section>
    <div v-if="user.emailVerified">
      <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Email verified: {{ user.emailVerified }}</p>

      <results v-if="user.profile.questionnaireResults" />
    </div>

    <div v-else>
      <p>Please verify your email to continue</p>
    </div>

  </section>
</template>

<script>
import results from '@/components/questionnaire/Results';

export default {
  components: {
    results
  },
  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
}
</script>

<style scoped>
.margin {
  margin-top: 50px;
}
</style>
