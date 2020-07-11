<template>
  <div>
    <transition name="modal" mode="out-in">
      <add-holiday 
        v-if="modalOpen"
        @closeModal="modalOpen = false" />
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
        <h3>Result</h3>
        <div v-if="!user.profile.holiday.length">
          <p>Once you've entered your holiday, your results will appear here.</p>
        </div>

        <div v-else>
          <div class="date">
            <p>2019 - 90 Days</p>
          </div>
          <p>You only have <span>27 days</span> left to take away this year, or you risk not qualifying for the 10 year permanent residency.</p>
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
      post2016: []
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    sortByDate() {
      const array = this.user.profile.holiday;
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse();
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
    date(oldDate) {
      const newDate = oldDate.split('-');
      return newDate.reverse().join('/');
    },
    checkIfPre2016() {
      // Check if the date is before november 2016 & group those that are and aren't
      const nov2016 = new Date(2016, 10, 1); // month is 0 indexed, so 10 = nov
      this.sortByDate.forEach(holiday => {
        if(new Date (holiday.start) < nov2016) {
          this.pre2016.push(holiday);
        } else {
          this.post2016.push(holiday);
        }
      });
    }
  },
  mounted() {
    this.checkIfPre2016();
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
