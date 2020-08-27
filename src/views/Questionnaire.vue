<template>
  <section>
    <transition name="alert" mode="out-in">
      <alert 
        v-if="showAlert"
        alert="Progress will be lost"
        text="Are you sure you want to go leave this page? Your progress will be lost if you continue."
        :buttons="['Leave Page', 'Stay On Page']"
        @cancel="showAlert = false, $router.push(to)"
        @confirm="showAlert = false, to = null, $router.go(1)" />
    </transition>

    <!-- If user has updated profile info -->
    <div v-if="user.profile.age">
      <intro 
        v-if="introStage"
        :user="user"
        @startQuestionnaire="startQuestionnaire" />

      <div 
        v-if="questionsStage"
        class="content questions-stage">
        <div class="progress-bar">
          <div
            :style="{ width: `${progress}%` }" 
            class="progress-bar-inner"></div>
        </div>

        <div class="question">
          <question 
            :question="questions[currentQuestion]"
            :questions="questions"
            :currentQuestion="currentQuestion"
            @submitAnswer="submitAnswer"
            @previousQuestion="previousQuestion" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import intro from '@/components/questionnaire/Intro';
import question from '@/components/questionnaire/Question';
import alert from '@/components/Alert';

export default {
  components: {
    intro,
    question,
    alert
  },
  data() {
    return {
      showAlert: false,
      to: null,
      user: this.$store.state.auth.user,
      introStage: true,
      questionsStage: false,
      resultsStage: false,
      questions: [],
      answers: [],
      currentQuestion: 0,
      progress: 0,
      lastQuestionIndexes: [],
      result: {
        recommendedVisa: []
      },
      visaList: [
        'Family',
        'Family (needs expanding)',
        'Global Talent',
        'Innovator',
        'Marriage',
        'Parent of Tier 4 Child',
        'Standard Visitor',
        'Startup',
        'Tier 1 Entrepreneur',
        'Tier 1 Exceptional Talent',
        'Tier 1 Graduate Entrepreneur',
        'Tier 1 Investor',
        'Tier 2 General Work',
        'Tier 2 Intra-company Transfer',
        'Tier 2 Minister of Religion',
        'Tier 2 Sportsperson',
        'Tier 4 Child Student',
        'Tier 4 General Student',
        'Tier 4 Short Term Study',
        'Tier 5 Charity Worker', 
        'Tier 5 Creative and Sporting',
        'Tier 5 Government Authorised Exchange',
        'Tier 5 International Agreement',
        'Tier 5 Religious Worker',
        'Tier 5 Seasonal Worker',
        'Tier 5 Youth Mobility Scheme'
      ]
    }
  },
  computed: {
    ...mapState('visas', ['documentChecklist']),
    newVisa() {
      return this.documentChecklist.find(item => item.name === this.visa.name);
    }
  },
  methods: {
    startQuestionnaire() {
      this.getQuestions();
      this.introStage = false;
      this.questionsStage = true;
      this.buildProfile = true;
    },
    getQuestions() {
      this.$store.dispatch('questions/getQuestions');
      this.questions = this.$store.state.questions.items;
      // If user is 18 or over, don't ask this question
      if(this.user.profile.age >= 18 && this.questions[0].question === 'Will you be over 18 at the time of application?') {
        this.currentQuestion = 3;
      }
    },
    submitAnswer(answer) {
      if(answer) {
        this.progress += 20;
        // If question leads to visa, finish questionnaire and reccommend this visa
        this.visaList.forEach(visa => {
          if(answer === visa) {
            this.finishQuestionnaire(answer);
          }
        })
        // If answer is array, make both answers the reccomended visas
        if(Array.isArray(answer)) {
          this.finishQuestionnaire(answer);
        }
        // If questions leads to number, go to this index in questions
        if(Number.isInteger(answer)) {
          this.lastQuestionIndexes.push(this.currentQuestion);
          this.currentQuestion = answer;
        }
      }
    },
    previousQuestion() {
      this.progress -= 20;
      const lastQuestion = this.lastQuestionIndexes.pop();
      this.currentQuestion = lastQuestion;
    },
    finishQuestionnaire(answer) {
      this.progress = 100;
      // Check if answer is array
      if(Array.isArray(answer)) {
        this.result.recommendedVisa = answer;
      } else {
        this.result.recommendedVisa.push(answer);
      }
      this.$store.dispatch('questions/getResults', this.result);
      this.$store.dispatch('questions/sendDbResults');
      this.introStage = false;
      this.showResults();
    },
    showResults() { 
      setTimeout(() => {
        this.questionsStage = false;
        this.$router.push({name: 'results', params: {username: this.user.profile.username}});
      }, 2000);
    },
    changeBtnFocus(buttons, focus) {
      console.log('hello')
      buttons.forEach(btn => {
        btn.setAttribute('tabindex', focus);
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if(this.questionsStage) {
      if (this.to) {
        next();
      } else {
        const overlay = document.querySelector('#overlay');
        overlay.style.opacity = 1;
        overlay.style.visibility = 'visible';
        document.querySelector('body').style.overflow = 'hidden';
        this.to = to;
        this.showAlert = true;

        const ariaBtns = document.querySelectorAll('.aria-btn');
        this.changeBtnFocus(ariaBtns, '-1');
      }
    } else {
      next();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*10;
}

.progress-bar,
.progress-bar-inner {
  width: 100%;
  height: 12px;
  border-radius: 100px;
  margin: auto;
  transition: width 500ms;
}

.progress-bar {
  background-color: #eee;
}

.progress-bar-inner {
  background-color: $primary-yellow; 
  margin: 0;
}

// Tablet
@media screen and (min-width: 600px) {
  .content {
    &.questions-stage {
      width: 85%;
      max-width: 650px;
    }
  }

  .progress-bar {
    width: 65%;
    position: absolute;
    z-index: 2;
    top: 40px;
    right: 7%;
    background: white;
  }

  .progress-bar-inner {
    width: 65%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .progress-bar {
    width: 75%;
  }

  .progress-bar-inner {
    width: 75%;
  }
}
</style>
