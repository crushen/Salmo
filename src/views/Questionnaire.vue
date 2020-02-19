<template>
  <section>
 
    <button 
      v-if="introStage"
      @click="startQuestionnaire">
      Start Questionnaire
    </button>

    <div v-if="questionsStage">
      <core-questions
        v-if="buildProfile"
        :userProfile="user.profile"
        @submitProfile=submitProfile />

      <div 
        v-else
        class="question">
        <question 
          :question="questions[currentQuestion]"
          :questions="questions"
          :currentQuestion="currentQuestion"
          @submitAnswer="handleAnswer" />
          <!-- @previousQuestion="previousQuestion" backToCoreQuestions="backToCoreQuestions" -->

      </div>
    </div>

    <div v-if="resultsStage">
      <results />
    </div>

  </section>
</template>

<script>
import coreQuestions from '@/components/questionnaire/CoreQuestions'
import question from '@/components/questionnaire/Question';
import results from '@/components/questionnaire/Results';

export default {
  components: {
    coreQuestions,
    question,
    results
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      introStage: true,
      questionsStage: false,
      buildProfile: false,
      resultsStage: false,
      questions: [],
      answers: [],
      currentQuestion: 0,
      result: {
        recommendedVisa: ''
      }
    }
  },
  methods:{
    submitProfile(profile) {
      this.$store.dispatch('auth/updateProfile', profile);
      this.buildProfile = false;
    },
    startQuestionnaire() {
      this.introStage = false;
      this.questionsStage = true;
      this.buildProfile = true;
    },
    getQuestions() {
      this.$store.dispatch('questions/getQuestions');
      this.questions = this.$store.state.questions.items;
      if(this.user.profile.age < 18) {
        this.questions = this.questions.filter(question => question.isChild);
      } else if(this.user.profile.age >= 18) {
        this.questions = this.questions.filter(question => question.isAdult);
      }
    },
    handleAnswer(answer) {
      switch(answer) {
        // Adult and Child
        case 'Work':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isWork);
          break;
        case 'Business':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isBusiness);
          break;
        case 'Family':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isFamily);
          break;
        case 'Study':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isStudy);
          break;
        // Child questions
        case 'Adult Application':
          this.currentQuestion = -1;
          this.$store.dispatch('questions/getQuestions');
          this.questions = this.$store.state.questions.items;
          this.questions = this.questions.filter(question => question.isAdult);
          break;
          // Study
        case 'T4 Child Student Visa':
          this.finishQuestionnaire(answer);
          break;
          // Work
        case 'Dependent Visa':
          this.finishQuestionnaire(answer);
          break;
        case 'Family Visa':
          this.finishQuestionnaire(answer);
          break;
        // Adult questions
          // Work
        case '2-':
          this.questions = this.questions.filter(question => question.under2);
          break;
        case 'Charity Worker Visa':
          this.finishQuestionnaire(answer);
          break;
        case 'GOV Authorised Exchange Visa':
          this.finishQuestionnaire(answer);
          break;
        case 'Sport / Creative':
          this.finishQuestionnaire(answer);
          break;
        case 'Religious Worker Visa':
          this.finishQuestionnaire(answer);
          break;
        case 'Seasonal Worker Visa':
          this.finishQuestionnaire(answer);
          break;
      }

      this.currentQuestion++;
    },
    finishQuestionnaire(answer) {
      this.result.recommendedVisa = answer;
      this.$store.dispatch('questions/getResults', this.result);
      this.introStage = false;
      this.questionsStage = false;
      this.resultsStage = true;
    }
    // previousQuestion() {
    //   // Go back to previous question
    //   this.currentQuestion--;
    //   // Remove most recent result from answers
    //   const previousResult = this.answers.pop();
    //   this.results.forEach(result => {
    //     // If the most recent result matches name in results, -1 from score
    //     if(previousResult === result.name) {
    //       result.score--;
    //     }
    //   })
    // },
    // backToCoreQuestions() {
    //   this.buildProfile = true;
    //   this.results.forEach(result => {
    //     result.score = 0;
    //   })
    // },
  },
  created() {
    this.getQuestions();
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
</style>
