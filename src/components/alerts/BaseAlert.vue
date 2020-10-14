<template>
  <dialog open>
    <slot />

    <p class="confirm">{{ confirmText }}</p>

    <div class="buttons">
      <button @click="confirm" class="confirm">Yes</button>
      <button @click="cancel" class="cancel">No</button>
    </div>
  </dialog>
</template>

<script>
export default {
  props: { confirmText: { required: true, type: String } },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

dialog {
  width: 90%;
  padding: 1em;
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  background: $red;
  color: white;
  border: none;
  text-align: center;
  border-radius: .5em;
  z-index: 50;
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
