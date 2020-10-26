<template>
  <div class="card">
    <p>For more advice or resource on the application process to come to the UK, you can take a look at here:</p>

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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  background: $med-grey;
  border-radius: $radius;
  padding: 1em;
}
</style>