<template>
  <section id="container">
    <p>If you wish to have your account deleted, including all personal details wiped from our system, please click below.</p>

    <p class="warning">THIS ACTION IS IRREVERSIBLE</p>

    <section>
      <transition-group name="fade" class="wrapper" tag="div">
        <div v-if="open" key="form">
          <form>
            <p>Please enter your email and password to complete the deletion of your account.</p>

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
          </form>
        </div>


        <div class="button" key="button">
          <button 
            @click="handleDelete"
            class="secondary">
            Delete Account
          </button>
        </div>
      </transition-group>
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
      user: this.$store.state.auth.user,
      open: false,
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
    handleDelete() {
      if(!this.open) {
        this.open = true;
      } else {
        this.$v.form.$touch();
        if(!this.$v.form.$invalid) {
          // First reauthenticate account - check password is correct
          const user = firebase.auth().currentUser;
          const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            this.form.password
          );

          user.reauthenticateWithCredential(credential)
            // If correct password, delete account
            .then(() => {
              this.deleteAccount(user);
            })
            // If incorrect password, show error
            .catch(error => {
              this.error = error.message;
            })
        }
      }
    },
    deleteAccount(user) {
      user.delete().then(() => {
        this.$store.state.auth.user = null;
        this.$store. commit('auth/setUserDeleted')
        this.$router.push('/');
      }).catch(error => {
        this.error = error.message;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.warning {
  background: $light-grey;
  padding: $spacing;
  text-align: center;
  margin: $spacing*4 0;
}

form {
  margin-top: $spacing*4;

  .form {
    margin-top: $spacing*3;
  }
}

.button {
  text-align: center;
  margin-top: $spacing*4;

  button {
    outline: none;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  >* {
    transition: all 0.5s;
    width:100%;
  }
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-active {
  position: absolute;
}

// Tablet
@media screen and (min-width: 600px) {
  #container {
    width: 80%;
    margin: auto;
  }

  form {
    margin-top: $spacing*6;
  }

  .button {
    margin-top: $spacing*6;
  }
}
</style>
