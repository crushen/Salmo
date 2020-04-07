<template>
  <section class="content">
    <!-- If user has verified email -->
    <section v-if="user.emailVerified">
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
    this.$router.push({ name: 'user-info', params: {username: this.user.profile.username} })
      .catch(error => {})
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.content {
  padding-top: $top-padding;
}
</style>
