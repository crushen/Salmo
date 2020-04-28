<template>
  <div class="card">
    <div class="text">
      <h3>{{ title }}</h3>
      <p>{{ subTitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String },
    subTitle: { required: true, type: String }
    //image: { required: true, type: String }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card {
  width: 100%;
  height: 60vw;
  display: flex;
  align-items: flex-end;
  margin-bottom: $spacing*3;
  background: $light-grey;
  border-radius: $border-radius;
  box-shadow: $shadow;

  .text {
    background: rgba($color: #FFF, $alpha: 0.5);
    padding: $spacing 12px;
    border-radius: $border-radius;

    h3 {
      margin-bottom: $spacing;
    }
  }
}
</style>
