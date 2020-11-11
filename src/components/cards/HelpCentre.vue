<template>
  <div class="card">
    <p>{{ text }}</p>

    <div class="button-center margin-s top">
      <router-link 
        :to="{name: 'help-centre'}"
        tag="button"
        class="yellow">
        Help Centre
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  background: $med-grey;
  border-radius: $radius;
  padding: 1em;
  max-width: 450px;
  margin: auto;
}
</style>