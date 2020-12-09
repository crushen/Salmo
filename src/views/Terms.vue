<template>
  <div>
    <back-button
      @go-back="$router.push({ name: 'home' })"
      text="Back" />

    <main id="terms" class="content page padding top bottom">
      <h1>Terms & Conditions</h1>
    
      <terms class="margin-s top" />
    </main>

    <app-footer v-if="!user" />
  </div>
</template>

<script>
import terms from '@/components/TermsAndConditions'
import appFooter from '@/components/Footer'
import backButton from '@/components/BackButton'

export default {
  components: { terms, appFooter, backButton },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';


</style>
