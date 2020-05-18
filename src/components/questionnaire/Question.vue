<template>
  <div>
    <h3>{{ question.question }}</h3>

    <div v-if="currentQuestion === 0">
        <div class="buttons">
          <button
            class="button"
            v-for="(answer, index) in question.answers"
            :key="index"
            @click="selected = answer.value">
            <div class="inner">
              <p>{{ answer.text }}</p>
            </div>
          </button>
        </div>
    </div>

    <div v-else class="margin">
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

    <div class="nav">
      <button
        @click="previousQuestion"
        class="tertiary"
        :class="{ 'disabled': currentQuestion === 0 }">
        <span>&#8227;</span> 
        <p>Previous</p>
      </button>

      <button
        @click="submitAnswer"
        class="secondary">
        Next <span>&#8227;</span>
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
      selected: null
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h3 {
  margin-top: $spacing*5;
}

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: $spacing*4 auto auto;

  .button {
    width: 120px;
    height: 120px;
    margin: $spacing;
    padding: 0;
    border: 3px solid $primary-blue;
    border-radius: $border-radius;
    background: $light-grey;
    color: $light-font;
    text-transform: capitalize;
    box-shadow: $shadow;
    position: relative;

    .inner {
      width: 100%;
      padding: 6px;
      background: $primary-blue;
      position: absolute;
      bottom: 0;

      p {
        font-weight: 600;
      }
    }
  
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 4px $primary-yellow;
    }
  }
}

.nav {
  width: 100%;
  margin-top: $spacing*4;
  display: flex;
  justify-content: space-between;

  .secondary {
    border: 3px solid $primary-yellow;
    color: $primary-yellow;

    span {
      font-size: 45px;
      line-height: 0;
      padding: 0 0 6px 6px;
    }
  }

  .tertiary {
    padding: 0;

    &.disabled {
      color: $grey;
      pointer-events: none;
    }

    span {
      transform: rotate(180deg);
      font-size: 45px;
      line-height: 0;
      padding: 0 0 6px 6px;
    }
  }

  button {
    display: flex;
    align-items: center;
    line-height: 0;
    padding: 20px $spacing*3;
    outline: none;
  }
}
</style>