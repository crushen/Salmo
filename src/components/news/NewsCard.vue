<template>
  <div class="card">
    <div class="text">
      <h3>{{ title }}</h3>
      <!-- <p>{{ subTitle }}</p> -->
      <p class="tag">{{ source }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String },
    subTitle: { required: true, type: String },
    source: { required: true, type: String }
    //link: { required: true, type: String },
    //image: { required: true, type: String }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card {
  margin-bottom: $spacing*4;
  padding: 35vw 0 0;
  background: $light-grey;
  border-radius: $border-radius;
  box-shadow: $shadow;
  color: $light-font;
}

.text {
  background: $primary-blue;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  padding: $spacing;

  h3 {
    margin-bottom: $spacing;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .card {
    padding: 18vw 0 0;
    width: 48%;
  }
}
</style>
