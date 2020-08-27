<template>
  <div>
    <transition name="modal" mode="out-in">
      <quick-tip
        v-if="open"
        :visa="visa"
        @close="closeQuickTip"/>
    </transition>

    <div class="card visa-card-pointer">
      <div class="title">
        <button 
          class="open aria-btn"
          @click="openQuickTip"
          :id="`${visa.slug }-modal-btn`"
          :aria-label="`open ${visa.name } quick tip`"
          :aria-controls="`${visa.slug }-modal`"
          aria-expanded="false">
          <img :src="lightbulb" class="icon">
        </button>

        <h3>{{ visa.name }}</h3>
      </div>
      <div class="body">
        <p>{{ visa.subtitle }}</p>

        <div class="checklist">
          <div
            v-for="item in checklist"
            :key="item.name" 
            class="item"
            :style="item.icon === check ? {opacity: 1} : {opacity: 0.5}">
            <div class="inner">
              <img 
                :src="item.icon"
                :alt="item.alt"
                class="icon">
              <p>{{ item.label }}</p>
            </div>
          </div>
        </div>

        <div v-if="user && favouriteVisa !== 'none'">
          <button
            v-if="favouriteVisa === visa.name"
            @click="makeFavorite"
            class="heart aria-btn"
            aria-label="Favourite this visa"
            disabled>
            <img :src="heart">
          </button>

          <button
            v-else
            :id="`${visa.slug}-fave-btn`"
            @click="makeFavorite"
            class="heart aria-btn"
            aria-label="Favourite this visa"
            aria-expanded="false">
            <img :src="heart">
          </button>

          <transition name="modal" mode="out-in">
            <confirm-favorite 
              v-if="confirmChange"
              :visa="visa"
              :user="user.profile"
              @closeModal="closeModal" />
          </transition>
        </div>

        <router-link
          tag="button"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }"
          :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}"
          class="aria-btn"
          :aria-label="`Tell me more about ${visa.name }`">
          Tell Me More!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import quickTip from '@/components/visa/QuickTip';
import lightbulb from '@/assets/icons/lightbulbs/button-yellow.svg';
import check from '@/assets/icons/pink/check-solid.svg';
import cross from '@/assets/icons/pink/times-solid.svg';
import question from '@/assets/icons/pink/question-solid.svg';
import pinkHeart from '@/assets/icons/pink/heart-solid.svg';
import greyHeart from '@/assets/icons/heart-solid.svg';
import confirmFavorite from '@/components/visa/ConfirmFavorite';
import dots from '@/assets/patterns/dots.svg';

export default {
  props: {
    visa: { required: true, type: Object },
    favouriteVisa: { required:false, type: String }
  },
  components: {
    confirmFavorite,
    quickTip
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      checklist: this.visa.cardChecklist,
      open: false,
      lightbulb,
      dots,
      check,
      cross,
      question,
      favourite: null,
      pinkHeart,
      greyHeart,
      confirmChange: false
    }
  },
  computed: {
    heart() {
      if(this.favouriteVisa === this.visa.name) {
        return this.pinkHeart;
      } else {
        return this.greyHeart;
      }
    }
  },
  methods: {
    getIcon() {
      this.checklist.forEach(item => {
        if(item.state === 'maybe') {
          item.icon = this.question;
          item.alt = 'question mark'
        } else if(item.state === 'true') {
          item.icon = this.check;
          item.alt = 'check'
        } else {
          item.icon = this.cross;
          item.alt = 'cross'
        }
      });
    },
    makeFavorite() {
      if(this.favouriteVisa !== this.visa.name) {
        const overlay = document.querySelector('#overlay');
        overlay.style.opacity = 1;
        overlay.style.visibility = 'visible';
        document.querySelector('body').style.overflow = 'hidden';
        this.favourite = true;
        this.confirmChange = true;

        const button = document.querySelector(`#${this.visa.slug}-fave-btn`);
        button.setAttribute('aria-expanded', 'true');

        const ariaBtns = document.querySelectorAll('.aria-btn');
        this.changeBtnFocus(ariaBtns, '-1');
      }
    },
    openQuickTip() {
      this.open = true;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';

      const button = document.querySelector(`#${this.visa.slug }-modal-btn`);
      button.setAttribute('aria-expanded', 'true');

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '-1');

      const cards = document.querySelectorAll('.visa-card-pointer');
      cards.forEach(card => {
        card.style.pointerEvents = 'none';
      })
    },
    closeQuickTip() {
      this.open = false;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';

      const button = document.querySelector(`#${this.visa.slug }-modal-btn`);
      button.setAttribute('aria-expanded', 'false');

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '0');

      const cards = document.querySelectorAll('.visa-card-pointer');
      cards.forEach(card => {
        card.style.pointerEvents = 'auto';
      })
    },
    closeModal() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.confirmChange = false;

      const button = document.querySelector(`#${this.visa.slug}-fave-btn`);
      button.setAttribute('aria-expanded', 'false');

      const ariaBtns = document.querySelectorAll('.aria-btn');
      this.changeBtnFocus(ariaBtns, '0');
    },
    changeBtnFocus(buttons, focus) {
      buttons.forEach(btn => {
        btn.setAttribute('tabindex', focus);
      })
    }
  },
  mounted() {
    this.$forceUpdate();
    this.getIcon();
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  background: white;
  border: 4px solid $primary-pink;
  color: $primary-pink;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;
  transition: 0.2s;
  z-index: 0;

  .title {
    background: $primary-pink;
    color: white;
    text-align: center;
    padding: $spacing;
    position: relative;

    h3 {
      max-width: 75%;
      margin: auto;
    }

    .open {
      width: 50px;
      height: 50px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: $spacing;
      right: -$spacing*2;
      background: $primary-yellow;
      color: $light-font;

      &:hover {
        background: darken($color: $primary-yellow, $amount: 10%);
      }

      .icon {
        width: 28px;
      }
    }
  }

  .body {
    padding: $spacing*3 $spacing*4;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 500;
    }

    .checklist {
      //width: 100%;
      margin-top: $spacing*4;
      @include grid(repeat(2, 1fr), repeat(3, 1fr), $spacing*2);
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .inner {
        padding: 4px 8px;
        background: $lightest-grey;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 4px;
      }

      p {
        font-size: 15px;
        font-weight: 600;
      }
    }

    .icon {
      width: 14px;
      margin-right: 4px;
    }
  }

  button {
    margin-top: $spacing*4;
  }

  .heart {
    padding: none;
    background: transparent;
    box-shadow: none;
    position: absolute;
    bottom: 0;
    left: 0;

    img {
      width: 34px;
    }
  }

  &:hover {
    transform: scale(1.02);
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
  .card {
    width: 90%;
    margin: auto;

    .body {
      .checklist {
        margin: $spacing*5 auto 0 auto;
        @include grid(repeat(3, 120px), repeat(2, 1fr), $spacing*2);
      }
      
      button {
        margin-top: $spacing*6;
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .card {
    width: 75%;
    margin: auto;
  }
}
</style>
