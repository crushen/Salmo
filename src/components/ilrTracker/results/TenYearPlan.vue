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
    validHolidayYears: { type: Array, required: true }
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
    // ERRORS
    moreThan_180() {
      let error = []

      this.years.forEach(year => {
        year.holidays.forEach(holiday => {
          if(holiday.days > 180) {
            error.push(holiday)
          }
        })
      })

      return error
    },
    overstayPre_2016() {
      let error 

      return error
      
      // PRE 2016
      // get all visas
      // if any holiday started after visa expiery
      // and there's another visa with a visa application date AFTER current visa iteration
      // if next application date =< 28 days
      // = blue maybe error (give option to provide a reason)
      // if next application date > 28 days
      // = error
    },
    overstayPost_2016() {
      let error

      return error

      // POST 2016
      // get all visas
      // if any holiday started after visa expiery
      // and there's another visa with a visa application date AFTER current visa iteration
      // = error
    }
  }
}
</script>

<style lang="scss" scoped>

.total {
  font-size: 18px;
}
</style>
