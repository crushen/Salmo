<template>
  <div>
    <p>Quiz done</p>

    <p>Top Result: {{ results.topResult }}</p>
    <p>Second Result: {{ results.secondResult }}</p>
    <p>Third Result: {{ results.thirdResult }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: this.$store.state.questions.filteredResults
      //filteredResults: {}
    }
  }
  // methods: {
  //   handleFilter() {
  //     this.filteredResults = this.results.filter(result => result.score > 0);
  //   }
  // },
  // created() {
  //   this.handleFilter();
  // }
}
</script>

<style scoped>

</style>
