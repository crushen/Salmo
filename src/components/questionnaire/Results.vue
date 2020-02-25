<template>
  <div>
    <p>Quiz done</p>

    <div v-if="Array.isArray(result.recommendedVisa)">
      <p>Your options are:</p>
      <p
        v-for="visa in result.recommendedVisa"
        :key="visa">
        {{ visa }}
      </p>
    </div>

    <p v-else>{{ result.recommendedVisa }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: this.$store.state.questions.result
    }
  }
}
</script>

<style scoped>

</style>
