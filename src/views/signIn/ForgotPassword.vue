<template>
  <main class="content sign-up-in">
    <transition name="slide" mode="out-in">
      <section v-if="!linkSent" key="!linkSent">
        <div class="title">
          <h1>Let's reset your password!</h1>
          <p>we will send an email to you for verification.</p>
        </div>

        <FormulateForm @submit="handleReset" class="form">
          <FormulateInput
            v-model="form.email"
            type="email"
            label="email"
            validation="bail|required|email" />

          <FormulateInput
            type="submit"
            label="Send Reset Link"
            class="button" />
        </FormulateForm>

        <p v-if="error" class="error">{{ error }}</p> 
      </section>

      <section v-else key="linkSent" class="form stage-2">
        <div class="title">
          <h1>On it's way!</h1>
        </div>
        
        <p>The email containing a link to reset your password has been sent.</p>
        <p>Once you've reset your passowrd, please head to the Sign In page.</p>

        <router-link
          :to="{ name: 'sign-in' }"
          tag="button"
          class="button primary">
          Sign In
        </router-link>
      </section>
    </transition>
  </main>
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.title {
  max-width: 190px;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 120px;
  right: 0;

  h1 {
    margin-bottom: .5em;
  }
}

.form {
  min-height: 115vh;
  padding-top: 35vh;

  &.stage-2 {
    p:last-of-type {
      margin-top: 1em;
    }
  }
}

.button {
  bottom: 60px;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}
</style>
