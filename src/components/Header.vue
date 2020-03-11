<template>
  <header>
    <nav id="nav" :class="isAuthenticated ? '' : 'flex-end'">
      <div v-if="isAuthenticated">
        <p>Hello, {{ user.profile.firstName }}</p>
      </div>
      <div class="nav-links">
        <router-link :to="{ name: 'home' }" exact>Home</router-link>
        <template v-if="!isAuthenticated">
          <router-link :to="{ name: 'login' }">Login</router-link>
          <router-link :to="{ name: 'signup' }">Signup</router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'profile', params: { uid: user.uid } }">Profile</router-link>
          <router-link :to="{ name: 'questionnaire', params: {uid: user.uid} }">Questionnaire</router-link>
          <button 
            @click="handleLogout"
            type="button">
            Log Out
          </button>
        </template>
      </div>
    </nav>
  </header>
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

<style scoped>
a {
  margin: 16px;
}

nav, .nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav.flex-end {
  justify-content: flex-end;
}

button {
  border: none;
  background: #2c3e50;
  color: white;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
}
</style>
