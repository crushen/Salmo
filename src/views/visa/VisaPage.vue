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
          @click="selectTab(i)"
          :class="{'selected': i === selectedTab}"
          class="tab" />
      </div>
      <div class="outer">
        <div class="card" :style="{'background': card.background}">
          <div class="inner">
            <h2>Why this visa?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      slug: this.$route.params.slug,
      arrow,
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
    }
  },
  methods: {
    selectTab(i) {
      this.selectedTab = i;
      switch(this.selectedTab) {
        case 1:
          this.card.background = '#C93A22';
          break;
        case 2:
          this.card.background = '#E05E48';
          break;
        case 3:
          this.card.background = '#E57967';
          break;
        case 4:
          this.card.background = '#EA9485';
          break;
        case 5:
          this.card.background = '#F0AFA4';
          break;
      }
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
  }

  .tab {
    width: 20%;
    height: 38px;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    position: relative;
    transition: 0.2s; //needs work

    &.selected {
      height: 48px;
      box-shadow: 2px 0px 3px 0px rgba(0,0,0,0.3);
    }

    &:nth-of-type(1) {
      background: #C93A22;
      z-index: 5;
      
    }
    &:nth-of-type(2) {
      background: #E05E48;
      z-index: 4;
    }
    &:nth-of-type(3) {
      background: #E57967;
      z-index: 3;
    }
    &:nth-of-type(4) {
      background: #EA9485;
      z-index: 2;
    }
    &:nth-of-type(5) {
      background: #F0AFA4;
      z-index: 1;
    }
  }

  .outer {
    background: linear-gradient(to right, #C93A22, #F0AFA4 50%);
    border-bottom-right-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
  }

  .card {
    border-radius: $border-radius;
    padding: 4px;
    box-shadow: $shadow;
    position: relative;
    z-index: 6;
  }

  .inner {
    background: white;
    border-radius: $border-radius;
    padding: $spacing*3 $spacing*2;
  }

  h2 {
    color: $primary-pink;
    margin-bottom: $spacing*2;
  }
}
</style>
