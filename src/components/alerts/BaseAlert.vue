<template>
  <div class="container">
    <dialog open>
      <slot />

      <p class="confirm">{{ confirmText }}</p>

      <div class="buttons">
        <button @click="confirm" class="confirm">Yes</button>
        <button @click="cancel" class="cancel">No</button>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  props: { confirmText: { required: true, type: String } },
  methods: {
    confirm() {
      this.$emit('confirm')
      this.removeOverlay()
    },
    cancel() {
      this.$emit('cancel')
      this.removeOverlay()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

dialog {
  width: 90%;
  position: relative;
  padding: 1em;
  background: $red;
  color: white;
  border: none;
  text-align: center;
  border-radius: $radius;
}

p {
  margin-bottom: 1em;

  &.confirm {
    font-weight: 600;
    margin-bottom: 0;
  }
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: 35%;

  &.confirm {
    background: white;
    border: 3px solid white;
    color: $red;
    margin-top: 2em;
  }

  &.cancel {
    background: $red;
    border: 3px solid white;
    color: white;
    margin-top: 1em;
  }
}
</style>
