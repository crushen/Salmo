<template>
  <section>
    <div v-if="user.emailVerified">
      <p>Name: {{ user.profile.firstName }} {{ user.profile.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Email verified: {{ user.emailVerified }}</p>
      <p>Current Visa: {{ currentVisa }}</p>
      <p>Dependants: {{ dependants }}</p>

      <h1 class="margin">Visa Results:</h1>

      <div v-if="mostRecentResult">
        <div v-if="Array.isArray(mostRecentResult.recommendedVisa)">
          <p>Your options are:</p>
          <p
            v-for="visa in mostRecentResult.recommendedVisa"
            :key="visa">
            {{ visa }}
          </p>
        </div>

        <p v-else>{{ mostRecentResult.recommendedVisa }}</p>
        <p v-if="messages.switch">{{ messages.switch }}</p>
        <p v-if="messages.dependant">{{ messages.dependant }}</p>

        <p v-if="mostRecentResult.youthMobility">Youth Mobility Visa</p>
      </div>
    </div>

    <div v-else>
      <p>Please verify your email to continue</p>
    </div>

  </section>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      messages: {
        switch: null,
        dependant: null
      }
    }
  },
  computed: {
    mostRecentResult() {
      return this.user.profile.questionnaireResults.slice(-1)[0];
    }
  },
  created() {
    this.user = this.$store.state.auth.user;

 
    // CHILD
    if(this.mostRecentResult.recommendedVisa === 'Tier 4 Child Student Visa') {
      if(this.currentVisa === 'Tier 4 General Student Visa') {
        this.messages.switch = 'You can switch to this visa';
      }
    }
    //ADULT
    //WORK
    if(this.mostRecentResult.recommendedVisa === 'Tier 5 Creative and Sporting Visa') {
      if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = 'You can switch to this visa if you’re in the UK as a sports or entertainer visitor, as long as your sponsor gave you a certificate of sponsorship for this visa before you came to the UK.';
      }
    }
    
    if(this.mostRecentResult.recommendedVisa === 'Tier 2 Sportsperson Visa') {
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

    if(this.mostRecentResult.recommendedVisa === 'Tier 2 Minister of Religion Visa') {
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

    if(this.mostRecentResult.recommendedVisa === 'Tier 2 General Work Visa') {
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
    if(this.mostRecentResult.recommendedVisa === 'Tier 1 Exceptional Talent Visa') {
      if(this.currentVisa === 'Tier 5 GOV Authorised Exchange Visa') {
        this.messages.switch = "You can switch to this visa if you're on an exchange scheme for sponsored researchers";
      } else if(this.currentVisa.includes('Tier 1') ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa === 'Innovator Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.mostRecentResult.recommendedVisa.includes('Tier 1 Investor Visa')) {
      if(this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
         this.currentVisa === 'Tier 2 General Work Visa' ||
         this.currentVisa.includes('Tier 2') ||
         this.currentVisa === 'Tier 4 General Student Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }

    if(this.mostRecentResult.recommendedVisa.includes('Innovator Visa')) {
      if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
         this.currentVisa === 'Tier 1 Entrepreneur Visa' ||
         this.currentVisa === 'Startup Visa' ||
         this.currentVisa.includes('Tier 2')) {
           this.messages.switch = 'You can switch to this visa';
      } else if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = 'You can switch to this visa if you came to the UK to get funding and had a supporting letter from an endorsing body';
      }
    }

    if(this.mostRecentResult.recommendedVisa.includes('Startup Visa')) {
      if(this.currentVisa === 'Tier 1 Graduate Entrepreneur Visa' ||
         this.currentVisa === 'Tier 4 General Student Visa' ||
         this.currentVisa.includes('Tier 2')) {
           this.messages.switch = 'You can switch to this visa';
      } else if(this.currentVisa === 'Standard Visitor Visa') {
        this.messages.switch = "You can switch to this visa, but you will need to get a supporting letter from an endorsing body to prove you're looking for funding";
      }
    }
    // STUDY
    if(this.mostRecentResult.recommendedVisa.includes('Tier 4 General Student Visa')) {
      if(this.currentVisa === 'Tier 2 General Work Visa' ||
         this.currentVisa.includes('Intra-company Transfer') ||
         this.currentVisa === 'Tier 2 Minister of Religion Visa' ||
         this.currentVisa === 'Tier 4 Child Student Visa') {
           this.messages.switch = 'You can switch to this visa';
      }
    }
    // DEPENDANT MESSAGE
    if(this.mostRecentResult.recommendedVisa === 'Tier 4 Child Student Visa' ||
      this.mostRecentResult.recommendedVisa === 'Tier 4 Short Term Study Visa' ||
      this.mostRecentResult.recommendedVisa === 'Tier 5 Seasonal Worker Visa' ||
      this.mostRecentResult.recommendedVisa === 'Tier 5 Youth Mobility Scheme' ||
      this.mostRecentResult.recommendedVisa === 'Marriage Visa' ||
      this.mostRecentResult.recommendedVisa === 'Standard Visitor Visa') {
        if(this.dependants !== 'None') {
          this.messages.dependant = "We're sorry, you can't bring any dependants on this visa"
        }
    } else {
      if(this.dependants !== 'None') {
        this.messages.dependant = "You can bring dependants with you on this visa"
      }
    }
  
  }
}
</script>

<style scoped>
.margin {
  margin-top: 50px;
}
</style>
