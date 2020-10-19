<template>
  <div class="container">
    <dialog open>
      <button @click="closeModal">X</button>

      <slot />
    </dialog>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  },
  mounted() {
    this.setOverlay()
  }
}
</script>

<style lang="scss" scoped>
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
  min-height: 50vh;
  background: #eee;
}
</style>
