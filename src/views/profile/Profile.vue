<template>
  <section id="profile">
    <!-- <button @click="handleLogout" type="button">Log Out</button> -->
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
            <p>You can also change how we get in touch on our <button class="tertiary">Notificaiton Settings</button> page.</p>
          </div>
        </div>
      </section>
    </div>
      <!-- <section>
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
          <h3>The top result of your latest quiz</h3>
          <visa-card 
            v-for="visa in topResult"
            :key="visa.name"
            :visa="visa"
            :currentVisa="currentVisa"
            :switchOptions="switchOptions">
            <template #quickTip>
              <quick-tip :visa="visa"/>
            </template>
          </visa-card>

          <div class="results-button">
            <p>You can see the rest of your results below!</p>
            <button>Quiz Results</button>
          </div>
        </div>
      </section> -->


      <!-- <section class="section-margin">
        <page-link-card
          v-for="card in pageLinks"
          :key="card.pageTitle"
          :text="card.text"
          :pageTitle="card.pageTitle" />
      </section>

      <section class="section-margin settings">
        <p>Change how we get in touch below</p>
        <button>Notification Settings</button>
      </section> -->

        <!-- <div v-if="switchVisas[0]">
          <h3>Other {{ topResult[0].category }} visas you can switch to</h3>
          <visa-card 
            v-for="visa in switchVisas"
            :key="visa.name"
            :visa="visa"
            :currentVisa="currentVisa" />
        </div> -->

        <!-- <div v-if="numberOfOtherVisas[0] || youthMobility[0]">
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
        </div> -->
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
  }

  .notificaitons {
    background: $light-grey;
    padding: $spacing*2 $spacing;
    border-radius: 4px;
    margin-top: $spacing*6;
  }
}
</style>
