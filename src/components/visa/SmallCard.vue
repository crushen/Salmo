<template>
  <div class="card">
    <p class="title">{{ name }}</p>
    
    <p class="margin-s top">{{ visa.subtitle }}</p>

    <router-link
      tag="button"
      :to="{ name: 'visa-page', params: { slug: visa.slug } }"
      class="primary margin-s top aria-btn"
      :aria-label="`Tell me more about ${name}`">
      Tell Me More!
    </router-link>
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
  width: 100%;
  max-width: 450px;
  min-height: 120px;
  padding: 1em;
  background: $red;
  border-radius: $radius;
  position: relative;
  box-shadow: $shadow;
  transition: 0.2s;
  margin: 1rem auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  p {
    color: $light-font;
  }

  button {
    border: 2px solid white;
    width: 100%;
    max-width: 160px;
    align-self: center;

    &:hover {
      background: white;
      color: $red;
    }
  }
}

@media screen and (min-width: 700px) {
  .card {
    margin: 2rem auto 0 auto;

    button {
      align-self: flex-end;
    }
  }
}
</style>
