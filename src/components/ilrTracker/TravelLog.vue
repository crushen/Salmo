<template>
  <div>
    <transition name="dialog" mode="out-in">
      <add-holiday
        v-if="addHolidayOpen"
        @closeModal="addHolidayOpen = false"
        @submitModal="addHoliday"
        :user="user" />
    </transition>

    <div class="tools-card empty">
      <div class="header">
        <h2>Travel Log</h2>

        <button @click="addHolidayOpen = true" class="none">
          <img src="@/assets/icons/red/plus.svg" alt="">
        </button>
      </div>

      <ul v-if="user.profile.holiday.length" class="holiday">
        <li
          v-for="(item, index) in sortByDate"
          :key="index"
          class="item">
          <p class="location">{{ item.location.city }},<br>{{ item.location.country }}</p>
          <p class="dates" :aria-label="`${item.location.country} start and end`">
            from {{ date(item.start) }}<br>to {{ date(item.end) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import addHoliday from '@/components/modals/ilrTracker/AddHoliday'
export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  components: { addHoliday },
  data() {
    return {
      addHolidayOpen: false
    }
  },
  computed: {
    sortByDate() {
      const array = this.user.profile.holiday
      return array.sort((a, b) => new Date(a.start) - new Date(b.start))
    }
  },
  methods: {
    date(date) {
      const newDate = date.split('-')
      return newDate.reverse().join('/')
    },
    addHoliday(holiday) {
      this.addHolidayOpen = false
      this.$store.dispatch('prCalc/addHoliday', holiday)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.holiday {
  padding: 0 26px 26px 26px;

  li {
    background: #D4E7ED;
    border: 4px solid #D4E7ED;
    border-radius: $radius;
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: space-between;

    &:not(:first-of-type) {
      margin-top: 0.5rem;
    }

    &:nth-of-type(even) {
      background: white;
    }

    .location {
      font-weight: 500;
    }

    .dates {
      text-align: right;
    }
  }
}
</style>
