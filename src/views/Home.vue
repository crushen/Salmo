<template>
  <section id="home">
    <!-- Logged out alert -->
    <transition name="alert" mode="out-in">
      <alert 
        v-if="loggedOut"
        alert="Logged Out"
        text="You’re now logged out. See you again soon!"
        @closePage="loggedOut = false, delete $store.state.auth.loggedOut" />
    </transition>
    <!-- Deleted account alert -->
    <transition name="alert" mode="out-in">
      <alert 
        v-if="userDeleted"
        alert="Account Deleted"
        text="Thanks for your time with Salmo, if you need us again, we’ll be here!"
        @closePage="userDeleted = false, delete $store.state.auth.userDeleted" />
    </transition>

    <header :style="{ backgroundImage: `url(${background})` }">
      <div class="content">
        <div class="logo">
          <h1 class="logo-text">Salmo</h1>
        </div>
        <h2 class="caption">The ultimate visa organisation tool.</h2>
      </div>
    </header>

    <logged-in 
      v-if="isAuthenticated" 
      :user="user"/>

    <logged-out v-else/>
  </section>
</template>

<script>
import background from '@/assets/home-background.svg';
import loggedIn from '@/components/home/LoggedIn';
import loggedOut from '@/components/home/LoggedOut';
import alert from '@/components/Alert';

export default {
  components: {
    loggedIn,
    loggedOut,
    alert
  },
  data() {
    return {
      background,
      loggedOut: false,
      userDeleted: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  mounted() {
    if(this.$store.state.auth.loggedOut) {
      setTimeout(() => {
        this.loggedOut = true;
      }, 500)
    }

    if(this.$store.state.auth.userDeleted) {
      setTimeout(() => {
        this.userDeleted = true;
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

header {
  width: 100%;
  height: 60vh;
  margin: auto;
  text-align: center;
  padding-top: $top-padding;
  background-size: cover;
  background-position: 50% 0;
}

.logo {
  color: $light-font;
  margin: 0 auto 4vw auto;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 20vw;
    line-height: 0;
  }
}

h2 {
  color: $light-font;
  font-weight: 500;
  margin-top: $spacing*6;
}
</style>
