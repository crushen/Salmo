<template>
  <section class="content">
    <h1>Pre-Settled Status</h1>

    <tabbed-card :tipText="tipText" />
  </section>
</template>

<script>
import tabbedCard from '@/components/TabbedCard';

export default {
  components: {
    tabbedCard
  },
  data() {
    return {
      tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0;
}

h1 {
  margin-bottom: $spacing*5;
}
</style>
