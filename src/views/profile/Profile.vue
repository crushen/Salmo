<template>
  <section id="profile" class="content">
    <!-- If user has verified email -->
    <section v-if="user.emailVerified">
      <!-- <button @click="handleLogout" type="button">Log Out</button> -->
      <section class="user-info">
        <h1>Your current plan.</h1>
        <h2>Here's where you're at right now with your visa and living situation in the UK.</h2>

        <profile-card 
          v-if="user.profile.age"
          :user="user" />

        <div class="edit-button">
          <router-link 
            v-if="user.profile.age"
            :to="{ name: 'update-profile'}"
            class="edit-button">
            Edit Profile
          </router-link>

          <router-link 
            v-else
            tag="button"
            :to="{ name: 'update-profile'}">
            Create Profile
          </router-link>
        </div>
      </section>

      <section class="visa-tools">
        <p>Make sure your profile is accurate to help you calculate your future plans.</p>
        <p>Below are seom features which should help you work through your current visa.</p>

        <visa-dates-card />
      </section>

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

    <!-- If user hasn't verified email -->
    <section v-else>
      <div>
        <p>We've sent a link to <strong>{{ user.email }}</strong> to verify your email address.</p>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import profileCard from '@/components/ProfileCard';
import visaDatesCard from '@/components/VisaDatesCard';
// import visaCard from '@/components/VisaCard';
// import quickTip from '@/components/QuickTip';
// import pageLinkCard from '@/components/PageLinkCard';

export default {
  components: {
    profileCard,
    visaDatesCard
    // visaCard,
    // quickTip,
    // pageLinkCard
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      results: this.$store.state.auth.user.profile.questionnaireResults,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      numberOfVisas: 3,
      switchOptions: [],
      youthMobility: [],
      pageLinks: [
        {
          text: 'Head over to your stats page to see an overview of your document checklist, important dates and travel history.',
          pageTitle: 'Visa Stats<br>and Facts'
          //link: ''
          //icon: ''
        },
        {
          text: 'For more general advice or help on the UK aplication process, take a look through our Help Centre.',
          pageTitle: 'Help<br>Centre'
          //link: ''
          //icon: ''
        }
      ] 
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
  padding: $spacing*10 0;
}

h1 {
  margin-bottom: $spacing*2;
}

.user-info {
  margin-bottom: $spacing*5;

  .edit-button {
    width: 100%;
    text-align: center;
    margin-top: $spacing*2;
    text-decoration: underline;
  }
}

.visa-tools {
  p:first-of-type {
    margin-bottom: $spacing*3;
  }

  p:last-of-type {
    margin-bottom: $spacing*5;
  }
}





// .results {
//   & h3 {
//     margin-bottom: $spacing*4;
//   }
// }

// .results-button {
//   width: 190px;
//   margin: $spacing*4 auto 0 auto;
//   text-align: center;

//   button {
//     margin-top: $spacing*2;
//   }
// }

// .settings {
//   text-align: center;

//   button {
//     margin-top: $spacing*2;
//   }
// }
</style>
