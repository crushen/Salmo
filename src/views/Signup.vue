<template>
  <section id="register">
    <h1>Signup</h1>
    <form>
      <div class="field">
        <input 
          v-model.trim="form.firstName"
          type="text"
          placeholder="First Name">
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
          placeholder="Last Name">
        <div v-if="$v.form.lastName.$error">
          <span v-if="!$v.form.lastName.required">
            Last name is required
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
      <button 
        @click="onSignup"
        type="button">
        Sign Up
      </button>
    </form>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
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
              user: user.uid
            }
          })
          this.$router.push('/')
          this.$store.dispatch('auth/sendEmailVerification')
        }).catch(errorMessage => {
          console.log(errorMessage);
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
