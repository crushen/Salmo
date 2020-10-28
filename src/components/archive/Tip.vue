<template>
  <div class="tip">
    <div class="inner">
      <img 
        v-for="i in 4"
        :key="i"
        :src="lightbulb">

      <p><span>Remember!</span> {{ text }}</p>
    </div>
  </div>
</template>

<script>
import lightbulb from '@/assets/icons/lightbulbs/tip.svg';

export default {
  props: {
    text: { required: true, type: String }
  },

  data() {
    return {
      lightbulb
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.tip {
  background: $primary-yellow;
  position: relative;
  height: 18vh;
  max-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    width: 90%;
    margin: auto;
  }

  p {
    position: relative;
    z-index: 2;
  }

  span {
    font-weight: 600;
  }

  img {
    width: 7vw;
    max-width: 30px;
    position: absolute;
    z-index: 0;

    &:nth-of-type(1) {
      top: 8px;
      left: 8px;
    }

    &:nth-of-type(2) {
      top: 8px;
      right: 8px;
    }

    &:nth-of-type(3) {
      bottom: 8px;
      left: 8px;
    }

    &:nth-of-type(4) {
      bottom: 8px;
      right: 8px;
    }
  }
}
</style>