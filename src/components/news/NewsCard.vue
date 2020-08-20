<template>
  <a
    :href="article.link"
    target="_blank"
    :style="{ backgroundImage: `url(${article.image.url})` }"
    class="card">
    <div
      :class="article.colour"
      class="text">
      <h3>{{ article.title }}</h3>
      <p>{{ article.source }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    article: { required: true, type: Object }
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
  background-position: center;
  background-size: cover;
  border-radius: $border-radius;
  box-shadow: $shadow;
  color: $light-font;
}

.text {
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  padding: $spacing;

  &.blue {
    background: $primary-blue;
  }

  &.red {
    background: $primary-pink;
  }

  h3 {
    margin-bottom: $spacing;
    font-weight: 300;
  }

  p {
    font-weight: 600;
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
