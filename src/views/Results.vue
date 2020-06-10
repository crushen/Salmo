<template>
  <div id="results">
    <section class="content">
      <div class="title">
        <h1>Complete!</h1>
        <h3>Here are the results of your quiz...</h3>
      </div>

      <img 
        class="hero"
        src="@/assets/illustrations/quiz/Quiz Complete.svg" 
        alt="">

      <div class="results">
        <div class="top">
          <div class="sub-title">
            <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
            <p>Your best option to remain in the UK is by switching to:</p>
          </div>
          
          <visa-card
            v-for="visa in topResult"
            :key="visa.name"
            :visa="visa"
            class="top-card">
            <template #quickTip>
              <quick-tip :visa="visa"/>
            </template>
          </visa-card>

          <p>Switching is the most cost effective, and least personally disruptive way to remain in the UK.</p>
        </div>

        <div v-if="switchVisas[0]" class="switch">
          <div class="sub-title">
            <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
            <p class="card-title">There are other visas in the same catagory that you could switch to:</p>
          </div>

          <small-card 
            v-for="visa in switchVisas"
            :key="visa.name"
            :visa="visa"
            :name="`${visa.name}`"/>
        </div>

        <div 
          v-if="otherVisas[0] || youthMobility[0]" 
          class="other">
          <div class="sub-title">
            <img src="@/assets/icons/results/apply.svg" alt="" class="icon">
            <p>Other visas in the {{ topResult[0].category }} catagory that you may be able to apply to:</p>
          </div>


          <div class="tip">
            <img 
              v-for="i in 4"
              :key="i"
              :src="lightbulb">
            <p>Be aware! All the visas below are great options <strong>however</strong> you'll need to leave the UK and <strong>apply from your home country</strong> to be considered for them.</p>
          </div>

          <small-card 
            v-for="visa in otherVisas"
            :key="visa.name"
            :visa="visa"
            :name="visa.name"/>

          <small-card 
            v-if="youthMobility[0]"
            :visa="youthMobility[0]"
            :name="`${youthMobility[0].name}`"/>
        </div>

        <div 
          v-if="currentVisaObj.card.checklist[5].status === true" 
          class="extend">
          <div class="sub-title">
            <img src="@/assets/icons/results/extend.svg" alt="" class="icon">
            <p>Don't forget abot possibly extending your current visa!</p>
          </div>

          <small-card 
            :visa="currentVisaObj"
            :name="`${currentVisaObj.name} (Extend)`"/>
        </div>
      </div>
    </section>

    <section class="bottom">
      <div class="content">
        <p>Take your time and have a look over your options above. When you're done don't worry abou losing your results, they are all saved to your profile page!</p>

        <div class="button">
          <router-link
            :to="{ name: 'profile', params: {username: user.username} }"
            tag="button"
            :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}">
            Go To Profile
          </router-link>
        </div>

        <div class="retake-quiz">
          <p>You can also retake this quiz as many times as you'd like. But remember that taking the quiz again will clear your current options above.</p>

          <div class="button">
            <router-link
              :to="{name: 'questionnaire', params: {username: user.username}}"
              tag="button"
              class="tertiary">
              Take Quiz Again
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import visaCard from '@/components/visa/VisaCard';
import quickTip from '@/components/visa/QuickTip';
import smallCard from '@/components/visa/SmallCard';
import lightbulb from '@/assets/icons/lightbulbs/tip.svg';
import dots from '@/assets/patterns/dots.svg';

export default {
  components: {
    visaCard,
    quickTip,
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
    ...mapState('visas', ['visaList']),
    mostRecentResult() {
      return this.results.slice(-1)[0]; 
    },
    topResult() {
      return this.visaList.filter(item => this.mostRecentResult.recommendedVisa.includes(item.name));
    },
    switchVisas() {
      // Filter visa list for user's switch options
      const switchOptions = this.visaList.filter(item => this.switchOptions.includes(item.name));
      // Get all visas in same category
      const sameCategory = switchOptions.filter(item => item.category === this.topResult[0].category);
      // Remove visa(s) that appear in top result
      return sameCategory.filter(item => !this.topResult.includes(item));
    },
    otherVisas() {
      // Filter visa list for visas in same category as top result
      const sameCategory = this.visaList.filter(item => item.category === this.topResult[0].category);
      // Remove visa(s) that appear in top result
      const removeDup = sameCategory.filter(item => !this.topResult.includes(item));
      // Remove visa(s) that appear in switch visas
      return removeDup.filter(item => !this.switchVisas.includes(item));
    },
    currentVisaObj() {
      return this.visaList.find(item => this.currentVisa.name === item.name);
    }
  },
  methods: {
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#results {
  padding: $spacing*12 0 0;
}

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
    width: 32px;
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
</style>
