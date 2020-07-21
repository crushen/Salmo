<template>
  <div>
    <transition name="modal" mode="out-in">
      <add-holiday 
        v-if="modalOpen"
        @closeModal="modalOpen = false"
        @addHoliday="updateHoliday" />

      <edit-holiday 
        v-if="editOpen"
        :holiday="sortByDate"
        :index="index"
        @closeModal="editOpen = false, editHoliday = false;"
        @updateHoliday="updateHoliday" />
    </transition>

    <transition name="alert" mode="out-in">
      <alert 
        v-if="showAlert"
        alert="Delete Holiday"
        text="Are you sure you want to delete this holiday?"
        :buttons="['Cancel', 'Delete Holiday']"
        @cancel="showAlert = false"
        @confirm="deleteHoliday" />
    </transition>

    <div class="card">
      <div class="title">
        <h3>Holiday Tracker & Calculator</h3>
      </div>

      <div class="body">
        <p class="text">To gain Indefinite Leave to Remain and eventually become a British Citizen, there are rules you’ll need to follow around absenses from the UK, to ensure you qualify.</p>
        <p v-if="!user.profile.holiday.length">Let’s get started! First enter in all the dates you’ve left the UK (including the dates of travel) and we will take care of the rest...</p>
        <div class="holiday-input">
          <div v-if="user.profile.holiday.length">
            <div
              v-for="(item, index) in sortByDate"
              :key="index"
              class="item">
              <p class="location">{{ item.location }}</p>
              <p class="dates">{{ date(item.start) }} - {{ date(item.end) }}</p>

              <div v-if="editHoliday" class="edit-delete">
                <button
                  @click="openEdit(index)"
                  class="tertiary">
                  Edit
                </button>
                <button 
                  @click="openAlert(index)"
                  class="tertiary">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div class="add-holiday">
            <button 
              @click="openModal"
              class="pink"
              :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
              Add Holiday
            </button>

            <button
              v-if="user.profile.holiday.length"
              @click="editHoliday = true"
              class="secondary">
              Edit Holiday
            </button>
          </div>
        </div>
      </div>

      <div class="result">
        <div class="description">
          <p><b>How is this calculated?</b></p>
          <p class="margin">To qualify for ILR, you are only allowed <b>180</b> days of absence per rolling 12 month periods starting from the date of your first holiday. However any dates pre Nov 2016 will be calculated on a fixed 12 months from the date of your visa start.</p>

          <div class="button">
            <button class="tertiary">
              Read More...
            </button>
          </div>
        </div>

        <div>
          <div
            v-if="!user.profile.holiday.length"
            class="holiday-result">
            <p><b>Add a holiday to see your results here.</b></p>
          </div>

          <section v-if="pre2016.length">
            <!-- <h3 class="underline">Before November 2016</h3>
            <p>Your pr is calculated per year from the start date of your visa, so you can only take 180 days per year from the start date of the visa you were on at the time.</p> -->

            <div
              v-for="visa in pre2016visas"
              :key="visa.start">
              <!-- <h3>{{ visa.name }}</h3>
              <p>Visa start date - {{ new Date(visa.start).toDateString() }}</p> -->

              <div 
                v-for="(year, index) in visa.years"
                :key="index"
                class="year holiday-result">
                <p>{{ visa.name }}</p>
                <b>{{ jsDate(year.start) }} - {{ year.totalDays }} days in total</b>

                <div v-for="holiday in year.holidays"
                  :key="holiday.location">
                  {{ holiday.location }} - {{ holiday.days }} days
                </div>
              </div>
            </div>
          </section>

          <section v-if="post2016holiday.length">
            <!-- <h3 class="underline">From November 2016</h3>
            <p>Your pr is calculated on a 12 month basis, so you can only take 180 days within a 12 month period.</p> -->

            <div
              v-for="year in post2016holiday"
              :key="year.start.toString()"
              class="holiday-result">
              <p>{{ year.visa }}</p>
              <b>{{ jsDate(year.start) }} - {{ year.totalDays }} days in total</b>
              <div 
                v-for="(holiday, index) in year.holidays"
                :key="index"
                class="year">
                {{ holiday.location }} - {{ holiday.days }} days
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addHoliday from '@/components/profile/prCalc/AddHoliday';
import editHoliday from '@/components/profile/prCalc/EditHoliday';
import alert from '@/components/Alert';
import waveV from '@/assets/patterns/wave-verticle.svg';

