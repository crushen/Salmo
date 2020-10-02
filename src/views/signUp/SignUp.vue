<template>
  <section id="sign-up" class="content">
    <h1>Wat's your account?</h1>

    <FormulateForm @submit="handleSignUp">
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
        label="Next"/>
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
            //pastVisas: [],
            currentVisa: {},
            holiday: []
          }
        })

        this.$router.push({ name: 'sign-up-terms' })
      })
      .catch(errorMessage => this.error = errorMessage)
    }
  }
}
</script>
