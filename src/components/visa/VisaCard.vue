<template>
  <div>
    <div class="card">
      <div class="title">
        <slot 
          v-if="$slots.quickTip"
          name="quickTip"/>
        <h3>{{ visa.name }}</h3>
      </div>
      <div class="body">
        <p>{{ visa.card.subTitle }}</p>

        <div class="checklist">
          <div class="item">
            <div 
              class="inner"
              :style="this.switch ? {opacity: 1} : {opacity: 0.5}">
              <img :src="this.switch ? check : cross" alt="tick" class="icon">
              <p>Switch</p>
            </div>
          </div>
          <div
            v-for="item in checklist"
            :key="item.name" 
            class="item"
            :style="item.icon === check ? {opacity: 1} : {opacity: 0.5}">
            <div class="inner">
              <img 
                :src="item.icon"
                class="icon">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>

        <router-link
          tag="button"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          Tell Me More!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import check from '@/assets/icons/pink/check-solid.svg';
import cross from '@/assets/icons/pink/times-solid.svg';
import question from '@/assets/icons/pink/question-solid.svg';

export default {
  props: {
    visa: { required: true, type: Object },
    currentVisa: { required: true, type: String },
    switchOptions: { required: true, type: Array }
  },
  data() {
    return {
      checklist: this.visa.card.checklist,
      switch: null,
      check,
      cross,
      question
    }
  },
  methods: {
    getIcon() {
      this.checklist.forEach(item => {
        if(item.status === 'maybe') {
          item.icon = this.question;
        } else if(item.status) {
          item.icon = this.check;
        } else {
          item.icon = this.cross;
        }
      });
    },
    checkSwitch() {
      this.switchOptions.forEach(switchVisa => {
        if(switchVisa === this.visa.name) {
          this.switch = true;
        }
      })
    },
  },
  created() {
    this.getIcon();
    this.checkSwitch();
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
  }

  .body {
    padding: $spacing*2 $spacing*4 $spacing*4;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: 500;
    }

    .checklist {
      width: 100%;
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
    padding: 10px 24px;
    margin-top: $spacing*4;
  }

  .visa-icon {
    width: 32px;
    position: absolute;
    bottom: 6px;
    left: 6px;
  }
}
</style>
