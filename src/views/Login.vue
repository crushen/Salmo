<template>
  <section class="content single-page">
    <blob v-if="innerWidth > 600" />

    <div class="login-content">
      <h1>Great to see you!</h1>
      <form @submit.prevent="onLogin">
        <div class="field">
          <label for="email" class="form-label">Email</label>
          <input 
            v-model.trim="form.email"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            id="email"
            class="form">
          <div v-if="$v.form.email.$error">
            <p v-if="!$v.form.email.required" class="error">Email is required</p>
            <p v-if="!$v.form.email.email" class="error">Email address is not valid</p>
          </div>
        </div>

        <div class="field">
          <label for="password" class="form-label">Password</label>
            <div class="password-field">
              <input 
                v-model.trim="form.password"
                type="password"
                placeholder="Anything but 'password'"
                autocomplete="current-password"
                id="password"
                class="form">
              <span class="icon" @click="togglePassword">
                <img 
                  v-if="!showPassword"
                  src="@/assets/icons/password/eye-open.svg" 
                  alt="">

                  <img
                    v-else
                    src="@/assets/icons/password/eye-close.svg" 
                    alt="">
              </span>
            </div>
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
            class="pink"
            :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
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

    <img 
      v-if="innerWidth < 600"
      src="@/assets/illustrations/alternateStates/Sign up 1.svg" 
      alt="An illustration of a person pointing to the log in button"
      class="bottom-img">
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import waveH from '@/assets/patterns/wave-horizontal.svg';
import blob from '@/components/Blob';

export default {
  components: {
    blob
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: '',
      waveH,
      innerWidth: null,
      showPassword: false
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
  },
  mounted() {
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.login-content,
.sign-up {
  position: relative;
  z-index: 2;
  max-width: 330px;
  margin: 0 auto;
}

form {
  margin-top: 12vw;
}

.form {
  margin-top: $spacing*3;
}

.field {
  &:not(:first-of-type) {
    padding-top: $spacing;
  }
}

input.form {
  margin-top: 4px;
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

.bottom-img {
  width: 40vw;
  height: 40vw;
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: -8vw 6vw;
}

.password-field {
  position: relative;

  .icon {
    height: 100%;
    width: 40px;
    position: absolute;
    top: 3px;
    right: 0;
    cursor: pointer;

    img {
      position: absolute;
      width: 26px;
      top: 25%;
    }
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .content {
    width: 50%;
  }

  .single-page {
    justify-content: center;
  }

  h1, a, p, button {
    color: $light-font;
  }

  form {
    margin-top: $spacing*5;
  }

  .form-label {
    color: $light-font;
  }

  .sign-up {
    margin-top: $spacing*5;

    .tertiary {
      color: $primary-yellow;
    }
  }
}
</style>
