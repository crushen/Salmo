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
  height: 35vh;
  max-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: $spacing*4;
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
    width: 48%;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .card {
    padding: 0 0;
    height: 20vw;
    max-height: 290px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: $spacing*6;
  }
}
</style>
