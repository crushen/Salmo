<template>
  <section>
 
    <button @click="startQuestionnaire">Start Questionnaire</button>

    <div v-if="started">
      <div 
        v-if="!finished"
        class="question">
        <question :question="question" />
        <div class="answer">
          <answers 
            :activeQuestion="activeQuestion" 
            @nextQuestion="getQuestion"/> 
        </div>
      </div>

      <div v-else>
        <results />
      </div>
    </div>

  </section>
</template>

<script>
import question from '@/components/questionnaire/Question';
import answers from '@/components/questionnaire/Answers';
import results from '@/components/questionnaire/Results';

export default {
  components: {
    question,
    answers,
    results
  },
  data() {
    return {
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
    startQuestionnaire() {
      this.started = true;
      this.getQuestion();
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
        }
      });
      // If there are still questions left, show following question
      if(this.questions[0]) {
        this.activeQuestion = this.questions.shift();
        this.question = this.activeQuestion.question;
      } else {
        // If no questions left, commit results to sotre and show results page
        this.$store.commit('questions/setResults', this.results);
        this.finished = true;
      }
    }
  },
  created() {
    this.$store.dispatch('questions/getQuestions');
    this.questions = this.$store.state.questions.items;
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
</style>
