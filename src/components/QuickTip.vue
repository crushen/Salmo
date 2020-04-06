<template>
  <div>
    <button>
      <h3>Quick<br>Tip</h3>
    </button>

    <!-- Need to add modal with tips -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

button {
  width: 62px;
  height: 62px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -30px;
  right: -10px;
  background: $dark-grey;
  color: $light-font;
  border: 2px solid $light-font;
  
  & h3 {
    font-size: 17px;
    line-height: 18px;
  }
}
</style>
