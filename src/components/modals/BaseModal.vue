<template>
  <div class="alert-modal-container">
    <dialog open>
      <button @click="closeModal" class="none close">
        <img src="@/assets/icons/grey/cross.svg" alt="">
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

dialog {
  background: $grey;
}

button.close {
  position: absolute;
  top: 1em;
  right: 1em;

  img {
    width: 1.8em;
  }
}
</style>
