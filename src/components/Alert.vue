<template>
  <div class="alert">
    <a v-if="!buttons" @click="close">
      <img :src="cross">
    </a>

    <p>{{ alert }}</p>
    <p>{{ text }}</p>

    <div
      v-if="buttons" 
      class="buttons">
      <button 
        @click="leave"
        class="tertiary">
        Leave Page
      </button>

      <button @click="close">
        Stay On Page
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
    buttons: { required: false, type: Boolean }
  },
  data() {
    return {
      cross
    }
  },
  methods: {
    close() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.$emit('closePage');
    },
    leave() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.$emit('leavePage');
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
  width: 95%;
  padding: $spacing*2 $spacing;
  border-radius: 4px;
  background: $primary-pink;
  color: $light-font;
  position: fixed;
  top: 2.5vw;
  left: 2.5vw;
  z-index: 40;

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
