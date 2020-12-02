<template>
  <div class="alert-container">
    <dialog open>
      <p><b>You’ve now signed out. See you later!</b></p>
    </dialog>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.alert-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 50;
}

dialog {
  margin-top: 2rem;
  background: $dark-yellow;

  p {
    text-align: center;
  }
}
</style>
