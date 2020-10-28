<template>
  <div class="tools-pages">
    <main class="tools-pages page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.profile.username } })"
        text="Profile" />

        <div class="background blue">
          <div class="content margin-m top">
            <h1>ILR Tracker</h1>
          </div>

          <section class="content margin-m top bottom">
            <div class="year-title">
              <h2>10 Year Plan</h2>
              <button class="none">
                <img src="@/assets/icons/red/edit.svg" alt="">
              </button>
            </div>

            <div class="inner">
              <p>This tracker will help you record your travel days outside the UK and does the maths to let you know how many days left you can travel.</p> 
              <p class="margin-s top small">Indefinite Leave to Remain requires the applicant to only leave the country for certain amount of days within either 5 or 10 years.</p>
            </div>
          </section>

          <section>
            <pr-calc />
          </section>

          <!-- <section>
            <tracker
              :user="user"
              :sortByDate="sortByDate"
              @calculate="showResults = true" />

            <results
              v-if="showResults"
              :pre2016="pre2016"
              :pre2016visas="pre2016visas"
              :post2016holiday="post2016holiday" />
          </section> -->
        </div>
    </main>
  </div>
</template>

<script>
import tracker from '@/components/ilrTracker/Tracker'
import results from '@/components/ilrTracker/Results'
import backButton from '@/components/BackButton'
import prCalc from '@/components/profile/prCalc/PrCalculator'

// import addHoliday from '@/components/profile/prCalc/AddHoliday'
// import editHoliday from '@/components/profile/prCalc/EditHoliday'
// import alert from '@/components/Alert'

