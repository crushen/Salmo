<template>
  <div 
    class="alert"
    :class="!buttons ? 'top' : 'bottom'">
    <p>{{ alert }}</p>
    <p>{{ text }}</p>

    <button
      v-if="!buttons"
      @click="confirm"
      class="exit"
      aria-label="Close confirmation">
      <!-- <img :src="cross"> -->
    </button>

    <div
      v-if="buttons" 
      class="buttons">
      <button 
        @click="cancel"
        class="tertiary">
        {{ buttons[0] }}
      </button>

      <button @click="confirm">
        {{ buttons[1] }}
      </button>
    </div>
  </div>
</template>

<script>
// import cross from '@/assets/icons/white/times-solid.svg';

export default {
  props: {
    alert: { required: true, type: String },
    text: { required: true, type: String },
    buttons: { required: false, type: Array }
  },
  data() {
    return {
      // cross
    }
  },
  methods: {
    cancel() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '0');

      this.$emit('cancel');
    },
    confirm() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '0');

      this.$emit('confirm');
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

.exit {
  width: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  box-shadow: none;
  padding: 0;

  img {
    width: 18px;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.alert {
  text-align: left;
  width: 95%;
  padding: $spacing*2 $spacing;
  border-radius: 4px;
  background: $primary-pink;
  color: $light-font;
  position: fixed;
  left: 2.5vw;
  z-index: 40;

  &.top {
    top: 2.5vw;
  }

  &.bottom {
    top: 60vh;
  }

  p:first-of-type {
    font-weight: 600;
    margin-bottom: $spacing*2;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: $spacing*2;

  button {
    color: $light-font;

    &:last-of-type {
      background: white;
      color: $primary-pink;
    }
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .alert {
    padding: $spacing*2;
    width: calc(90% - 100px);
    left: calc(5vw + 100px);

    &.bottom {
      top: 2.5vw;
    } 
  }

  .buttons {
    margin-top: $spacing*3;
  }
}
</style>
