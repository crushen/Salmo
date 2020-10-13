<template>
  <section id="terms" class="content">
    <h1>Terms & Conditions</h1>
    
    <section class="scroll-container ">
      <terms />
    </section>
  </section>
</template>

<script>
import terms from '@/components/TermsAndConditions';

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


.scroll-container {
  overflow: scroll;
  background: $background;
  padding: $spacing*2;
  border: 3px solid $light-grey;
  border-radius: 4px;
  width: 100%;
  height: 40vh; 
  margin: $spacing*4 0;
}


// Tablet
@media screen and (min-width: 600px) {
  #terms {
    padding: $spacing*15 0;
  }
}
</style>
