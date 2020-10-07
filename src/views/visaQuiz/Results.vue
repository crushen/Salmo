<template>
  <main v-if="topResult && favoriteVisa" id="results" class="content">
    <h1>Completed!</h1>

    <section class="top">
      <h2>Your best option is...</h2>

      <div class="sub-title">
        <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
        <p>Switch to</p>
      </div>
      
      <visa-card
        :visa="topResult"
        :favouriteVisa="favoriteVisa.name"
        class="top-card">
      </visa-card>

      <p>Switching is the most cost effective and a more direct way to remain in the UK.</p>
    </section>

    <section>
      <h2>Alternative optiosn are...</h2>

      <div v-if="switchVisas.length" class="switch">
        <div v-for="visa in switchVisas" :key="visa.name">
          <div class="sub-title">
            <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
            <p>Switch to</p>
          </div>

          <small-card 
            :visa="visa"
            :name="`${visa.name}`"
            class="card" />
        </div>
      </div>

      <div v-if="otherVisas.length || youthMobility.length" class="other">
        <div v-for="visa in otherVisas" :key="visa.name">
          <div class="sub-title">
            <img src="@/assets/icons/results/apply.svg" alt="" class="icon">
            <p>Apply to</p>
          </div>

          <small-card 
            :visa="visa"
            :name="visa.name"
            class="card" />
        </div>

        <div v-if="youthMobility.length">
          <div class="sub-title">
            <img src="@/assets/icons/results/apply.svg" alt="" class="icon">
            <p>Apply to</p>
          </div>

          <small-card 
            :visa="youthMobility[0]"
            :name="`${youthMobility[0].name}`"
            class="card" />
        </div>
      </div>

      <div v-if="currentVisaObj && currentVisaObj.cardChecklist[3].state === 'true'" class="extend">
        <div class="sub-title">
          <img src="@/assets/icons/results/extend.svg" alt="" class="icon">
          <p>Extend</p>
        </div>

        <small-card 
          :visa="currentVisaObj"
          :name="`${currentVisaObj.name} (Extend)`"
          class="card" />
      </div>
    </section>

    <section>
      <div>
        <p>Take your time to view all the options. Don’t worry about losing your results, they are all saved to your profile page!</p>

        <p>Want to try again? Go for it! Just remember, taking the quiz again will clear your current options above.</p>

        <router-link
          :to="{ name: 'visa-quiz', params: { username: this.user.username } }">
          Take again
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import visaCard from '@/components/visa/VisaCard';
import smallCard from '@/components/visa/SmallCard';
import lightbulb from '@/assets/icons/lightbulbs/tip.svg';
import dots from '@/assets/patterns/dots.svg';

