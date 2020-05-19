<template>
  <section class="content">
    <router-link :to="{ name: 'questionnaire' }">
      <img :src="arrow" class="arrow">
    </router-link>

    <h1>Well Done!</h1>
    <div class="placholder-img"></div>
    <h3>Congratulations on completing the quiz, your results are below.</h3>

    <div class="results section-margin">
      <p>Your best option to remain in the UK is by <strong>switching</strong> to:</p>
      <visa-card
        v-for="visa in topResult"
        :key="visa.name"
        :visa="visa"
        class="top-result">
        <template #quickTip>
          <quick-tip :visa="visa"/>
        </template>
      </visa-card>

      <div v-if="switchVisas[0]">
        <p><strong>Other {{ topResult[0].category }} visas you can switch to:</strong></p>
        <router-link 
          v-for="visa in switchVisas"
          :key="visa.name"
          tag="div"
          class="result-link"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          <p>{{ visa.name }}</p>
        </router-link>
      </div>

      <div v-if="otherVisas[0] || youthMobility[0]">
        <p><strong>Visas in the {{ topResult[0].category }} category you can apply for, but you would need to leave the UK before applying:</strong></p>
        <router-link 
          v-for="visa in otherVisas"
          :key="visa.name"
          tag="div"
          class="result-link"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          <p>{{ visa.name }}</p>
        </router-link>

        <router-link
          v-if="youthMobility[0]"
          tag="div"
          class="result-link"
          :to="{ name: 'visa-page', params: { slug: youthMobility[0].slug } }">
          <p>{{ youthMobility[0].name }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import arrow from '@/assets/icons/chevron-left-solid.svg';
import visaCard from '@/components/visa/VisaCard';
import quickTip from '@/components/visa/QuickTip';

export default {
  components: {
    visaCard,
    quickTip
  },
  data() {
    return {
      arrow,
      userAge: this.$store.state.auth.user.profile.age,
      userCountry: this.$store.state.auth.user.profile.nationality,
      results: this.$store.state.auth.user.profile.questionnaireResults,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      switchOptions: [],
      youthMobility: []
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    mostRecentResult() {
      return this.results.slice(-1)[0]; 
    },
    topResult() {
      return this.visaList.filter(item => this.mostRecentResult.recommendedVisa.includes(item.name));
    },
    switchVisas() {
      // Filter visa list for user's switch options
      const switchOptions = this.visaList.filter(item => this.switchOptions.includes(item.name));
      // Get all visas in same category
      const sameCategory = switchOptions.filter(item => item.category === this.topResult[0].category);
      // Remove visa(s) that appear in top result
      return sameCategory.filter(item => !this.topResult.includes(item));
    },
    otherVisas() {
      // Filter visa list for visas in same category as top result
      const sameCategory = this.visaList.filter(item => item.category === this.topResult[0].category);
      // Remove visa(s) that appear in top result
      const removeDup = sameCategory.filter(item => !this.topResult.includes(item));
      // Remove visa(s) that appear in switch visas
      return removeDup.filter(item => !this.switchVisas.includes(item));
    }
  },
  methods: {
    checkSwitch() {  
      if(this.currentVisa === 'Tier 4 General Student Visa') {
        this.switchOptions = ['Startup Visa', 'Tier 1 Investor Visa', 'Tier 2 General Work Visa', 'Tier 2 Sportsperson Visa', 'Tier 2 Minister of Religion Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Family Visa (needs expanding)']
      } else if(this.currentVisa === 'Tier 4 Child Student Visa') {
        this.switchOptions = ['Tier 2 General Work Visa', 'Tier 2 Sportsperson Visa', 'Tier 2 Minister of Religion Visa', 'Tier 4 General Student Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Family Visa (needs expanding)']
      }
      // For now, will only be testing Student specific questionnaires, so all top results will be switchable
      // However, this will change when other current visas are options
      this.topResult.forEach(visa => {
        visa.switch = true;
      })
    },
    checkYouthMobility() {
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];
      YMcountries.forEach(country => {
        if(this.userCountry === country &&
           this.userAge >= 18 && 
           this.userAge <= 30 &&
           this.dependants === 'None') {
           this.youthMobility = this.visaList.filter(item => item.category === 'youth-mobility');
        }
      });
    }
  },
  created() {
    this.checkSwitch();
    this.checkYouthMobility();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*10;
}

.placholder-img {
  width: 90%;
  height: 150px;
  margin: $spacing*4 auto;
  background: $light-grey;
}

strong {
  font-weight: 600;
}

.results {

  .top-result {
    margin: $spacing*4 0;
  }
}
</style>
