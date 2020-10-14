<template>
  <main class="content page sign-up-in">
    <h1>On it's way!</h1>

    <section class="form">      
      <p>The email containing a link to reset your password has been sent.</p>
      <p>Once you've reset your passowrd, please head to the Sign In page.</p>

      <router-link
        :to="{ name: 'sign-in' }"
        tag="button"
        class="button primary">
        Sign In
      </router-link>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1 {
  max-width: 190px;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 120px;
  right: 0;
}

.form {
  min-height: 115vh;
  padding-top: 35vh;

  p:last-of-type {
    margin-top: 1em;
  }
}

.button {
  bottom: 60px;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}
</style>
