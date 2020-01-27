<template>
  <div class="answers">
    <div
      v-for="(option, index) in options"
      :key="index">
      <input 
        v-model="selected"
        type="radio"
        name="question"
        :value="option.value">
        {{ option.text }}

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
      options: [],
      selected: ''
    }
  },
  methods: {
    assign() {
      this.options = this.activeQuestion.answers;
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