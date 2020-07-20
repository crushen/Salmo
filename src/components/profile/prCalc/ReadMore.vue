<template>
  <div class="modal">
    <h3>How to get the best out of the Holiday Tracker & Calculator</h3>

    <div class="text">
      <p>We will calculate the amount of holiday you’ve taken, so you have a clear and consise place to register and keep track of your holiday. Here is a helpful guide to your results:</p>
    </div>

    <div class="text">
      <p>You’re well under the 180 day limit, nothing to worry about. </p>

      <p>You’re approaching the 180 day limit. Be sure to check your dates carefully and if possible do not take any more leave.</p>

      <p>You’re over the 180 day limit. This will make it harder to get ILR unless you have a reason for your absence e.g. sickness.</p>
    </div>

    <div class="text">
      <p>If you’re aiming for the 5 year plan, then you’ll have to make sure that you haven’t been out of the UK for a total of <b>450 days</b> for the whole 5 years.</p>

      <p>If you’re aiming for the 10 year plan then you’ll have to make sure you haven’t been out of the UK for a total of <b>540 days</b> for the whole 10 years.</p>

      <p>
        For more advice on ILR, check out our Help Centre article; 
        <router-link
          to="/"
          class="tertiary">
          Indefinite Leave to Remain (ILR)
        </router-link>
      </p>
    </div>

    <div class="close">
      <button
        @click="closeModal" 
        class="tertiary">
        Back to Profile
      </button>
    </div>
  </div>
</template>

<script>

export default {
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
    margin-bottom: $spacing*2;
    font-size: 16px;
  }

  p {
    font-size: 14px;
    &:not(:first-of-type) {
      margin-top: $spacing;
    }
  }

  .text {
    &:not(:first-of-type) {
      margin-top: $spacing*2;
    }
  }
 
  .close {
    margin-top: $spacing*2;
    text-align: center;

    .tertiary {
      color: $primary-pink;
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
