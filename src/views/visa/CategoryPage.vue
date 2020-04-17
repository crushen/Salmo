<template>
  <section id="category-page">
    <router-link :to="{ name: 'non-eu' }">
      <img :src="arrow" class="arrow">
    </router-link>

    <div class="content">
      <h1>{{ category }} Visas</h1>
    </div>
    
    <div class="content">
      <visa-card 
        v-for="visa in visas"
        :key="visa.name"
        :visa="visa"
        :currentVisa="currentVisa"
        :switchOptions="switchOptions"
        class="visa-card">
        <template #quickTip>
          <quick-tip :visa="visa"/>
        </template>
      </visa-card>
    </div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import visaCard from '@/components/VisaCard';
import quickTip from '@/components/QuickTip';
import { mapState } from 'vuex';

export default {
  components: {
    visaCard,
    quickTip
  },
  data() {
    return {
      arrow,
      category: this.$route.params.category,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      results: this.$store.state.auth.user.profile.questionnaireResults,
      switchOptions: []
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visas() {
      return this.visaList.filter(item => item.category === this.category);
    },
    mostRecentResult() {
      return this.results.slice(-1)[0]; 
    },
    switchVisas() {
      if(this.mostRecentResult) {
        // Filter visa list for user's switch options
        const switchOptions = this.visaList.filter(item => this.switchOptions.includes(item.name));
        // Get all visas in same category
        const sameCategory = switchOptions.filter(item => item.category === this.topResult[0].category);
        // Remove visa(s) that appear in top result
        return sameCategory.filter(item => !this.topResult.includes(item));
      } else {
        return false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#category-page {
  padding: $spacing*10 0 $spacing*6;
}

h1 {
  text-transform: capitalize;
  margin-bottom: $spacing*4;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

.visa-card {
  margin-bottom: $spacing*4;
}
</style>
