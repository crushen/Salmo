<template>
  <div class="card">
    <img :src="img" alt="">

    <h3 class="margin-s top bottom">{{ number }}. {{ title }}</h3>

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
  width: 85%;
  margin: 3em auto 0 auto;
  display: flex;
  flex-direction: column;

  img {
    width: 60%;
    margin: auto;
  }

  h3 {
    font-weight: 600;
  }
}
</style>
