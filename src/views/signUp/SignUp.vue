<template>
  <main id="sign-up" class="content sign-up-in">
    <h1>Let’s create your account!</h1>

    <FormulateForm @submit="handleSignUp" class="form">
      <FormulateInput
        v-model="form.username"
        type="text"
        label="username"
        validation="bail|required|min:6|max:10" />

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
          validation="bail|required|min:6|not:password" />

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
          validation="bail|required|min:6|not:password" />

        <button @click.prevent="showPassword = false" class="none">
          <img src="@/assets/icons/blue/password-show.svg" alt="">
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <FormulateInput
        type="submit"
        label="Next"
        class="button" />
    </FormulateForm>

    <div class="sign-in">
      <p>already a member?</p>
      <router-link :to="{ name: 'sign-in' }">
        sign in
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
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleSignUp() {
      this.error = null

      this.$store.dispatch('auth/signUp', this.form)
      .then(async user => {
        await this.$store.dispatch('auth/createUserProfile', {
          uid: user.uid, 
          userProfile: {
            username: this.form.username,
            user: user.uid,
            questionnaireResults: [],
            currentVisa: {},
            holiday: [],
            pastVisas: [],
            nextVisa: {
              name: null
            },
            ilrTracker: {},
            notifications: {
              newsletter: true,
              planner: true,
              timeline: true,
              off: false
            }
          }
        })

        this.$router.push({ name: 'sign-up-terms' })
      })
      .catch(errorMessage => this.error = errorMessage)
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
  padding-top: 20vh;
}

.button {
  bottom: 60px;
}

.sign-in {
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

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}

@media screen and (min-width: 700px) {
  h1 {
    top: 200px;
  }
}
</style>
