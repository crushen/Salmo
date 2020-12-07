<template>
  <div class="tools-card margin-m top">
    <h2>Results</h2>

    <ten-results
      v-if="user.profile.ilrTracker.plan === '10 year plan'"
      :user="user"
      :totalDays="totalDays"
      :daysLeft="daysLeft"
      :years="years"
      :allVisasWithHolidays="allVisasWithHolidays"
      :overstayPre_2016="overstayPre_2016"
      :overstayYearsPre_2016="overstayYearsPre_2016"
      :overstayPost_2016="overstayPost_2016"
      :overstayYearsPost_2016="overstayYearsPost_2016"  />

    <five-results
      v-if="user.profile.ilrTracker.plan === '5 year plan'"
      :user="user"
      :years="years"
      :allVisasWithHolidays="allVisasWithHolidays"
      :overstayPre_2016="overstayPre_2016"
      :overstayYearsPre_2016="overstayYearsPre_2016"
      :overstayPost_2016="overstayPost_2016"
      :overstayYearsPost_2016="overstayYearsPost_2016"
      :fiveYearDate="fiveYearDate" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tenResults from '@/components/ilrTracker/results/TenYearPlan'
import fiveResults from '@/components/ilrTracker/results/FiveYearPlan'

export default {
  props: {
    user: { type: Object, required: true },
    validHolidayYears: { type: Array, required: true },
    sortByDateVisas: { type: Array, required: true },
    fiveYearDate: { type: String, required: false }
  },
  components: { tenResults, fiveResults },
  computed: {
    totalDays() {
      let total = []

      this.years.forEach(year => total.push(year.totalDays))

      return total.reduce((prev, cur) => prev + cur, 0)
    },
    daysLeft() {
      const total = 540 - this.totalDays
      let days

      total >= 0 ?  days = total : days = 0

      return days
    },
    years() {
      let years = cloneDeep(this.validHolidayYears)

      years.forEach(year => year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0))

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
          if(visa !== visas[visas.length - 1]) {
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
    overstayPre_2016() {
      const errors = [],
            visas =  cloneDeep(this.sortByDateVisas).concat(this.user.profile.currentVisa),
            holidays = this.years.flatMap(year => year.holidays);

      visas.forEach((visa, index) => {
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length - 1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate),
                  trackerStart = new Date(this.user.profile.ilrTracker.startDate);

            // if holiday started after the ilrTracker start date
            if(holidayStart >= trackerStart) {
              // if applied date is before Nov 24 2016
              if(nextVisaApplication <= new Date(2016, 10, 24)) {
                // if holiday starts after visa exp, and starts before next visa appl
                if(holidayStart > visaExpire && holidayStart < nextVisaApplication) {
                  const difference = holidayStart.getTime() - visaExpire.getTime(),
                        days = Math.ceil(difference / (1000 * 3600 * 24));
                  
                  holiday.overstayDays = days

                  // if holiday start was more than 28 days after visa expiry
                  // holiday is invalid and will throw error
                  if(days > 28) {
                    holiday.within_28 = false
                    // otherwise user will get chance to give a valid reason to explain the overstay
                  } else {
                    holiday.within_28 = true
                  }

                  errors.push(holiday)
                }
              }
            }
          }
        })
      })

      return errors
    },
    overstayYearsPre_2016() {
      const errors = [];

      this.years.forEach(year => {
        const yearStart = new Date(year.startDate),
              yearEnd = new Date(year.endDate);

        this.overstayPre_2016.forEach(holiday => {
            const holidayStart = new Date(holiday.leftUk),
                  holidayEnd = new Date(holiday.returnedUk);

            if(holidayStart > yearStart && holidayEnd < yearEnd) {
              year.overstayHoliday = holiday
              errors.push(year)
            }
        })
      })

      return errors
    },
    overstayPost_2016() {
      const errors = [],
            visas =  cloneDeep(this.sortByDateVisas).concat(this.user.profile.currentVisa),
            holidays = this.years.flatMap(year => year.holidays);

      visas.forEach((visa, index) => {
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length - 1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate),
                  trackerStart = new Date(this.user.profile.ilrTracker.startDate);

            // if holiday started after the ilrTracker start date
            if(holidayStart >= trackerStart) {
              // if applied date is after Nov 24 2016
              if(nextVisaApplication > new Date(2016, 10, 24)) {
                // if holiday starts after visa exp, and starts before next visa appl
                if(holidayStart > visaExpire && holidayStart < nextVisaApplication) {
                  const difference = holidayStart.getTime() - visaExpire.getTime(),
                        days = Math.ceil(difference / (1000 * 3600 * 24));

                  holiday.overstayDays = days
                  errors.push(holiday)
                }
              }
            }
          }
        })
      })

      return errors
    },
    overstayYearsPost_2016() {
      const errors = [];

      this.years.forEach(year => {
        const yearStart = new Date(year.startDate),
              yearEnd = new Date(year.endDate);

        this.overstayPost_2016.forEach(holiday => {
            const holidayStart = new Date(holiday.leftUk),
                  holidayEnd = new Date(holiday.returnedUk);

            if(holidayStart > yearStart && holidayEnd < yearEnd) {
              year.overstayHoliday = holiday
              errors.push(year)
            }
        })
      })

      return errors
    }
  }
}
</script>
