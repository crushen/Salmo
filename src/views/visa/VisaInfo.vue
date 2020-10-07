<template>
  <main class="content">
    <section class="buttons">
      <h1>Visa Info</h1>
      <h2>Looking for useful visa info to come to the UK?</h2>
      <p>Let’s start by choosing a background that interests you the most :</p>

      <div class="container">
        <router-link 
          :to="{name: 'non-eu'}"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          Non - EU
        </router-link>
        <router-link 
          :to="{name: 'visa-info-eu'}"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          EU
        </router-link>
      </div>
    </section>

    <section>
      <help-centre-card />
    </section>
  </main>
</template>

<script>
import helpCentreCard from '@/components/cards/HelpCentre'

import waveH from '@/assets/patterns/wave-horizontal.svg'
import waveV from '@/assets/patterns/wave-verticle.svg'

export default {
  components: { helpCentreCard },
  data() {
    return {
      waveH,
      waveV
    }
  }
}
</script>
