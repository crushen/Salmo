<template>
  <section>
    <!-- <button @click="handleLogout" type="button">Log Out</button> -->
    <h1>All about you.</h1>

    <profile-card 
      v-if="user.profile.age"
      :user="user" />

    <div class="edit-button">
      <router-link 
        v-if="user.profile.age"
        :to="{ name: 'update-profile', params: { uid: user.uid } }"
        class="edit-button">
        Edit Profile
      </router-link>

      <router-link 
        v-else
        tag="button"
        :to="{ name: 'update-profile', params: { uid: user.uid } }">
        Create Profile
      </router-link>
    </div>

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

      <div v-if="numberOfOtherVisas[0] || youthMobility[0]">
        <p><strong>Visas in the {{ topResult[0].category }} category you can apply for, but you would need to leave the UK before applying:</strong></p>
        <router-link 
          v-for="visa in numberOfOtherVisas"
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

        <button 
          v-if="numberOfOtherVisas.length !== allOtherVisas.length"
          @click="numberOfVisas += allOtherVisas.length">
          Show All
        </button>
        <button
          v-else-if="allOtherVisas.length > 3"
          @click="numberOfVisas = 3">
          Show Less
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import profileCard from '@/components/ProfileCard';

export default {
  components: {
    profileCard
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      results: this.$store.state.auth.user.profile.questionnaireResults,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      numberOfVisas: 3,
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
    allOtherVisas() {
      if(this.mostRecentResult) {
        // Filter visa list for visas in same category as top result
        const sameCategory = this.visaList.filter(item => item.category === this.topResult[0].category);
        // Remove visa(s) that appear in top result
        const removeTop = sameCategory.filter(item => !this.topResult.includes(item));
        // Remove visa(s) that appear in switch visas
        const removeSwitch = removeTop.filter(item => !this.switchVisas.includes(item));
        return removeSwitch;
      } else {
        return false;
      }
    },
    numberOfOtherVisas() {
      return this.allOtherVisas.slice(0, this.numberOfVisas);
    }
  },
  methods: {
    // handleLogout() {
    //   this.$store.dispatch('auth/logOut')
    //   .then(() => {
    //     if(this.$route.path !== '/') {
    //       this.$router.push('/')
    //     }
    //     alert('You have been logged out')
    //   })
    // },
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

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.edit-button {
  width: 100%;
  text-align: center;
  margin-top: $spacing*2;
  text-decoration: underline;
}

.take-quiz {
  margin-top: 100px;
}

.results {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.result-link {
  border: 2px solid $secondary-pink;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
</style>
