<template>
  <div>
    <p>{{user.firstName}}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>


export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
}
</script>

<style scoped>

</style> 