<template>
  <section class="content single-page">
    <header>
      <h1>404 Uh-Oh!</h1>
      <div class="placeholder-img"></div>
    </header>

    <div class="body">
      <h3>We're sorry that page you wanted cannot be found!</h3>
      <p>Let's try again, you can visit home, UK visa information, your profile and the about pages from the blue button, or click below to go to our help centre.</p>
      <div class="button">
        <router-link 
          :to="{name: 'help-centre'}"
          tag="button">
          Help Centre
        </router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

section {
  text-align: center;
}

.placeholder-img {
  width: 48vw;
  height: 48vw;
  margin: 8vw auto 0 auto;
  background: $light-grey;
  border-radius: 200px;
}

.body {
  text-align: left;

  h3 {
    margin-bottom: 10px;
  }

  .button {
    text-align: center;
    margin-top: 8vw;
  }
}
</style>
