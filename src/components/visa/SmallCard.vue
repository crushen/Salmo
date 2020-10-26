<template>
  <router-link
    :to="{ name: 'visa-page', params: { slug: visa.slug } }"
    class="card">
    <p class="title">{{ name }}</p>
    
    <p class="margin-s top">{{ visa.subtitle }}</p>
  </router-link>
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
  width: 100%;
  min-height: 120px;
  padding: 1em;
  background: $red;
  border-radius: $radius;
  position: relative;
  box-shadow: $shadow;
  transition: 0.2s;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    text-align: center;
  }

  p {
    color: $light-font;
  }
}
</style>
