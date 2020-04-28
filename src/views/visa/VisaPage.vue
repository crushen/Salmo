<template>
  <section class="content">
    <router-link :to="{ name: 'non-eu-category', params: { category: visa.category } }">
      <img :src="arrow" class="arrow">
    </router-link>

    <h1>{{ visa.name }}</h1>

    <div class="container">
      <div class="tabs">
        <div 
          v-for="i in 5"
          :key="i"
          @click="selectedTab = i"
          :class="{'selected': i === selectedTab}"
          class="tab" />
      </div>
      <div class="outer">
        <div class="card" :style="{'background': cardBackground}">
          <div class="inner">
            <h2>Why this visa?</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?</p>
            <div class="tip">
              <img 
                v-for="i in 4"
                :key="i"
                :src="lightbulb">
              <p><span>Remember!</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.</p>
            </div>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?</p>
            <!-- Need to make this into forward and back arrows instead of text -->
            <div 
              @click="next"
              class="next-button"
              :class="selectedTab === 5 ? 'disabled' : ''">
             <p>Next Section</p>
             <span>&#8227;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import lightbulb from '@/assets/icons/white/lightbulb-solid.svg';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      slug: this.$route.params.slug,
      arrow,
      lightbulb,
      selectedTab: 1,
      card: {
        background: '#C93A22'
      }
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visa() {
      return this.visaList.find(item => item.slug === this.slug);
    },
    cardBackground() {
      let colour;
      switch(this.selectedTab) {
        case 1:
          colour = '#C93A22';
          break;
        case 2:
          colour = '#E05E48';
          break;
        case 3:
          colour = '#E57967';
          break;
        case 4:
          colour = '#EA9485';
          break;
        case 5:
          colour = '#F0AFA4';
          break;
      }
      return colour;
    }
  },
  methods: {
    next() {
      if(this.selectedTab < 5) {
        this.selectedTab++;
      }
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*10 0 $spacing*6;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

h1 {
  margin-bottom: $spacing*4;
}

.container {
  .tabs {
    display: flex;
    align-items: flex-end;
    height: 48px;
  }

  .tab {
    width: 20%;
    height: 80%;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    position: relative;
    transition: 0.2s;

    &.selected {
      height: 100%;
      box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
      z-index: 5;
    }

    &:nth-of-type(1) {
      background: #C93A22;

      &.selected {
        box-shadow: 1px 0px 2px 0px rgba(0,0,0,0.2);
      }
    }

    &:nth-of-type(2) {
      background: #E05E48;
    }

    &:nth-of-type(3) {
      background: #E57967;
    }

    &:nth-of-type(4) {
      background: #EA9485;
    }

    &:nth-of-type(5) {
      background: #F0AFA4;

      &.selected {
        box-shadow: -1px 0px 2px 0px rgba(0,0,0,0.2);
      }
    }
  }

  .outer {
    background: linear-gradient(to right, #C93A22, #F0AFA4 50%);
    border-bottom-right-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
    box-shadow: $shadow;
    position: relative;
    z-index: 6;
  }

  .card {
    border-radius: $border-radius;
    padding: 5px;
    position: relative;
    z-index: 7;
    transition: 0.2s;
  }

  .inner {
    background: white;
    border-radius: $border-radius;
    padding: $spacing*3 0;
  }

  h2 {
    color: $primary-pink;
    padding: 0 $spacing*2;
  }

  p {
    padding: 0 $spacing*2;
  }

  .text {
    margin: $spacing*2 0;
  }

  .tip {
    background: $primary-yellow;
    padding: $spacing*2 0;
    position: relative;

    p {
      position: relative;
      z-index: 2;
    }

    span {
      font-weight: 600;
    }

    img {
      width: 24px;
      position: absolute;
      z-index: 0;
      opacity: 0.3;

      &:nth-of-type(1) {
        top: 8px;
        left: 8px;
      }

      &:nth-of-type(2) {
        top: 8px;
        right: 8px;
      }

      &:nth-of-type(3) {
        bottom: 8px;
        left: 8px;
      }

      &:nth-of-type(4) {
        bottom: 8px;
        right: 8px;
      }
    }
  }

  .next-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: $spacing*4 $spacing*2 0;
    transition: 0.2s;

    p {
      text-decoration: underline;
      font-weight: 600;
      padding: 0;
    }

    span {
      font-size: 55px;
      line-height: 0;
      padding: 0 0 6px 6px;
    }

    &.disabled {
      color: $light-grey;
    }
  }
}
</style>
