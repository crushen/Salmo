<template>
  <main class="content page sign-up-in">
    <div class="title">
      <h1>Reset your password</h1>
      <p>If your email addres is registered with us, you will receive an email that will direct you to a dedicated page for resetting your password.</p>
    </div>

    <section>
      <FormulateForm @submit="handleReset" class="form">
        <FormulateInput
          v-model="form.email"
          type="email"
          label="email"
          validation="bail|required|email" />

        <p v-if="error" class="error">{{ error }}</p>

        <FormulateInput
          type="submit"
          label="Send Reset Link"
          class="button" />
      </FormulateForm> 
    </section>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      linkSent: false,
       error: null,
      form: {
        email: null
      }
    }
  },
  methods: {
    handleReset() {
      this.error = null
      
      firebase.auth().sendPasswordResetEmail(this.form.email)
      .then(() => this.$router.push({ name: 'link-sent' }))
      .catch(error => this.error = error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

p {
  color: $light-font;
}

.title {
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 120px;
  right: 0;

  h1 {
    color: $light-font;
    margin-bottom: 1rem;
  }
}

.form {
  min-height: 115vh;
  padding-top: 35vh;
}

.button {
  bottom: 60px;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}

@media screen and (min-width: 700px) {
  .title {
    top: 200px;
    max-width: 300px;
  }
}
</style>
