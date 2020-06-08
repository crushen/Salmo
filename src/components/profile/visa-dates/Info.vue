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
          <h3>How application guidlines are calculated.</h3>

          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda similique debitis mollitia corrupti beatae ad necessitatibus incidunt sed inventore. Omnis doloribus quis nostrum nam magni odit debitis, soluta quia sit.</p>

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
import lightbulb from '@/assets/icons/lightbulbs/button-pink.svg';

export default {
  data() {
    return {
      open: false,
      lightbulb
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
  background: $primary-pink;
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

  h3 {
    margin-bottom: 8vw;
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
