<template>
  <main id="eu" class="page padding top bottom">
    <back-button
      @go-back="$router.push({ name: 'visa-info' })"
      text="Back" />

    <div class="content">
      <h1>Visa Info</h1>
      <h2 class="margin-s top bottom">Help with Brexit</h2>
    </div>

    <section class="content">
      <div class="txt-btns">
        <p class="margin-m bottom">We know why you’re here! Brexit has everyone worried, but here you have all the information to make your next step fully informed.</p>

        <visa-card
          v-if="brexitPage"
          :visa="brexitPage"
          :name="brexitPage.name" />
      </div>
    </section>

    <section class="margin-l top">
      <brexit-timeline />
    </section>

    <section class="content margin-l top">
      <help-centre-card
        text="For more advice or resource on the application process to come to the UK, you can take a look at here:" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import brexitTimeline from '@/components/BrexitTimeline'
import helpCentreCard from '@/components/cards/HelpCentre'
import backButton from '@/components/BackButton'
import visaCard from '@/components/visa/SmallCard'

export default {
  components: { brexitTimeline, helpCentreCard, backButton, visaCard },
  computed: {
    ...mapState('brexit', ['brexitPage']),
  },
  mounted() {
    this.$store.dispatch('brexit/getBrexitPage', 'brexit')
  }
}
</script>

<style lang="scss" scoped>
.txt-btns {
  width: 85%;
  margin: auto;
}
</style>
