<template>
  <div>
    <h1>Quiz done</h1>
    <div class="results">
      <p><strong>Top result:</strong></p>
      <router-link 
        v-for="visa in topResult"
        :key="visa.name"
        tag="div"
        class="result-link"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }">
        <p>{{ visa.name }}</p>
        <p>Switch: {{ visa.switch }}</p>
      </router-link>

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

      <div v-if="otherVisas[0]">
        <p><strong>Visas in the {{ topResult[0].category }} category you can't switch to:</strong></p>
        <router-link 
          v-for="visa in otherVisas"
          :key="visa.name"
          tag="div"
          class="result-link"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          <p>{{ visa.name }}</p>
        </router-link>
      </div>


      <!-- <p v-if="messages.switch">{{ messages.switch }}</p>
      <p v-if="messages.dependant">{{ messages.dependant }}</p>
      <p v-if="youthMobility">Youth Mobility Visa</p> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userAge: this.$store.state.auth.user.profile.age,
      userCountry: this.$store.state.auth.user.profile.country,
      results: this.$store.state.questions.result.recommendedVisa,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      switchOptions: [],
    
      messages: {
        switch: '',
        dependants: ''
      },
      youthMobility: false
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    topResult() {
      return this.visaList.filter(item => this.results.includes(item.name));
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
    checkYouthMobility() {
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];

      YMcountries.forEach(country => {
        if(this.userCountry === country &&
           this.userAge >= 18 && 
           this.userAge <= 30 &&
           this.dependants === 'None') {
           this.youthMobility = true;
        }
      });
    },
    checkSwitch() {  
      if(this.currentVisa === 'Tier 4 General Student Visa') {
        this.switchOptions = ['Startup Visa', 'Tier 1 Investor Visa - 5 years for PR', 'Tier 1 Investor Visa - 3 years for PR', 'Tier 1 Investor Visa - 2 years for PR', 'Tier 2 General Work Visa', 'Tier 2 Sportsperson Visa', 'Tier 2 Minister of Religion Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Family Visa (needs expanding)']
      } else if(this.currentVisa === 'Tier 4 Child Student Visa') {
        this.switchOptions = ['Tier 2 General Work Visa', 'Tier 2 Sportsperson Visa', 'Tier 2 Minister of Religion Visa', 'Tier 4 General Student Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Family Visa (needs expanding)']
      }

      // For now, will only be testing Student specific questionnaires, so all top results will be switchable
      this.topResult.forEach(visa => {
        visa.switch = true;
      })
    }
  },
  created() {
    // Check if user is eligable for Youth Mobility Visa
    this.checkYouthMobility();
    this.checkSwitch();
    // Set messages in state, and then push to db
    this.$store.dispatch('questions/sendDbResults', { // Need to work on this - redundant logic with new flow
      messages: this.messages,
      youthMobility: this.youthMobility
    });
  }
}
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 30px auto 0 auto;
}

.result-link {
  border: 1px solid pink;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
</style>
