<template>
  <div>
    <transition name="dialog" mode="out-in">
      <edit-holiday-modal
        v-if="showHolidayEditModal"
        :holidayToEdit="holidayToEdit"
        :profileToUpdate="profileToUpdate"
        @closeModal="showHolidayEditModal = false, editHolidays = false" />
    </transition>

    <transition name="dialog" mode="out-in">
      <edit-visa-modal
        v-if="showVisaEditModal"
        :visaToEdit="visaToEdit"
        :profileToUpdate="profileToUpdate"
        @closeModal="showVisaEditModal = false, editVisas = false" />
    </transition>

    <section class="tools-card main">
      <div>
        <div class="tabs">
          <button
            @click="selectTab"
            :class="{'selected': 1 === selectedTab}"
            class="tab"
            aria-label="open travel log">
            <h2>Travel Log</h2>
          </button>
          <button
            @click="selectTab"
            :class="{'selected': 2 === selectedTab}"
            class="tab"
            aria-label="open visa history">
            <h2>Visa History</h2>
          </button>
        </div>

        <div :class="{'no-min-height': resultsOpen}" class="tab-result">
          <div v-if="!resultsOpen">
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
                    :allHolidayYears="allHolidayYears"
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
                    @click="editVisas = !editVisas"
                    class="none"
                    aria-label="Toggle visa editor">
                    <img v-if="!editVisas" src="@/assets/icons/red/edit.svg" alt="">
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
                    :profileToUpdate="profileToUpdate"
                    :sortByDate="sortByDateVisas"
                    :editVisas="editVisas"
                    @editVisa="editVisa" />
                </transition>
              </div>
            </transition>
          </div>

          <div class="button-center">
            <button
              v-if="resultsOpen"
              @click="resultsOpen = false"
              class="none line-button"
              aria-label="close results and open travel log / visa history">
              <div class="line"></div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- <transition name="slide-button" mode="out-in"> -->
      <div v-if="user.profile.holiday.length && !resultsOpen" class="button-center">
        <button
          @click="resultsOpen = true"
          class="primary margin-m top"
          aria-label="calculate results">
          Calculate
        </button>
      </div>
    <!-- </transition> -->

    <transition name="slide-button" mode="out-in">
      <results
        v-if="resultsOpen"
        :user="user"
        :validHolidayYears="validHolidayYears"
        :sortByDateVisas="sortByDateVisas" />
    </transition>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import addHolidayForm from '@/components/ilrTracker/tracker/AddHoliday'
import travelLog from '@/components/ilrTracker/tracker/TravelLog'
import visaHistory from '@/components/ilrTracker/tracker/VisaHistory'
import editHolidayModal from '@/components/modals/ilrTracker/red/EditHoliday'
import addVisaForm from '@/components/ilrTracker/tracker/AddVisa'
import editVisaModal from '@/components/modals/ilrTracker/red/EditVisa'
import results from '@/components/ilrTracker/results/Results'


export default {
  components: {
    addHolidayForm,
    travelLog,
    visaHistory,
    editHolidayModal,
    addVisaForm,
    editVisaModal,
    results
  },
  data() {
    return {
      selectedTab: 1,
      addHoliday: false,
      editHolidays: false,
      holidayToEdit: {},
      showHolidayEditModal: false,
      addVisa: false,
      editVisas: false,
      visaToEdit: {},
      showVisaEditModal: false,
      resultsOpen: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    profileToUpdate() { 
      return {...this.user.profile} 
    },
    startDate() {
      return this.user.profile.ilrTracker.startDate
    },
    validHolidayYears() {
      const array = cloneDeep(this.user.profile.holiday).filter(holiday => holiday.leftUk > this.startDate)
      return this.sortIntoYears(array)
    },
    invalidHolidayYears() {
      const array = cloneDeep(this.user.profile.holiday).filter(holiday => holiday.returnedUk <= this.startDate)
      let invalidYears =  this.sortIntoYears(array)

      invalidYears.forEach(year => year.invalid = true)
      return invalidYears
    },
    allHolidayYears() {
      let years = []

      if(this.invalidHolidayYears.length) {
        years = cloneDeep(this.invalidHolidayYears).concat(this.validHolidayYears)
        years.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      } else {
        years = cloneDeep(this.validHolidayYears)
        years.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      }
      
      return years
    },
    sortByDateVisas() {
      let visas = []

      if(this.user.profile.pastVisas.length) {
        visas = cloneDeep(this.user.profile.pastVisas)
        visas.sort((a, b) => new Date(a.start) - new Date(b.start))
      }
      
      return visas
    }
  },
  methods: {
    selectTab() {
      this.selectedTab === 1 ? this.selectedTab = 2 : this.selectedTab = 1

      this.editHolidays = false
      this.editVisas = false
    },
    editHoliday(holiday) {
      this.holidayToEdit = holiday
      this.showHolidayEditModal = true
    },
    editVisa(visa) {
      this.visaToEdit = visa
      this.showVisaEditModal = true
    },
    sortIntoYears(array) {
      const ascendingDates = cloneDeep(array).sort((a, b) => new Date(a.leftUk) - new Date(b.leftUk)),
            years = [];

      while(ascendingDates.length) {
        // get holiday from start of array
        const holiday = ascendingDates.shift(),
              holidayStart = new Date(holiday.leftUk),
              holidayEnd = new Date(holiday.returnedUk),
              yearStart = new Date(`${new Date(holiday.leftUk).getFullYear()}, 01, 01`),
              yearEnd = new Date(new Date(yearStart).setFullYear(new Date(yearStart).getFullYear() + 1));

        this.sortYearsArray(years, holiday, holidayStart, holidayEnd, yearStart, yearEnd)
      }

      return years
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.tools-card.main {
  background: #D4E7ED;
  max-width: 520px;

  .line-button {
    width: 60%;
    height: 40px;
    margin-top: 1rem;

    .line {
      width: 100%;
      height: 4px;
      background: $med-blue;
      border-radius: $radius;
    }
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

  &.no-min-height {
    min-height: 0;
    padding: 0 1em;
  }
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 1rem;
  }
}

.slide-enter,
.slide-leave-to,
.slide-button-enter,
.slide-button-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-enter-active,
.slide-button-enter-active,
.slide-button-leave-active {
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
  transition: 0.6s;
}

.slide-button-enter-active {
  transition-delay: 0.7s;
}

// Tablet
@media screen and (min-width: 700px) {
  .tab-result {
    padding: 2em;
  }
}
</style>
