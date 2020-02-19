<template>
  <section>
    <div v-if="user.emailVerified">

      <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Email verified: {{ user.emailVerified }}</p>

      <div 
        v-if="mostRecentResult"
        class="margin">
        <p>{{ mostRecentResult.recommendedVisa }}</p>
      </div>

    </div>

    <div v-else>
      <p>Please verify your email to continue</p>
    </div>

  </section>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.state.auth.user
    }
  },
  computed: {
    mostRecentResult() {
      return this.user.profile.questionnaireResults.slice(-1)[0];
    }
  }
}
</script>

<style scoped>
.margin {
  margin-top: 50px;
}
</style>
