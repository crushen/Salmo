<template>
  <div class="tools-card margin-m top">
    <h2>Results</h2>

    <div class="inner">
      <p class="margin-s top">Starting date: {{ date(user.profile.ilrTracker.startDate) }}</p>
      <p>Ending date: {{ jsDate(endDate) }}</p>
      <p>Earliest application date: {{ jsDate(earliestApplicationDate) }}</p>

      <p
        :class="{ 'error': totalDays > 540 }"
        class="total margin-s top">
        <b>{{ totalDays }} days away in total</b>
      </p>
      <p class="total">{{ daysLeft }} days left until {{ jsDate(endDate) }}</p>

      <ul>
        <li
          v-for="year in years"
          :key="year.startDate.getFullYear()">
          <p :class="{ 'error': year.totalDays > 180 }">{{ year.startDate.getFullYear() }}</p>

          <ul>
            <li
              v-for="holiday in year.holidays"
              :key="holiday.country"
              :class="{ 'error': moreThan_180.includes(holiday) }">
              {{ holiday.country }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    validHolidayYears: { type: Array, required: true },
    sortByDateVisas: { type: Array, required: true }
  },
  computed: {
    endDate() {
      const start = new Date(this.user.profile.ilrTracker.startDate),
             endDate = new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 10)),
             minusOne = endDate.setDate(endDate.getDate() - 1)

      return new Date(minusOne)
    },
    earliestApplicationDate() {
      const date = new Date(this.endDate)

      return new Date(date.setDate(this.endDate.getDate() - 28))
    },
    totalDays() {
      let total = []

      this.validHolidayYears.forEach(year => {
        const days = year.holidays.reduce((prev, cur) => prev + cur.days, 0)

        total.push(days)
      })

      return total.reduce((prev, cur) => prev + cur, 0)
    },
    daysLeft() {
      const total = 540 - this.totalDays
      let days

      total >= 0 ?  days = total : days = 0

      return days
    },
    years() {
      let years = this.validHolidayYears

      years.forEach(year => {
        year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0)
      })

      return years.reverse()
    },
    allVisasWithHolidays() {
      const visas =  this.sortByDateVisas.concat(this.user.profile.currentVisa),
            holidays = this.user.profile.holiday;

      visas.forEach((visa, index) => {
        visa.holidays = []
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if holiday was taken within the visa - valid holiday
          if(holidayStart > visaStart && holidayEnd < visaExpire) {
            visa.holidays.push(holiday)
          }

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length -1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate)

            // if holiday was overlapping visa expiry and next visa application date - valid holiday
            // however, if gap between visaExpire and nextVisaApplication > 180 days
            // this will throw ar error for 180+ days, and therefore not valid holiday
            if(holidayStart < visaExpire && holidayEnd > nextVisaApplication) {
              visa.holidays.push(holiday)
            }
          }
        })
      })

      return visas
    },
    // ERRORS
    missingInfo() {
      let errors

      // loop through allVisasWithHolidays
      // not including first visa - if visa is NEW (not extend or switch)
      // if previous visa doesn't have a holiday which spans over that visa end and current visa start
      // throw error stating that they need to include travel info going home inbetween visas

      return errors
    },
    moreThan_180() {
      const errors = []

      this.years.forEach(year => {
        year.holidays.forEach(holiday => {
          if(holiday.days > 180) {
            errors.push(holiday)
          }
        })
      })

      return errors
    },
    overstayPre_2016() {
      const errors = [],
            visas =  this.sortByDateVisas.concat(this.user.profile.currentVisa),
            holidays = this.user.profile.holiday;

      visas.forEach((visa, index) => {
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length - 1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate)

            // if applied date is before Nov 24 2016
            if(nextVisaApplication <= new Date(2016, 10, 24)) {
              // if holiday starts after visa exp, and starts before next visa appl
              if(holidayStart > visaExpire && holidayStart < nextVisaApplication) {
                const difference = holidayStart.getTime() - visaExpire.getTime(),
                      days = Math.ceil(difference / (1000 * 3600 * 24));
                
                // if holiday start was more than 28 days after visa expiry
                // holiday is invalid and will throw error
                if(days > 28) {
                  holiday.within_28 = false
                  errors.push(holiday)
                  // otherwise user will get chance to give a valid reason to explain the overstay
                } else {
                  holiday.within_28 = true
                  errors.push(holiday)
                }
              }
            }
          }
        })
      })

      return errors
    },
    overstayPost_2016() {
      const errors = [],
            visas =  this.sortByDateVisas.concat(this.user.profile.currentVisa),
            holidays = this.user.profile.holiday;

      visas.forEach((visa, index) => {
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length - 1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate)

            // if holiday starts after visa exp, and starts before next visa appl
            if(holidayStart > visaExpire && holidayStart < nextVisaApplication) {
              errors.push(holiday)
            }
          }
        })
      })

      return errors
    }
  }
}
</script>

<style lang="scss" scoped>

.total {
  font-size: 18px;
}
</style>
