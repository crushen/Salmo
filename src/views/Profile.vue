<template>
  <div>
    <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Email varfied: {{ user.emailVerified }}</p>
  </div>
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