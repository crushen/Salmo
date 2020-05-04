<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ subTitle }}</p>
    <p class="label">{{ source }}</p>

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
  padding: 35vw $spacing $spacing;
  background: $light-grey;
  border-radius: $border-radius;
  box-shadow: $shadow;
}
</style>
