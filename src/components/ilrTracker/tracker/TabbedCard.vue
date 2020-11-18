<template>
  <div>
    <transition name="dialog" mode="out-in">
      <edit-holiday-modal
        v-if="showEditModal"
        :holiday="holidayToEdit"
        :profileToUpdate="profileToUpdate"
        @closeModal="showEditModal = false" />
    </transition>

    <section class="tools-card">
      <div>
        <div class="tabs">
          <button
            @click="selectedTab = 1"
            :class="{'selected': 1 === selectedTab}"
            class="tab"
            :aria-expanded="selectedTab === 1 ? 'true' : 'false'">
            <h2>Travel Log</h2>
          </button>
          <button
            @click="selectedTab = 2"
            :class="{'selected': 2 === selectedTab}"
            class="tab"
            :aria-expanded="selectedTab === 2 ? 'true' : 'false'">
            <h2>Visa History</h2>
          </button>
        </div>

        <div class="tab-result">
          <transition name="slide" mode="out-in">
            <!-- Travel Log -->
            <div v-if="selectedTab === 1" key="1">
              <div class="buttons">
                <button
                  @click="addHoliday = true"
                  class="none"
                  aria-label="Add holiday">
                  <img src="@/assets/icons/red/plus.svg" alt="">
                </button>

                <button
                  v-if="user.profile.holiday.length"
                  @click="editHolidays = !editHolidays"
                  class="none"
                  aria-label="Toggle holiday editor">
                  <img v-if="!editHolidays" src="@/assets/icons/red/edit.svg" alt="">
                  <img v-else src="@/assets/icons/red/edit-solid.svg" alt="">
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
                  :profileToUpdate="profileToUpdate"
                  :editHolidays="editHolidays"
                  @editHoliday="editHoliday" />
              </transition>
            </div>

            <!-- Visa History -->
            <div v-else key="2">
              <div class="buttons">
                <button
                  @click="addVisa = true"
                  class="none"
                  aria-label="Add past visa">
                  <img src="@/assets/icons/red/plus.svg" alt="">
                </button>

                <button
                  v-if="user.profile.holiday.length"
                  @click="editVisas = !editVisas"
                  class="none"
                  aria-label="Toggle visa editor">
                  <img v-if="!editHolidays" src="@/assets/icons/red/edit.svg" alt="">
                  <img v-else src="@/assets/icons/red/edit-solid.svg" alt="">
                </button>
              </div>

              <transition name="slide" mode="out-in">
                <add-visa-form
                  v-if="addVisa"
                  :profileToUpdate="profileToUpdate"
                  @cancel="addVisa = false" />

                <visa-history
                  v-else
                  :user="user"
                  :profileToUpdate="profileToUpdate" />
              </transition>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import addHolidayForm from '@/components/ilrTracker/tracker/AddHoliday'
import travelLog from '@/components/ilrTracker/tracker/TravelLog'
import visaHistory from '@/components/ilrTracker/tracker/VisaHistory'
import editHolidayModal from '@/components/modals/ilrTracker/red/EditHoliday'
import addVisaForm from '@/components/ilrTracker/tracker/AddVisa'


export default {
  components: { addHolidayForm, travelLog, visaHistory, editHolidayModal, addVisaForm },
  data() {
    return {
      selectedTab: 1,
      addHoliday: false,
      editHolidays: false,
      holidayToEdit: {},
      showEditModal: false,
      addVisa: false,
      editVisas: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    editHoliday(holiday) {
      this.holidayToEdit = holiday
      this.showEditModal = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';


.tools-card {
  background: #D4E7ED;
  max-width: 520px;
}

.tabs {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;

  .tab {
    width: 50%;
    height: 80%;
    padding: 0.5rem 0;
    border-radius: 0;
    box-shadow: none;
    border-top-right-radius: $radius;
    border-top-left-radius: $radius;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    overflow: hidden;

    h2 {
      margin: 0;
      font-size: 16px;
      transition: 0.2s;
    }

    &.selected {
      height: 100%;
      z-index: 5;
      color: $dark-font;
      background: white;

      h2 {
        font-size: 18px;
      }
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
@media screen and (min-width: 700px) {
  .tab-result {
    padding: 2em;
  }
}
</style>
