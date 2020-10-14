<template>
  <main
    :class="verified ? 'fade' : ''"
    class="content sign-up-in">
    <FormulateForm @submit="handleSignIn" class="form">
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

      <router-link
        :to="{ name: 'forgot-password' }"
        class="forgot-password">
        forgotton password?
      </router-link>

      <FormulateInput
        type="submit"
        label="Sign In"
        class="button" />

      <p v-if="error" class="error">{{ error }}</p>
    </FormulateForm>

    <div class="sign-up">
      <p>need an account?</p>
      <router-link :to="{ name: 'sign-up' }">
        sign up
      </router-link>
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      error: null,
      form: {
        email: null,
        password: null
      },
      verified: false
    }
  },
  methods: {
    handleSignIn() {
      this.error = null

      this.$store.dispatch('auth/logIn', this.form)
      .then(() => {
        const user = this.$store.state.auth.user

        this.$store.commit('wave/setFullScreen', true)
        this.verified = true

        setTimeout(() => {
          this.$store.commit('wave/setWaveAway', true)
        }, 1500)

        setTimeout(() => {
          this.$router.push({name: 'profile', params: {username: user.profile.username}})
          this.$store.commit('auth/setLoggedIn')
        }, 2000)
      })
      .catch(() => this.error = 'Invalid email address or password')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 120px;
  right: 0;
}

.form {
  min-height: 120vh;
  padding-top: 5vh;
}

.forgot-password {
  text-align: right;
}

.button {
  bottom: 100px;
}

.sign-up {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 60px;

  a {
    margin-left: 1em;
  }
}

.error {
  color: $red;
  text-align: right;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}
</style>
