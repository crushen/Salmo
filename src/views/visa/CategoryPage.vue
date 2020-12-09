<template>
  <main v-if="visaList.length" class="page padding top bottom">
    <back-button
      @go-back="$router.push({ name: 'non-eu' })"
      text="Back" />

    <div class="content">
      <h1>{{ category }} Visas</h1>
    </div>
    
    <section
      :class="visaList.length > 1 ? 'grid' : ''"
      class="content visas">
      <visa-card 
        v-for="visa in visaList"
        :key="visa.name"
        :visa="visa"
        :favouriteVisa="favouriteVisa"
        class="visa-card">
      </visa-card>
    </section>

    <section class="content margin-l top">
      <help-centre-card
        text="For more advice or resource on the application process to come to the UK, you can take a look at here:" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import backButton from '@/components/BackButton'
import visaCard from '@/components/visa/VisaCard'
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { backButton, visaCard, helpCentreCard },
  data() {
    return {
      user: this.$store.state.auth.user,
      category: this.$route.params.category,
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    favouriteVisa() {
      if(this.user && this.user.profile.favoriteVisa) {
        return this.user.profile.favoriteVisa.name;
      } else {
        return 'none'
      }
    }
  },
  mounted() {
    this.$store.dispatch('visas/getVisas', this.category)
    .then(() => {
      if(!this.visaList.length) {
        this.$router.push({name: 'not-found'})
      }
    })
  }
}
</script>

<style lang="scss" scoped>

h1 {
  text-transform: capitalize;
}

.visa-card {
  margin-top: 2em;
}

@media screen and (min-width: 700px) {
  h1 {
    margin-bottom: 3rem;
  }
}

@media screen and (min-width: 1200px) {
  .content {
    &.visas {
      max-width: 832px;
    }

    &.grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: 32px 32px;
    }
  }

  .visa-card {
    margin: 0 auto;
    justify-self: center;
  }
}
</style>
