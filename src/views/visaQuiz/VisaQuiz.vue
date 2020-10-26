<template>
  <div class="tools-pages">
    <main class="page padding top">
      <div class="background">
        <section class="content margin-m top bottom">
          <h1>Visa Quiz</h1>

          <h2 class="margin-s top bottom">Let’s work out your best options to remain in the UK. </h2>

          <h3>The following questions are based off your current visa choice, so please ensure that your current visa in your profile is up to date.</h3>
        </section>

        <section class="tools-card">
          <div class="progress-bar">
            <div
              :style="{ width: `${progress}%` }" 
              class="progress-bar-inner"></div>
          </div>

          <div v-if="questions.length" class="question">
            <transition name="slide" mode="out-in">
              <question
                :key="questions[currentQuestion].question"
                :question="questions[currentQuestion]"
                :questions="questions"
                :currentQuestion="currentQuestion"
                @submitAnswer="submitAnswer"
                @previousQuestion="previousQuestion" />
            </transition>
          </div>
        </section>

        <!-- Alerts -->      
        <transition name="dialog" mode="out-in">
          <alert
            v-if="showAlert"
            @cancel="showAlert = false, to = null"
            @confirm="showAlert = false, $router.push(to)" />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import question from '@/components/visaQuiz/Question'
import alert from '@/components/alerts/Quiz'

export default {
  components: {
    question,
    alert
  },
  data() {
    return {
      showAlert: false,
      to: null,
      finished: false,
      user: this.$store.state.auth.user,
      questions: [],
      answers: [],
      currentQuestion: 0,
      progress: 0,
      lastQuestionIndexes: [],
      result: {
        recommendedVisa: []
      },
      visaList: [
        // 'Marriage',
        // 'Parent of Tier 4 Child',
        // 'Standard Visitor',
        'Family',
        'Family (needs expanding)',
        'Tier 1 : Innovator',
        'Tier 1 : Global Talent',
        'Tier 1 : Startup',
        'Tier 1 : Entrepreneur',
        'Tier 1 : Exceptional Talent',
        'Tier 1 : Graduate Entrepreneur',
        'Tier 1 : Investor',
        'Tier 2 : General Work',
        'Tier 2 : Intra-company Transfer',
        'Tier 2 : Minister of Religion',
        'Tier 2 : Sportsperson',
        'Tier 4 : Child Student',
        'Tier 4 : General Student',
        'Tier 4 : Short Term Study',
        'Tier 5 : Charity Worker', 
        'Tier 5 : Creative and Sporting',
        'Tier 5 : Government Authorised Exchange',
        'Tier 5 : International Agreement',
        'Tier 5 : Religious Worker',
        'Tier 5 : Seasonal Worker',
        'Tier 5 : Youth Mobility Scheme'
      ]
    }
  },
  computed: {
    ...mapState('visas', ['documentChecklist']),
    newVisa() {
      return this.documentChecklist.find(item => item.name === this.visa.name)
    }
  },
  methods: {
    startQuestionnaire() {
      this.getQuestions()

      this.introStage = false
      this.questionsStage = true
      this.buildProfile = true
    },
    getQuestions() {
      this.$store.dispatch('questions/getQuestions')
      this.questions = this.$store.state.questions.items

      // If user is 18 or over, don't ask this question
      if(this.user.profile.age >= 18 && this.questions[0].question === 'Will you be over 18 at the time of application?') {
        this.currentQuestion = 3
      }
    },
    submitAnswer(answer) {
      if(answer) {
        this.progress += 20

        // If question leads to visa, finish questionnaire and reccommend this visa
        this.visaList.forEach(visa => {
          if(answer === visa) {
            this.finishQuestionnaire(answer)
          }
        })

        // If answer is array, make both answers the reccomended visas
        if(Array.isArray(answer)) {
          this.finishQuestionnaire(answer)
        }

        // If questions leads to number, go to this index in questions
        if(Number.isInteger(answer)) {
          this.lastQuestionIndexes.push(this.currentQuestion)
          this.currentQuestion = answer
        }
      }
    },
    previousQuestion() {
      this.progress -= 20

      const lastQuestion = this.lastQuestionIndexes.pop()
      this.currentQuestion = lastQuestion
    },
    finishQuestionnaire(answer) {
      this.finished = true
      this.progress = 100

      // Check if answer is array
      if(Array.isArray(answer)) {
        this.result.recommendedVisa = answer
      } else {
        this.result.recommendedVisa.push(answer)
      }

      this.$store.dispatch('questions/getResults', this.result)
      this.$store.dispatch('questions/sendDbResults')

      this.showResults()
    },
    showResults() { 
      setTimeout(() => {
        this.questionsStage = false
        this.$router.push({ name: 'results', params: { username: this.user.profile.username } })
      }, 2000)
    }
    // changeBtnFocus(buttons, focus) {
    //   buttons.forEach(btn => {
    //     btn.setAttribute('tabindex', focus)
    //   })
    // }
  },
  mounted() {
    this.startQuestionnaire()
  },
  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next()
    } else {
      if(this.finished) {
        next()
      } else {
        this.to = to
        this.showAlert = true
        // const ariaBtns = document.querySelectorAll('.aria-btn')
        // this.changeBtnFocus(ariaBtns, '-1')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h3 {
  margin-left: 10%;
}

.progress-bar,
.progress-bar-inner {
  width: 90%;
  height: 12px;
  border-radius: 100px;
  margin: 1.5em auto;
  transition: width 500ms;
}

.progress-bar {
  background-color: #EEE;
}

.progress-bar-inner {
  background-color: $dark-yellow; 
  margin: 0;
}

// // Tablet
// @media screen and (min-width: 600px) {
//   .progress-bar {
//     width: 65%;
//     position: absolute;
//     z-index: 2;
//     top: 40px;
//     right: 7%;
//     background: white;
//   }

//   .progress-bar-inner {
//     width: 65%;
//     position: absolute;
//     z-index: 2;
//     top: 0;
//     left: 0;
//   }
// }

// // Desktop
// @media screen and (min-width: 1100px) {
//   .progress-bar {
//     width: 75%;
//   }

//   .progress-bar-inner {
//     width: 75%;
//   }
// }
</style>
