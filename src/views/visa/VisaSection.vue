<template>
  <div class="section">
    <h2>{{ section.title }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('visas', ['visa']),
    section() {
      return this.visa.sections.find(section => section.slug === this.$route.params.section);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.section {
  padding-top: 100px;
}

h2 {
  color: $primary-pink;
}
</style>
