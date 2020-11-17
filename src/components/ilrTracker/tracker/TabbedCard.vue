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
          <!-- Travel Log -->
          <div v-if="selectedTab === 1" key="1">
            <div class="buttons">
              <button
                @click="addHoliday = true"
                class="none">
                <img src="@/assets/icons/red/plus.svg" alt="">
              </button>

              <button
                v-if="user.profile.holiday.length"
                @click="editHolidays = true"
                class="none">
                <img src="@/assets/icons/red/edit.svg" alt="">
              </button>
            </div>

            <transition name="slide" mode="out-in">
              <add-holiday-form
                v-if="addHoliday"
                :profileToUpdate="profileToUpdate"
                @cancel="addHoliday = false" />

              <travel-log
                v-if="!addHoliday && user.profile.holiday.length"
                :user="user"
                :profileToUpdate="profileToUpdate" />
            </transition>
          </div>

          <!-- Visa History -->
          <div v-else key="2">
            <p>Visa History</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import addHolidayForm from '@/components/ilrTracker/tracker/AddHoliday'
import travelLog from '@/components/ilrTracker/tracker/TravelLog'

export default {
  components: { addHolidayForm, travelLog },
  data() {
    return {
      selectedTab: 1,
      addHoliday: false,
      editHolidays: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    profileToUpdate() { 
      return {...this.user.profile} 
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
  padding: 1em;
  background: white;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 1rem;
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
