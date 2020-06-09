<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <div class="inner">
      <img :src="img" alt="">
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
  margin-bottom: $spacing*8;

  h3 {
    margin-bottom: $spacing*2;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 32%;
      margin: 0 4vw 0 0;
    }
  }

  &:nth-of-type(2) {
    .inner {
      flex-direction: row-reverse;

      img {
        margin: 0 0 0 4vw;
      }
    }
  }
}
</style>