export default {
  components: {
    visaCard,
    smallCard
  },
  data() {
    return {
      lightbulb,
      dots,
      user: this.$store.state.auth.user.profile,
      userAge: this.$store.state.auth.user.profile.age,
      userCountry: this.$store.state.auth.user.profile.nationality,
      results: this.$store.state.auth.user.profile.questionnaireResults,
      currentVisa: this.$store.state.auth.user.profile.currentVisa,
      dependants: this.$store.state.auth.user.profile.dependants,
      switchOptions: [],
      youthMobility: []
    }
  },
  computed: {
    ...mapState('visas', ['visaList', 'favoriteVisa', 'topResult']),
    mostRecentResult() {
      return this.results.slice(-1)[0]; 
    },
    switchVisas() {
      // Filter visa list for user's switch options
      const switchOptions = this.visaList.filter(item => this.switchOptions.includes(item.name));
      // Get all visas in same category
      const sameCategory = switchOptions.filter(item => item.category === this.topResult.category);
      // Remove top result visa
      return sameCategory.filter(item => item.name !== this.topResult.name);
    },
    otherVisas() {
      // Filter visa list for visas in same category as top result
      const sameCategory = this.visaList.filter(item => item.category === this.topResult.category);
      // Remove top result visa
      const removeDup = sameCategory.filter(item => item.name !== this.topResult.name);
      // Remove youth mobility
      const removeYM = removeDup.filter(item => item.name !== 'Tier 5 Youth Mobility Scheme')
      // Remove visa(s) that appear in switch visas
      return removeYM.filter(item => !this.switchVisas.includes(item));
    },
    currentVisaObj() {
      return this.visaList.find(item => item.name === this.currentVisa.name);
    }
  },
  methods: {
    getFavoriteVisa() {
      this.$store.dispatch('visas/getFaveVisa', this.mostRecentResult.recommendedVisa[0])
    },
    getTopResult() {
      this.$store.dispatch('visas/getTopResult', this.mostRecentResult.recommendedVisa[0])
    },
    checkSwitch() {  
      // For now, will only be testing Student specific questionnaires, so all top results will be switchable
      // However, this will change when other current visas are options
      if(this.currentVisa.name === 'Tier 4 General Student') {
        this.switchOptions = ['Startup', 'Tier 1 Investor', 'Tier 2 General Work', 'Tier 2 Sportsperson', 'Tier 2 Minister of Religion', 'Tier 5 Government Authorised Exchange', 'Family (needs expanding)']
      } else if(this.currentVisa === 'Tier 4 Child Student') {
        this.switchOptions = ['Tier 2 General Work', 'Tier 2 Sportsperson', 'Tier 2 Minister of Religion', 'Tier 4 General Student', 'Tier 5 Government Authorised Exchange', 'Family (needs expanding)']
      }
    },
    checkYouthMobility() {
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];
      YMcountries.forEach(country => {
        if(this.userCountry === country &&
        this.userAge >= 18 && 
        this.userAge <= 30 &&
        this.dependants === 'None') {
          this.youthMobility = this.visaList.filter(item => item.name === 'Tier 5 Youth Mobility Scheme');
        }
      });
    }
  },
  created() {
    this.$store.dispatch('visas/getAllVisas').then(() => {
      this.getFavoriteVisa();
      this.getTopResult();
      this.checkSwitch();
      this.checkYouthMobility();
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.title {
  text-align: center;

  h1 {
    margin-bottom: $spacing*2;
  }
}

img {
  &.hero {
    display: block;
    width: 60%;
    margin: $spacing*7 auto;
  }
}

strong {
  font-weight: 600;
}

.sub-title {
  position: relative;

  img {
    width: 70px;
    position: absolute;
    top: -15px;
    left: -5px;
  }

  p {
    margin-left: 70px;
    font-weight: 600;
  }
}


.results {
  max-width: 600px;
  margin: auto;

  .top {
    margin-bottom: $spacing*8;
  }

  .top-card {
    margin: $spacing*4 0;
  }
}

.switch {
  margin-bottom: $spacing*8;
}

.other {
  .sub-title {
    margin-bottom: $spacing*4;
  }
}

.tip {
  padding: $spacing*2;
  background: $primary-yellow;
  position: relative;
  border-radius: 4px;
  margin-bottom: $spacing*4;

  p {
    position: relative;
    z-index: 2;
  }

  img {
    width: 30px;
    position: absolute;
    z-index: 0;

    &:nth-of-type(1) {
      top: 8px;
      left: 8px;
    }

    &:nth-of-type(2) {
      top: 8px;
      right: 8px;
    }

    &:nth-of-type(3) {
      bottom: 8px;
      left: 8px;
    }

    &:nth-of-type(4) {
      bottom: 8px;
      right: 8px;
    }
  }
}

.extend {
  margin-top: $spacing*8;

  p {
    margin-bottom: $spacing*4;
  }
}

.bottom {
  background: $background;
  padding: $spacing*6 0 $spacing*10 0;
  margin-top: $spacing*6;

  .button {
    text-align: center;
    margin-top: $spacing*3;
  }
}

.retake-quiz {
  background: $light-grey;
  padding: $spacing*2;
  border-radius: 4px;
  margin-top: $spacing*6;

  .button {
    margin-top: $spacing*3;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  #results {
    padding: $spacing*15 0 0;
  }

  .content {
    width: 85%;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto $spacing*10 auto;

    .title {
      text-align: left;
    }

    img {
      width: 38%;
      max-width: 200px;
      margin: 0 0 0 15%;
    }
  }

  .results {
    .top {
      margin-bottom: $spacing*10;
    }

    .top-card {
      margin: $spacing*6 0;
    }
  }

  .small-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card {
      width: 48%;
    }
  }

  .switch {
    .card-title {
      margin-bottom: $spacing*2;
    }
    margin-bottom: $spacing*10;
  }

  .other {
    .sub-title {
      margin-bottom: $spacing*6;
    }
  }

  .tip {
    margin-bottom: 0;
    padding: $spacing*3 $spacing*2;
  }

  .extend {
    margin-top: $spacing*10;

    p {
      margin-bottom: $spacing*2;
    }
  }

  .bottom {
    padding: $spacing*8 0 $spacing*15 0;
    margin-top: $spacing*8;

    .content {
      display: flex;
      justify-content: space-between;
    }

    .col {
      width: 48%;

      .margin {
        margin-bottom: $spacing*2;
      }
    }
  }

  .retake-quiz {
    background: $light-grey;
    padding: $spacing*2;
    border-radius: 4px;
    margin-top: 0;

    .button {
      margin-top: $spacing*3;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .page-header {
    h3 {
      transform: translateX(8%);
    }
  }

  .results {

    .top-card {
      margin: $spacing*6 auto;
    }
  }
}
</style>
