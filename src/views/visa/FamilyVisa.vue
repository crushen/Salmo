<template>
  <main class="page padding top bottom">
    <back-button
      @go-back="$router.go(-1)"
      text="Back" />

    <div class="content">
      <h1>Family Visas</h1>
    </div>
    
    <div class="content img margin-l top bottom">
      <img src="@/assets/illustrations/about/goals-1.svg" alt="">

      <h2 class="margin-m top">Coming Soon!</h2>
    </div>

    <section class="content margin-l top">
      <help-centre-card
        text="For more advice or resource on the application process to come to the UK, you can take a look at here:" />
    </section>
  </main>
</template>

<script>
import backButton from '@/components/BackButton'
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { backButton, helpCentreCard },
}
</script>

<style lang="scss" scoped>

h1 {
  text-transform: capitalize;
}

img {
  display: block;
  width: 70%;
  max-width: 220px;
  margin: auto;
}

h2 {
  text-align: center;
}

@media screen and (min-width: 700px) {
  h1 {
    margin-bottom: 3rem;
  }
}
</style>
