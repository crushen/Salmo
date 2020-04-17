<template>
  <div>
    <!-- <div 
      class="modal">
      <button 
        @click="toggleModal">
        <img :src="lightbulb" class="icon">
      </button>

      <div 
        class="inner"
        :class="open ? 'open' : ''">
        <article :class="open ? 'open' : ''">
          <h2><span>QUICK TIP</span> {{ visa.name }}</h2>
          <div v-html="visa.card.quickTip" class="text"></div>
        </article>
      </div>
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
    toggleModal(event) {
      let modal;
      const nav = document.querySelector('#nav'),
            overlay = document.querySelector('#overlay'),
            body = document.querySelector('body');

      if(event.target.tagName === 'IMG') {
        modal = event.target.parentElement.parentElement;
      } else if(event.target.tagName === 'BUTTON') {
        modal = event.target.parentElement;
      }

      if(!this.open) {
        this.open = true;
        modal.classList.remove('close');
        modal.classList.add('open');
        overlay.classList.add('is-active');
        overlay.style.zIndex = '30';
      } else {
        this.open = false;
        modal.classList.remove('open');
        modal.classList.add('close');
        overlay.classList.remove('is-active');
        overlay.style.zIndex = '-10';
      }
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
  z-index: 0;
  top: -22px;
  right: -10px;
  background: $primary-yellow;
  color: $light-font;
  border-radius: 50px;

  button {
    background: transparent;
    box-shadow: none;
    width: 52px;
    height: 52px;
    padding: 0;
    position: absolute;
    top: 2px;
    right: 0;

    img {
      width: 24px;
    }
  }

  &.open {
    animation-name: open;
    animation-duration: 0.9s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  &.close {
    animation-name: close;
    animation-duration: 0.9s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
}

.inner {
  width: 96%;
  height: 96%;
  background: white;
  color: $dark-font;
  margin-left: 2%;
  margin-top: 1.8%;
  //padding: 40px 0;
  border-radius: 8px;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
  transition-delay: 0.45s;

  &.open {
    visibility: visible;
    opacity: 1;
    transition: 0.2s;
    transition-delay: 0.9s;
  }

  article {
    opacity: 1;
    // transition: 0.5s;
    // transition-delay: 2s;

    // &.open {
    //   opacity: 1;
    // }
  }

  // h2 {
  //   margin-bottom: 8vw;
  //   color: #222;

  //   span {
  //     color: $grey;
  //   }
  // }

  .text p:not(:last-of-type) {
    margin-bottom: $spacing*2;
  }
}

@keyframes open {
  0% {
    z-index: 40;
    width: 52px;
    height: 52px;
  }
  25% {
    z-index: 40;
    width: 52px;
    height: 52px;
    border-radius: $border-radius;
  }
  50% {
    z-index: 40;
    width: 52px;
    height: 52px;
    border-radius: $border-radius;
  }
  75% {
    z-index: 40;
    width: 89vw;
    height: 120%;
    border-radius: $border-radius;
  }
  100% {
    z-index: 40;
    width: 89vw;
    height: 120%;
    border-radius: $border-radius;
  }
}

@keyframes close {
  0% {
    z-index: 40;
    width: 89vw;
    height: 120%;
    border-radius: $border-radius;
  }
  25% {
    z-index: 40;
    width: 89vw;
    height: 120%;
    border-radius: $border-radius;
  }
  50% {
    z-index: 40;
    width: 89vw;
    height: 120%;
    border-radius: $border-radius;
  }
  75% {
    z-index: 40;
    width: 52px;
    height: 52px;
    border-radius: $border-radius;
  }
  100% {
    z-index: 0;
    width: 52px;
    height: 52px;
    border-radius: 50px;
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


// }
</style>
