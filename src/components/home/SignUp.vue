<template>
  <section id="sign-up">
    <div class="content">
      <div class="title">
        <h2>Like what you see?</h2>
        <h2>Join now!</h2>
      </div>

      <div class="container">
        <div class="field">
          <input 
            v-model.trim="form.name"
            type="text"
            placeholder="Name"
            autocomplete="name"
            class="form">
          <div v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required">
              Name is required
            </span>
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
            <span v-if="!$v.form.username.required">
              Username is required
            </span>
            <span 
              v-if="!$v.form.username.minLength"
              class="help is-danger">
              Username should be at least 6 characters
            </span>
            <span 
              v-if="!$v.form.username.maxLength"
              class="help is-danger">
              Username should be no more than 10 characters
            </span>
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
            <span 
              v-if="!$v.form.password.minLength"
              class="help is-danger">
              Password should be at least 6 characters
            </span>
          </div>
        </div>

        <div v-if="error">
          {{ errorMsg }}
        </div>

        <div class="button">
          <button 
            @click="onSignup"
            type="button"
            class="pink">
            Sign Me Up!
          </button>
        </div>

        <div class="log-in">
          <p>Already have an account?</p>
          <router-link 
            :to="{ name: 'login' }"
            tag="button"
            class="tertiary">
            Log in here
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        name: '',
        username: '',
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
      this.$store.dispatch('auth/signUp', this.form)
        .then(async user => {
          // waits for user profile to be created before  executing the rest of the function
          await this.$store.dispatch('auth/createUserProfile', {
            uid: user.uid, 
            userProfile: {
              name: this.form.name,
              username: this.form.username,
              user: user.uid,
              questionnaireResults: []
            }
          })
          this.$router.push(`/profile/${this.form.username}`)
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

#sign-up {
  background: $primary-yellow;
  padding: $spacing*8 0;
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
</style>
