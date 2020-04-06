<template>
  <section id="register">
    <h1>Signup</h1>
    <form>
      <div class="field">
        <input 
          v-model.trim="form.firstName"
          type="text"
          placeholder="First Name"
          autocomplete="given-name">
        <div v-if="$v.form.firstName.$error">
          <span v-if="!$v.form.firstName.required">
            First name is required
          </span>
        </div>
      </div>

      <div class="field">
        <input 
          v-model.trim="form.lastName"
          type="text"
          placeholder="Last Name"
          autocomplete="family-name">
        <div v-if="$v.form.lastName.$error">
          <span v-if="!$v.form.lastName.required">
            Last name is required
          </span>
        </div>
      </div>

      <div class="field">
        <input 
          v-model.trim="form.username"
          type="text"
          placeholder="Username"
          autocomplete="username">
        <div v-if="$v.form.username.$error">
          <span v-if="!$v.form.username.required">
            Username is required
          </span>
          <span 
            v-if="!$v.form.username.minLength"
            class="help is-danger">
            Password should be at least 6 characters
          </span>
          <span 
            v-if="!$v.form.username.maxLength"
            class="help is-danger">
            User should be no more than 10 characters
          </span>
        </div>
      </div>

      <div class="field">
        <input 
          v-model.trim="form.email"
          type="email"
          placeholder="Email"
          autocomplete="email">
        <div v-if="$v.form.email.$error">
          <span v-if="!$v.form.email.required">
            Email is required
          </span>
          <span v-if="!$v.form.email.email">
            Email address is not valid
          </span>
        </div>
      </div>

      <div class="field">
        <input 
          v-model.trim="form.password"
          type="password"
          placeholder="Password"
          autocomplete="current-password">
        <div v-if="$v.form.password.$error">
          <span v-if="!$v.form.password.required">
            Password is required
          </span>
          <span 
            v-if="!$v.form.password.minLength"
            class="help is-danger">
            Password should be at least 6 characters
          </span>
        </div>
      </div>

      <div class="field">
        <input 
          v-model.trim="form.confirmPassword"
          type="password"
          placeholder="Confirm Password">
        <div v-if="$v.form.confirmPassword.$error">
          <span v-if="!$v.form.password.sameAsPasword">
            Password doesn't match
          </span>
        </div>
      </div>

      <div v-if="error">
        {{ errorMsg }}
      </div>

      <button 
        @click="onSignup"
        type="button">
        Sign Up
      </button>
    </form>
  </section>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errorMsg: '',
      error: false
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPasword: sameAs('password')
      }
    }
  },
  methods: {
    onSignup() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.handleSignup();
      }
    },
    handleSignup() {
      this.$store.dispatch('auth/signUp', this.form)
        .then(async user => {
          // waits for user profile to be created before  executing the rest of the function
          await this.$store.dispatch('auth/createUserProfile', {
            uid: user.uid, 
            userProfile: {
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              username: this.form.username,
              user: user.uid,
              questionnaireResults: []
            }
          })
          this.$router.push('/')
          this.$store.dispatch('auth/sendEmailVerification')
        })
        .catch(errorMessage => {
          this.errorMsg = errorMessage;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        })
    }
  }
}
</script>

<style scoped>
form {
  width: 300px;
  margin: auto;
}

.field {
  width: 90%;
  margin: auto;
}

input {
  width: 100%;
}
</style>
