<template>
  <main v-if="visaList.length" class="content">
    <h1>{{ category }} Visas</h1>
    
    <section>
      <visa-card 
        v-for="visa in visaList"
        :key="visa.name"
        :visa="visa"
        :favouriteVisa="favouriteVisa"
        class="visa-card">
      </visa-card>
    </section>

    <section>
      <help-centre-card />
    </section>
  </main>
</template>

<script>
import visaCard from '@/components/visa/VisaCard'
import helpCentreCard from '@/components/cards/HelpCentre'
import { mapState } from 'vuex'

export default {
  components: { visaCard, helpCentreCard },
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
  margin-bottom: 16px;
}

.visa-card {
  margin-bottom: 16px;
}
</style>
