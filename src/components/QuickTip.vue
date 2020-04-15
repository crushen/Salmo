<template>
  <div>
    <button @click="openModal">
      <img :src="lightbulb" class="icon">
    </button>

    <div 
      v-if="open"
      class="modal">
      <article>
        <h2><span>QUICK TIP</span> {{ visa.name }}</h2>
        <div 
          v-html="visa.card.quickTip"
          class="text"></div>
        <div 
          @click="closeModal"
          class="back">Back to Results</div>
      </article>
    </div>
  </div>
</template>

<script>
import lightbulb from '@/assets/icons/white/lightbulb-solid.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      open: false,
      lightbulb
    }
  },
  methods: {
    openModal() {
      this.open = true;
      document.querySelector('.overlay').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
    },
    closeModal() {
      this.open = false;
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('body').style.overflow = 'auto';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

button {
  width: 52px;
  height: 52px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  right: -10px;
  background: $primary-yellow;
  color: $light-font;
  
  img {
    width: 24px;
  }
}

.modal {
  width: 90%;
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 40;
  padding: $spacing*3;
  background: $background;
  color: $dark-font;
  text-align: left;
  border-radius: $border-radius;

  h2 {
    margin-bottom: 8vw;
    color: #222;

    span {
      color: $grey;
    }
  }

  .text p:not(:last-of-type) {
    margin-bottom: $spacing*2;
  }

  .back {
    margin-top: 8vw;
    color: #222;
    font-weight: bold;
    font-size: 18px;
    text-align: right;
  }
}
</style>
