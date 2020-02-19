<template>
  <div>
    <p>Quiz done</p>

    <p>{{ result.recommendedVisa }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: this.$store.state.questions.result
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
