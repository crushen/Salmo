<template>
  <div>
    <button 
      class="open"
      @click="openModal">
      <img :src="lightbulb" class="icon">
    </button>

    <transition name="modal" mode="out-in">
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

          <div class="close">
            <button 
              @click="closeModal"
              class="tertiary">
              Close
            </button>
          </div>
        </article>
      </div>
    </transition>
  </div>
</template>

<script>
import lightbulb from '@/assets/icons/lightbulbs/button-yellow.svg';
import lightbulbYellow from '@/assets/icons/lightbulbs/quick-tip.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      open: false,
      lightbulb,
      lightbulbYellow
    }
  },
  methods: {
    openModal() {
      this.open = true;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';
    },
    closeModal() {
      this.open = false;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.open {
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
    width: 28px;
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

  .close {
    margin-top: 8vw;
    text-align: center;

    button {
      color: $primary-pink;
      font-size: 18px;
    }
  }
}

.modal-enter,
.modal-leave-to {
  transform: translate(-50%, -55%);
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: 0.6s;
}
</style>
