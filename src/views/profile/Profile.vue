<template>
  <section id="profile">
    <!-- Check if user has verified email and accepted T&C's -->
    <verify-email 
      v-if="!user.emailVerified" 
      :user="user"/>

    <div v-else>
      <!-- Check if user has filled out profile info -->
      <updated-profile 
        v-if="user.profile.age"
        :user="user" />

      <non-updated-profile v-else/>

      <!-- Links to help center and settings & log out button -->
      <settings />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import verifyEmail from '@/components/profile/VerifyEmail';
import updatedProfile from '@/components/profile/UpdatedProfile';
import nonUpdatedProfile from '@/components/profile/NonUpdatedProfile';
import settings from '@/components/profile/Settings';

export default {
  components: {
    verifyEmail,
    updatedProfile,
    nonUpdatedProfile,
    settings
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
    checkSwitch() {  
      if(this.currentVisa === 'Tier 4 General Student') {
        this.switchOptions = ['Startup', 'Tier 1 Investor', 'Tier 2 General Work', 'Tier 2 Sportsperson', 'Tier 2 Minister of Religion', 'Tier 5 Government Authorised Exchange', 'Family (needs expanding)']
      } else if(this.currentVisa === 'Tier 4 Child Student') {
        this.switchOptions = ['Tier 2 General Work', 'Tier 2 Sportsperson', 'Tier 2 Minister of Religion', 'Tier 4 General Student', 'Tier 5 Government Authorised Exchange', 'Family (needs expanding)']
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

#profile {
  padding: $spacing*12 0 0;
}
</style>
