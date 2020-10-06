<template>
  <dialog open>
    <button @click="closeModal">X</button>

    <slot />
  </dialog>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal')
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
  background: #eee;
  border: none;
}
</style>
