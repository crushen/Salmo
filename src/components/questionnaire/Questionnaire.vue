<template>
  <section>
    <!-- <form 
      v-for="(item, index) in questions.slice(0, 1)"
      :key="index">

      <div class="question">
        <label>{{ item.question }}</label>
        <div class="answer"
          v-for="answer in item.answers"
          :key="answer.text">
          <input 
            v-model="animal"
            type="radio"
            name="question"
            :value="answer.value">
            {{ answer.text }}
        </div>
      </div>

    </form> -->

  <!-- Core questions first -->
  <!-- <form>

    <div class="question">
      <label>What kind of bebe do you relate to?</label>
      <div class="answer">
        <input 
          v-model="animal"
          type="radio"
          value="cat">
          Cat
      </div>
      <div class="answer">
        <input 
          v-model="animal"
          type="radio"
          value="dog">
          Dog
      </div>
    </div> -->

    <!-- <div 
      v-show="animal === 'cat' "
      class="question">
      <label>What kind of bebe do you relate to?</label>
      <div class="answer">
        <input 
          v-model="animal"
          type="radio"
          value="cat">
          Cat
      </div>
      <div class="answer">
        <input 
          v-model="animal"
          type="radio"
          value="dog">
          Dog
      </div>
    </div>
  
  </form> -->

    <!-- <form>

      <div class="question">
        <label>{{ question }}</label>
        <div class="answer">
          <input 
            v-model="animal"
            type="radio"
            name="question"
            :value="answer.value">
            {{ answer.text }}
        </div>
      </div>

    </form>  -->

  <div class="question">
    <question :question="question" />
    <answers 
      :activeQuestion="activeQuestion" 
      @nextQuestion="getQuestion"/> 
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
      if(answer === 'Zora') {
        this.result.zora++;
        console.log(`Zora: ${this.result.zora}`);
      } else if (answer === 'Rito') {
        this.result.rito++;
        console.log(`Rito: ${this.result.rito}`);
      } else if (answer === 'Minnie') {
        this.result.minnie++;
        console.log(`Minnie: ${this.result.minnie}`);
      } else if (answer === 'Squirrel') {
        this.result.squirrel++;
        console.log(`Squirrel: ${this.result.squirrel}`);
      } else if (answer === 'Baldrick') {
        this.result.baldrick++;
        console.log(`Baldrick: ${this.result.baldrick}`);
      }

      if(this.questions[0]) {
        this.activeQuestion = this.questions.shift();
        this.question = this.activeQuestion.question;
      } 
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
