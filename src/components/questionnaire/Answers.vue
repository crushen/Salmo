<template>
  <div class="answers">
    <div
      v-for="(answer, index) in answers"
      :key="index">
      <input 
        v-model="selected"
        type="radio"
        name="question"
        :value="answer.value">
        {{ answer.text }}

    </div>
    <button
      v-if="selected"
      @click="nextQuestion">
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    activeQuestion: { type: Object, required: true }
  },
  data () {
    return{
      answers: [],
      selected: ''
    }
  },
  methods: {
    assign() {
      this.answers = this.activeQuestion.answers;
      this.selected = '';
    },
    nextQuestion() {
      this.$emit('nextQuestion', this.selected);
    }
  },
  watch: {
    '$props': {
      handler(val, oldVal) {
        this.assign()
      },
      deep: true
    }
  },
  created() {
    this.assign();
  }
}
</script>