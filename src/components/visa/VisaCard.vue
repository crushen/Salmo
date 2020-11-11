<template>
  <div class="card">
    <p class="title">{{ visa.name }}</p>

    <div class="body margin-s top">
      <p class="sub-title">{{ visa.subtitle }}</p>

      <div class="checklist">
        <div
          v-for="item in checklist"
          :key="item.name" 
          class="item"
          :style="item.icon === check ? {opacity: 1} : {opacity: 0.5}">
          <div class="checklist-inner">
            <img 
              :src="item.icon"
              :alt="item.alt"
              class="icon">
            <p>{{ item.label }}</p>
          </div>
        </div>
      </div>

      <!-- <div v-if="user && favouriteVisa !== 'none'">
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
      </div> -->

      <router-link
        tag="button"
        :to="{ name: 'visa-page', params: { slug: visa.slug } }"
        class="primary margin-s top aria-btn"
        :aria-label="`Tell me more about ${visa.name }`">
        Tell Me More!
      </router-link>
    </div>
  </div>
</template>

<script>
import check from '@/assets/icons/white/check.svg'
import cross from '@/assets/icons/white/cross.svg'
import question from '@/assets/icons/white/question.svg'
// import pinkHeart from '@/assets/icons/pink/heart-solid.svg'
// import greyHeart from '@/assets/icons/heart-solid.svg'
//import confirmFavorite from '@/components/visa/ConfirmFavorite'

export default {
  props: {
    visa: { required: true, type: Object },
    favouriteVisa: { required:false, type: String }
  },
  components: { 
    //confirmFavorite
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      checklist: this.visa.cardChecklist,
      check,
      cross,
      question,
      favourite: null,
      // pinkHeart,
      // greyHeart,
      confirmChange: false
    }
  },
  computed: {
    // heart() {
    //   if(this.favouriteVisa === this.visa.name) {
    //     return this.pinkHeart
    //   } else {
    //     return this.greyHeart
    //   }
    // }
  },
  methods: {
    getIcon() {
      this.checklist.forEach(item => {
        if(item.state === 'maybe') {
          item.icon = this.question
          item.alt = 'question mark'
        } else if(item.state === 'true') {
          item.icon = this.check
          item.alt = 'check'
        } else {
          item.icon = this.cross
          item.alt = 'cross'
        }
      })
    },
    // makeFavorite() {
    //   if(this.favouriteVisa !== this.visa.name) {
    //     this.favourite = true
    //     this.confirmChange = true

    //     // const button = document.querySelector(`#${this.visa.slug}-fave-btn`);
    //     // button.setAttribute('aria-expanded', 'true');

    //     // const ariaBtns = document.querySelectorAll('.aria-btn');
    //     // this.changeBtnFocus(ariaBtns, '-1');

    //     // const cards = document.querySelectorAll('.visa-card-pointer');
    //     // cards.forEach(card => {
    //     //   card.style.pointerEvents = 'none';
    //     // })
    //   }
    // }
    // changeBtnFocus(buttons, focus) {
    //   buttons.forEach(btn => {
    //     btn.setAttribute('tabindex', focus);
    //   })
    // }
  },
  mounted() {
    this.$forceUpdate()
    this.getIcon()
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  max-width: 450px;
  margin: auto;
  background: $red;
  border-radius: $radius;
  box-shadow: $shadow;
  position: relative;
  padding: 1em 2em;

  p {
    color: $light-font;
    
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;

    .sub-title {
      align-self: flex-start;
    }

    .checklist {
      width: 100%;
      margin-top: 1rem;
      @include grid(repeat(2, 1fr), repeat(3, 1fr), 0.5em);
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .checklist-inner {
        padding: 4px 8px;
        background: lighten($color: $red, $amount: 15%);
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
    border: 2px solid white;
  }

  // .heart {
  //   padding: none;
  //   background: transparent;
  //   box-shadow: none;
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;

  //   img {
  //     width: 34px;
  //   }
  // }
}


@media screen and (min-width: 600px) {
  button {
    align-self: flex-end;
  }
}
</style>
