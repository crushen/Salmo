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
          @submitAnswer="handleAnswer" 
          @previousQuestion="previousQuestion" />

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
      results: [
        {
          name: 'Zora',
          score: 0
        },        
        {
          name: 'Rito',
          score: 0
        },        
        {
          name: 'Minnie',
          score: 0
        },        
        {
          name: 'Squirrel',
          score: 0
        },        
        {
          name: 'Baldrick',
          score: 0
        }
      ]
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
      // const storeArray = this.$store.state.questions.items;
      // this.questions = storeArray.slice(0, storeArray.length);
    },
    handleAnswer(answer) {
      // Check if answer is Dog or Cat, and then filter questions 
      if(answer === 'Cat') {
        this.questions = this.questions.filter(question => question.isCat);
      } else if(answer === 'Dog') {
        this.questions = this.questions.filter(question => question.isDog);
      }
      // Check if answer is the same & +1 to chosen result
      this.results.forEach(result => {
        if(answer === result.name) {
          result.score++;
          // Check if answer is array, and if yes then +1 to all results that match array items
        } else if(Array.isArray(answer)) {
          answer.forEach(item => {
            if(item === result.name) {
              result.score++;
            }
          })
        }
      });
      // If no questions left, commit results to sotre and show results page
      if((this.currentQuestion + 1) === this.questions.length) {
        this.$store.dispatch('questions/getResults', this.results);
        this.introStage = false;
        this.questionsStage = false;
        this.resultsStage = true;
        // If there are still questions left, show following question
      } else {
        this.currentQuestion++;
        this.answers.push(answer);
      }
    },
    previousQuestion() {
      // Go back to previous question
      this.currentQuestion--;
      // Remove most recent result from answers
      const previousResult = this.answers.pop();
      this.results.forEach(result => {
        // If the most recent result matches name in results, -1 from score
        if(previousResult === result.name) {
          result.score--;
        }
      })
    }
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
  border: 2px solid pink;
}

.answer {
  margin-top: 16px;
}

button {
  margin-bottom: 50px;
}
</style>
