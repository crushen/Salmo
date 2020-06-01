<template>
  <div class="card">
    <img :src="img" alt="">
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
    subTitle: { required: true, type: String },
    img: { required: true, type: String }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: $spacing*8;

  .text {
    h3 {
      margin-bottom: $spacing*2;
    }
  }

  img {
    width: 35%;
    margin: 0 $spacing*2 0 0;
  }

  &:nth-of-type(2) {
    flex-direction: row-reverse;

    img {
      margin: 0 0 0 $spacing*2;
    }
  }
}
</style>
