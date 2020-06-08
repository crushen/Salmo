<template>
  <section class="content">
    <h1>{{ visa.name }}</h1>

    <tabbed-card :tipText="tipText" />

  </section>
</template>

<script>
import tabbedCard from '@/components/TabbedCard';
import { mapState } from 'vuex';

export default {
  components: {
    tabbedCard
  },
  data() {
    return {
      slug: this.$route.params.slug,
      tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visa() {
      return this.visaList.find(item => item.slug === this.slug);
    }
  },
  mounted() {
    if(!this.visa) {
      this.$router.push({name: 'not-found'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*6;
}

h1 {
  margin-bottom: $spacing*5;
}
</style>
