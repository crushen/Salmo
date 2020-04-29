<template>
  <section id="eu">
    <router-link :to="{ name: 'visa-info' }">
      <img :src="arrow" class="arrow">
    </router-link>

    <div class="content">
      <h1>Brexit. We know why you're here!</h1>
      <p>We've got a timeline below where you can keep up to date with important Brexit events and dates.</p>
    </div>

    <brexit-timeline />

    <div class="content section-margin explore">
      <h2>Check out which pathway is best for you:</h2>
      <button class="pink">Explore My Options</button>
    </div>
    
    <div class="placeholder-img"></div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import brexitTimeline from '@/components/BrexitTimeline';

export default {
  components: {
    brexitTimeline
  },
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
  padding: $spacing*12 0 0;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

h1 {
  margin-bottom: $spacing*3;
}

.explore {
  display: flex;
  flex-direction: column;

  button {
    margin-top: $spacing*3;
    align-self: center;
  }
}

.placeholder-img {
  width: 25vw;
  height: 30vw;
  background: $light-grey;
  margin-top: $spacing*4;
  margin-left: calc(50% - 12.5vw);
}
</style>
