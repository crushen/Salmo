<template>
  <section id="sign-up">
    <div class="content">
      <div class="title">
        <h2>Like what you see?</h2>
        <h2>Join now!</h2>
      </div>

      <div class="container">
        <form @submit.prevent="onSignup">
          <div class="field">
            <input 
              v-model.trim="form.name"
              type="text"
              placeholder="Name"
              autocomplete="name"
              class="form">
            <div v-if="$v.form.name.$error">
              <p v-if="!$v.form.name.required" class="error">Name is required</p>
            </div>
          </div>

          <div class="field">
            <input 
              v-model.trim="form.username"
              type="text"
              placeholder="Username"
              autocomplete="username"
              class="form">
            <div v-if="$v.form.username.$error">
              <p v-if="!$v.form.username.required" class="error">Username is required</p>
              <p v-if="!$v.form.username.minLength" class="error">Username should be at least 6 characters</p>
              <p v-if="!$v.form.username.maxLength" class="error">Username should be no more than 10 characters</p>
            </div>
          </div>

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
              <p v-if="!$v.form.password.minLength" class="error">Password should be at least 6 characters</p>
            </div>
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <div class="button">
            <input 
              type="submit" 
              value="Sign Me Up!"
              class="pink"
              :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          </div>
        </form>

        <div class="log-in">
          <p>Already have an account?</p>
          <router-link 
            :to="{ name: 'login' }"
            tag="button"
            class="tertiary">
            Log In Here
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import waveH from '@/assets/patterns/wave-horizontal.svg';

export default {
  data() {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: ''
      },
      error: '',
      waveH
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      name: {
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
      this.error = '';
      this.$store.dispatch('auth/signUp', this.form)
        .then(async user => {
          // waits for user profile to be created before  executing the rest of the function
          await this.$store.dispatch('auth/createUserProfile', {
            uid: user.uid, 
            userProfile: {
              name: this.form.name,
              username: this.form.username,
              user: user.uid,
              questionnaireResults: [],
              pastVisas: [],
              currentVisa: {}
            }
          })
          this.$router.push(`/profile/${this.form.username}`)
          this.$store.dispatch('auth/sendEmailVerification')
        })
        .catch(errorMessage => {
          this.error = errorMessage;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

#sign-up {
  background: $primary-yellow;
  padding: $spacing*10 0;
  margin-top: $spacing*10;
}

.title {
  text-align: center;

  h2:first-of-type {
    font-weight: 400;
    margin-bottom: $spacing;
  }
}

.container {
  margin-top: $spacing*5;
}

.button {
  text-align: center;
  margin: $spacing*5 0;
}

.log-in {
  p { 
    @include font(20px, 400); 
    margin-bottom: $spacing;
  }
  button { @include font(20px, 600) }
  text-align: center;
}

input.form {
  background: white !important;
  margin-top: $spacing*2;
}

input.form:focus {
  box-shadow: 0 0 0 3px $primary-yellow !important;
}

// Tablet
@media screen and (min-width: 600px) {
  .content {
    width: 50%;
  }
}
</style>
