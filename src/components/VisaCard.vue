<template>
  <div>


    <div class="card">
      <div class="title">
        <h3>{{ visa.name }}</h3>
      </div>
      <div class="body">
        <p class="emphasis">Awesome for individuals who wish to work in the UK.</p>
        <router-link
          tag="button"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          More...
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visa: { required: true, type: Object }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card {
  background: $dark-grey;
  color: $light-font;
  border-radius: $border-radius;

  & .title {
    background: $grey;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    text-align: center;
    padding: $spacing;
  }

  & .body {
    padding: $spacing*2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & button {
    padding: 10px 24px;
    margin-top: $spacing*3;
    background: $light-font;
    color: $dark-font;
  }
}
</style>
