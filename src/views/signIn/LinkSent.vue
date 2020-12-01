<template>
  <main class="content">
    <div class="title">
      <h1>Check your inbox to find the password reset email!</h1>
      <p>Don’t forget to check your junk mail.</p>
    </div>

    <section class="form">
      <router-link
        :to="{ name: 'sign-in' }"
        tag="button"
        class="button primary">
        Sign In
      </router-link>
    </section>

    <img
      class="email-img"
      src="@/assets/illustrations/sign-up/email.svg"
      alt="">
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

p {
  color: $light-font;
}

.title {
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 200px;
  right: 0;

  h1 {
    color: $light-font;
    margin-bottom: 1rem;
  }
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

.email-img {
  display: none;
}

@media screen and (min-width: 370px) {
  .form {
    min-height: 100vh;
  }
}

@media screen and (min-width: 700px) {
  .title {
    top: 300px;
    max-width: 300px;
  }

  .email-img {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

@media screen and (min-width: 1200px) {
  .title {
    top: 250px;
  }
}
</style>
