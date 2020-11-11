<template>
  <section class="tools-card empty">
    <h2>Estimated Timeline</h2>

    <div v-if="user.profile.nextVisa.name">
      <div class="inner-scroll margin-m top bottom">
        <div 
          v-for="(item, index) in applicationTimeline"
          :key="index"
          class="timeline-item">
          <p v-if="item.time.includes('before')"><b>{{ item.time }} {{ date(user.profile.currentVisa.end) }}</b></p>
          <p v-else><b>{{ item.time }}</b></p>

          <p>{{ item.label }}</p>
        </div>
      </div>

      <div class="tabs">
        <button
          @click="selectedTab = 1"
          :class="{'selected': 1 === selectedTab}"
          class="tab aria-btn"
          aria-label="Show information on approved visas"
          :aria-expanded="selectedTab === 1 ? 'true' : 'false'">
          <p>Approved</p>
        </button>
        <button
          @click="selectedTab = 2"
          :class="{'selected': 2 === selectedTab}"
          class="tab aria-btn"
          aria-label="Show information on denied visas"
          :aria-expanded="selectedTab === 2 ? 'true' : 'false'">
          <p>Denied</p>
        </button>
      </div>
      <div class="tab-result">
        <transition name="slide" mode="out-in">
          <div v-if="selectedTab === 1" key="1">
            <p class="title">Prepare yourself for your new life in the UK!</p>
            
            <div class="flex">
              <div class="left">
                <p>Be sure not to arrive before your new visa starts.</p>
                <p>Collect your BRP within 10 days of when you said you would arrive.</p>
              </div>

              <div class="img">
                <img src="@/assets/illustrations/application-timeline/success.svg" alt="">
              </div>
            </div>
          </div>

          <div v-else key="2">
            <p class="title">Don’t give up, you're not out of options!</p>
            
            <div class="flex">
              <div class="left">
                <p>It can be really tough to have your visa denied, but you’re not out of options yet.</p>
                <p>If you feel as though you were misjudged, you can ask for a review.</p>
              </div>

              <div class="img">
                <img src="@/assets/illustrations/application-timeline/fail.svg" alt="">
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { applicationTimelines } from '@/assets/js/applicationTimelines'

export default {
  props: {
    user: { type: Object, required: true }
  },
  data() {
    return {
      selectedTab: 1,
    }
  },
  computed: {
    applicationTimeline() {
      return applicationTimelines.find(timeline => timeline.visa === this.user.profile.nextVisa.name).timeline
    }
  },
  methods: {
    date(date) {
      return date.split('-').reverse().join('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

b {
  font-weight: 500;
}

.inner-scroll {
  width: 80%;
  height: 200px;
  overflow-y: scroll;
  margin: auto;

  &::-webkit-scrollbar {
    width: 10px;
    background: $grey;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $dark-yellow;
    border-radius: 10px;
  }
}

.timeline-item {
  margin: 2em 1em 2em 0;

  &:first-of-type {
    margin: 0 1em 2em 0;
  }
}

.tabs {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;

  .tab {
    width: 50%;
    height: 80%;
    background: $dark-yellow;
    border-radius: 0;
    box-shadow: none;
    border-top-right-radius: $radius;
    border-top-left-radius: $radius;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    overflow: hidden;

    p {
      font-weight: 500;
    }

    &.selected {
      background: $med-yellow;
      height: 100%;
      z-index: 5;
      color: $dark-font;
    }
  }
}

.tab-result {
  width: 100%;
  min-height: 340px;
  background: $med-yellow;
  padding: 2em;

  p {
    margin-top: 1em;
  }

  .title {
    font-weight: 600;
    margin-top: 0;
  }

  .flex {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .left {
      width: 55%;
    }

    .img {
      width: 40%;
    }
  }
}

.slide-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-enter-active {
  transition: 0.6s;
}

// Tablet
@media screen and (min-width: 600px) {
  .card {
    margin-top: 0;
  }
}
</style>
