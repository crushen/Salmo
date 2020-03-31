<template>
  <section>
    <nav id="nav">
      <div class="nav-links">
        <router-link :to="{ name: 'home' }" exact>
          <div class="icon"></div>
          Home
        </router-link>
        <template v-if="!isAuthenticated">
          <router-link :to="{ name: 'login' }">
            <div class="icon"></div>
            Login
          </router-link>
          <router-link :to="{ name: 'signup' }">
            <div class="icon"></div>
            Signup
          </router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'profile' }">
            <div class="icon"></div>
            Profile
          </router-link>
          <router-link :to="{ name: 'questionnaire' }">
            <div class="icon"></div>
            Quiz
          </router-link>
          <router-link :to="{ name: 'visa-info' }">
            <div class="icon"></div>
            Visa Info
          </router-link>
          <!-- <button 
            @click="handleLogout"
            type="button">
            Log Out
          </button> -->
        </template>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logOut')
      .then(() => {
        if(this.$route.path !== '/') {
          this.$router.push('/')
        }
        alert('You have been logged out')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

nav {
  width: 100%;
  position: fixed;
  z-index: 20;
  bottom: 0;
  padding: $spacing*2 0;
  background: $light-grey;
}

.nav-links {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & a {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $light-font;
  }

  & .icon {
    width: $spacing*3;
    height: $spacing*3;
    background: $light-font;
    border-radius: 100px;
  }

}

a.router-link-active { 
  color: $dark-font;

  & .icon {
    background: $dark-font;
  }
}
</style>
