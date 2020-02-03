<template>
  <section id="register">
    <h1>Log In</h1>
    <form>
      <div class="field">
        <input 
          v-model="form.email"
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
          v-model="form.password"
          type="password"
          placeholder="Password"
          autocomplete="current-password">
        <div v-if="$v.form.password.$error">
          <span v-if="!$v.form.password.required">
            Password is required
          </span>
        </div>
      </div>
      <button 
        @click="onLogin"
        type="button">
        Log In
      </button>
    </form>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    onLogin() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.handleLogin();
      }
    },
    handleLogin() {
      this.$store.dispatch('auth/logIn', this.form)
        .then(() => {
          this.$router.push('/')
          alert('You have logged in')
        })
        .catch(errorMessage => {
          alert(errorMessage);
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
