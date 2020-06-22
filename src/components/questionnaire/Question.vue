<template>
  <section>
    <img 
      src="@/assets/grey-background.png" alt=""
      class="background-1">
    <img 
      src="@/assets/grey-background-bottom.png" alt=""
      class="background-2">

    <div class="container">
      <h3>{{ question.question }}</h3>

      <div v-if="currentQuestion === 0">
          <div class="buttons">
            <button
              class="button"
              v-for="(answer, index) in question.answers"
              :key="index"
              @click="selected = answer.value"
              :style="{ backgroundImage: buttonBackground(index) }">
              <div v-if="answer.value !== selected && selected !== null" class="btn-overlay"></div>
              <p>{{ answer.text }}</p>
              <img :src="buttonIcon(index)" class="icon">
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
          :class="{'un-checked': answer.value !== selected && selected !== null}"
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
          :class="{'inactive': !selected}"
          class="secondary">
          Next <span>&#8227;</span>
        </button>
      </div>
    </div>
  </section>

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
    buttonBackground(index) {
      switch(index) {
        case 0:
          return `url(${this.wave})`;
        case 1:
          return `url(${this.line})`;
        case 2:
          return `url(${this.dashed})`;
        case 3:
          return `url(${this.confetti})`;
        default:
          return `url(${this.wave})`;
      }
    },
    buttonIcon(index) {
      switch(index) {
        case 0:
          return this.study;
        case 1:
          return this.work;
        case 2:
          return this.business;
        case 3:
          return this.family;
        default:
          return this.study;
      }
    }
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
  position: relative;
  z-index: 2;
}

.background-1,
.background-2 {
  display: none;
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
      background: rgba($color: $dark-font, $alpha: 0.6);
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

    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 4px $primary-yellow;
    }
  }
}

.un-checked {
  opacity: 0.6;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .secondary {
    border: 3px solid $primary-yellow;
    color: $primary-yellow;

    &.inactive {
      border: 3px solid $light-grey;
      color: $light-grey;
      pointer-events: none;
    }

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
      color: $light-grey;
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

// Tablet
@media screen and (min-width: 600px) {
  h3 {
    font-size: 30px;
  }

  .container {
    min-height: 60vh;
    margin-top: $spacing*12;
  }

  .background-1 {
    display: block;
    position: absolute;
    top: 0;
    left: 100px;
    width: calc(100% - 100px);
    height: 220px;
  }

  .background-2 {
    display: block;
    position: absolute;
    left: 90px;
    bottom: 0;
    width: calc(100% - 90px);
    height: 270px;
  }

  .buttons {
    max-width: none;
    justify-content: space-between;

    .button {
      margin: 0;
    }
  }
}
</style>
