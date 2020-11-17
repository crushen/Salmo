<template>
  <div>
    <ul class="travel-log margin-s top">
      <li
        v-for="(year, index) in allHolidayYears"
        :key="index"
        :class="{ 'invalid': year.invalid, 'selected': selected === index }"
        @click="selected === index ? selected = null : selected = index"
        aria-label="Expand year to see holidays"
        class="year">
        <p v-if="selected !== index" class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>
        <div v-else>
          <p class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>

          <ul class="holiday-list">
            <li
              v-for="holiday in year.holidays"
              :key="holiday.leftUk"
              class="holiday">
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
    profileToUpdate: { type: Object, required: true }
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
    date(date) {
      const newDate = date.split('-')
      return newDate.reverse().join('/')
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

              // add holidays to relative years with correct days
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

    &:nth-of-type(odd) {
      background: white;
    }

    &.invalid {
      background: $med-grey;
      border: 4px solid $med-grey;
      text-decoration: line-through;
    }

    &.selected {
      width: 100%;
      text-align: left;
    }

    .year-text {
      font-size: 18px;
    }

    .holiday-list {
      margin-top: 0.5rem;
    }

    .holiday {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
