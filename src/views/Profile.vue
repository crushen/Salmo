<template>
  <section>
    <div v-if="!user.emailVerified"> <!-- for now -->
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
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    updateProfile(profile, closeModal) {
      this.$store.dispatch('auth/updateProfile', profile)
        .then(_ => {
          closeModal();
        })
    }
  }
}
</script>

<style scoped>

</style>
