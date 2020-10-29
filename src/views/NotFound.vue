<template>
  <main class="page padding top bottom">
    <back-button
      @go-back="$router.go(-1)"
      text="Back" />

    <div class="content">
      <h1>404 Uh-Oh!</h1>
      <h2 class="margin-m top">We're sorry that page you wanted cannot be found!</h2>
    </div>

    <section class="content">
      <img 
        src="@/assets/illustrations/not-found/not-found.svg" 
        alt="An illustration of a a confused person"
        class="margin-m top bottom">

      
      <p>Let’s try again.</p>
 
      <p class="margin-s top">
        You can visit Home, Visa Info, Profile and About page from the blue menu button at the bottom, or click below to go to our help centre.
      </p>

      <div class="button-center margin-m top">
        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          class="yellow">
          Help Centre
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import backButton from '@/components/BackButton'

export default {
  components: { backButton }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

img {
  display: block;
  width: 60%;
  margin: auto;
}
</style>
