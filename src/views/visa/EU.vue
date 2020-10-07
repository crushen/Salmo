<template>
  <main id="eu">
    <h1>Visa Info</h1>
    <h2>Help with Brexit</h2>

    <p>We know why you’re here! Brexit has everyone worried, but here you have all the information to make your next step fully informed.</p>

    <section class="explore">
      <div class="buttons">
        <router-link
          :to="{ name: 'eu-settled' }"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          Settled
        </router-link>

        <router-link
          :to="{ name: 'eu-pre-settled' }"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          Pre-Settled
        </router-link>
      </div>
    </section>

    <section>
      <brexit-timeline />
    </section>

    <section>
      <help-centre-card />
    </section>
  </main>
</template>

<script>
import waveH from '@/assets/patterns/wave-horizontal.svg'
import waveV from '@/assets/patterns/wave-verticle.svg'

import brexitTimeline from '@/components/BrexitTimeline'
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { brexitTimeline, helpCentreCard },
  data() {
    return { waveH, waveV }
  }
}
</script>

<style lang="scss" scoped>

</style>
