<template>
  <section>
 
  <div class="question">
    <question :question="question" />
    <div class="answer">
      <answers 
        :activeQuestion="activeQuestion" 
        @nextQuestion="getQuestion"/> 
    </div>
  </div>

  </section>
</template>

<script>
import question from '@/components/questionnaire/Question';
import answers from '@/components/questionnaire/Answers';

export default {
  components: {
    question,
    answers
  },
  data() {
    return {
      question: '',
      activeQuestion: {},
      result: {
        zora: 0,
        rito: 0,
        minnie: 0,
        squirrel: 0,
        baldrick: 0
      }
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions.items;
    }
  },
  methods:{
    getQuestion(answer) {
      // Check if answer is the same as the answer values & +1 to chosen result
      if(answer === 'Zora') {
        this.result.zora++;
      } else if (answer === 'Rito') {
        this.result.rito++;
      } else if (answer === 'Minnie') {
        this.result.minnie++;
      } else if (answer === 'Squirrel') {
        this.result.squirrel++;
      } else if (answer === 'Baldrick') {
        this.result.baldrick++;
      }

      // If there are still questions left, show following question
      if(this.questions[0]) {
        this.activeQuestion = this.questions.shift();
        this.question = this.activeQuestion.question;
      } 

      // If no questions left, commit results to sotre and show results page

      // else {
      //   this.$store.commit('questions/setResults', this.result);
      //   this.$router.push({name: 'results'})
      // }
    }
  },
  created(){
    this.getQuestion()
    console.log(this.questions)
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
