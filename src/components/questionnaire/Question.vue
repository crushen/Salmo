<template>
  <div class="container">
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

    <div v-else class="radio-buttons">
      <pretty-radio
        v-model="selected"
        v-for="(answer, index) in question.answers"
        :key="index"
        :value="answer.value"
        class="p-smooth p-default p-round radio"
        color="primary-o">
        {{ answer.text }}
      </pretty-radio>
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
import prettyRadio from 'pretty-checkbox-vue/radio';

export default {
  props: {
    question: { type: Object, required: true },
    questions: { type: Array, required: true },
    currentQuestion: { type: Number, required: true }
  },
  components: {
    prettyRadio
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

.container {
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

}

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;

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
      padding: 0 0 8px 6px;
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

.radio-buttons {
  display: flex;
  flex-direction: column;
  font-size: 18px;

  .radio:not(:first-of-type) {
    margin-top: $spacing*6;
  }
}
</style>
