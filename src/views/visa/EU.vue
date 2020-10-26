<template>
  <main id="eu" class="page padding top bottom">
    <div class="content">
      <h1>Visa Info</h1>
      <h2 class="margin-s top bottom">Help with Brexit</h2>
    </div>

    <section class="content buttons">
      <p class="margin-m bottom">We know why you’re here! Brexit has everyone worried, but here you have all the information to make your next step fully informed.</p>

      <router-link
        :to="{ name: 'eu-settled' }"
        tag="button"
        class="primary margin-s bottom">
        Settled
      </router-link>

      <router-link
        :to="{ name: 'eu-pre-settled' }"
        tag="button"
        class="secondary">
        Pre-Settled
      </router-link>
    </section>

    <section class="margin-l top">
      <brexit-timeline />
    </section>

    <section class="content margin-l top">
      <help-centre-card />
    </section>
  </main>
</template>

<script>

import brexitTimeline from '@/components/BrexitTimeline'
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { brexitTimeline, helpCentreCard }
}
</script>

<style lang="scss" scoped>
.buttons {
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 135px;
  }
}
</style>
