<template>
  <section class="content">
    <h1>Great to see you!</h1>
    <form>
      <div class="field">
        <input 
          v-model.trim="form.email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          class="form">
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
          autocomplete="current-password"
          class="form">
        <div v-if="$v.form.password.$error">
          <span v-if="!$v.form.password.required">
            Password is required
          </span>
        </div>
      </div>

      <div v-if="error">
        {{ errorMsg }}
      </div>

      <div class="forgot-password">
        <button class="tertiary">
          Forgot Password?
        </button>
      </div>

      <div class="button">
        <button 
          @click="onLogin"
          type="button" 
          class="pink">
          Log In
        </button>
      </div>
    </form>

    <div class="sign-up">
      <p>Don't have an account?</p>
      <router-link
        :to="{ name: 'signup' }"
        tag="button"
        class="tertiary">
        Sign up here!
      </router-link>
    </div>

    <div class="placeholder-img"></div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
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
          const user = firebase.auth().currentUser;
          this.$router.push(`profile/${user.profile.username}`);
          alert('You have logged in');
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

section {
  padding: 30vw 0 0;
}

form {
  margin-top: $spacing*4;
}

.form {
  margin-top: $spacing*3;
}

.forgot-password {
  margin-top: $spacing*3;
  text-align: center;
}

.button {
  margin-top: $spacing*5;
  text-align: center;

  button {
    width: 120px;
  }
}

.sign-up {
  position: absolute;
  bottom: 20vw;
  width: 85vw;
  text-align: center;

  .tertiary {
    bottom: 0;
    color: $primary-pink;
  }
}

.placeholder-img {
  width: 20vw;
  height: 25vw;
  position: absolute;
  bottom: 0;
  left: 12px;
  background: $light-grey;
}
</style>
