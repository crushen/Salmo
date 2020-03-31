<template>
  <section class="content">
    <h1>{{ visa.name }}</h1>
    <router-link
      :to="{ name: 'visa-info' }"
      tag="button">
      Back to Visa Info
    </router-link>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visa() {
      return this.visaList.find(item => item.slug === this.slug);
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
