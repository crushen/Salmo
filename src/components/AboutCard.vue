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
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: $spacing*2;

  h3 {
    width: 65%;
    margin-bottom: $spacing;
  }

  img {
    width: 110px;
    border-radius: 100px;
  }
}
</style>
