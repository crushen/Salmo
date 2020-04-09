<template>
  <section class="content">
    <h1>{{ category }}</h1>
    <p v-for="visa in visas" :key="visa.name">{{ visa.name }}</p>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      category: this.$route.params.category
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visas() {
      return this.visaList.filter(item => item.category === this.category);
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
