<template>
  <section id="home">
    <header :style="{ backgroundImage: `url(${background})` }">
      <div class="content">
        <div class="logo">
          <div class="circle"></div>
          <h1 class="logo-text">Salmo</h1>
        </div>
        <h2 class="caption">The ultimate visa organisation tool.</h2>
      </div>
    </header>

    <logged-in 
      v-if="user" 
      :user="user"/>

    <logged-out v-else/>
  </section>
</template>

<script>
import background from '@/assets/home-background.svg';
import loggedIn from '@/components/home/LoggedIn';
import loggedOut from '@/components/home/LoggedOut';


export default {
  components: {
    loggedIn,
    loggedOut
  },
  data() {
    return {
      background
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

header {
  width: 100%;
  height: 80vw;
  margin: auto;
  text-align: center;
  padding-top: $top-padding;
  background-size: cover;
  background-position: 50% 0%;
}

.logo {
  margin: 0 auto 4vw auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .circle {
    width: 12vw;
    height: 12vw;
    background: $light-grey;
    margin-right: 4px;
    border-radius: 100px;
  }
}
</style>
