import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    makeOptions(array) {
      return Object.assign({}, ...array.map(key => ({[key]: key})))
    },
    date(date) {
      const newDate = date.split('-')
      return newDate.reverse().join('/')
    },
    jsDate(date) {
      const newDate = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()),
            formatted = newDate.split('/');
            
      return `${formatted[1]}/${formatted[0]}/${formatted[2]}`
    },
    sortYearsArray(years, holiday, holidayStart, holidayEnd, yearStart, yearEnd) {
      // IF YEAR IS FIRST IN ARRAY
      if(!years.length) {
        // if holiday goes over the end of year
        if(holidayStart < yearEnd && holidayEnd > yearEnd) {
          // get following year dates and holiday info
          const nextYearStart = yearEnd,
                nextYearEnd = new Date(new Date(yearEnd).setFullYear(new Date(yearEnd).getFullYear() + 1)),
                currentYear = { startDate: yearStart, endDate: yearEnd, holidays: [] },
                splitHolidayDates = this.getSplitYearHolidayDays(holiday, currentYear);

          // push years with correct holiday days & balance out flight days
          years.push({
            startDate: yearStart,
            endDate: yearEnd,
            holidays: [{
              ...holiday,
              days: splitHolidayDates.currentYearDays - 1,
              extendedToNext: true,
              extendedFromLast: false
            }]
          })
          
          years.push({
            startDate: nextYearStart,
            endDate: nextYearEnd,
            holidays: [{
              ...holiday,
              days: splitHolidayDates.nextYearDays + 1,
              extendedFromLast: true,
              extendedToNext: false
            }],
          })
          // otherwise, just push year with holiday as normal
        } else {
          years.push({
            startDate: yearStart,
            endDate: yearEnd,
            holidays: [holiday]
          })
        }
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
            last.holidays.push({
              ...holiday,
              days: splitHolidayDates_2.nextYearDays + 1,
              extendedFromLast: true,
              extendedToNext: false
            })

            secondToLast.holidays.push({
              ...holiday,
              days: splitHolidayDates_2.currentYearDays - 1,
              extendedToNext: true,
              extendedFromLast: false
            })
          }
          // IF HOLIDAY DIDN'T START AND END IN THE YEAR
        } else {
          // if holiday goes over the end of year
          if(holidayStart < yearEnd && holidayEnd > yearEnd) {
            // get following year dates and holiday info
            const nextYearStart = yearEnd,
                  nextYearEnd = new Date(new Date(yearEnd).setFullYear(new Date(yearEnd).getFullYear() + 1)),
                  currentYear = { startDate: yearStart, endDate: yearEnd, holidays: [] },
                  splitHolidayDates = this.getSplitYearHolidayDays(holiday, currentYear);

            // push years with correct holiday days & balance out flight days
            years.push({
              startDate: yearStart,
              endDate: yearEnd,
              holidays: [{
                ...holiday,
                days: splitHolidayDates.currentYearDays - 1,
                extendedToNext: true,
                extendedFromLast: false
              }]
            })
            
            years.push({
              startDate: nextYearStart,
              endDate: nextYearEnd,
              holidays: [{
                ...holiday,
                days: splitHolidayDates.nextYearDays + 1,
                extendedFromLast: true,
                extendedToNext: false
              }],
            })
            // otherwise, just push year with holiday as normal
          } else {
            years.push({
              startDate: yearStart,
              endDate: yearEnd,
              holidays: [holiday]
            })
          }
        }
      }      
    },
    getSplitYearHolidayDays(holiday, year) {
      const totalDays = holiday.days,
            dt1 = new Date(holiday.leftUk),
            dt2 = new Date(year.endDate),
            currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
            nextYearDays = totalDays - currentYearDays;

      return { currentYearDays: currentYearDays, nextYearDays: nextYearDays }
    }
  }
})

let app
firebase.auth().onAuthStateChanged(async user => {
  if(user) {
    await store.dispatch('auth/storeAuthUser', user)
  }
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
