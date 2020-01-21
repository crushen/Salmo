<template>
  <section id="register">
    <h1>Signup</h1>
    <form>
      <div class="field">
        <input 
          v-model="form.firstName"
          type="text"
          placeholder="First Name">
      </div>
      <div class="field">
        <input 
          v-model="form.lastName"
          type="text"
          placeholder="Last Name">
      </div>
      <div class="field">
        <input 
          v-model="form.email"
          type="email"
          placeholder="Email"
          autocomplete="email">
      </div>
      <div class="field">
        <input 
          v-model="form.password"
          type="password"
          placeholder="Password"
          autocomplete="current-password">
      </div>
      <div class="field">
        <input 
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm Password">
      </div>
      <button 
        @click="handleSignup"
        type="button">
        Sign Up
      </button>
    </form>
  </section>
</template>

<script>
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
  methods: {
    handleSignup() {
      this.$store.dispatch('auth/signUp', this.form)
        .then(async user => {
          await this.$store.dispatch('auth/createUserProfile', {
            uid: user.uid, 
            userProfile: {
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              user: user.uid
            }
          })
          this.$router.push('/')
        }).catch(errorMessage => {
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
