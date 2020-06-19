<template>
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
      <article class="card" :style="{'background': cardBackground}">
        <div class="inner">
          <section v-for="(page, index) in card.pages" :key="index">
            <transition name="slide" mode="out-in">
              <inner 
                :selectedTab="selectedTab"
                :index="index"
                :sections="page.sections"
                @next="next" />
            </transition>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import inner from '@/components/tabbed-card/Inner';


export default {
  props: {
    card: { required: true, type: Object }
  },
  components: {
    inner
  },
  data() {
    return {
      selectedTab: 1
    }
  },
  computed: {
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
        window.scrollTo(0, 0);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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
    padding: $spacing*3 0 $spacing*4 0;
  }
}

.slide-enter,
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.6s;
}
</style>
