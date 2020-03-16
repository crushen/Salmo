<template>
  <div>
    <h1>Quiz done</h1>

    <div v-if="Array.isArray(result)">
      <p>Your options are:</p>
      <p
        v-for="visa in result"
        :key="visa">
        {{ visa }}
      </p>
    </div>

    <p v-else>{{ result }}</p>
    <p v-if="messages.switch">{{ messages.switch }}</p>
    <p v-if="messages.dependant">{{ messages.dependant }}</p>

    <p v-if="youthMobility">Youth Mobility Visa</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAge: this.$store.state.auth.user.profile.age,
      userCountry: this.$store.state.auth.user.profile.country,
      result: this.$store.state.questions.result.recommendedVisa,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      messages: {
        switch: null,
        dependant: null
      },
      youthMobility: false
    }
  },
  methods: {
    checkYouthMobility() {
      const YMvisas = ['Tier 2 General Work Visa', 'Tier 5 Charity Worker Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Tier 5 Creative and Sporting Visa', 'Tier 5 Religious Worker Visa', 'Tier 5 Seasonal Worker Visa' ];
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];
      let isYMvisa = false;
      let isYMcountry = false;

      YMvisas.forEach(visa => {
        if(this.result === visa) {
          isYMvisa = true;
        }
      });

      YMcountries.forEach(country => {
        if(this.userCountry === country) {
          isYMcountry = true;
        }
      });

      if(isYMvisa && 
         isYMcountry && 
         this.userAge >= 18 && 
         this.userAge <= 30 &&
         this.dependants === 'None') {
        this.youthMobility = true;
      }
    }
  },
  created() {
    // Check if they qualify for youth mobility
    this.checkYouthMobility();
    // Check if they can switch from current visa
    // CHILD
    if(this.result === 'Tier 4 Child Student Visa') {
      if(this.currentVisa === 'Tier 4 General Student Visa') {
        this.messages.switch = 'You can switch to this visa';
      }
    }
    //ADULT
    //WORK
    if(this.result === 'Tier 5 Creative and Sporting Visa') {
      if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = 'You can switch to this visa if you’re in the UK as a sports or entertainer visitor, as long as your sponsor gave you a certificate of sponsorship for this visa before you came to the UK.';
      }
    }
    
    if(this.result === 'Tier 2 Sportsperson Visa') {
      if(this.currentVisa.includes('Intra-company Transfer')) {
        this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
      } else if(this.currentVisa.includes('Tier 4')) {
        this.messages.switch = 'You can switch to this visa if you have an eligible qualification or you’ve done at least 12 months of a PhD';
      } else if(this.currentVisa === 'Tier 5 Creative and Sporting Visa') {
        this.messages.switch = "You can switch to this visa if you're a professional footballer";
      } else if(this.currentVisa.includes('Tier 1') ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa === 'Innovator Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.result === 'Tier 2 Minister of Religion Visa') {
      if(this.currentVisa.includes('Intra-company Transfer')) {
        this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
      } else if(this.currentVisa.includes('Tier 4')) {
        this.messages.switch = 'You can switch to this visa if you have an eligible qualification';
      } else if(this.currentVisa.includes('Tier 1') ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa === 'Innovator Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.result === 'Tier 2 General Work Visa') {
      if(this.currentVisa.includes('Intra-company Transfer')) {
        this.messages.switch = 'You can switch to this visa if you’re applying to change sponsor';
      } else if(this.currentVisa.includes('Tier 4')) {
        this.messages.switch = 'You can switch to this visa if you have an eligible qualification or you’ve done at least 12 months of a PhD';
      } else if(this.currentVisa.includes('Tier 1') ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa === 'Innovator Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }
    // BUSINESS
    if(this.result === 'Tier 1 Exceptional Talent Visa') {
      if(this.currentVisa === 'Tier 5 GOV Authorised Exchange Visa') {
        this.messages.switch = "You can switch to this visa if you're on an exchange scheme for sponsored researchers";
      } else if(this.currentVisa.includes('Tier 1') ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa === 'Innovator Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.result.includes('Tier 1 Investor Visa')) {
      if(this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
         this.currentVisa === 'Tier 2 General Work Visa' ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Tier 4 General Student Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.result.includes('Innovator Visa')) {
      if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
         this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa.includes('Tier 2')) {
           this.messages.switch = 'You can switch to this visa';
      } else if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = 'You can switch to this visa if you came to the UK to get funding and had a supporting letter from an endorsing body';
      }
    }

    if(this.result.includes('Startup Visa')) {
      if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
         this.currentVisa === 'Tier 4 General Student Visa' ||
         this.currentVisa.includes('Tier 2')) {
           this.messages.switch = 'You can switch to this visa';
      } else if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = "You can switch to this visa, but you will need to get a supporting letter from an endorsing body to prove you're looking for funding";
      }
    }
    // STUDY
    if(this.result.includes('Tier 4 General Student Visa')) {
      if(this.currentVisa === 'Tier 2 General Work Visa' ||
         this.currentVisa.includes('Intra-company Transfer') ||
         this.currentVisa === 'Tier 2 Minister of Religion Visa' ||
         this.currentVisa === 'Tier 4 Child Student Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }
    // Check if they can bring dependants
    if(this.result === 'Tier 4 Child Student Visa' ||
       this.result === 'Tier 4 Short Term Study Visa' ||
       this.result === 'Tier 5 Seasonal Worker Visa' ||
       this.result === 'Tier 5 Youth Mobility Scheme' ||
       this.result === 'Marriage Visa' ||
       this.result === 'Standard Visitor Visa') {
         if(this.dependants !== 'None') {
          this.messages.dependant = "We're sorry, you can't bring any dependants on this visa"
         }
    } else {
      if(this.dependants !== 'None') {
        this.messages.dependant = "You can bring dependants with you on this visa"
      }
    }

    // Set messages in state, and then push to db
    this.$store.dispatch('questions/sendDbResults', {
      messages: this.messages,
      youthMobility: this.youthMobility
    });
  }
}
</script>
