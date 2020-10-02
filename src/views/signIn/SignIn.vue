<template>
  <section class="content">
    <FormulateForm @submit="handleSignIn">
      <FormulateInput
        v-model="form.email"
        type="email"
        label="email"
        validation="bail|required|email" />

      <FormulateInput
        v-model="form.password"
        type="password"
        label="password"
        validation="required" />

      <router-link :to="{ name: 'forgot-password' }">
        Forgot Password?
      </router-link>

      <FormulateInput
        type="submit"
        label="Sign In"/>
    </FormulateForm>

    <div>
      <p>Need an account?</p>
      <router-link :to="{ name: 'sign-up' }" tag="button">
        Sign Up
      </router-link>
    </div>

    <p v-if="error">{{ error }}</p>
  </section>
</template>

<script>

export default {
  data() {
    return {
      error: null,
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleSignIn() {
      this.error = null

      this.$store.dispatch('auth/logIn', this.form)
      .then(() => {
        const user = this.$store.state.auth.user

        this.$router.push({name: 'profile', params: {username: user.profile.username}})
        this.$store.commit('auth/setLoggedIn')
      })
      .catch(() => this.error = 'Invalid email address or password')
    }
  }
}
</script>
