<template>
  <section>
    <div v-if="user.emailVerified">

      <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Email verified: {{ user.emailVerified }}</p>

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
  }
}
</script>

<style scoped>

</style>
