<template>
  <section>
    <div>
      <p>Please click on the link in your email to begin setting up your account. Don’t forget to check you junk/spam folders!</p>
      <p>If you’ve clicked the link and still see this message, try refreshing the page before clicking the button.</p>
      <p>Once you’ve completed your verification, you’ll be able to access your account to complete your profile.</p>
    </div>

    <h1>Verify your email address</h1>

    <button @click="verify">
      Done
    </button>

    <p v-if="error">{{ error }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      error: null
    }
  },
  methods: {
    verify() {
      if(this.user.emailVerified) {
        this.$router.push({ name: 'profile', params: { username: this.user.profile.username } })
      } else {
        this.error = 'Please verify your email'
      }
    }
  }
}
</script>
