<template>
  <div class="container">
    <h3>{{ question.question }}</h3>

    <div v-if="currentQuestion === 0">
        <div class="buttons">
          <button
            class="button"
            v-for="(answer, index) in question.answers"
            :key="index"
            @click="selected = answer.value"
            :style="{ backgroundImage: `url(${answer.bg})` }">
            <p>{{ answer.text }}</p>
            <img :src="answer.icon" class="icon">
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
        :class="{ 'inactive': currentQuestion === 0 }">
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

import study from '@/assets/icons/visa-buttons/study.svg';
import work from '@/assets/icons/visa-buttons/work.svg';
import business from '@/assets/icons/visa-buttons/business.svg';
import family from '@/assets/icons/visa-buttons/family.svg';

import wave from '@/assets/patterns/wave-2.svg';
import line from '@/assets/patterns/line.svg';
import dashed from '@/assets/patterns/dashed-line.svg';
import confetti from '@/assets/patterns/confetti.svg';

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
      selected: null,
      study,
      work,
      business,
      family,
      wave,
      line,
      dashed,
      confetti
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
    },
    getButtonStyles() {
      if(this.currentQuestion === 0) {
        this.question.answers.forEach(answer => {
          switch(this.question.answers.indexOf(answer)) {
            case 0:
              answer.icon = this.study;
              answer.bg = this.wave;
              break;
            case 1:
              answer.icon = this.work;
              answer.bg = this.line;
              break;
            case 2:
              answer.icon = this.business;
              answer.bg = this.dashed;
              break;
            case 3:
              answer.icon = this.family;
              answer.bg = this.confetti;
              break;
          }
        });
      }
    }
  },
  mounted() {
    this.getButtonStyles();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.container {
  width: 100%;
  min-height: 75vh;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: $spacing;
    padding: 12px 0 0 0;
    border-radius: $border-radius;
    background: $primary-blue;
    color: $light-font;
    text-transform: capitalize;
    box-shadow: $shadow;
    background-position: center;

    &:nth-of-type(1) {
      background-size: 240px;
      
    }

    &:nth-of-type(2) {
      background-size: 140px;
    }

    &:nth-of-type(3) {
      background-size: 180px;
    }

    p {
      font-size: 18px;
      font-weight: 600;
      transform: translateY(4px);
    }

    .icon {
      width: 55px;
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
    text-decoration: none;

    &.inactive {
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
