<template>
  <div>
    <label>{{ question.question }}</label>
    <!-- Multiple choice questions -->
    <div v-if=" typeof question.answers[0] === 'object' " class="margin">
      <div
        v-for="(answer, index) in question.answers"
        :key="index">
        <input 
          v-model="selected"
          type="radio"
          :value="answer.value"
          class="margin">
          {{ answer.text }}

      </div>
    </div>
    
    <button
      v-if="this.currentQuestion !== 0"
      @click="previousQuestion">
      Previous
    </button>

    <button
      @click="submitAnswer"
      class="margin">
      Next
    </button>
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
      this.selected = null;
    }
  }
}
</script>

<style scoped>
.margin {
  margin-top: 16px;
}
</style>
