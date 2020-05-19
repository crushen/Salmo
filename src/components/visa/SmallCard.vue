<template>
  <div class="card">
    <div class="title">
      <h3>{{ name }}</h3>
    </div>
    <div class="body">
      <p>{{ visa.card.subTitle }}</p>

      <router-link
        tag="button"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }">
        Tell Me More!
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visa: { required: true, type: Object },
    name: { required: true, type: String }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  background: white;
  border: 4px solid $primary-pink;
  color: $primary-pink;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;

  &:not(:first-of-type) {
    margin-top: $spacing*3;
  }

  .title {
    background: $primary-pink;
    color: white;
    text-align: center;
    padding: $spacing;
  }

  .body {
    padding: $spacing*2 $spacing*4;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 500;
    }
  }

  button {
    margin-top: $spacing*2;
  }
}
</style>
