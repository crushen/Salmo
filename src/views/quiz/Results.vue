<template>
  <div class="tools-pages">
    <main v-if="topResult" id="results" class="page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.username } })"
        text="Profile" />

      <div class="background">
        <div class="title margin-m top">
          <h1 class="content">Completed!</h1>
        </div>

        <section class="content margin-m top">
          <h2>Your best option is...</h2>

          <div class="sub-title margin-m top">
            <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
            <p>Switch to</p>
          </div>
          
          <div class="margin-s top">
            <visa-card :visa="topResult" /> <!-- :favouriteVisa="favoriteVisa.name" -->

            <p class="margin-s top"><b>Switching</b> is the most cost effective and a more direct way to remain in the UK.</p>
          </div>
        </section>

        <section class="content margin-l top">
          <h2>Alternative options are...</h2>

          <div v-if="switchVisas.length" class="switch">
            <div class="sub-title margin-m top">
              <img src="@/assets/icons/results/switch.svg" alt="" class="icon">
              <p>Switch to</p>
            </div>

            <small-card
              v-for="visa in switchVisas"
              :key="visa.name"
              :visa="visa"
              :name="`${visa.name}`" />
          </div>

          <div v-if="currentVisaObj && currentVisaObj.cardChecklist[3].state === 'true'" class="extend">
            <div class="sub-title margin-m top">
              <img src="@/assets/icons/results/extend.svg" alt="" class="icon">
              <p>Extend</p>
            </div>

            <small-card 
              :visa="currentVisaObj"
              :name="currentVisaObj.name" />
          </div>

          <div v-if="otherVisas.length || youthMobility.length" class="other">
            <div class="sub-title margin-m top">
              <img src="@/assets/icons/results/apply.svg" alt="" class="icon">
              <p>Apply to</p>
            </div>

            <div class="tip margin-s top">
              <p><b>Be aware!</b></p>

              <p>All the below visas are great options, but you’ll need to <b>leave the UK</b> and apply <b>from your home country</b>. It’s best to think on this early.</p>
            </div>

            <small-card
              v-for="visa in otherVisas"
              :key="visa.name"
              :visa="visa"
              :name="visa.name" />

            <small-card
              v-if="youthMobility.length"
              :visa="youthMobility[0]"
              :name="`${youthMobility[0].name}`" />
          </div>
        </section>

        <section class="content margin-l top">
          <div class="white-card">
            <img src="@/assets/illustrations/quiz/quiz-complete.svg" alt="">

            <p class="margin-s top">Take your time to view all the options. Don’t worry about losing your results, they are all saved to your profile page!</p>

            <p class="margin-s top bottom">Want to try again? Go for it! Just remember, taking the quiz again will clear your current options above.</p>

            <div class="button-center">
              <router-link
                :to="{ name: 'visa-quiz', params: { username: this.user.username } }"
                tag="button"
                class="primary">
                Take again
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import visaCard from '@/components/visa/VisaCard'
import smallCard from '@/components/visa/SmallCard'
import backButton from '@/components/BackButton'

export default {
  components: {
    visaCard,
    smallCard,
    backButton
  },
  data() {
    return {
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
      return this.results.slice(-1)[0]
    },
    switchVisas() {
      // Filter visa list for user's switch options
      const switchOptions = this.visaList.filter(item => this.switchOptions.includes(item.name))
      
      // Get all visas in same category
      const sameCategory = switchOptions.filter(item => item.category === this.topResult.category)
      
      // Remove top result visa
      return sameCategory.filter(item => item.name !== this.topResult.name)
    },
    otherVisas() {
      // Filter visa list for visas in same category as top result
      const sameCategory = this.visaList.filter(item => item.category === this.topResult.category)
      
      // Remove top result visa
      const removeDup = sameCategory.filter(item => item.name !== this.topResult.name)
      
      // Remove youth mobility
      const removeYM = removeDup.filter(item => item.name !== 'Tier 5 Youth Mobility Scheme')
      
      // Remove visa(s) that appear in switch visas
      return removeYM.filter(item => !this.switchVisas.includes(item))
    },
    currentVisaObj() {
      return this.visaList.find(item => item.name === this.currentVisa.name)
    }
  },
  methods: {
    // getFavoriteVisa() {
    //   this.$store.dispatch('visas/getFaveVisa', this.mostRecentResult.recommendedVisa[0])
    // },
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
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)']
      
      YMcountries.forEach(country => {
        if(this.userCountry === country &&
        this.userAge >= 18 && 
        this.userAge <= 30 &&
        this.dependants === 'None') {
          this.youthMobility = this.visaList.filter(item => item.name === 'Tier 5 Youth Mobility Scheme')
        }
      })
    }
  },
  created() {
    this.$store.dispatch('visas/getAllVisas').then(() => {
      //this.getFavoriteVisa()
      this.getTopResult()
      this.checkSwitch()
      this.checkYouthMobility()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.title {
  text-align: right;
}

.sub-title {
  position: relative;
  overflow: visible;

  img {
    width: 60px;
    position: absolute;
    top: -15px;
    left: -5px;
  }

  p {
    margin-left: 55px;
    font-weight: 400;
  }
}

.white-card {
  img {
    display: block;
    width: 50%;
    margin: auto;
  }
}
</style>
