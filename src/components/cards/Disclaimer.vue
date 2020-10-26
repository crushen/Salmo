<template>
  <div class="card">
    <p class="title">DISCLAIMER</p>

    <p class="margin-s top bottom">We are a team of enthusiastic individuals with the aim of conveying existing visa information in a more digestable format. At the moment we are still processing our legal advice qualification, so bear with us, we will be at your service very shortly!</p>

    <p>
      Please view our 
      <router-link 
        :to="{ name: 'terms' }"
        tag="button"
        class="tertiary">
        Terms & Conditions
      </router-link>
      or 
      <router-link 
        :to="{ name: 'privacy' }"
        tag="button"
        class="tertiary">
        Privacy Policy
      </router-link>
      for further information.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  background: $med-grey;
  border-radius: $radius;
  padding: 1em;
}

.tertiary {
  color: $dark-font;
}
</style>
