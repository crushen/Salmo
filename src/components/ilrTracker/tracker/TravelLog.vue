<template>
  <div>
    <ul class="travel-log margin-s top">
      <li
        v-for="(year, yearIndex) in allHolidayYears"
        :key="yearIndex"
        @click="toggleYear(yearIndex)"
        :class="{
          'invalid': year.invalid,
          'selected': selected === yearIndex,
          'editing': editHolidays
        }"
        aria-label="Expand year to see holidays"
        class="year">
        <p v-if="selected !== yearIndex" class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>
        <div v-else>
          <p class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>

          <ul class="holiday-list">
            <li
              v-for="(holiday) in year.holidays"
              :key="holiday.leftUk"
              class="holiday"
              @click="handleEditHoliday(holiday)">
              <p class="location"><b>{{ holiday.country }}</b></p>

              <p class="dates">from {{ date(holiday.leftUk) }} to {{ date(holiday.returnedUk) }}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true },
    editHolidays: { type: Boolean, required: true }
  },
  data() {
    return {
      selected: null
    }
  },
  computed: {
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
    toggleYear(index) {
      if(!this.editHolidays) {
        this.selected === index ? this.selected = null : this.selected = index
      } else {
        if(this.selected !== index) {
          this.selected = index
        }
      }
    },
    handleEditHoliday(holiday) {
      if(this.editHolidays) {
        this.$emit('editHoliday', holiday)
      }
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
              yearStart = new Date(holiday.leftUk),
              yearEnd = new Date(new Date(holiday.leftUk).setFullYear(new Date(holiday.leftUk).getFullYear() + 1));

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
                    nextYearStart = new Date(holidayStart.setDate(holidayStart.getDate() + splitHolidayDates.currentYearDays)),
                    nextYearEnd = new Date(yearEnd.setDate(yearEnd.getDate() + splitHolidayDates.currentYearDays));

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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.travel-log {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .year {
    width: 48%;
    background: #D4E7ED;
    margin-top: 0.5rem;
    border: 4px solid #D4E7ED;
    border-radius: $radius;
    padding: 0.2rem 1rem;
    text-align: center;

    b {
      font-weight: 500;
    }

    .year-text {
      font-size: 18px;
      padding: 0 0.5rem;
    }

    .holiday-list {
      margin-top: 0.5rem;
    }

    .holiday {
      display: flex;
      justify-content: space-between;
      border-radius: $radius;
      padding: 0.2rem 0.5rem;
    }

    &:nth-of-type(odd) {
      background: white;
    }

    &.editing {
      border: 4px solid $red;
      background: white;

      p, h2 {
        color: $red;
      }

      .holiday {
        transition: 0.2s;

        &:hover {
          background: $red;

          p, h2 {
            color: $light-font;
          }
        }
      }
    }

    &.invalid {
      background: $med-grey;
      border: 4px solid $med-grey;
      text-decoration: line-through;

      &.editing {
        text-decoration-color: #979797;
        border: 4px solid #979797;
        background: white;

        p, h2 {
          color:  #979797;
        }

        .holiday {
          transition: 0.2s;

          &:hover {
            background:  #979797;
          }
        }
      }
    }

    &.selected {
      width: 100%;
      text-align: left;
    }
  }
}
</style>
