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
        <p class="emphasis">{{ visa.card.subTitle }}</p>

        <div class="checklist">
          <div class="item">
            <!-- Need to do switch logic -->
            <img :src="check" alt="tick" class="icon">
            <p class="label">Switch</p>
          </div>
          <div
            v-for="item in checklist"
            :key="item.name" 
            class="item">
            <img 
              :src="item.icon"
              class="icon">
            <p class="label">{{ item.name }}</p>
          </div>
        </div>

        <router-link
          tag="button"
          :to="{ name: 'visa-page', params: { slug: visa.slug } }">
          More...
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import check from '@/assets/check-solid.svg';
import cross from '@/assets/times-solid.svg';
import question from '@/assets/question-solid.svg';

export default {
  props: {
    visa: { required: true, type: Object }
  },
  data() {
    return {
      checklist: this.visa.card.checklist,
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
    }
  },
  created() {
    this.getIcon();
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  background: $dark-grey;
  color: $light-font;
  border-radius: $border-radius;
  position: relative;

  .title {
    background: $grey;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    text-align: center;
    padding: $spacing;
  }

  .body {
    padding: $spacing*2 $spacing*3;
    display: flex;
    flex-direction: column;
    align-items: center;

    .checklist {
      width: 100%;
      margin-top: $spacing*4;
      @include grid(repeat(2, 1fr), repeat(3, 1fr), $spacing*2);
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .icon {
      width: 20px;
      margin-right: $spacing;
    }
  }

  button {
    padding: 10px 24px;
    margin-top: $spacing*3;
    background: $light-font;
    color: $dark-font;
  }
}
</style>
