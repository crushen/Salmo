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

      <p><strong>Other {{ visaList[0].category }} visas you can switch to:</strong></p>
      <router-link 
        v-for="visa in switchVisas"
        :key="visa.name"
        tag="div"
        class="result-link"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }">
        <p>{{ visa.name }}</p>
      </router-link>

      <p><strong>Visas in the {{ visaList[0].category }} category you can't switch to:</strong></p>
      <router-link 
        v-for="visa in otherVisas"
        :key="visa.name"
        tag="div"
        class="result-link"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }">
        <p>{{ visa.name }}</p>
      </router-link>

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
      const sameCategory = switchOptions.filter(item => item.category === this.visaList[0].category);
      // Remove visa(s) that appear in top result
      return sameCategory.filter(item => !this.topResult.includes(item));
    },
    otherVisas() {
      // Filter visa list for visas in same category as top result
      const sameCategory = this.visaList.filter(item => item.category === this.visaList[0].category);
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
        this.switchOptions = ['Startup Visa', 'Tier 1 Investor Visa - 5 years for PR', 'Tier 1 Investor Visa - 3 years for PR', 'Tier 1 Investor Visa - 2 years for PR', 'Tier 2 General Work Visa', 'Tier 2 Sportsperson Visa', 'Tier 2 Minister of Religion Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Family Visa - Apply on the basis of your private life', 'Family Visa - Coming as an adult to be cared for by a relative route', 'Family Visa - Coming as a parent to join your child route', 'Family Visa - Coming to join your partner/spouse route']
      }

      // For now, will only be testing Student specific questionnaire, so all top results will be switchable
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

    // // Check if they can switch from current visa
    // // CHILD
    // if(this.result === 'Tier 4 Child Student Visa') {
    //   if(this.currentVisa === 'Tier 4 General Student Visa') {
    //     this.messages.switch = 'You can switch to this visa';
    //   }
    // }
    // //ADULT
    // //WORK
    // if(this.result === 'Tier 5 Creative and Sporting Visa') {
    //   if(this.currentVisa === 'Standard Visitor Visa') {
    //     this.messages.switch = 'You can switch to this visa if you’re in the UK as a sports or entertainer visitor, as long as your sponsor gave you a certificate of sponsorship for this visa before you came to the UK.';
    //   }
    // }
    
    // if(this.result === 'Tier 2 Sportsperson Visa') {
    //   if(this.currentVisa.includes('Intra-company Transfer')) {
    //     this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
    //   } else if(this.currentVisa.includes('Tier 4')) {
    //     this.messages.switch = 'You can switch to this visa if you have an eligible qualification or you’ve done at least 12 months of a PhD';
    //   } else if(this.currentVisa === 'Tier 5 Creative and Sporting Visa') {
    //     this.messages.switch = "You can switch to this visa if you're a professional footballer";
    //   } else if(this.currentVisa.includes('Tier 1') ||
    //      this.currentVisa.includes('Tier 2') ||
    //      this.currentVisa === 'Startup Visa' ||
    //      this.currentVisa === 'Innovator Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }

    // if(this.result === 'Tier 2 Minister of Religion Visa') {
    //   if(this.currentVisa.includes('Intra-company Transfer')) {
    //     this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
    //   } else if(this.currentVisa.includes('Tier 4')) {
    //     this.messages.switch = 'You can switch to this visa if you have an eligible qualification';
    //   } else if(this.currentVisa.includes('Tier 1') ||
    //      this.currentVisa.includes('Tier 2') ||
    //      this.currentVisa === 'Startup Visa' ||
    //      this.currentVisa === 'Innovator Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }

    // if(this.result === 'Tier 2 General Work Visa') {
    //   if(this.currentVisa.includes('Intra-company Transfer')) {
    //     this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
    //   } else if(this.currentVisa.includes('Tier 4')) {
    //     this.messages.switch = 'You can switch to this visa if you have an eligible qualification or you’ve done at least 12 months of a PhD';
    //   } else if(this.currentVisa.includes('Tier 1') ||
    //      this.currentVisa.includes('Tier 2') ||
    //      this.currentVisa === 'Startup Visa' ||
    //      this.currentVisa === 'Innovator Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }
    // // BUSINESS
    // if(this.result === 'Tier 1 Exceptional Talent Visa') {
    //   if(this.currentVisa === 'Tier 5 GOV Authorised Exchange Visa') {
    //     this.messages.switch = "You can switch to this visa if you're on an exchange scheme for sponsored researchers";
    //   } else if(this.currentVisa.includes('Tier 1') ||
    //      this.currentVisa.includes('Tier 2') ||
    //      this.currentVisa === 'Startup Visa' ||
    //      this.currentVisa === 'Innovator Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }

    // if(this.result.includes('Tier 1 Investor Visa')) {
    //   if(this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
    //      this.currentVisa === 'Tier 2 General Work Visa' ||
    //      this.currentVisa.includes('Tier 2') ||
    //      this.currentVisa === 'Tier 4 General Student Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }

    // if(this.result.includes('Innovator Visa')) {
    //   if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
    //      this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
    //      this.currentVisa === 'Startup Visa' ||
    //      this.currentVisa.includes('Tier 2')) {
    //        this.messages.switch = 'You can switch to this visa';
    //   } else if(this.currentVisa === 'Standard Visitor Visa') {
    //     this.messages.switch = 'You can switch to this visa if you came to the UK to get funding and had a supporting letter from an endorsing body';
    //   }
    // }

    // if(this.result.includes('Startup Visa')) {
    //   if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
    //      this.currentVisa === 'Tier 4 General Student Visa' ||
    //      this.currentVisa.includes('Tier 2')) {
    //        this.messages.switch = 'You can switch to this visa';
    //   } else if(this.currentVisa === 'Standard Visitor Visa') {
    //     this.messages.switch = "You can switch to this visa, but you will need to get a supporting letter from an endorsing body to prove you're looking for funding";
    //   }
    // }
    // // STUDY
    // if(this.result.includes('Tier 4 General Student Visa')) {
    //   if(this.currentVisa === 'Tier 2 General Work Visa' ||
    //      this.currentVisa.includes('Intra-company Transfer') ||
    //      this.currentVisa === 'Tier 2 Minister of Religion Visa' ||
    //      this.currentVisa === 'Tier 4 Child Student Visa') {
    //        this.messages.switch = 'You can switch to this visa';
    //   }
    // }
    // // Check if they can bring dependants
    // if(this.result === 'Tier 4 Child Student Visa' ||
    //    this.result === 'Tier 4 Short Term Study Visa' ||
    //    this.result === 'Tier 5 Seasonal Worker Visa' ||
    //    this.result === 'Tier 5 Youth Mobility Scheme' ||
    //    this.result === 'Marriage Visa' ||
    //    this.result === 'Standard Visitor Visa') {
    //      if(this.dependants !== 'None') {
    //       this.messages.dependant = "We're sorry, you can't bring any dependants on this visa"
    //      }
    // } else {
    //   if(this.dependants !== 'None') {
    //     this.messages.dependant = "You can bring dependants with you on this visa"
    //   }
    // }
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
