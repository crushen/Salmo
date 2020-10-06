<template>
  <dialog open>
    <slot />

    <p>{{ confirmText }}</p>

    <button @click="confirm">Yes</button>
    <button @click="cancel">No</button>
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
dialog {
  width: 90%;
  padding: 16px;
  min-height: 50vh;
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 50;
  background: #E05E48;
  color: white;
  border: none;
}
</style>
