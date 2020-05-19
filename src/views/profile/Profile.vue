<template>
  <section id="profile">
    <!-- If user hasn't verified email -->
    <div 
      v-if="!user.emailVerified"
      class="content">
      <p>We've sent a link to <strong>{{ user.email }}</strong> to verify your email address. Please refresh the page once you've verified your email address.</p>
    </div>
    <!-- If user has verified email -->
    <div v-else>
      <!-- If user has filled in their info -->
      <updated-profile 
        v-if="user.profile.age"
        :user="user" />
      <!-- If user hasn't filled in their info -->
      <non-updated-profile v-else/>

      <section class="help">
        <div class="content">
          <p>For more general advice or help on the UK application process, take a look through our Help Centre.</p>
          <div class="button">
            <button>Help Centre</button>
          </div>
          <div class="notificaitons">
            <p>You can also change your preferences and how we get in touch in your <button class="tertiary">Settings</button>.</p>
          </div>
          <div class="button log-out">
            <button 
              @click="handleLogout" 
              type="button"
              class="secondary">
              Log Out
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import updatedProfile from '@/components/profile/UpdatedProfile';
import nonUpdatedProfile from '@/components/profile/NonUpdatedProfile';

export default {
  components: {
    updatedProfile,
    nonUpdatedProfile
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
    handleLogout() {
      this.$store.dispatch('auth/logOut')
      .then(() => {
        if(this.$route.path !== '/') {
          this.$router.push('/')
        }
        alert('You have been logged out')
      })
    },
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
  padding: $spacing*10 0 0;
}

.help {
  background: $background;
  margin-top: $spacing*8;
  padding: $spacing*8 0 $spacing*10 0;

  .button {
    margin-top: $spacing*2;
    text-align: center;

    &.log-out {
      margin-top: $spacing*8;
      
      button {
        width: 120px;
      }
    }
  }

  .notificaitons {
    background: $light-grey;
    padding: $spacing*2 $spacing;
    border-radius: 4px;
    margin-top: $spacing*6;
  }
}
</style>
