<template>
  <section>
    <div 
      v-for="(item, index) in questions"
      :key="index">
      <p>{{ item.question }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questions: { type: Array, required: true }
  }
}
</script>

<style scoped>
section {
  margin-top: 60px;
}
</style>