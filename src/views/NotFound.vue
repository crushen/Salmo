<template>
  <section class="single-page">
    <img
      src="@/assets/grey-background.png" alt=""
      class="background-1">
    <img 
      src="@/assets/grey-background-bottom.png" alt=""
      class="background-2">

    <div class="content">
      <header>
        <h1>404 Uh-Oh!</h1>

        <img 
          src="@/assets/illustrations/alternateStates/404.svg" 
          alt="An illustration of a a confused person"
          class="main-img">
      </header>

      <div class="body">
        <h3>We're sorry that page you wanted cannot be found!</h3>
        <p>Let's try again, you can visit home, UK visa information, your profile and the about pages from the blue button, or click below to go to our help centre.</p>
        <div class="button">
          <router-link 
            :to="{name: 'help-centre'}"
            :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}"
            tag="button">
            Help Centre
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dots from '@/assets/patterns/dots.svg';

export default {
  data() {
    return {
      dots
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

section {
  text-align: center;
  position: absolute;
}

.background-1,
.background-2 {
  display: none;
  position: relative;
  z-index: 1;
}

.main-img {
  display: block;
  width: 48vw;
  max-width: 250px;
  margin: 8vw auto;
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

// Tablet
@media screen and (min-width: 600px) {
  .main-img {
    margin: $spacing*5 auto;
  }

  .body {
    h3 {
      margin-bottom: $spacing*2;
    }

    .button {
      margin-top: $spacing*5;
    }
  }

  .background-1 {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 230px;
  }

  .background-2 {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 270px;
  }
}
</style>
