<template>
  <main class="content">
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
  top: 370px;
  right: 0;
}

.form {
  padding-top: 100px;
  min-height: 110vh;

  p {
    color: $light-font;

    &:last-of-type {
      margin-top: 1em;
    }
  }
}

.button {
  position: absolute;
  bottom: 60px;
  right: 0;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}
</style>
