<template>
  <div>
    <p>Quiz done</p>
    <p
      v-for="(result, index) in filteredResults"
      :key="index">
      {{ result.name }}: {{ result.score }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: this.$store.state.questions.results,
      filteredResults: {}
    }
  },
  methods: {
    handleFilter() {
      this.filteredResults = this.results.filter(result => result.score > 0);
    }
  },
  created() {
    this.handleFilter();
  }
}
</script>

<style scoped>

</style>
