<template>
  <section>
 
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
      questions: this.$store.state.questions.items,
      question: '',
      activeQuestion: {},
      result: {
        zora: 0,
        rito: 0,
        minnie: 0,
        squirrel: 0,
        baldrick: 0
      },
      finished: false
    }
  },
  methods:{
    getQuestion(answer) {
      // Check if answer is Dog or Cat, and then filter questions 
      if(answer === 'Cat') {
        this.questions = this.questions.filter(question => question.isCat);
      } else if(answer === 'Dog') {
        this.questions = this.questions.filter(question => question.isDog);
      }

      // Check if answer is the same & +1 to chosen result
      if(answer === 'Zora') {
        this.result.zora++;
      } else if(answer === 'Rito') {
        this.result.rito++;
      } else if(answer === 'Minnie') {
        this.result.minnie++;
      } else if(answer === 'Squirrel') {
        this.result.squirrel++;
      } else if(answer === 'Baldrick') {
        this.result.baldrick++;
      }

      // If there are still questions left, show following question
      if(this.questions[0]) {
        this.activeQuestion = this.questions.shift();
        this.question = this.activeQuestion.question;
      } else {
        // If no questions left, commit results to sotre and show results page
        this.$store.commit('questions/setResults', this.result);
        this.finished = true;
      }
    }
  },
  created(){
    this.getQuestion();
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
