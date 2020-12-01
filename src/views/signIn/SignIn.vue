<template>
  <main
    :class="verified ? 'fade' : ''"
    class="content page sign-up-in">
    <FormulateForm @submit="handleSignIn" class="form">
      <h1>What's your account?</h1>

      <FormulateInput
        v-model="form.email"
        type="email"
        label="email"
        validation="bail|required|email" />

      <div
        v-if="!showPassword"
        class="form-password">
        <FormulateInput
          v-model="form.password"
          type="password"
          label="password"
          validation="required" />

        <button @click.prevent="showPassword = true" class="none">
          <img src="@/assets/icons/blue/password-hide.svg" alt="">
        </button>
      </div>

      <div
        v-else
        class="form-password">
        <FormulateInput
          v-model="form.password"
          type="text"
          label="password"
          validation="required" />

        <button @click.prevent="showPassword = false" class="none">
          <img src="@/assets/icons/blue/password-show.svg" alt="">
        </button>
      </div>

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
      showPassword: false,
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

      this.$store.commit('wave/setSigningIn', true)

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
          this.$store.commit('wave/setSigningIn', false)
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
  bottom: 48px;

  a {
    margin-left: 1em;
  }
}

.error {
  text-align: right;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}

@media screen and (min-width: 700px) {
  h1 {
    top: 200px;
  }

  .button {
    bottom: 140px;
  }

  .sign-up {
    bottom: 60px;
  }
}

@media screen and (min-width: 1200px) {
  h1 {
    top: 150px;
  }
}
</style>
