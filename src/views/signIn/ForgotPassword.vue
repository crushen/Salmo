<template>
  <section class="content">
    <section v-if="!linkSent">
      <div>
        <h1>Let's reset your password!</h1>
        <p>we will send an email to you for verification.</p>
      </div>

      <FormulateForm @submit="handleReset">
        <FormulateInput
          v-model="form.email"
          type="email"
          label="email"
          validation="bail|required|email" />

        <FormulateInput
          type="submit"
          label="Send Reset Link"/>
      </FormulateForm>

      <p v-if="error" class="error">{{ error }}</p> 
    </section>

    <section v-else class="single-page">
      <h1>On it's way!</h1>
      <p>The email containing a link to reset your password has been sent.</p>
      <p>Once you've reset your passowrd, please head to the Sign In page.</p>

      <router-link :to="{ name: 'sign-in' }" tag="button">Sign In</router-link>
    </section>
  </section>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      linkSent: false,
       error: null,
      form: {
        email: null
      }
    }
  },
  methods: {
    handleReset() {
      this.error = null
      
      firebase.auth().sendPasswordResetEmail(this.form.email)
      .then(() => this.linkSent = true)
      .catch(error => this.error = error.message)
    }
  }
}
</script>
