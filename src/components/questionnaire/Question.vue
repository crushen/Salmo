<template>
  <div>
    <label>{{ question.question }}</label>

      <div class="answers">
      <div
        v-for="(answer, index) in question.answers"
        :key="index">
        <input 
          v-model="selected"
          type="radio"
          name="question"
          :value="answer.value">
          {{ answer.text }}

      </div>
      <!-- Previous question button shows after first question answered -->
      <button
        v-if="currentQuestion > 0"
        @click="previousQuestion">
        Previous
      </button>
      <!-- If on first question, previous button goes back to last core question -->
      <button 
        v-else
        @click="backToCoreQuestions">
        Redo Core Questions
      </button>  
      <!-- Previous question button shows after first question answered --> 
      <button
        @click="submitAnswer">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: { type: Object, required: true },
    questions: { type: Array, required: true },
    currentQuestion: { type: Number, required: true }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    submitAnswer() {
      this.$emit('submitAnswer', this.selected);
      this.selected = null;
    },
    previousQuestion() {
      this.$emit('previousQuestion');
    },
    backToCoreQuestions() {
      this.$emit('backToCoreQuestions');
    }
  }
}
</script>
