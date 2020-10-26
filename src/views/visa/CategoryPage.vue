<template>
  <main v-if="visaList.length" class="page padding top bottom">
    <back-button
      @go-back="$router.go(-1)"
      text="Back" />

    <div class="content margin-s top">
      <h1>{{ category }} Visas</h1>
    </div>
    
    <section class="content">
      <visa-card 
        v-for="visa in visaList"
        :key="visa.name"
        :visa="visa"
        :favouriteVisa="favouriteVisa"
        class="visa-card">
      </visa-card>
    </section>

    <section class="content margin-l top">
      <help-centre-card />
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
</style>
