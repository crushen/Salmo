<template>
  <button
    @click="$emit('go-back')"
    class="arrow-btn">
    <img src="@/assets/icons/blue/arrow-left.svg" alt="">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.arrow-btn {
  background: none;
  padding: 0;
  width: auto;
  position: absolute;
  top: 28px;
  left: 5vw;
  z-index: 5;
  border-radius: 0;
  display: flex;
  align-items: center;
  color: $blue;
  font-size: 1.1rem;

  img {
    width: 32px;
  }
}

@media screen and (min-width: 1200px) {
  // .arrow-btn {
  //   left: calc(100px + 5vw);
  // }
}
</style>
