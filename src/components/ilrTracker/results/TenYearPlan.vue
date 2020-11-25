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

      <ul class="results margin-s top">
        <li
          v-for="(year, index) in years"
          :key="year.startDate.getFullYear()"
          class="container">
          <overstay-alert
            v-if="overstayYearsPost_2016.includes(year) || overstayYearsPre_2016.includes(year)"
            :days="year.overstayHoliday.overstayDays"
            :button="overstayYearsPre_2016.includes(year) && year.overstayHoliday.within_28 ? true : false"
            :colour="overstayYearsPre_2016.includes(year) && year.overstayHoliday.within_28 ? 'blue' : 'red'" />

          <div
            @click="selectedYear === index ? selectedYear = null : selectedYear = index"
            class="year">
            <div
              :class="{
                'error-red': year.totalDays > 180 || overstayYearsPre_2016.includes(year) || overstayYearsPost_2016.includes(year),
                'error-blue': overstayYearsPre_2016.includes(year) && year.overstayHoliday.within_28
              }"
              class="top">
              <p><b>{{ year.startDate.getFullYear() }}</b></p>
              
              <p>{{ year.totalDays }} days</p>
            </div>

            <ul class="holiday-list" v-if="selectedYear === index">
              <li
                v-for="holiday in year.holidays"
                :key="holiday.country"
                class="holiday"
                :class="{ 
                  'error-180': moreThan_180.find(h => h.country === holiday.country && h.leftUk === holiday.leftUk) && selectedYear === index,
                  'error-post2016': overstayPost_2016.includes(holiday) && selectedYear === index,
                  'error-pre2016-red': overstayPre_2016.includes(holiday) && !holiday.within_28 &&  selectedYear === index,
                  'error-pre2016-blue': overstayPre_2016.includes(holiday) && holiday.within_28 && selectedYear === index
                }">
                <p>{{ holiday.country }}</p>

                <p>{{ holiday.days }} days</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <base-message :buttonText="messageButtonText">
      <!-- Messages for no errors -->
      <finished-message v-if="noErrors && daysLeft === 0" />

      <watch-days-message v-else-if="noErrors && daysLeft <= 100" :days="daysLeft" />

      <no-errors-message v-else-if="noErrors && daysLeft > 100" />

      <!-- Error messages -->
      <too-many-days-trip-message v-if="moreThan_180.length" />

      <too-many-days-total-message v-if="totalDays > 540" />
      
      <overstay-post-nov v-if="overstayPost_2016.length" />

      <overstay-pre-nov-within v-if="overstayPre_2016.length && overstayPre_2016.every(holiday => holiday.within_28)" />

      <overstay-pre-nov v-if="overstayPre_2016.length && overstayPre_2016.find(holiday => !holiday.within_28)" />

      <!-- <application-message /> -->
    </base-message>
  </div>
</template>

<script>
import overstayAlert from '@/components/ilrTracker/results/OverstayAlert'
import baseMessage from '@/components/ilrTracker/results/messages/BaseMessage'
import noErrorsMessage from '@/components/ilrTracker/results/messages/ten-year/NoErrors'
import finishedMessage from '@/components/ilrTracker/results/messages/ten-year/Finished'
import watchDaysMessage from '@/components/ilrTracker/results/messages/ten-year/WatchDays'
import tooManyDaysTripMessage from '@/components/ilrTracker/results/messages/ten-year/180_Days'
import tooManyDaysTotalMessage from '@/components/ilrTracker/results/messages/ten-year/540_Days'
import overstayPostNov from '@/components/ilrTracker/results/messages/ten-year/OverstayPost_2016'
import overstayPreNovWithin from '@/components/ilrTracker/results/messages/ten-year/OverstayPre_2016_Within_28'
import overstayPreNov from '@/components/ilrTracker/results/messages/ten-year/OverstayPre_2016'
import applicationMessage from '@/components/ilrTracker/results/messages/ten-year/Application'

