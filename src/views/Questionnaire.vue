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
      userNationality: null,
      currentVisa: null,
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
        'Tier 4 Child Student Visa', 
        'Dependent Visa', 
        'Family Visa', 
        'Tier 5 Charity Worker Visa', 
        'Tier 5 GOV Authorised Exchange Visa',
        'Tier 5 Creative and Sporting Visa',
        'Tier 5 Religious Worker Visa',
        'Tier 5 Seasonal Worker Visa',
        'Tier 2 Sportsperson Visa',
        'Tier 2 Minister of Religion Visa',
        'Tier 2 Intra-company Transfer Graduate Trainee Visa',
        'Tier 2 Intra-company Transfer Long-term Staff Visa',
        'Tier 2 General Work Visa',
        'Innovator Visa',
        'Tier 1 Exceptional Talent Visa',
        'Tier 1 Investor Visa - 5 years for PR',
        'Tier 1 Investor Visa - 3 years for PR',
        'Tier 1 Investor Visa - 2 years for PR',
        'Marriage Visa',
        'Standard Visitor Visa',
        'Parent of Tier 4 Child Visa',
        "None - You can't apply for a Family Visa",
        'Family Visa - Apply on the basis of your private life',
        'Family Visa - Coming as an adult to be cared for by a relative route',
        'Family Visa - Coming as a parent to join your child route',
        'Family Visa - Coming to join your partner/spouse route',
        'Tier 4 Short Term Study Visa',
        'Tier 4 General Student Visa'
      ]
    }
  },
  methods: {
    submitProfile(profile) {
      this.$store.dispatch('auth/updateProfile', profile);
      this.userAge = profile.age;
      this.userNationality = profile.country;
      this.currentVisa = profile.currentVisa;
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
        case 'isWork':
          // Set currentQuestion to -1 as it will reset to 0
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isWork); 
          break;
        case 'isBusiness':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isBusiness);
          break;
        case 'isFamily':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isFamily);
          break;
        case 'isStudy':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isStudy);
          break;
        // WORK
        // over 2 or under 2 years
        case 'overTwoYears':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.overTwoYears);
          break;
        case 'underTwoYears':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.underTwoYears);
          break;
        // not sportsperson or minister of religion
        case 'nonSR':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.nonSR);
          break;
        // are they being transferred by current employer
        case 'isTransferred':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isTransferred);
          break;
        // FAMILY
        // up to six months or over 6 months
        case 'upToSixMonths':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.upToSixMonths);
          break;
        case 'overSixMonths':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.overSixMonths);
          break;
        // family member has ILR or PR
        case 'familyIsILRorPR':
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.familyIsILRorPR);
          break;
      }
      // If question leads to visa, finish questionnaire and reccommend this visa
      this.visaList.forEach(visa => {
        if(answer === visa) {
          this.finishQuestionnaire(answer);
        }
      })
      // If answer is array, list all visas in array
      if(Array.isArray(answer)) {
        this.finishQuestionnaire(answer);
      }
      // Check if child applicant will be over 18 - if yes, reset questions and filter for adult
      if(answer === 'Adult Application') {
        this.currentQuestion = -1;
        this.getQuestions();
        this.questions = this.questions.filter(question => question.isAdult);
      }
      // Check if answer is Starting a business
      if(answer === 'Start a Business') {
        if(this.currentVisa === 'Startup Visa') {
          this.currentQuestion = -1;
          this.questions = this.questions.filter(question => question.isStartupVisa);
        } else {
          this.finishQuestionnaire('Startup Visa');
        }
      }
      // Check age, nationality and selected visa for youth mobility scheme
      const YMcountries = ['Australia', 'Canada', 'Japan', 'Monaco', 'New Zealand', 'Hong Kong', 'Hong Kong (British national overseas)', 'South Korea', 'Taiwan', 'British overseas citizen', 'British overseas territories citizen', 'British national (overseas)'];
      const YMvisas = ['Tier 2 General Work Visa', 'Tier 5 Charity Worker Visa', 'Tier 5 GOV Authorised Exchange Visa', 'Tier 5 Creative and Sporting Visa', 'Tier 5 Religious Worker Visa', 'Tier 5 Seasonal Worker Visa' ];
      YMcountries.forEach(country => {
        if(this.userNationality === country && this.userAge >= 18 && this.userAge <= 30) {
          YMvisas.forEach(visa => {
            if(answer === visa) {
              this.finishQuestionnaire([answer, 'Tier 5 Youth Mobility Scheme']);
            }
          })
        }
      })
      // If question hasn't lead to visa yet, go to next question
      this.currentQuestion++;
    },
    finishQuestionnaire(answer) {
      this.result.recommendedVisa = answer;
      if(Array.isArray(answer)) {
        this.result.recommendedVisa = [];
        answer.forEach(visa => {
          this.result.recommendedVisa.push(visa);
        })
      }
      this.$store.dispatch('questions/getResults', this.result);
      this.introStage = false;
      this.questionsStage = false;
      this.resultsStage = true;
    }
    // For this - maybe make filtered questions new array, and if prev go back to prev array and sort out currentQuestion
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
