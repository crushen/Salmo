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

    <button @click="openModal">
      <img :src="lightbulb" class="icon">
    </button>

    <div 
      v-if="open"
      class="modal">
      <article>
        <img :src="lightbulbYellow" class="lightbulb-yellow">
        <img :src="lightbulbYellow" class="lightbulb-yellow">
        <img :src="lightbulbYellow" class="lightbulb-yellow">
        <img :src="lightbulbYellow" class="lightbulb-yellow">
        <h2><span>Quick Tip</span> {{ visa.name }}</h2>
        <div class="text">
          <p>{{ visa.card.quickTip.header }}</p>
          <ul>
            <li
              v-for="item in visa.card.quickTip.list"
              :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div 
          @click="closeModal"
          class="back">Close</div>
      </article>
    </div>
  </div>
</template>

<script>
import lightbulb from '@/assets/icons/white/lightbulb-solid.svg';
import lightbulbYellow from '@/assets/icons/lightbulb-yellow.svg';
import cross from '@/assets/icons/white/times-solid.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      open: false,
      lightbulb,
      lightbulbYellow,
      cross
    }
  },
  methods: {
    openModal() {
      this.open = true;
      document.querySelector('#overlay').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
    },
    closeModal() {
      this.open = false;
      document.querySelector('#overlay').style.display = 'none';
      document.querySelector('body').style.overflow = 'auto';
    }
    // toggleModal(event) {
    //   let modal;
    //   const nav = document.querySelector('#nav'),
    //         overlay = document.querySelector('#overlay'),
    //         body = document.querySelector('body');

    //   if(event.target.tagName === 'IMG') {
    //     modal = event.target.parentElement.parentElement;
    //   } else if(event.target.tagName === 'BUTTON') {
    //     modal = event.target.parentElement;
    //   }

    //   if(!this.open) {
    //     this.open = true;
    //     modal.classList.remove('close');
    //     modal.classList.add('open');
    //     overlay.classList.add('is-active');
    //     overlay.style.zIndex = '30';
    //   } else {
    //     this.open = false;
    //     modal.classList.remove('open');
    //     modal.classList.add('close');
    //     overlay.classList.remove('is-active');
    //     overlay.style.zIndex = '-10';
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

button {
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -$spacing*2;
  right: -$spacing*2;
  background: $primary-yellow;
  color: $light-font;

  .icon {
    width: 22px;
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
  border: 6px solid $primary-yellow;

  .lightbulb-yellow {
    width: 9vw;
    position: absolute;
    opacity: 0.3;

    &:nth-of-type(1) {
      top: 10px;
      left: 10px;
    }

    &:nth-of-type(2) {
      top: 10px;
      right: 10px;
    }

    &:nth-of-type(3) {
      bottom: 10px;
      left: 10px;
    }

    &:nth-of-type(4) {
      bottom: 10px;
      right: 10px;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 8vw;
    color: #222;
    span {
      color: $grey;
    }
  }
  
  ul {
    margin-top: $spacing*2;
    list-style-position: inside;
    list-style: none;

    li {
      margin-top: $spacing*2;
    }

    li::before {
      content: "\25CF";
      color: $primary-yellow;
      display: inline-block;
      width: 10px;
    }
  }
  
  .back {
    width: 70px;
    margin: 8vw auto 0 auto;
    color: $primary-pink;
    font-weight: bold;
    font-size: 18px;
    text-decoration: underline;
  }
}



// .modal {
//   width: 52px;
//   height: 52px;
//   position: absolute;
//   z-index: 0;
//   top: -22px;
//   right: -10px;
//   background: $primary-yellow;
//   color: $light-font;
//   border-radius: 50px;

//   button {
//     background: transparent;
//     box-shadow: none;
//     width: 52px;
//     height: 52px;
//     padding: 0;
//     position: absolute;
//     top: 2px;
//     right: 0;

//     img {
//       width: 24px;
//     }
//   }

//   &.open {
//     animation-name: open;
//     animation-duration: 0.9s;
//     animation-timing-function: ease-in-out;
//     animation-fill-mode: forwards;
//   }

//   &.close {
//     animation-name: close;
//     animation-duration: 0.9s;
//     animation-timing-function: ease-in-out;
//     animation-fill-mode: forwards;
//   }
// }

// .inner {
//   width: 96%;
//   height: 96%;
//   background: white;
//   color: $dark-font;
//   margin-left: 2%;
//   margin-top: 1.8%;
//   //padding: 40px 0;
//   border-radius: 8px;
//   visibility: hidden;
//   opacity: 0;
//   transition: 0.2s;
//   transition-delay: 0.45s;

//   &.open {
//     visibility: visible;
//     opacity: 1;
//     transition: 0.2s;
//     transition-delay: 0.9s;
//   }

//   .text p:not(:last-of-type) {
//     margin-bottom: $spacing*2;
//   }
// }

// @keyframes open {
//   0% {
//     z-index: 40;
//     width: 52px;
//     height: 52px;
//   }
//   25% {
//     z-index: 40;
//     width: 52px;
//     height: 52px;
//     border-radius: $border-radius;
//   }
//   50% {
//     z-index: 40;
//     width: 52px;
//     height: 52px;
//     border-radius: $border-radius;
//   }
//   75% {
//     z-index: 40;
//     width: 89vw;
//     height: 120%;
//     border-radius: $border-radius;
//   }
//   100% {
//     z-index: 40;
//     width: 89vw;
//     height: 120%;
//     border-radius: $border-radius;
//   }
// }

// @keyframes close {
//   0% {
//     z-index: 40;
//     width: 89vw;
//     height: 120%;
//     border-radius: $border-radius;
//   }
//   25% {
//     z-index: 40;
//     width: 89vw;
//     height: 120%;
//     border-radius: $border-radius;
//   }
//   50% {
//     z-index: 40;
//     width: 89vw;
//     height: 120%;
//     border-radius: $border-radius;
//   }
//   75% {
//     z-index: 40;
//     width: 52px;
//     height: 52px;
//     border-radius: $border-radius;
//   }
//   100% {
//     z-index: 0;
//     width: 52px;
//     height: 52px;
//     border-radius: 50px;
//   }
// }
</style>
