<template>
  <section id="eu">
    <router-link :to="{ name: 'visa-info' }">
      <img :src="arrow" class="arrow">
    </router-link>

    <div class="content">
      <h1>Brexit. We know why you're here!</h1>
    </div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';

export default {
  data() {
    return {
      arrow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#eu {
  padding: $spacing*10 0 0;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}
</style>
