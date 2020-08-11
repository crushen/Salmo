<template>
  <div class="section">
    <h2>{{ title }}</h2>
    <h3>{{ section.title }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('visas', ['visa']),
    title() {
      let title = '';

      this.visa.sections.forEach((section, index) => {
        section.subsections.forEach(subsection => {
          if(subsection.slug === this.$route.params.section) {
            title = this.visa.sections[index].title;
          }
        })
      });

      return title;
    },
    section() {
      let obj = {};

      this.visa.sections.forEach(section => {
        section.subsections.forEach(subsection => {
          if(subsection.slug === this.$route.params.section) {
            obj = subsection;
          }
        })
      });

      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.section {
  padding-top: $spacing*2;
}

h3 {
  color: $primary-pink;
  font-weight: 300;
}
</style>
