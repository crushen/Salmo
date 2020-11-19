<template>
  <div>
    <ul class="travel-log margin-s top">
      <li
        v-for="(year, yearIndex) in allHolidayYears"
        :key="yearIndex"
        @click="toggleYear(yearIndex)"
        :class="{
          'invalid': year.invalid,
          'selected': selected === yearIndex,
          'editing': editHolidays
        }"
        aria-label="Expand year to see holidays"
        class="year">
        <p v-if="selected !== yearIndex" class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>
        <div v-else>
          <p class="year-text"><b>{{ year.startDate.getFullYear() }}</b></p>

          <ul class="holiday-list">
            <li
              v-for="(holiday) in year.holidays"
              :key="holiday.leftUk"
              class="holiday"
              @click="handleEditHoliday(holiday)">
              <b>{{ holiday.country }}</b> from {{ date(holiday.leftUk) }} to {{ date(holiday.returnedUk) }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true },
    editHolidays: { type: Boolean, required: true },
    allHolidayYears: { type: Array, required: true }
  },
  data() {
    return {
      selected: null
    }
  },
  methods: {
    toggleYear(index) {
      if(!this.editHolidays) {
        this.selected === index ? this.selected = null : this.selected = index
      } else {
        if(this.selected !== index) {
          this.selected = index
        }
      }
    },
    handleEditHoliday(holiday) {
      if(this.editHolidays) {
        this.$emit('editHoliday', holiday)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.travel-log {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .year {
    width: 48%;
    background: #D4E7ED;
    margin-top: 0.5rem;
    border: 4px solid #D4E7ED;
    border-radius: $radius;
    padding: 0.2rem 1rem;
    text-align: center;
    cursor: pointer;

    b {
      font-weight: 500;
    }

    .year-text {
      font-size: 18px;
      padding: 0 0.5rem;
    }

    .holiday-list {
      margin-top: 0.5rem;
    }

    .holiday {
      border-radius: $radius;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
    }

    &:nth-of-type(odd) {
      background: white;
    }

    &.editing {
      border: 4px solid $red;
      background: white;

      p, h2 {
        color: $red;
      }

      .holiday {
        transition: 0.2s;

        &:hover {
          background: $red;

          p, h2 {
            color: $light-font;
          }
        }
      }
    }

    &.invalid {
      background: $med-grey;
      border: 4px solid $med-grey;
      text-decoration: line-through;

      &.editing {
        text-decoration-color: #979797;
        border: 4px solid #979797;
        background: white;

        p, h2 {
          color:  #979797;
        }

        .holiday {
          transition: 0.2s;

          &:hover {
            background:  #979797;
          }
        }
      }
    }

    &.selected {
      width: 100%;
      text-align: left;
    }
  }
}
</style>
