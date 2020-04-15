<template>
  <div>
    <div 
      class="modal"
      :class="open ? 'open' : ''">
      <button 
        v-if="!open"
        @click="openModal">
        <img :src="lightbulb" class="icon">
      </button>
      <button 
        v-else
        @click="closeModal">
        <img :src="cross" class="icon">
      </button>

      <div 
        class="inner"
        :class="open ? 'open' : ''">
        <p>hello</p>
      </div>
    </div>



    <!-- <div 
      v-if="open"
      class="modal">
      <article>
        <h2><span>QUICK TIP</span> {{ visa.name }}</h2>
        <div 
          v-html="visa.card.quickTip"
          class="text"></div>
        <button 
          @click="closeModal"
          class="close">Close
        </button>
      </article>
    </div> -->

  </div>
</template>

<script>
import lightbulb from '@/assets/icons/white/lightbulb-solid.svg';
import cross from '@/assets/icons/white/times-solid.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      open: false,
      lightbulb,
      cross
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

.modal {
  width: 52px;
  height: 52px;
  position: absolute;
  z-index: 40;
  top: -22px;
  right: -10px;
  background: $primary-yellow;
  color: $light-font;
  border-radius: 50px;
  transition: 0.4s;

  button {
    background: transparent;
    box-shadow: none;
    width: 52px;
    height: 52px;
    padding: 0;
    position: absolute;
    z-index: 50;
    top: 2px;
    right: 0;

    img {
      width: 24px;
    }
  }

  &.open {
    width: 89vw;
    height: 300px;
    border-radius: $border-radius;
  }

  .inner {
    width: 96%;
    height: 96%;
    background: white;
    margin-left: 2%;
    margin-top: 1.8%;
    border-radius: 8px;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    transition-delay: 0.5s;

    &.open {
      visibility: visible;
      opacity: 1;
    }
  }


}

// .modal {
//   width: 90%;
//   position: fixed;
//   top: 50%; 
//   left: 50%; 
//   transform: translate(-50%, -50%);
//   z-index: 40;
//   padding: $spacing*3;
//   background: $background;
//   color: $dark-font;
//   text-align: left;
//   border-radius: $border-radius;

//   h2 {
//     margin-bottom: 8vw;
//     color: #222;

//     span {
//       color: $grey;
//     }
//   }

//   .text p:not(:last-of-type) {
//     margin-bottom: $spacing*2;
//   }
// }
</style>
