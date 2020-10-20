<template>
  <div class="container">
    <dialog open>
      <button @click="closeModal" class="none">
        <img src="@/assets/icons/cross.svg" alt="">
      </button>

      <slot />
    </dialog>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal')
      this.removeOverlay()
    }
  },
  mounted() {
    this.setOverlay()
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
  background: $grey;
}

button {
  position: absolute;
  top: 1em;
  right: 1em;

  img {
    width: 1.8em;
  }
}
</style>
