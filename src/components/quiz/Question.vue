<template>
  <div>
    <div v-if="currentQuestion === 0">
      <h2>{{ question.question }}</h2>
      
      <div class="buttons">
        <button
          v-for="(answer, index) in question.answers"
          :key="index"
          @click="selected = answer.value"
          :id="`button-${index}`"
          class="button aria-btn"
          :style="{ backgroundImage: buttonBackground(index) }"
          :aria-pressed="answer.value === selected ?  'true' : 'false'">
          <div v-if="answer.value !== selected && selected !== null" class="btn-overlay" />

          {{ answer.label }}

          <img :src="buttonIcon(index)" class="icon">
        </button>
      </div>
    </div>

    <div v-else class="radio-buttons">
      <FormulateInput
        v-model="selected"
        type="radio"
        :options="question.answers"
        :label="question.question"
        validation="required"
        error-behavior="submit"
        class="grey-label quiz" />
    </div>

    <div class="nav">
      <!-- <button
        @click="previousQuestion"
        class="tertiary"
        aria-label="Previous question">
        <p>Previous</p>
      </button> -->

      <button
        @click="submitAnswer"
        class="outline"
        aria-label="Next question">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import study from '@/assets/icons/blue/study.svg'
import work from '@/assets/icons/blue/work.svg'
import business from '@/assets/icons/blue/business.svg'
import family from '@/assets/icons/blue/family.svg'

import wave from '@/assets/patterns/wave-2.svg'
import line from '@/assets/patterns/line.svg'
import dashed from '@/assets/patterns/dashed-line.svg'
import confetti from '@/assets/patterns/confetti.svg'

export default {
  props: {
    question: { type: Object, required: true },
    questions: { type: Array, required: true },
    currentQuestion: { type: Number, required: true }
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
      this.$emit('submitAnswer', this.selected)
      this.selected = null;
    },
    previousQuestion() {
      this.$emit('previousQuestion')
      this.selected = null
    },
    buttonBackground(index) {
      switch(index) {
        case 0:
          return `url(${this.wave})`
        case 1:
          return `url(${this.line})`
        case 2:
          return `url(${this.dashed})`
        case 3:
          return `url(${this.confetti})`
        default:
          return `url(${this.wave})`
      }
    },
    buttonIcon(index) {
      switch(index) {
        case 0:
          return this.study
        case 1:
          return this.work
        case 2:
          return this.business
        case 3:
          return this.family
        default:
          return this.study
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h2 {
  margin: 0 5%;
}

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 2em auto;

  .button {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: $spacing;
    padding: 12px 0 0 0;
    border-radius: $border-radius;
    background-color: $primary-blue;
    color: $light-font;
    text-transform: capitalize;
    box-shadow: $shadow;
    background-position: center;

    .btn-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba($color: $dark-font, $alpha: 0.5);
      border-radius: $border-radius;
      z-index: 2;
    }

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
      position: relative;
      z-index: 0;
    }

    .icon {
      width: 55px;
    }
  }
}

.nav {
  width: 90%;
  margin: auto;
  padding-bottom: 2em;
  display: flex;
  justify-content: flex-end;
}

.radio-buttons {
  width: 90%;
  margin: auto;
  margin-bottom: 2em;
}

// Tablet
@media screen and (min-width: 600px) {
  .buttons {
    max-width: none;
    justify-content: space-between;

    .button {
      margin: 0;
    }
  }
}
</style>
