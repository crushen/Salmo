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

          <p>For most visas the earliest you can apply is around 3 months before your travel date (for visiting visas) your course start date (for study visas) or your job start date (for work visas).</p>
          <p>However settlement applications can take up to 6 months to be approved, so be careful to allow extra time for this.</p>

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

  &:hover {
    background: darken($color: $primary-pink, $amount: 10%);
  }

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

  p:last-of-type {
    margin-top: $spacing*2;
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

// Tablet
@media screen and (min-width: 600px) {
  .modal {
    width: 75%;
    margin-left: 50px;
    padding: $spacing*4 $spacing*6;

    h3 {
      margin-bottom: $spacing*6;
    }
  
    .close {
      margin-top: $spacing*6;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .modal {
    width: 60%;
    margin-left: 50px;
    padding: $spacing*3 $spacing*10;

    h3 {
      margin-bottom: $spacing*8;
    }
  
    .close {
      margin-top: $spacing*8;
    }
  }
}
</style>
