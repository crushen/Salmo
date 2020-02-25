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
      userAge: null,
      introStage: true,
      questionsStage: false,
      buildProfile: false,
      resultsStage: false,
      questions: [],
      answers: [],
      currentQuestion: 0,
      result: {
        recommendedVisa: ''
      },
      visaList: [
        'T4 Child Student Visa', 
        'Dependent Visa', 
        'Family Visa', 
        'Charity Worker Visa', 
        'GOV Authorised Exchange Visa',
        'Creative and Sporting Visa',
        'Religious Worker Visa',
        'Seasonal Worker Visa',
        'T2 Sportsperson Visa',
        'T2 Minister of Religion Visa',
        'Intra company Graduate / Trainee Visa',
        'Intra company Visa',
        'T2 General Work Visa'
      ]
    }
  },
  methods: {
    submitProfile(profile) {
      this.$store.dispatch('auth/updateProfile', profile);
      this.userAge = profile.age;
      this.buildProfile = false;
    },
    startQuestionnaire() {
      this.getQuestions();
      this.introStage = false;
      this.questionsStage = true;
      this.buildProfile = true;
    },
    getQuestions() {
      this.$store.dispatch('questions/getQuestions');
      this.questions = this.$store.state.questions.items;
    },
    handleAnswer(answer) {
      // Check which catagory of questions to ask
      switch(answer) {
        // Visa catagories
        case 'Work':
          // Set currentQuestion to -1 as it will reset to 0
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
        // WORK
        // over 2 or under 2 years
        case '2+':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.over2);
          break;
        case '2-':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.under2);
          break;
        // not sportsperson or minister of religion
        case 'Non S or R':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.nonSR);
          break;
        // are they being transferred by current employer
        case 'isTransferred':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isTransferred);
          break;
      }

      // Check if child applicant will be over 18 - if yes, reset questions and filter for adult
      if(answer === 'Adult Application') {
        this.currentQuestion = -1;
        this.getQuestions();
        this.questions = this.questions.filter(question => question.isAdult);
      }


      
      // If question leads to visa, finish questionnaire and reccommend this visa
      this.visaList.forEach(visa => {
        if(answer === visa) {
          this.finishQuestionnaire(answer);
        }
      });
      // If question hasn't lead to visa, add 1 to currentQuestion
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
  watch: {
    // When age is updated after core questions, filter between child or adult questions
    userAge(age) {
      if(age < 18) {
        this.questions = this.questions.filter(question => question.isChild);
      } else if(age >= 18) {
        this.questions = this.questions.filter(question => question.isAdult);
      }
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
</style>
