<template>
  <div class="card">
    <div class="header">
      <h3>{{ number }}. {{ title }}</h3>
      <img :src="img" alt="">
    </div>
    <p v-html="text"></p>
  </div>
</template>

<script>
export default {
  props: {
    number: { required: true, type: Number },
    title: { required: true, type: String },
    text: { required: true, type: String },
    img: { required: true, type: String }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  margin-top: $spacing*6;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing*3;

  h3 {
    width: 65%;
  }

  img {
    width: 110px;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .card {
    margin-top: $spacing*10;
  } 
}
</style>
