<template>
  <div
    :id="`${visa.slug }-modal`"
    class="modal"
    role="region"
    @keydown.esc="closeModal">
    <article>
      <img :src="lightbulbYellow" class="lightbulb-yellow">
      <img :src="lightbulbYellow" class="lightbulb-yellow">
      <img :src="lightbulbYellow" class="lightbulb-yellow">
      <img :src="lightbulbYellow" class="lightbulb-yellow">

      <h2><span>Quick Tip</span> {{ visa.name }}</h2>

      <div v-html="visa.quicktip.html" class="text" />

      <div class="close">
        <button 
          @click="closeModal"
          class="tertiary"
          :aria-label="`close ${visa.name } quick tip`">
          Close
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import lightbulbYellow from '@/assets/icons/lightbulbs/quick-tip.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      lightbulbYellow
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
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
  border: 6px solid $primary-yellow;

  .lightbulb-yellow {
    width: 9vw;
    max-width: 40px;
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
    max-width: 270px;
    text-align: center;
    margin: 0 auto $spacing*4 auto;
    color: #222;
    span {
      color: $grey;
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

.text {
  /deep/ p {
    margin-top: $spacing*2;
  }

  /deep/ ul {
    width: 90%;
    margin: $spacing*2 auto 0 auto;
    list-style-position: inside;
    list-style: none;

    li {
      margin-top: $spacing*2;

      div {
        display: inline;
      }
    }

    li::before {
      content: "\25CF";
      color: $primary-yellow;
      display: inline-block;
      width: 10px;
      margin-right: $spacing;
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
    padding: $spacing*3 $spacing*6;

    .lightbulb-yellow {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        display: none;
      }
    }

    h2 {
      max-width: none;
      margin-bottom: $spacing*6;
    }

    .close {
      margin-top: $spacing*6;
    }
  }

  .text {
    /deep/ p {
      margin-top: $spacing*3;
    }

    /deep/ ul {
      margin-top: $spacing*3;

      li {
        margin-top: $spacing*3;
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .modal {
    width: 60%;
    margin-left: 50px;
    padding: $spacing*3 $spacing*10;

    .lightbulb-yellow {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        display: none;
      }
    }

    .text {
      max-width: 700px;
      margin: auto;
    }
  }
}
</style>