export default {
  components: {
    addHoliday,
    editHoliday,
    alert
  },
  data() {
    return {
      waveV,
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
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    sortByDate() {
      const array = this.user.profile.holiday;
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse();
    },
    getDaysInYearPre2016(array) {
      const total = array.reduce((prev, cur) => prev + cur.days, 0);
      return total;
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true;
      this.showOverlay();
    },
    updateHoliday() {
      this.checkIfPre2016();
      this.getPre2016visas();
      this.getPost2016holiday();
    },
    openEdit(index) {
      this.editOpen = true;
      this.index = index;
      this.showOverlay();
    },
    openAlert(index) {
      this.showAlert = true; 
      this.index = index;
      this.showOverlay();
    },
    deleteHoliday() {
      this.showAlert = false;
      this.editHoliday = false;
      this.sortByDate.splice(this.index, 1);
      this.$store.dispatch('prCalc/editHoliday', this.sortByDate);
      this.updateHoliday();
    },
    showOverlay() {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';
    },
    date(oldDate) {
      const newDate = oldDate.split('-');
      return newDate.reverse().join('/');
    },
    jsDate(date) {
      return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    },
    checkIfPre2016() {
      // reset arrays
      this.pre2016 = [];
      this.post2016 = [];
      // Check if the date is before november 2016 & group those that are and aren't
      const nov2016 = new Date(2016, 10, 1); // month is 0 indexed, so 10 = nov
      this.sortByDate.forEach(holiday => {
        if(new Date (holiday.start) < nov2016) {
          this.pre2016.push(holiday);
        } else {
          this.post2016.push(holiday);
        }
      });
    },
    removeDuplicates(array, prop) {
      // store the comparison  values in array
      const unique =  array.map(e => e[prop])
      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the false indexes & return unique objects
      .filter((e) => array[e]).map(e => array[e]);

      return unique;
    },
    getPre2016visas() {
      // Pre nov 2016, users get 180 holiday days per year from the visa start date
      // Find out which visa they were on for each holiday pre Nov 2016
      // Then add those start dates to array & check that user only takes 180 days per year from those dates
      const years = [];
      this.pre2016.forEach(holiday => {
        this.user.profile.pastVisas.forEach(visa => {
          if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
            years.push({
              name: visa.name,
              start: visa.start,
              end: visa.end,
              holidays: []
            });
          }
        })
        // Add holiday to corresponding visa
        years.forEach(visa => {
          if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
            visa.holidays.push(holiday);
          }
        })
      })
      // remove duplicates
      this.pre2016visas = this.removeDuplicates(years, 'start');
      this.getHolidayForEachYearPre2016();
    },
    getHolidayForEachYearPre2016() {
      this.pre2016visas.forEach(visa => {
        visa.years = [];
        // get difference in years between start and end date
        const yearsDiff =  new Date(visa.end).getFullYear() - new Date(visa.start).getFullYear();
        // add start and end date for every year between
        for(let i = 0; i < yearsDiff; i++) {
          const start = new Date(visa.start).setFullYear(new Date(visa.start).getFullYear() + i);
          visa.years.push({
            start: new Date(start),//.toDateString()
            end: new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 1)),//.toDateString()
            holidays: []
          });
        }
        // add holidays that are inbetween those years
        visa.years.forEach((year, i) => {
          visa.holidays.forEach(holiday => {
            if(new Date(holiday.start) > new Date(year.start) && new Date(holiday.start) < new Date(year.end)) {
              // check if the holiday goes over the end of the year
              if(new Date(holiday.start) > new Date(year.start) && new Date(holiday.end) > new Date(year.end)) {
                const totalDays = holiday.days,
                      dt1 = new Date(holiday.start),
                      dt2 = new Date(year.end),
                      currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
                      nextYearDays = totalDays - currentYearDays;
                // only add days in the current year
                visa.years[i].holidays.push({
                  days: currentYearDays - 1, // -1 for the flight day
                  location: holiday.location,
                  start: holiday.start,
                  end: holiday.end
                });
                // add holiday with remaining days to next year
                if(i !== visa.years.length) {
                  visa.years[i + 1].holidays.push({
                    days: nextYearDays + 1, // +1 for the flight day
                    location: holiday.location,
                    start: holiday.start,
                    end: holiday.end
                  });
                } else {
                  visa.years.push({
                    start: new Date(new Date(year.start).setFullYear(new Date(year.start).getFullYear() + 1)),
                    end: new Date(new Date(year.start).setFullYear(new Date(year.start).getFullYear() + 2)),
                    holidays: []
                  }).then(() => {
                    visa.years[i + 1].holidays.push({
                      days: nextYearDays + 1, // +1 for the flight day
                      location: holiday.location,
                      start: holiday.start,
                      end: holiday.end
                    });
                  })
                }
              } else {
                // otherwise add holiday as normal
                visa.years[i].holidays.push(holiday);
              }
            } 
          })
          // add all holiday days per year
          year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0);
        })
        // remove years that don't have any holiday days
        visa.years = visa.years.filter(year => year.totalDays);
      })
    },
    getPost2016holiday() {
      // Post nov 2016, users get 180 holiday days per year on a rolling basis
      this.post2016holiday = [];
      while (this.post2016.length) {
        this.getHolidayForEachYearPost2016();
      }
      // add all holiday days per year
      this.post2016holiday.forEach(year => {
        year.totalDays = year.holidays.reduce((prev, cur) => prev + cur.days, 0);
        // first check if they were on a visa whilst holiday takes place, and get visa name
        const currentVisa = this.user.profile.currentVisa;
        let yearVisa = null;
        if(new Date(year.start) > new Date(currentVisa.start) && new Date(year.end) < new Date(currentVisa.end)) {
          yearVisa = currentVisa.name;
        } else {
          this.user.profile.pastVisas.forEach(visa => {
            if(new Date(year.start) > new Date(visa.start) && new Date(year.end) < new Date(visa.end)) {
              yearVisa = visa.name;
            }
          })
        }
        if(!yearVisa) {
          yearVisa = 'No visa detected - this holiday will not effect your ILR'
        }
        year.visa = yearVisa;
      })
    },
    getHolidayForEachYearPost2016() {
      // get holiday from start of array
      const holiday = this.post2016.shift(),
            start = new Date(holiday.start),
            end = new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 1));
      // create first holiday obj if array is empty
      if(!this.post2016holiday.length) {
        this.post2016holiday.push({
          start: start,
          end: end,
          holidays: [holiday]
        })
      } else {
        const prevYear = this.post2016holiday[this.post2016holiday.length - 1];
        // check if holiday started in prev year
        if(new Date(holiday.start) > new Date(prevYear.start) && new Date(holiday.start) < new Date(prevYear.end)) {
          // check if it ended within the year
          if(new Date(holiday.start) > new Date(prevYear.start) && new Date(holiday.end) < new Date(prevYear.end)) {
            prevYear.holidays.push(holiday);
          } else {
            const totalDays_1 = holiday.days,
                  dt1_1 = new Date(start),
                  dt2_1 = new Date(prevYear.end),
                  currentYearDays_1 = Math.floor((Date.UTC(dt2_1.getFullYear(), dt2_1.getMonth(), dt2_1.getDate()) - Date.UTC(dt1_1.getFullYear(), dt1_1.getMonth(), dt1_1.getDate())) / (1000 * 60 * 60 * 24)),
                  nextYearDays_1 = totalDays_1 - currentYearDays_1;
            // get year start and end sate for following year, should be one year on from prev year
            const startDate = new Date(start.setDate(start.getDate() + currentYearDays_1));
            const endDate = new Date(end.setDate(end.getDate() + currentYearDays_1));
            // push year to 2016 holidays
            this.post2016holiday.push({
              start: startDate,
              end: endDate,
              holidays: []
            })
            // get last two years to add split holidays to
            const last = this.post2016holiday[this.post2016holiday.length - 1],
                  secondToLast = this.post2016holiday[this.post2016holiday.length - 2];
            // get days for split holiday
            const totalDays = holiday.days,
                  dt1 = new Date(holiday.start),
                  dt2 = new Date(secondToLast.end),
                  currentYearDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)),
                  nextYearDays = totalDays - currentYearDays;
            // add holidays to years with correct days
            secondToLast.holidays.push({
                days: currentYearDays - 1, // -1 for the flight day
                location: holiday.location,
                start: holiday.start,
                end: holiday.end
            })
            last.holidays.push({
                days: nextYearDays + 1, // +1 for the flight day
                location: holiday.location,
                start: holiday.start,
                end: holiday.end
            })
          }
        } else {
          // add new year
          this.post2016holiday.push({
            start: start,
            end: end,
            holidays: [holiday]
          })
        }
      }
    }
  },
  mounted() {
    this.checkIfPre2016();
    this.getPre2016visas();
    this.getPost2016holiday();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.modal-enter,
.modal-leave-to {
  transform: translate(-50%, -55%);
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: 0.6s;
}

.card {
  background: white;
  border: 4px solid $primary-yellow;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;

  .title {
    background: $primary-yellow;
    text-align: center;
    padding: $spacing;
  }

  .body {
    padding: $spacing*3 $spacing*2;

    .text {
      margin-bottom: $spacing*2;
    }
  }
}

.holiday-input {
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: $spacing;
    margin-top: $spacing;
    background: $lightest-grey;
    border-radius: 4px;

    .location {
      font-weight: 600;
    }

    .edit-delete {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      margin-top: $spacing*2;
      
      button {
        color: $primary-pink;
      }
    }
  }
}

