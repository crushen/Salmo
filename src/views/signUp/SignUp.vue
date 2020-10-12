<template>
  <section id="sign-up" class="content">
    <h1>What's your account?</h1>

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

      <FormulateInput
        v-model="form.password"
        type="password"
        label="password"
        validation="bail|required|min:6|not:password" />

      <FormulateInput
        type="submit"
        label="Next"
        class="primary button" />
    </FormulateForm>

    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
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

.form {
  height: 100vh;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 120px;
  right: 0;
}

.button {
  position: absolute;
  right: 0;
  bottom: 60px;
}
</style>
