<template>
  <div>
    <transition name="modal" mode="out-in">
      <add-holiday 
        v-if="modalOpen"
        @closeModal="modalOpen = false"
        @addHoliday="addHoliday" />
    </transition>

    <div class="card">
      <div class="title">
        <h3>Permanent residency calculator</h3>
      </div>

      <div class="body">
        <p class="text">Enter in your time outside the UK here, and the calculator will work out how many more days you have left to take.</p>
        <div class="holiday-input">
          <div v-if="user.profile.holiday.length">
            <div
              v-for="(item, index) in sortByDate"
              :key="index"
              class="item">
              <p class="location">{{ item.location }}</p>
              <p class="dates">{{ date(item.start) }} - {{ date(item.end) }}</p>
            </div>
          </div>

          <div class="add-holiday">
            <button 
              @click="openModal"
              class="pink"
              :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
              Add Holiday
            </button>
          </div>
        </div>
      </div>

      <div class="result">
        <h3>Results</h3>
        <div v-if="!user.profile.holiday.length">
          <p>Once you've entered your holiday, your results will appear here.</p>
        </div>

        <div v-else>
          <section v-if="pre2016.length">
            <h3 class="underline">Before November 2016</h3>
            <p>Your pr is calculated per year from the start date of your visa, so you can only take 180 days per year from the start date of the visa you were on at the time.</p>

            <div
              v-for="visa in pre2016visas"
              :key="visa.start"
              class="holiday-result">
              <h3>{{ visa.name }}</h3>
              <p>Visa start date - {{ new Date(visa.start).toDateString() }}</p>

              <div 
                v-for="(year, index) in visa.years"
                :key="index"
                class="year">
                <b>Year from {{ year.start.toDateString() }}.. total days taken: {{ year.totalDays }}</b>

                <div v-for="holiday in year.holidays"
                  :key="holiday.location">
                  {{ holiday.location }} - {{ holiday.days }} days
                </div>
              </div>
            </div>
          </section>

          <section v-if="post2016holiday.length">
            <h3 class="underline">From November 2016</h3>
            <p>Your pr is calculated on a 12 month basis, so you can only take 180 days within a 12 month period.</p>

            <div
              v-for="year in post2016holiday"
              :key="year.yearStart.toString()"
              class="holiday-result">
              <b>Year from {{ year.yearStart.toDateString() }}.. total days taken: {{ year.totalDays }}</b>
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
import waveV from '@/assets/patterns/wave-verticle.svg';

export default {
  components: {
    addHoliday
  },
  data() {
    return {
      modalOpen: false,
      waveV,
      pre2016: [],
      post2016: [],
      pre2016visas: [],
      post2016holiday: []
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
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';
    },
    addHoliday() {
      this.checkIfPre2016();
      this.getPre2016visas();
      this.getPost2016holiday();
    },
    date(oldDate) {
      const newDate = oldDate.split('-');
      return newDate.reverse().join('/');
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
      const array = [];
      this.pre2016.forEach(holiday => {
        this.user.profile.pastVisas.forEach(visa => {
          if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
            array.push({
              name: visa.name,
              start: visa.start,
              end: visa.end,
              holidays: []
            });
          }
        })
        // Add holiday to corresponding visa
        array.forEach(visa => {
          if(new Date(holiday.start) > new Date(visa.start) && new Date(holiday.end) < new Date(visa.end)) {
            visa.holidays.push(holiday);
          }
        })
      })
      // remove duplicates
      this.pre2016visas = this.removeDuplicates(array, 'start');
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
            if(new Date(holiday.start) > new Date(year.start) && new Date(holiday.end) < new Date(year.end)) {
              visa.years[i].holidays.push(holiday);
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
      this.post2016holiday = [];
      while (this.post2016.length) {
        this.getHolidayForEachYearPost2016();
      }
    },
    getHolidayForEachYearPost2016() {
      // Post nov 2016, users get 180 holiday days within a 12 month period
      // Take the first holiday start date, find any holiday taken for a year since that date
      // Repeat for any holiday that's after that time frame
      const holiday = this.post2016.shift();
      const start = new Date(holiday.start);
      const end = new Date(new Date(start).setFullYear(new Date(start).getFullYear() + 1));
      // create year obj
      const holidayYear = {
        yearStart: start,
        yearEnd: end,
        holidays: []
      }
      // push original holiday as it is within that year
      holidayYear.holidays.push(holiday);
      // check if remaining holidays are within time frame, if yes add to holiday array
      const filteredHoliday = this.post2016.filter(item => new Date(item.start) > start && new Date(item.start) < end);
      // and remove from original array
      this.post2016 = this.post2016.filter(item => new Date(item.start) > end);
      // add filtered holiday to holidayYear holiday array
      holidayYear.holidays = holidayYear.holidays.concat(filteredHoliday);
      // add total days
      holidayYear.totalDays = holidayYear.holidays.reduce((prev, cur) => prev + cur.days, 0);
      this.post2016holiday.push(holidayYear);
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
    justify-content: space-between;
    padding: 4px 6px;
    margin-top: $spacing;
    background: $lightest-grey;
    border-radius: 4px;

    .location {
      font-weight: 600;
    }
  }
}

.add-holiday {
  margin-top: $spacing*3;
  text-align: center;
}

.result {
  background: $primary-yellow;
  padding: $spacing*3 $spacing*2;

  h3 {
    margin-bottom: $spacing*2;
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

  section {
    margin: $spacing*4 0;
  }

  .holiday-result {
    margin-top: $spacing*2;

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
