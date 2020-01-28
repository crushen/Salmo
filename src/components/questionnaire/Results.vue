<template>
  <div>
    <p>{{ results }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: this.$store.state.questions.results
    }
  }
}
</script>

<style scoped>

</style>