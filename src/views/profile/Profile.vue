<template>
  <section class="content">
    <!-- If user has verified email -->
    <section v-if="user.emailVerified">
      <h1>{{ user.profile.firstName }} {{ user.profile.lastName }}</h1>
      <router-view :key="$route.path" />
    </section>

    <!-- If user hasn't verified email -->
    <section v-else>
      <div>
        <p>We've sent a link to <strong>{{ user.email }}</strong> to verify your email address.</p>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.state.auth.user
    }
  },
  created() {
    this.$router.push({ name: 'user-info', params: {uid: this.user.uid} })
      .catch(error => {})
  }
}
</script>

