<template>
  <div>
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
            :overstayHoliday="user.profile.holiday.find(h => h.country === year.overstayHoliday.country && h.leftUk === year.overstayHoliday.leftUk)" />
          <div
            @click="selectedYear === index ? selectedYear = null : selectedYear = index"
            class="year">
            <div
              :class="{
                'error-red': year.totalDays > 180 || overstayYearsPre_2016.includes(year) || overstayYearsPost_2016.includes(year),
                'error-blue': overstayYearsPre_2016.includes(year) && year.overstayHoliday.within_28 && year.overstayHoliday.reason.haveReason !== 'no'
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
                  'error-pre2016-red': overstayPre_2016.includes(holiday) &&  selectedYear === index,
                  'error-pre2016-blue': overstayPre_2016.includes(holiday) && holiday.within_28 && holiday.reason.haveReason !== 'no' && selectedYear === index
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

      <overstay-pre-nov v-if="(overstayPre_2016.length && overstayPre_2016.find(holiday => !holiday.within_28)) || (overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.reason.haveReason === 'no'))" />

      <overstay-pre-nov-within v-if="overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.within_28) && overstayPre_2016.find(holiday => !holiday.reason.haveReason)" />

      <application-message v-if="overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.reason.haveReason === 'yes')" />
    </base-message>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
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
  props: [
    'user',
    'totalDays',
    'daysLeft',
    'years',
    'allVisasWithHolidays',
    'overstayPre_2016',
    'overstayYearsPre_2016',
    'overstayPost_2016',
    'overstayYearsPost_2016'
  ],
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
    applicationMessage
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
    messageButtonText() {
      let text

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

      if(this.overstayPre_2016.length) {
        if(this.overstayPre_2016.find(holiday => holiday.within_28)) {
          text = 'Hmmm.'

          if(this.overstayPre_2016.find(holiday => holiday.reason.haveReason === 'no')) {
            text = 'Something is wrong!'
          }
        } else {
          text = 'Something is wrong!'
        }
      }

      if(this.moreThan_180.length || this.overstayPost_2016.length || this.totalDays > 540) {
        text = 'Something is wrong!'
      }

      return text
    },
    // ERRORS
    noErrors() {
      let errors = true

      if(this.moreThan_180.length || this.overstayPre_2016.length || this.overstayPost_2016.length || this.totalDays > 540) {
        errors = false
      }

      return errors
    },
    moreThan_180() {
      const errors = [],
            holidays = this.years.flatMap(year => year.holidays);

      holidays.forEach(holiday => {
        if(holiday.days > 180) {
          errors.push(holiday)
        }
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
