<template>
  <section class="content">
    <div>
      <section v-if="!linkSent">
        <div>
          <h1>Let's reset your password!</h1>
          <p>we will send an email to you for verification.</p>
        </div>

        <form @submit.prevent="handleReset">
          <div class="field">
            <input 
              v-model.trim="form.email"
              type="email"
              placeholder="Email"
              autocomplete="email"
              class="form">
            <div v-if="$v.form.email.$error">
              <p v-if="!$v.form.email.required" class="error">Email is required</p>
              <p v-if="!$v.form.email.email" class="error">Email address is not valid</p>
            </div>

            <p v-if="error" class="error">{{ error }}</p>
          </div>

          <div class="button">
            <input 
              type="submit" 
              value="Send Reset Link"
              class="pink">
          </div>
        </form>     
      </section>

      <section v-else class="single-page">
        <div>
          <h1>On it's way!</h1>
          <p>The email containing a link to reset your password has been sent.</p>
          <p>Once you've reset your passowrd, please head to the Sign In page.</p>

          <router-link :to="{ name: 'login' }" tag="button">Sign In</router-link>
        </div>
      </section>
    </div>

  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      linkSent: false,
      form: {
        email: ''
      },
      error: '',
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    handleReset() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.resetPassword();
      }
    },
    resetPassword() {
      this.error = '';
      firebase.auth().sendPasswordResetEmail(this.form.email)
      .then(() => this.linkSent = true)
      .catch(error => this.error = error.message);
    }
  }
}
</script>