.add-holiday {
  margin-top: $spacing*3;
  //text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.result {
  background: $primary-yellow;
  padding: $spacing*3 $spacing*2;

  h3 {
    margin-bottom: $spacing*2;
  }

  .description {
    margin-bottom: $spacing*4;

    .button {
      margin-top: $spacing*4;
      text-align: center;
    }
  }

  .date {
    background: darken($primary-yellow, 12%);
    padding: 6px 8px;
    border-radius: 4px;
    margin: $spacing 0 $spacing*2 0;

    &:first-of-type {
      margin: 0 0 $spacing*2 0;
    }

    p {
      font-size: 22px;
      font-family: 'mrs-eaves-roman-all-small-ca', $serif;
    } 
  }

  span {
    font-weight: 600;
  }

  .holiday-result {
    margin-top: $spacing*2;
    background: darken($color: $primary-yellow, $amount: 10%);
    border-radius: 4px;
    padding: $spacing;

    h3 {
      color: $primary-pink;
      text-decoration: underline;
    }

    .year {
      margin: $spacing 0;
    }
  }
}

.underline {
  text-decoration: underline;
}

.margin {
  margin-top: $spacing*2;
}

// Tablet
@media screen and (min-width: 600px) {
  .card {
    .body {
      min-height: 240px;
    }

    .result {
      min-height: 215px;
    }
  }
}
</style>
