<template>
  <section class="tools-card">
    <div>
      <div class="tabs">
        <button
          @click="selectedTab = 1"
          :class="{'selected': 1 === selectedTab}"
          class="tab"
          :aria-expanded="selectedTab === 1 ? 'true' : 'false'">
          <p>Travel Log</p>
        </button>
        <button
          @click="selectedTab = 2"
          :class="{'selected': 2 === selectedTab}"
          class="tab"
          :aria-expanded="selectedTab === 2 ? 'true' : 'false'">
          <p>Visa History</p>
        </button>
      </div>

      <div class="tab-result">
        <transition name="slide" mode="out-in">
          <div v-if="selectedTab === 1" key="1">
            <p>Travel Log</p>
          </div>

          <div v-else key="2">
            <p>Visa History</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 1,
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';


.tools-card {
  background: #D4E7ED;
}

.tabs {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;

  .tab {
    width: 50%;
    height: 80%;
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
      height: 100%;
      z-index: 5;
      color: $dark-font;
      background: white;
    }
  }
}

.tab-result {
  width: 100%;
  min-height: 180px;
  padding: 2em;
  background: white;

  p {
    margin-top: 1em;
  }

  .title {
    font-weight: 600;
    margin-top: 0;
  }

  .flex {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 2rem;

    .left {
      width: 55%;
    }

    .img {
      width: 40%;
      max-width: 170px;
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
