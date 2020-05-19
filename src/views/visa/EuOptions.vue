<template>
  <section class="content">
    <h1>Options for EU individulas.</h1>

    <div class="container">
      <div class="tabs">
        <div 
          @click="selectedTab = 1"
          :class="{'selected': 1 === selectedTab}"
          class="tab">
          <p>Settled</p>
        </div>
        <div 
          @click="selectedTab = 2"
          :class="{'selected': 2 === selectedTab}"
          class="tab">
          <p>Pre-Settled</p>
        </div>
      </div>
      <div class="outer">
        <div class="card" :style="{'background': cardBackground}">
          <div class="inner">

            <transition name="fade" mode="out-in">
              <div v-if="selectedTab === 1" key="1">
                <h2>What is settled status?</h2>
                <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati tempore quia eveniet, dicta vel rem natus quo ducimus suscipit accusamus debitis harum dolorem maiores, odio nostrum laborum fugiat, vitae commodi.</p>
                <p class="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam officia quis, maiores minus veritatis officiis autem nesciunt.</p>

                <div class="bottom">
                  <div class="tip">
                    <img 
                      v-for="i in 4"
                      :key="i"
                      :src="lightbulb">
                    <p><span>Remember!</span> The deadline for all EU Settlement applications is 30th June 2021.</p>
                  </div>
                  
                  <div @click="next" class="next-button">
                    <p>Pre-Settled Status</p>
                    <span>&#8227;</span>
                  </div>
                </div>
              </div>

              <div v-if="selectedTab === 2" key="2">
                <h2>What is pre-settled status?</h2>
                <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati tempore quia eveniet, dicta vel rem natus quo ducimus suscipit accusamus debitis harum dolorem maiores, odio nostrum laborum fugiat, vitae commodi.</p>
                <p class="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam officia quis, maiores minus veritatis officiis autem nesciunt.</p>

                <div class="bottom">
                  <div class="tip">
                    <img 
                      v-for="i in 4"
                      :key="i"
                      :src="lightbulb">
                    <p><span>Remember!</span> The deadline for all EU Settlement applications is 30th June 2021.</p>
                  </div>
                  
                  <div @click="next" class="prev-button">
                    <span>&#8227;</span>
                    <p>Settled Status</p>
                  </div>
                </div>
              </div> 
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import lightbulb from '@/assets/icons/white/lightbulb-solid.svg';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      lightbulb,
      selectedTab: 1,
      card: {
        background: '#C93A22'
      }
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
      }
      return colour;
    }
  },
  methods: {
    next(event) {
      if(event.target.textContent === 'Pre-Settled Status') {
        this.selectedTab++;
      } else {
        this.selectedTab--;
      }
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s;
}

.content {
  padding: $spacing*12 0 $spacing*10;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

h1 {
  margin-bottom: $spacing*5;
}

.container {
  .tabs {
    display: flex;
    align-items: flex-end;
    height: 48px;
  }

  .tab {
    width: 50%;
    height: 80%;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    position: relative;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: $light-font;
      font-weight: 600;
    }

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
  }

  .outer {
    background: linear-gradient(to right, #C93A22, #E05E48 50%);
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
    min-height: 550px;
    background: white;
    border-radius: $border-radius;
    padding: $spacing*3 0;
    position: relative;
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

  .bottom {
    position: absolute;
    left: 0;
    bottom: 20px;
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

  .next-button,
  .prev-button {
    display: flex;
    align-items: center;
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

  .next-button {
    justify-content: flex-end;
  }

  .prev-button {
    justify-content: flex-start;

    span {
      transform: rotate(180deg);
    }
  }
}
</style>