export default {
  components: { backButton, prCalc },
  data() {
    return {
      showResults: false,
      pre2016: [],
      post2016: [],
      pre2016visas: [],
      post2016holiday: [],
      modalOpen: false,
      editHoliday: false,
      readMoreOpen: false,
      editOpen: false,
      index: null,
      showAlert: false
    }
  }
  // computed: {
  //   user() {
  //     return this.$store.state.auth.user
  //   },
  //   sortByDate() {
  //     const array = this.user.profile.holiday
  //     return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse()
  //   },
  //   getDaysInYearPre2016(array) {
  //     const total = array.reduce((prev, cur) => prev + cur.days, 0)
  //     return total
  //   },
  //   editText() {
  //     if(this.editHoliday) {
  //       return 'Close Editor'
  //     } else {
  //       return 'Edit Holiday'
  //     }
  //   }
  // },
  // methods: {
  //   openModal() {
  //     this.modalOpen = true
  //     this.showOverlay()

  //     const button = document.querySelector('#add-holiday-btn')
  //     button.setAttribute('aria-expanded', 'true')

  //     const ariaBtns = document.querySelectorAll('.aria-btn')
  //     this.changeBtnFocus(ariaBtns, '-1')
  //   },
  //   updateHoliday() {
  //     this.checkIfPre2016()
  //     this.getPre2016visas()
  //     this.getPost2016holiday()
  //   },
  //   openEdit(index) {
  //     this.editOpen = true
  //     this.index = index
  //     this.showOverlay()

  //     const button = document.querySelector(`#edit-btn-${index}`)
  //     button.setAttribute('aria-expanded', 'true')

  //     const ariaBtns = document.querySelectorAll('.aria-btn')
  //     this.changeBtnFocus(ariaBtns, '-1')
  //   },
  //   closeEdits() {
  //     const editBtns = document.querySelectorAll('.edit-btn')

  //     editBtns.forEach(btn => {
  //       btn.setAttribute('aria-expanded', 'false')
  //     })
  //   },
  //   openAlert(index) {
  //     this.showAlert = true
  //     this.index = index
  //     this.showOverlay()

  //     const ariaBtns = document.querySelectorAll('.aria-btn')
  //     this.changeBtnFocus(ariaBtns, '-1')
  //   },
  //   deleteHoliday() {
  //     this.showAlert = false
  //     this.editHoliday = false

  //     this.sortByDate.splice(this.index, 1)
  //     this.$store.dispatch('prCalc/editHoliday', this.sortByDate)

  //     this.updateHoliday()
  //   },
  //   showOverlay() {
  //     const overlay = document.querySelector('#overlay')

  //     overlay.style.opacity = 1
  //     overlay.style.visibility = 'visible'

  //     document.querySelector('body').style.overflow = 'hidden'
  //   },
  //   changeBtnFocus(buttons, focus) {
  //     buttons.forEach(btn => {
  //       btn.setAttribute('tabindex', focus)
  //     })
  //   },
  //   checkIfPre2016() {
  //     // reset arrays
  //     this.pre2016 = []
  //     this.post2016 = []

  //     // Check if the date is before november 2016 & group those that are and aren't
  //     const nov2016 = new Date(2016, 10, 1) // month is 0 indexed, so 10 = nov
  //     this.sortByDate.forEach(holiday => {
  //       if(new Date (holiday.start) < nov2016) {
  //         this.pre2016.push(holiday)
  //       } else {
  //         this.post2016.push(holiday)
  //       }
  //     });
  //   },
  //   removeDuplicates(array, prop) {
  //     // store the comparison  values in array
  //     const unique =  array.map(e => e[prop])
  //     // store the indexes of the unique objects
  //     .map((e, i, final) => final.indexOf(e) === i && i)
  //     // eliminate the false indexes & return unique objects
  //     .filter((e) => array[e]).map(e => array[e])

  //     return unique
  //   },
  //   getPre2016visas() {
  //     // Pre nov 2016, users get 180 holiday days per year from the visa start date
  //     // Find out which visa they were on for each holiday pre Nov 2016
  //     // Then add those start dates to array & check that user only takes 180 days per year from those dates
  //     const years = []

  //     this.pre2016.forEach(holiday => {
  //       this.user.profile.pastVisas.forEach(visa => {
  //         if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
  //           years.push({
  //             name: visa.name,
  //             start: visa.start,
  //             end: visa.end,
  //             holidays: []
  //           })
  //         }
  //       })

  //       // Add holiday to corresponding visa
  //       years.forEach(visa => {
  //         if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
  //           visa.holidays.push(holiday)
  //         }
  //       })
  //     })

  //     // remove duplicates
  //     this.pre2016visas = this.removeDuplicates(years, 'start')
  //     this.getHolidayForEachYearPre2016()
  //   },
  //   getHolidayForEachYearPre2016() {
  //     this.pre2016visas.forEach(visa => {
  //       visa.years = []

  //       // get difference in years between start and end date
  //       const yearsDiff =  new Date(visa.end).getFullYear() - new Date(visa.start).getFullYear()

  //       // add start and end date for every year between
  //       for(let i = 0; i < yearsDiff; i++) {
  //         const start = new Date(visa.start).setFullYear(new Date(visa.start).getFullYear() + i)
  //         visa.years.push({
  //           start: new Date(start),//.toDateString()
  //           end: new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 1)),
  //           holidays: []
  //         })
  //       }
        
  //       // add holidays that are inbetween those years
  //       visa.years.forEach((year, i) => {
  //         visa.holidays.forEach(holiday => {
  //           if(new Date(holiday.start) > new Date(year.start) && new Date(holiday.start) < new Date(year.end)) {
  //             // check if the holiday goes over the end of the year
  //             if(new Date(holiday.start) > new Date(year.start) && new Date(holiday.end) > new Date(year.end)) {
  //               const totalDays = holiday.days,
  //                     dt1 = new Date(holiday.start),
  //                     dt2 = new Date(year.end),
  //                     currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
  //                     nextYearDays = totalDays - currentYearDays

  //               // only add days in the current year
  //               visa.years[i].holidays.push({
  //                 days: currentYearDays - 1, // -1 for the flight day
  //                 location: holiday.location,
  //                 start: holiday.start,
  //                 end: holiday.end
  //               })

  //               // add holiday with remaining days to next year
  //               if(i !== visa.years.length) {
  //                 visa.years[i + 1].holidays.push({
  //                   days: nextYearDays + 1, // +1 for the flight day
  //                   location: holiday.location,
  //                   start: holiday.start,
  //                   end: holiday.end
  //                 })
  //               } else {
  //                 visa.years.push({
  //                   start: new Date(new Date(year.start).setFullYear(new Date(year.start).getFullYear() + 1)),
  //                   end: new Date(new Date(year.start).setFullYear(new Date(year.start).getFullYear() + 2)),
  //                   holidays: []
  //                 })
  //                 .then(() => {
  //                   visa.years[i + 1].holidays.push({
  //                     days: nextYearDays + 1, // +1 for the flight day
  //                     location: holiday.location,
  //                     start: holiday.start,
  //                     end: holiday.end
  //                   })
  //                 })
  //               }
  //             } else {
  //               // otherwise add holiday as normal
  //               visa.years[i].holidays.push(holiday)
  //             }
  //           } 
  //         })

  //         // add all holiday days per year
  //         year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0)

  //         // add icon for days
  //         if(year.totalDays > 180) {
  //           year.icon = 'cross'
  //         } else if(year.totalDays <= 180 && year.totalDays >= 160) {
  //           year.icon = 'exclamation'
  //         } else {
  //           year.icon = 'tick'
  //         }
  //       })

  //       // remove years that don't have any holiday days
  //       visa.years = visa.years.filter(year => year.totalDays)
  //     })
  //   },
  //   getPost2016holiday() {
  //     // Post nov 2016, users get 180 holiday days per year on a rolling basis
  //     this.post2016holiday = []

  //     while (this.post2016.length) {
  //       this.getHolidayForEachYearPost2016()
  //     }

  //     // add all holiday days per year
  //     this.post2016holiday.forEach(year => {
  //       year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0)

  //       // add icon for days
  //       if(year.totalDays > 180) {
  //         year.icon = 'cross'
  //       } else if(year.totalDays <= 180 && year.totalDays >= 160) {
  //         year.icon = 'exclamation'
  //       } else {
  //         year.icon = 'tick'
  //       }

  //       // check if they were on current visa
  //       const currentVisa = this.user.profile.currentVisa
  //       let yearVisa = null

  //       if(new Date(year.start) > new Date(currentVisa.start) && new Date(year.end) < new Date(currentVisa.end)) {
  //         yearVisa = currentVisa.name
  //       }

  //       // check if they were on a past visa
  //       this.user.profile.pastVisas.forEach(visa => {
  //         if(new Date(year.start) > new Date(visa.start) && new Date(year.start) < new Date(visa.end)) {
  //           yearVisa = visa.name
  //         }
  //       })
        
  //       // if they had no visa at the time
  //       if(!yearVisa) {
  //         yearVisa = 'No visa detected - this holiday will not effect your ILR'
  //       }

  //       year.visa = yearVisa
  //     })
  //   },
  //   getHolidayForEachYearPost2016() {
  //     // get holiday from start of array
  //     const holiday = this.post2016.shift(),
  //           start = new Date(holiday.start),
  //           end = new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 1));

  //     // create first holiday obj if array is empty
  //     if(!this.post2016holiday.length) {
  //       this.post2016holiday.push({
  //         start: start,
  //         end: end,
  //         holidays: [holiday]
  //       })
  //     } else {
  //       const prevYear = this.post2016holiday[this.post2016holiday.length - 1]

  //       // check if holiday started in prev year
  //       if(new Date(holiday.start) > new Date(prevYear.start) && new Date(holiday.start) < new Date(prevYear.end)) {
  //         // check if it ended within the year
  //         if(new Date(holiday.start) > new Date(prevYear.start) && new Date(holiday.end) < new Date(prevYear.end)) {
  //           prevYear.holidays.push(holiday);
  //         } else {
  //           const totalDays_1 = holiday.days,
  //                 dt1_1 = new Date(start),
  //                 dt2_1 = new Date(prevYear.end),
  //                 currentYearDays_1 = Math.floor((Date.UTC(dt2_1.getFullYear(), dt2_1.getMonth(), dt2_1.getDate()) - Date.UTC(dt1_1.getFullYear(), dt1_1.getMonth(), dt1_1.getDate())) / (1000 * 60 * 60 * 24)),
  //                 nextYearDays_1 = totalDays_1 - currentYearDays_1;

  //           // get year start and end sate for following year, should be one year on from prev year
  //           const startDate = new Date(start.setDate(start.getDate() + currentYearDays_1)),
  //                 endDate = new Date(end.setDate(end.getDate() + currentYearDays_1));

  //           // push year to 2016 holidays
  //           this.post2016holiday.push({
  //             start: startDate,
  //             end: endDate,
  //             holidays: []
  //           })

  //           // get last two years to add split holidays to
  //           const last = this.post2016holiday[this.post2016holiday.length - 1],
  //                 secondToLast = this.post2016holiday[this.post2016holiday.length - 2];

  //           // get days for split holiday
  //           const totalDays = holiday.days,
  //                 dt1 = new Date(holiday.start),
  //                 dt2 = new Date(secondToLast.end),
  //                 currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
  //                 nextYearDays = totalDays - currentYearDays;

  //           // add holidays to years with correct days
  //           secondToLast.holidays.push({
  //             days: currentYearDays - 1, // -1 for the flight day
  //             location: holiday.location,
  //             start: holiday.start,
  //             end: holiday.end
  //           })

  //           last.holidays.push({
  //             days: nextYearDays + 1, // +1 for the flight day
  //             location: holiday.location,
  //             start: holiday.start,
  //             end: holiday.end
  //           })
  //         }
  //       } else {
  //         // add new year
  //         this.post2016holiday.push({
  //           start: start,
  //           end: end,
  //           holidays: [holiday]
  //         })
  //       }
  //     }
  //   }
  // },
  // mounted() {
  //   this.checkIfPre2016()
  //   this.getPre2016visas()
  //   this.getPost2016holiday()
  // }
}
</script>

<style lang="scss" scoped>
.small {
  font-size: 12px;
}

.inner {
  width: 85%;
  margin: auto;
}


.year-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
