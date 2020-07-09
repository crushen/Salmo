<template>
  <div class="modal">
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
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
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
