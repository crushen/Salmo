<template>
  <div>
    <button 
      class="open aria-btn"
      @click="openModal"
      :id="`${visa.slug }-modal-btn`"
      :aria-label="`open ${visa.name } quick tip`"
      :aria-controls="`${visa.slug }-modal`"
      aria-expanded="false">
      <img :src="lightbulb" class="icon">
    </button>

    <transition name="modal" mode="out-in">
      <div 
        v-if="open"
        :id="`${visa.slug }-modal`"
        class="modal"
        role="region">
        <article>
          <img :src="lightbulbYellow" class="lightbulb-yellow">
          <img :src="lightbulbYellow" class="lightbulb-yellow">
          <img :src="lightbulbYellow" class="lightbulb-yellow">
          <img :src="lightbulbYellow" class="lightbulb-yellow">

          <h2><span>Quick Tip</span> {{ visa.name }}</h2>

          <div v-html="visa.quicktip.html" class="text" />

          <div class="close">
            <button 
              @click="closeModal"
              class="tertiary"
              :aria-label="`close ${visa.name } quick tip`">
              Close
            </button>
          </div>
        </article>
      </div>
    </transition>
  </div>
</template>

<script>
import lightbulb from '@/assets/icons/lightbulbs/button-yellow.svg';
import lightbulbYellow from '@/assets/icons/lightbulbs/quick-tip.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      open: false,
      lightbulb,
      lightbulbYellow
    }
  },
  methods: {
    openModal() {
      this.open = true;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';

      const button = document.querySelector(`#${this.visa.slug }-modal-btn`);
      button.setAttribute('aria-expanded', 'true');

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '-1');
    },
    closeModal() {
      this.open = false;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';

      const button = document.querySelector(`#${this.visa.slug }-modal-btn`);
      button.setAttribute('aria-expanded', 'false');

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '0');
    },
    changeBtnFocus(buttons, focus) {
      buttons.forEach(btn => {
        btn.setAttribute('tabindex', focus);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.open {
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -$spacing*2;
  right: -$spacing*2;
  background: $primary-yellow;
  color: $light-font;

  &:hover {
    background: darken($color: $primary-yellow, $amount: 10%);
  }

  .icon {
    width: 28px;
  }
}

.modal {
  width: 90%;
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 40;
  padding: $spacing*3;
  background: $background;
  color: $dark-font;
  text-align: left;
  border-radius: $border-radius;
  border: 6px solid $primary-yellow;

  .lightbulb-yellow {
    width: 9vw;
    max-width: 40px;
    position: absolute;

    &:nth-of-type(1) {
      top: 10px;
      left: 10px;
    }

    &:nth-of-type(2) {
      top: 10px;
      right: 10px;
    }

    &:nth-of-type(3) {
      bottom: 10px;
      left: 10px;
    }

    &:nth-of-type(4) {
      bottom: 10px;
      right: 10px;
    }
  }

  h2 {
    max-width: 270px;
    text-align: center;
    margin: 0 auto $spacing*4 auto;
    color: #222;
    span {
      color: $grey;
    }
  }

  .close {
    margin-top: 8vw;
    text-align: center;

    button {
      color: $primary-pink;
      font-size: 18px;
    }
  }
}

.text {
  /deep/ p {
    margin-top: $spacing*2;
  }

  /deep/ ul {
    width: 90%;
    margin: $spacing*2 auto 0 auto;
    list-style-position: inside;
    list-style: none;

    li {
      margin-top: $spacing*2;

      div {
        display: inline;
      }
    }

    li::before {
      content: "\25CF";
      color: $primary-yellow;
      display: inline-block;
      width: 10px;
      margin-right: $spacing;
    }
  }
}

.modal-enter,
.modal-leave-to {
  transform: translate(-50%, -55%);
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: 0.6s;
}

// Tablet
@media screen and (min-width: 600px) {
  .modal {
    width: 75%;
    margin-left: 50px;
    padding: $spacing*3 $spacing*6;

    .lightbulb-yellow {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        display: none;
      }
    }

    h2 {
      max-width: none;
      margin-bottom: $spacing*6;
    }

    .close {
      margin-top: $spacing*6;
    }
  }

  .text {
    /deep/ p {
      margin-top: $spacing*3;
    }

    /deep/ ul {
      margin-top: $spacing*3;

      li {
        margin-top: $spacing*3;
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .modal {
    width: 60%;
    margin-left: 50px;
    padding: $spacing*3 $spacing*10;

    .lightbulb-yellow {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        display: none;
      }
    }

    .text {
      max-width: 700px;
      margin: auto;
    }
  }
}
</style>