export default {
  props: {
    user: { type: Object, required: true },
    validHolidayYears: { type: Array, required: true },
    sortByDateVisas: { type: Array, required: true }
  },
  components: {
    overstayAlert,
    baseMessage,
    noErrorsMessage,
    finishedMessage,
    watchDaysMessage,
    tooManyDaysTripMessage,
    tooManyDaysTotalMessage,
    overstayPostNov,
    overstayPreNovWithin,
    overstayPreNov,
    // applicationMessage
  },
  data() {
    return {
      selectedYear: null
    }
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

      this.years.forEach(year => total.push(year.totalDays))

      return total.reduce((prev, cur) => prev + cur, 0)
    },
    daysLeft() {
      const total = 540 - this.totalDays
      let days

      total >= 0 ?  days = total : days = 0

      return days
    },
    messageButtonText() {
      let text

      // here will go texts for all happy messages
      if(this.noErrors) {
        if(this.daysLeft === 0) {
          text = 'It’s finished!'
        } else if(this.daysLeft <= 10 && this.daysLeft > 0) {
          text = 'Only a few days left!'
        } else if(this.daysLeft <= 100 && this.daysLeft > 10) {
          text = 'Watch out on your days!'
        } else {
          text = 'Everything looks great so far!'
        }
      }

      // here will go 'hmmm' for Application message

      if(this.overstayPre_2016.length) {
        if(this.overstayPre_2016.find(holiday => holiday.within_28)) {
          text = 'Hmmm.'
        } else {
          text = 'Something is wrong!'
        }
      }

      if(this.moreThan_180.length || this.overstayPost_2016.length || this.totalDays > 540) {
        text = 'Something is wrong!'
      }

      return text
    },
    years() {
      let years = this.validHolidayYears

      years.forEach(year => {
        let total = year.holidays.reduce((prev, cur) => prev + cur.days, 0)

        // take off flight days
        year.holidays.forEach(holiday => {
          if(holiday.extendedToNext || holiday.extendedFromLast) {
            holiday.days -= 1
            total -= 1
          } else {
            holiday.days -= 2
            total -= 2
          }
        })

        year.totalDays = total
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
    noErrors() {
      let errors = true

      if(this.moreThan_180.length || this.overstayPre_2016.length || this.overstayPost_2016.length || this.totalDays > 540) {
        errors = false
      }

      return errors
    },
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

      this.user.profile.holiday.forEach(holiday => {
        if(holiday.days > 180) {
          errors.push(holiday)
        }
      })

      return errors
    },
    overstayPre_2016() {
      const errors = [],
            visas =  [...this.sortByDateVisas.concat(this.user.profile.currentVisa)],
            holidays = [...this.user.profile.holiday];

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
        })
      })

      return errors
    },
    overstayYearsPre_2016() {
      const errors = []

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
            visas =  [...this.sortByDateVisas.concat(this.user.profile.currentVisa)],
            holidays = [...this.user.profile.holiday];

      visas.forEach((visa, index) => {
        const visaStart = new Date(visa.start),
              visaExpire = new Date(visa.end);

        holidays.forEach(holiday => {
          const holidayStart = new Date(holiday.leftUk),
                holidayEnd = new Date(holiday.returnedUk);

          // if visa is not last in array (users current visa)
          if(visa !== visas[visas.length - 1]) {
            const nextVisaApplication = new Date(visas[index + 1].appliedDate)

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
        })
      })

      return errors
    },
    overstayYearsPost_2016() {
      const errors = []

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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.total {
  font-size: 18px;
}

.error-red,
.error-180,
.error-post2016,
.error-pre2016-red {
  p {
    color: $red;
  }
}

.error-blue,
.error-pre2016-blue {
  p {
    color: $blue;
  }
}

.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .container {
    width: 100%;

    .year {
      width: 100%;
      background: #D4E7ED;
      margin-top: 0.5rem;
      border: 4px solid #D4E7ED;
      border-radius: $radius;
      padding: 0.2rem 1rem;

      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      b {
        font-weight: 500;
      }
    }

    &:nth-of-type(even) {
      .year {
        background: white;
      }
    }
  }
}

.holiday-list {
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;

    &:first-of-type {
      margin-top: 0.5rem;
    }
  }
}
</style>
