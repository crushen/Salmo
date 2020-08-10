<template>
  <div class="card">
    <div class="title">
      <slot 
        v-if="$slots.quickTip"
        name="quickTip"/>
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
              class="icon">
            <p>{{ item.label }}</p>
          </div>
        </div>
      </div>

      <router-link
        tag="button"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }"
        :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}">
        Tell Me More!
      </router-link>

      <div v-if="user && favouriteVisa !== 'none'">
        <img 
          @click="makeFavorite"
          :src="heart" 
          class="heart">

        <transition name="modal" mode="out-in">
          <confirm-favorite 
            v-if="confirmChange"
            :visa="visa"
            :user="user.profile"
            @closeModal="closeModal" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
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
    confirmFavorite
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      checklist: this.visa.cardChecklist,
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
        } else if(item.state === 'true') {
          item.icon = this.check;
        } else {
          item.icon = this.cross;
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
      }
    },
    closeModal() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
      this.confirmChange = false;
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

  .title {
    background: $primary-pink;
    color: white;
    text-align: center;
    padding: $spacing;

    h3 {
      max-width: 75%;
      margin: auto;
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
    width: 34px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
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
