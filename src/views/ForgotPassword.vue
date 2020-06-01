<template>
  <section class="content">
    <section v-if="!linkSent" class="single-page">
      <div>
        <h1>Forgot password.</h1>
        <div class="text">
          <p>Enter the address you used to sign up with, and we will send a handy link to reset your password.</p>
          <p>Please check your junk/spam folders as the email can sometimes end up there.</p>
        </div>
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
        <h3>The email containing a link to reset your password has been sent.</h3>
      </div>

      <div class="text sent">
        <p>You should receive this email in within a few minutes, and it's valid for 1 hour.</p>
        <p>If you don't receive the email, <button @click="linkSent = false" class="tertiary">click here</button> to resend it.</p>

        <div class="img-container">
          <img 
            src="@/assets/illustrations/alternateStates/Man with Email 1.svg" 
            alt="An illustration of a person holding an envelope">
        </div>
      </div>
    </section>
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.text {
  margin-top: 14vw;

  p:first-of-type {
    margin-bottom: 6vw;
  }

  &.sent {
    margin: 0 0 20vh 0;
  }
}

.button {
  margin-top: 10vw;
  text-align: center;
}

h3 {
  margin-top: 6vw;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 35vw;
    position: absolute;
    bottom: 0;
    left: 30vw;
    object-fit: cover;
    object-position: 0 12vw;
  }
}
</style>
