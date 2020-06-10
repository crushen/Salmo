<template>
  <div 
    class="alert"
    :class="!buttons ? 'top' : 'bottom'">
    <a v-if="!buttons" @click="confirm">
      <img :src="cross">
    </a>

    <p>{{ alert }}</p>
    <p>{{ text }}</p>

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
import cross from '@/assets/icons/white/times-solid.svg';

export default {
  props: {
    alert: { required: true, type: String },
    text: { required: true, type: String },
    buttons: { required: false, type: Array }
  },
  data() {
    return {
      cross
    }
  },
  methods: {
    cancel() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.$emit('cancel');
    },
    confirm() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.$emit('confirm');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

a {
  width: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
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
</style>
