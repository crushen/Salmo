<template>
  <div>
    <transition name="dialog" mode="out-in">
      <edit-holiday-modal
        v-if="showHolidayEditModal"
        :holiday="holidayToEdit"
        :profileToUpdate="profileToUpdate"
        @closeModal="showHolidayEditModal = false" />
    </transition>

    <transition name="dialog" mode="out-in">
      <edit-visa-modal
        v-if="showVisaEditModal"
        :visa="visaToEdit"
        :profileToUpdate="profileToUpdate"
        @closeModal="showVisaEditModal = false" />
    </transition>

    <section class="tools-card main">
      <div>
        <div class="tabs">
          <button
            @click="selectTab"
            :class="{'selected': 1 === selectedTab}"
            class="tab"
            :aria-expanded="selectedTab === 1 ? 'true' : 'false'">
            <h2>Travel Log</h2>
          </button>
          <button
            @click="selectTab"
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
                  v-if="user.profile.pastVisas.length"
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
                  :editVisas="editVisas"
                  @editVisa="editVisa" />
              </transition>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <transition name="slide-button" mode="out-in">
      <div v-if="user.profile.holiday.length && selectedTab === 1" class="button-center">
        <button @click="resultsOpen = true" class="primary margin-m top">
          Calculate
        </button>
      </div>
    </transition>

    <transition name="slide-button" mode="out-in">
      <ten-results
        v-if="resultsOpen && user.profile.ilrTracker.plan === '10 year plan'"
        :user="user"
        :validHolidayYears="validHolidayYears" />

      <five-results
        v-if="resultsOpen && user.profile.ilrTracker.plan === '5 year plan'"
        :validHolidayYears="validHolidayYears" />
    </transition>
  </div>
</template>

<script>
import addHolidayForm from '@/components/ilrTracker/tracker/AddHoliday'
import travelLog from '@/components/ilrTracker/tracker/TravelLog'
import visaHistory from '@/components/ilrTracker/tracker/VisaHistory'
import editHolidayModal from '@/components/modals/ilrTracker/red/EditHoliday'
import addVisaForm from '@/components/ilrTracker/tracker/AddVisa'
import editVisaModal from '@/components/modals/ilrTracker/red/EditVisa'
import tenResults from '@/components/ilrTracker/results/TenYearPlan'
import fiveResults from '@/components/ilrTracker/results/FiveYearPlan'


export default {
  components: {
    addHolidayForm,
    travelLog,
    visaHistory,
    editHolidayModal,
    addVisaForm,
    editVisaModal,
    tenResults,
    fiveResults
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
      const array = this.user.profile.holiday.filter(holiday => holiday.leftUk > this.startDate)
      return this.sortIntoYears(array)
    },
    invalidHolidayYears() {
      const array = this.user.profile.holiday.filter(holiday => holiday.returnedUk <= this.startDate);
      let invalidYears =  this.sortIntoYears(array)

      invalidYears.forEach(year => year.invalid = true)
      return invalidYears
    },
    allHolidayYears() {
      return this.invalidHolidayYears.concat(this.validHolidayYears)
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
    getSplitYearHolidayDays(holiday, year) {
      const totalDays = holiday.days,
            dt1 = new Date(holiday.leftUk),
            dt2 = new Date(year.endDate),
            currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
            nextYearDays = totalDays - currentYearDays;

      return { currentYearDays: currentYearDays, nextYearDays: nextYearDays }
    },
    sortIntoYears(array) {
      const ascendingDates = array.sort((a, b) => new Date(a.leftUk) - new Date(b.leftUk)),
            years = [];

      while(ascendingDates.length) {
        // get holiday from start of array
        const holiday = ascendingDates.shift(),
              holidayStart = new Date(holiday.leftUk),
              holidayEnd = new Date(holiday.returnedUk),
              yearStart = new Date(`${new Date(holiday.leftUk).getFullYear()}, 01, 01`),
              yearEnd = new Date(new Date(yearStart).setFullYear(new Date(yearStart).getFullYear() + 1));
              // yearStart = new Date(holiday.leftUk),
              // yearEnd = new Date(new Date(holiday.leftUk).setFullYear(new Date(holiday.leftUk).getFullYear() + 1));

        // create first holiday obj if years array is empty
        if(!years.length) {
          years.push({
            startDate: yearStart,
            endDate: yearEnd,
            holidays: [holiday]
          })
        } else {
          const prevYear = years[years.length - 1]

          // IF HOLIDAY STARTED AND ENDED WITHIN THE YEAR
          if(holidayStart > prevYear.startDate && holidayStart < prevYear.endDate) {
            if(holidayStart > prevYear.startDate && holidayEnd < prevYear.endDate) {
              prevYear.holidays.push(holiday)
              // IF HOLIDAY IS SPLIT OVER 2 YEARS
            } else {
              // get start and end date for following year & push to years
              const splitHolidayDates = this.getSplitYearHolidayDays(holiday, prevYear),
                    nextYearStart = yearEnd,
                    nextYearEnd = new Date(new Date(yearEnd).setFullYear(new Date(yearEnd).getFullYear() + 1));
                    // nextYearStart = new Date(holidayStart.setDate(holidayStart.getDate() + splitHolidayDates.currentYearDays)),
                    // nextYearEnd = new Date(yearEnd.setDate(yearEnd.getDate() + splitHolidayDates.currentYearDays));

              years.push({
                startDate: nextYearStart,
                endDate: nextYearEnd,
                holidays: []
              })

              // get last two years and push split holidays
              const last = years[years.length - 1],
                    secondToLast = years[years.length - 2],
                    // get split holiday dates for second to last year
                    splitHolidayDates_2 = this.getSplitYearHolidayDays(holiday, secondToLast);

              // add holidays to relative years & balance out flight days
              last.holidays.push({...holiday, days: splitHolidayDates_2.nextYearDays + 1})
              secondToLast.holidays.push({...holiday, days: splitHolidayDates_2.currentYearDays - 1})
            }
            // IF HOLIDAY DIDN'T START AND END IN THE YEAR
          } else {
            // add new year
            years.push({
              startDate: yearStart,
              endDate: yearEnd,
              holidays: [holiday]
            })
          }
        }
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
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
  transition: 0.6s;
}

.slide-button-enter,
.slide-button-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-button-enter-active,
.slide-button-leave-active {
  transition: 0.6s;
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
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
