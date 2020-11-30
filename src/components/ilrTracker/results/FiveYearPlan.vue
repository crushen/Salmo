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
            :overstayHoliday="year.overstayHoliday" />
          <div
            @click="selectedYear === index ? selectedYear = null : selectedYear = index"
            class="year">
            <div
              :class="{
                'error-red': year.totalDays > 180 || overstayYearsPre_2016.includes(year) || overstayYearsPost_2016.includes(year) || !qualifiesForFive,
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
                  'error-post2016': overstayPost_2016.includes(holiday) && selectedYear === index,
                  'error-pre2016-red': overstayPre_2016.includes(holiday) &&  selectedYear === index,
                  'error-pre2016-blue': overstayPre_2016.includes(holiday) && holiday.within_28 && holiday.reason.haveReason !== 'no' && selectedYear === index
                }">
                <!-- 'error-180': moreThan_180.find(h => h.country === holiday.country && h.leftUk === holiday.leftUk) && selectedYear === index, --> 
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
      <must-change-message v-if="!qualifiesForFive" />

      <too-many-days-trip-message v-if="qualifiesForFive && moreThan_180_pre_2018.length" />

      <too-many-days-trip-post-jan v-if="qualifiesForFive && moreThan_180_post_2018.length" />

      <too-many-days-total-message v-if="qualifiesForFive && totalDays > 540" />
      
      <overstay-post-nov v-if="qualifiesForFive && overstayPost_2016.length" />

      <overstay-pre-nov v-if="(qualifiesForFive && overstayPre_2016.length && overstayPre_2016.find(holiday => !holiday.within_28)) || (qualifiesForFive && overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.reason.haveReason === 'no'))" />

      <overstay-pre-nov-within v-if="qualifiesForFive && overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.within_28) && overstayPre_2016.find(holiday => !holiday.reason.haveReason)" />
      
      <application-message v-if="qualifiesForFive && overstayPre_2016.length && overstayPre_2016.find(holiday => holiday.reason.haveReason === 'yes')" />
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
import mustChangeMessage from '@/components/ilrTracker/results/messages/five-year/MustChange'
import tooManyDaysTripMessage from '@/components/ilrTracker/results/messages/ten-year/180_Days'
import tooManyDaysTripPostJan from '@/components/ilrTracker/results/messages/five-year/180_Days'
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
    mustChangeMessage,
    tooManyDaysTripMessage,
    tooManyDaysTripPostJan,
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
             endDate = new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 5)),
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

      if(this.moreThan_180_pre_2018.length || this.moreThan_180_post_2018.length || this.overstayPost_2016.length || this.totalDays > 540) {
        text = 'Something is wrong!'
      }

      return text
    },
    // ERRORS
    noErrors() {
      let errors = true

      if(this.moreThan_180_pre_2018.length || this.moreThan_180_post_2018.length || this.overstayPre_2016.length || this.overstayPost_2016.length || this.totalDays > 540) {
        errors = false
      }

      return errors
    },
    qualifiesForFive() {
      const currentVisa = this.user.profile.currentVisa.name,
            pastVisas = this.user.profile.pastVisas,
            currentType = this.user.profile.currentVisa.type;

      let qualifies = false

      // If their current visa is a tier 1 or tier 2 visa
      if(currentVisa.includes('Tier 1') || currentVisa.includes('Tier 2')) {
        // If they have no past visas
        if(!pastVisas.length) {
          qualifies = true
        } else {
          // If their only past visa is Student visa
          if(pastVisas.length === 1) {
            if(pastVisas[0].name === 'Tier 4 : Student') {
              qualifies = true
            }
          } else {
            // If their first past visa is Student and every visa after is Tier 1 or Tier 2
            const removeFirst = pastVisas.slice(1),
                  allTierOneTierTwo = visa => visa.name.includes('Tier 1') || visa.name.includes('Tier 2');

            if(removeFirst.every(allTierOneTierTwo) && pastVisas[0].name === 'Tier 4 : Student'){
              qualifies = true
            } else {
              // If all their past visas are Tier 1 or Tier 2
              if(pastVisas.every(allTierOneTierTwo)) {
                qualifies = true
              }
            }
          }
        }
      }

      // If any of their past or current visas were swithced
      if(currentType === 'switch') {
        qualifies = false
      }
      
      if(pastVisas && pastVisas.find(visa => visa.type === 'switch')) {
        qualifies = false
      }

      return qualifies
    },
    moreThan_180_pre_2018() {
      const errors = [],
            years = this.sortIntoYears(this.user.profile.holiday);

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

        if(year.startDate < new Date(2018, 0, 11) && year.totalDays > 180) {
          errors.push(year)
        }
      })

      return errors
    },
    moreThan_180_post_2018() {
      const errors = [],
            years = [],
            holidays = cloneDeep(this.user.profile.holiday);

      holidays.forEach(holiday => {
        const startDate = new Date(holiday.leftUk),
              endDate = new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1)),
              withinYear = holidays.filter(h => new Date(h.leftUk) >= startDate && new Date(h.leftUk) < endDate);

        years.push({ yearStart: startDate, yearEnd: endDate, holidays: withinYear })
      })

      years.forEach(year => {
        let total = year.holidays.reduce((prev, cur) => prev + cur.days, 0)

        year.totalDays = total

        year.holidays.forEach(h => year.totalDays -= 2)

        if(new Date(year.yearStart) >= new Date(2018, 0, 11) && year.totalDays > 180) {
          errors.push(year)
        }
      })

      return errors
    }
  },
  methods: {
    sortIntoYears(array) {
      const ascendingDates = cloneDeep(array).sort((a, b) => new Date(a.leftUk) - new Date(b.leftUk)),
            years = [];

      while(ascendingDates.length) {
        // get holiday from start of array
        const holiday = ascendingDates.shift(),
              holidayStart = new Date(holiday.leftUk),
              holidayEnd = new Date(holiday.returnedUk),
              yearStart = new Date(this.user.profile.ilrTracker.startDate),
              yearEnd = new Date(new Date(yearStart).setFullYear(new Date(yearStart).getFullYear() + 1));

        this.sortYearsArray(years, holiday, holidayStart, holidayEnd, yearStart, yearEnd)
      }

      return years
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
