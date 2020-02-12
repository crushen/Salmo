<template>
  <section>
 
    <button 
      v-if="!started"
      @click="startQuestionnaire">
      Start Questionnaire
    </button>

    <div v-else>

      <ask-country 
        v-if="!askDOB"
        @submitCountry="submitCountry"
        :userProfile="user.profile" />

      <ask-age
        v-else
        :userProfile="user.profile" />


      <!-- <div 
        v-if="!finished"
        class="question">
        <question :question="question" />
        <div class="answer">
          <answers 
            :activeQuestion="activeQuestion" 
            @nextQuestion="getQuestion"/> 
        </div>
      </div> -->


    </div>

    <div v-if="finished">
      <results />
    </div>

  </section>
</template>

<script>
import askCountry from '@/components/questionnaire/AskCountry';
import askAge from '@/components/questionnaire/AskAge';
import question from '@/components/questionnaire/Question';
import answers from '@/components/questionnaire/Answers';
import results from '@/components/questionnaire/Results';

export default {
  components: {
    askCountry,
    askAge
    // question,
    // answers,
    // results
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      askDOB: false,
      questions: [],
      question: '',
      activeQuestion: {},
      started: false,
      finished: false,

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
    submitCountry(profile) {
      // Update user profile with country
      this.updateProfile(profile);
      // Ask DOB
      this.askDOB = true;
    },
    updateProfile(profile) {
      this.$store.dispatch('auth/updateProfile', profile);
    },
    startQuestionnaire() {
      this.finished = false;
      this.started = true;
      this.getQuestions();
      this.getQuestion();
    },
    getQuestions() {
      this.$store.dispatch('questions/getQuestions');
      const storeArray = this.$store.state.questions.items;
      this.questions = storeArray.slice(0, storeArray.length);
    },
    getQuestion(answer) {
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
          answer.forEach((item) => {
            if(item === result.name) {
              result.score++;
            }
          })
        }
      });
      // If there are still questions left, show following question
      if(this.questions[0]) {
        this.activeQuestion = this.questions.shift();
        this.question = this.activeQuestion.question;
      } else {
        // If no questions left, commit results to sotre and show results page
        this.$store.dispatch('questions/getResults', this.results);
        this.started = false;
        this.finished = true;
      }
    }
  },
  created() {
    this.getQuestions();
  },
  beforeRouteLeave(to, from, next) {
    if(this.started) {
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
