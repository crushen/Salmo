<template>
  <section id="category-page" v-if="visaList">
    <div class="content">
      <h1>{{ category }} Visas</h1>
    </div>
    
    <div class="content">
      <visa-card 
        v-for="visa in visaList"
        :key="visa.name"
        :visa="visa"
        :favouriteVisa="favouriteVisa"
        class="visa-card">
      </visa-card>
    </div>
  </section>
</template>

<script>
import visaCard from '@/components/visa/VisaCard';
import { mapState } from 'vuex';

export default {
  components: {
    visaCard
  },
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
        return 'none';
      }
    }
  },
  methods: {
    fetchVisas() {
      this.$store.dispatch('visas/getVisas', this.category).then(() => {
        if(!this.visaList.length) {
          this.$router.push({name: 'not-found'});
        }
      })
    }
  },
  mounted() {
    this.fetchVisas();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#category-page {
  padding: $spacing*12 0 $spacing*8;
}

h1 {
  text-transform: capitalize;
  margin-bottom: $spacing*5;
}

.visa-card {
  margin-bottom: $spacing*4;
}

// Tablet
@media screen and (min-width: 600px) {
  #category-page {
    padding: $spacing*15 0 $spacing*8;
  }

  h1 {
    margin-bottom: $spacing*8;
  }

  .visa-card {
    margin-bottom: $spacing*6;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  h1 {
    margin-bottom: $spacing*10;
  }

  .visa-card {
    margin-bottom: $spacing*8;
  }
}
</style>
