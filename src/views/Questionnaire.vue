<template>
  <section class="content">
    <!-- If user has updates profile info -->
    <div v-if="user.profile.age">
      <div v-if="introStage">
        <div v-if="this.user.profile.currentVisa !== 'None'">
          <p>This questionnaire will be specific to your current visa - <strong>{{ this.user.profile.currentVisa }}</strong></p>
          <p>Click the button to continue, or <router-link :to="{name: 'profile'}">update current visa here.</router-link></p>
        </div>
        <button @click="startQuestionnaire">
          Start Questionnaire
        </button>
      </div>

      <div v-if="questionsStage">
        <div 
          class="question">
          <h1>Finding your visa...</h1>
          <question 
            :question="questions[currentQuestion]"
            :questions="questions"
            :currentQuestion="currentQuestion"
            @submitAnswer="submitAnswer"
            @previousQuestion="previousQuestion" />
        </div>

        <p>Progress..</p>
        <div class="progress-bar">
          <div
            :style="{ width: `${progress}%` }" 
            class="progress-bar-inner"></div>
        </div>
      </div>

      <div v-if="resultsStage">
        <results />
      </div>
    </div>
    <!-- If not, user must do that first -->
    <div v-else>
      <p>Please update your profile information to continue. The results are dependant on your current visa.</p>
      <router-link :to="{ name: 'profile' }">Click here to update profile</router-link>
    </div>
  </section>
</template>

<script>
import question from '@/components/questionnaire/Question';
import results from '@/components/questionnaire/Results';

export default {
  components: {
    question,
    results
  },
  data() {
    return {
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
        'Family Visa',
        'Family Visa (needs expanding)',
        'Global Talent Visa',
        'Innovator Visa',
        'Marriage Visa',
        'Parent of Tier 4 Child Visa',
        'Standard Visitor Visa',
        'Startup Visa',
        'Tier 1 Entrepreneur Visa',
        'Tier 1 Exceptional Talent Visa',
        'Tier 1 Graduate Entrepreneur Visa',
        'Tier 1 Investor Visa',
        'Tier 2 General Work Visa',
        'Tier 2 Intra-company Transfer Visa',
        'Tier 2 Minister of Religion Visa',
        'Tier 2 Sportsperson Visa',
        'Tier 4 Child Student Visa',
        'Tier 4 General Student Visa',
        'Tier 4 Short Term Study Visa',
        'Tier 5 Charity Worker Visa', 
        'Tier 5 Creative and Sporting Visa',
        'Tier 5 Government Authorised Exchange Visa',
        'Tier 5 International Agreement Visa',
        'Tier 5 Religious Worker Visa',
        'Tier 5 Seasonal Worker Visa',
        'Tier 5 Youth Mobility Scheme'
      ]
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
      this.introStage = false;
      this.showResults();
    },
    showResults() { 
      setTimeout(() => {
        this.questionsStage = false;
        this.resultsStage = true;
      }, 2000);
    } 
  },
  beforeRouteLeave(to, from, next) {
    if(this.questionsStage) {
      const confirmLeave = confirm('Are you sure? Your progress will be lost');
      if(confirmLeave) {
        next();
      }
    } else {
      next();
    }
  }
}
</script>

<style scoped>
section {
  margin-top: 60px;
}

.question {
  width: 50%;
  margin: 60px auto 0 auto;
  padding: 20px;
}

.progress-bar,
.progress-bar-inner {
  width: 80%;
  height: 40px;
  margin: auto;
  transition: width 500ms;
}

.progress-bar {
  background-color: #eee;
}

.progress-bar-inner {
  background-color: pink; 
  margin: 0;
}
</style>
