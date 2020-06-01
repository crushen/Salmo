<template>
  <div class="card">
    <div class="title">
      <h3>Estimated timeline for an external application</h3>
    </div>
    <div class="body">
      <div class="timeline">
        <div class="cards">
          <div 
            v-for="(card, index) in cards"
            :key="index"
            class="item">
            <h4>{{ card.title }}</h4>
            <p>{{ card.text }}</p>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div
          @click="selectedTab = 1"
          :class="{'selected': 1 === selectedTab}"
          class="tab">
          <p>Approved</p>
        </div>
        <div
          @click="selectedTab = 2"
          :class="{'selected': 2 === selectedTab}"
          class="tab">
          <p>Denied</p>
        </div>
      </div>
      <div class="bottom">
        <transition name="slide" mode="out-in">
          <div v-if="selectedTab === 1" key="1">
            <p>Prepare yourself for your new life in the UK!</p>
            <p>Be sure not to arrive before your new visa starts.</p>
            <p>Collect your BRP within 10 days of when you said you would arrive.</p>

            <img src="@/assets/illustrations/profilePages/Application success.svg" alt="">
          </div>

          <div v-else key="2">
            <p>Prepare yourself for your new life in the UK!</p>
            <p>Be sure not to arrive before your new visa starts.</p>
            <p>Collect your BRP within 10 days of when you said you would arrive.</p>

            <img src="@/assets/illustrations/profilePages/Application fail.svg" alt="">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedTab: 1,
      cards: [
        {
          title: '3 months before arrival in UK',
          text: 'Submit application and book Biometric Residency Permit appointment.'
        },
        {
          title: '1 day - 1 week wait',
          text: 'Attend your BRP appointment. Be sure to bring all of your documents!'
        },
        {
          title: '3 - 8 week wait',
          text: "You'll receive a decision via email or text. Select below to see the results of each outcome."
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  background: white;
  border: 4px solid $primary-yellow;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;
  margin-top: $spacing*5;

  .title {
    background: $primary-yellow;
    text-align: center;
    padding: $spacing;

    h3 {
      font-weight: 400;
      max-width: 260px;
      margin: auto;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.timeline {
  padding: $spacing*2 $spacing;
  display: flex;
}

.cards {
  .item {
    background: $background;
    border-radius: 4px;
    padding: 10px $spacing;

    &:not(:first-of-type) {
      margin-top: $spacing*2;
    }
  }

  h4 {
    font-family: $sans-serif;
    font-size: 16px;
    margin-bottom: 5px;
  }
}

.tabs {
  display: flex;
  align-items: flex-end;
  width: 90%;
  height: 55px;
  margin-top: $spacing*2;

  .tab {
    width: 50%;
    height: 80%;
    background: #ffe4b3;
    color: $grey;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    p {
      font-weight: 600;
    }

    &.selected {
      background: $primary-yellow;
      height: 100%;
      z-index: 5;
      color: $dark-font;
    }
  }
}

.bottom {
  width: 100%;
  background: $primary-yellow;
  padding: $spacing*3;

  p:first-of-type {
    font-weight: 600;
  }

  p:not(:first-of-type) {
    margin-top: $spacing*2;
  }

  img {
    display: block;
    height: 150px;
    margin: $spacing*6 auto $spacing*3 auto;
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
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
}
</style>
