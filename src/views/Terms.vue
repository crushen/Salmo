<template>
  <section id="terms" class="content">
    <h1>Terms & Conditions</h1>
    
    <section class="text">
      <terms />
    </section>
  </section>
</template>

<script>
import terms from '@/components/profile/TermsAndConditions';

export default {
  components: {
    terms
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#terms {
  padding: $spacing*12 0;
}

.text {
  margin-top: $spacing*4;
}
</style>