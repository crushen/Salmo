<template>
  <section class="content single-page">
    <div>
      <h1>Great to see you!</h1>
      <form @submit.prevent="onLogin">
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
        </div>

        <div class="field">
          <input 
            v-model.trim="form.password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            class="form">
          <div v-if="$v.form.password.$error">
            <p v-if="!$v.form.password.required" class="error">Password is required</p>
          </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="forgot-password">
          <router-link
            :to="{ name: 'forgot-password' }"
            tag="button"
            class="tertiary">
            Forgot Password?
          </router-link>
        </div>

        <div class="button">
          <input 
            type="submit"
            value="Log In"
            class="pink">
        </div>
      </form>
    </div>

    <div class="sign-up">
      <p>Don't have an account?</p>
      <router-link
        :to="{ name: 'home' }"
        tag="button"
        class="tertiary">
        Sign up here!
      </router-link>
    </div>

    <div class="placeholder-img"></div>

    <img 
      src="@/assets/illustrations/alternateStates/Sign up 1.svg" 
      alt="An illustration of a person pointing to the log in button">
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
      error: '',
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
      this.error = '';
      this.$store.dispatch('auth/logIn', this.form)
        .then(() => {
          const user = this.$store.state.auth.user;
          this.$router.push({name: 'profile', params: {username: user.profile.username}});
          this.$store.commit('auth/setLoggedIn')
        })
        .catch(() => {
          this.error = 'Invalid email address or password';
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

form {
  margin-top: 12vw;
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

  input {
    width: 120px;
  }
}

.sign-up {
  text-align: center;

  .tertiary {
    color: $primary-pink;
  }
}

img {
  width: 40vw;
  height: 40vw;
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: -8vw 6vw;
}
</style>
