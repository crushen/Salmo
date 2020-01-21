<template>
  <header>
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
      <div v-if="isAuthenticated">
        <p>{{ user.email }}</p>
        <button 
          @click="handleLogout"
          type="button">
          Log Out
        </button>
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
      this.$store.dispatch('auth/logOut');
      alert('You have been logged out');
    }
  }
}
</script>

<style scoped>
  a {
    margin: 16px;
  }
</style>
