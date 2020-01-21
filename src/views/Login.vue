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
      </div>
      <div class="field">
        <input 
          v-model="form.password"
          type="password"
          placeholder="Password"
          autocomplete="current-password">
      </div>
      <button 
        @click="handleLogin"
        type="button">
        Log In
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('auth/logIn', this.form)
        .then(_ => this.$router.push('/'))
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
