<template>
  <section>
    <div class="profile-details">
      <div v-if="user.profile.age">
        <p><strong>Age:</strong> {{ user.profile.age }}</p>
        <p><strong>Country:</strong> {{ user.profile.country }}</p>
        <p><strong>Current Visa:</strong> {{ user.profile.currentVisa }}</p>
        <p><strong>Dependants:</strong> {{ user.profile.dependants }}</p>
      </div>
    </div>

    <router-link 
      v-if="user.profile.age"
      tag="button"
      :to="{ name: 'update-profile', params: { uid: user.uid } }">
      Update Profile
    </router-link>
    <router-link 
      v-else
      tag="button"
      :to="{ name: 'update-profile', params: { uid: user.uid } }">
      Create Profile
    </router-link>

    <div 
      v-if="!topResult"
      class="take-quiz">
      <p>To find out your easiest way to stay in the UK, take our visa quiz!</p>
      <router-link
        :to="{ name: 'questionnaire' }"
        tag="button">
        Take the quiz!
      </router-link>
    </div>

    <div 
      v-else
      class="results">
      <p><strong>You can switch to this visa for the easiest way to remain in the UK:</strong></p>
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

export default {
  data() {
    return {
      user: this.$store.state.auth.user,
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
      if(this.mostRecentResult) {
        return this.visaList.filter(item => this.mostRecentResult.recommendedVisa.includes(item.name));
      } else {
        return false;
      }
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
    otherVisas() {
      if(this.mostRecentResult) {
        // Filter visa list for visas in same category as top result
        const sameCategory = this.visaList.filter(item => item.category === this.topResult[0].category);
        // Remove visa(s) that appear in top result
        const removeDup = sameCategory.filter(item => !this.topResult.includes(item));
        // Remove visa(s) that appear in switch visas
        return removeDup.filter(item => !this.switchVisas.includes(item));
      } else {
        return false;
      }
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
      if(this.topResult) {
        this.topResult.forEach(visa => {
          visa.switch = true;
        })
      }
    },
    checkYouthMobility() {
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];
      YMcountries.forEach(country => {
        if(this.user.profile.country === country &&
           this.user.profile.age >= 18 && 
           this.user.profile.age <= 30 &&
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

<style scoped>
.take-quiz {
  margin-top: 100px;
}

.results {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.result-link {
  border: 1px solid pink;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
</style>
