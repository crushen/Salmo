<template>
  <main class="content page padding top bottom">
    <section>
      <h1>Visa Info</h1>
      <h2 class="margin-s top bottom">Looking for useful visa info to come to the UK?</h2>
      
      <div class="container">
        <p class="margin-m bottom">Let’s start by choosing a background that interests you the most :</p>

        <router-link 
          :to="{name: 'non-eu'}"
          tag="button"
          class="primary margin-s bottom btn-margin-top">
          Non - EU
        </router-link>
        <router-link 
          :to="{name: 'visa-info-eu'}"
          tag="button"
          class="secondary btn-margin-bottom">
          EU
        </router-link>
      </div>
    </section>

    <section class="help">
      <img src="@/assets/illustrations/visa-pages/laptop.svg" alt="">

      <help-centre-card
        text="For more advice or resource on the application process to come to the UK, you can take a look at here:" />
    </section>
  </main>
</template>

<script>
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { helpCentreCard }
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  position: relative;
}

.container {
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 115px;
  }
}

.help {
  margin-top: 8em;
  position: relative;
  overflow: visible;

  img {
    width: 80px;
    position: absolute;
    transform: scaleX(-1);
    top: -110px;
    right: 20px;
  }
}

@media screen and (min-width: 700px) {
  .help {
    margin: 8em auto 0 auto;
  }
}
</style>
