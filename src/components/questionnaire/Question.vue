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
      <button
        v-if="selected"
        @click="submitAnswer">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: { type: Object, required: true }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    submitAnswer() {
      this.$emit('answer', this.selected);
      this.selected = null;
    }
  }
}
</script>
