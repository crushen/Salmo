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

export default {
  props: {
    visa: { required: true, type: Object },
    favouriteVisa: { required:false, type: String }
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      checklist: this.visa.cardChecklist,
      check,
      cross,
      question,
      favourite: null,
      confirmChange: false
    }
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
    }
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

    &:hover {
      background: white;
      color: $red;
    }
  }
}


@media screen and (min-width: 600px) {
  button {
    align-self: flex-end;
  }
}

@media screen and (min-width: 1200px) {
  .card {
    width: 400px;
    min-height: 325px;
    margin: 0;
  }
}
</style>
