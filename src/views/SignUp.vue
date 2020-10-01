<template>
  <section id="sign-up">
    <div class="content">
      <div class="title">
        <h1>Wat's your account?</h1>
      </div>

      <div class="container">
        <form @submit.prevent="onSignup">
          <!-- <div class="field">
            <label for="name" class="form-label">Name</label>
            <input 
              v-model.trim="form.name"
              type="text"
              placeholder="First and Last name"
              autocomplete="name"
              id="name"
              class="form aria-btn">
            <div v-if="$v.form.name.$error">
              <p v-if="!$v.form.name.required" class="error">Name is required</p>
            </div>
          </div> -->

          <div class="field">
            <!-- <label for="username" class="form-label">Username</label> -->
            <input 
              v-model.trim="form.username"
              type="text"
              placeholder="username"
              autocomplete="username"
              id="username"
              class="form aria-btn">
            <div v-if="$v.form.username.$error">
              <p v-if="!$v.form.username.required" class="error">Username is required</p>
              <p v-if="!$v.form.username.minLength" class="error">Username should be at least 6 characters</p>
              <p v-if="!$v.form.username.maxLength" class="error">Username should be no more than 10 characters</p>
            </div>
          </div>

          <div class="field">
            <!-- <label for="email" class="form-label">Email</label> -->
            <input 
              v-model.trim="form.email"
              type="email"
              placeholder="email"
              autocomplete="email"
              id="email"
              class="form aria-btn">
            <div v-if="$v.form.email.$error">
              <p v-if="!$v.form.email.required" class="error">Email is required</p>
              <p v-if="!$v.form.email.email" class="error">Email address is not valid</p>
            </div>
          </div>

          <div class="field">
            <!-- <label for="password" class="form-label">Password</label> -->
            <div class="password-field">
              <input 
                v-model.trim="form.password"
                type="password"
                placeholder="password"
                autocomplete="current-password"
                id="password"
                class="form aria-btn">
              <!-- <span class="icon" @click="togglePassword">
                <img 
                  v-if="!showPassword"
                  src="@/assets/icons/password/eye-open.svg" 
                  alt="">

                  <img
                    v-else
                    src="@/assets/icons/password/eye-close.svg" 
                    alt="">
              </span> -->
            </div>
            <div v-if="$v.form.password.$error">
              <p v-if="!$v.form.password.required" class="error">Password is required</p>
              <p v-if="!$v.form.password.minLength" class="error">Password should be at least 6 characters</p>
            </div>
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <div class="button">
            <input type="submit" value="Next">
          </div>
        </form>

        <!-- <div class="log-in">
          <p>Already have an account?</p>
          <router-link 
            :to="{ name: 'login' }"
            tag="button"
            class="tertiary aria-btn">
            Log In Here
          </router-link>
        </div> -->
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
        username: '',
        email: '',
        password: ''
      },
      error: '',
      showPassword: false
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      },
      email: {
        required,
        email
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
              username: this.form.username,
              user: user.uid,
              questionnaireResults: [],
              pastVisas: [],
              currentVisa: {},
              holiday: []
            }
          })
          this.$router.push({ name: 'sign-up-terms' })
          // this.$store.dispatch('auth/sendEmailVerification')
        })
        .catch(errorMessage => {
          this.error = errorMessage;
        })
    },
    togglePassword(event) {
      this.showPassword = !this.showPassword;
      const field = document.querySelector('#password');
      
      if(this.showPassword) {
        field.type = 'input';
      } else {
        field.type = 'password';
      }
    }
  }
}
</script>
