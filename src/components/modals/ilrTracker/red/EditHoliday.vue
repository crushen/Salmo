<template>
  <base-tip @closeModal="closeModal">
    <h1>Edit This Trip</h1>

    <FormulateForm @submit="submitForm" class="margin-m top">
      <FormulateInput
        v-model="holiday.country"
        type="select"
        :options="makeOptions(countries)"
        label="destination country:"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="holiday.city"
        type="text"
        label="destination city (optional):"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="holiday.leftUk"
        type="date"
        label="left the uk on:"
        validation="bail|required|customDateDeparture|overlappedDates"
        :validation-rules="{customDateDeparture, overlappedDates}"
        :validation-messages="{
          customDateDeparture: 'Start date must be before end date',
          overlappedDates: 'Holiday dates cannot overlap',
        }"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="holiday.returnedUk"
        type="date"
        label="returned to the uk on:"
        validation="bail|required|customDateArrival|overlappedDates"
        :validation-rules="{customDateArrival, overlappedDates}"
        :validation-messages="{
          customDateArrival: 'End date must be after start date',
          overlappedDates: 'Holiday dates cannot overlap',
        }"
        error-behavior="submit"
        class="white-label" />

      <button
        @click.prevent="deleteHoliday"
        class="tertiary margin-m top">
        Delete This Trip
      </button>

      <div class="buttons">
        <FormulateInput
          type="submit"
          label="Save"
          error-behavior="submit"
          class="white margin-m top" />

        <button
          @click.prevent="closeModal"
          class="primary">
          Cancel
        </button>
      </div>
    </FormulateForm>
  </base-tip>
</template>

<script>
import { cloneDeep } from 'lodash'
import { countries } from '@/assets/js/countries'
import baseTip from '@/components/modals/ilrTracker/red/BaseTip'

export default {
  props: {
    holidayToEdit: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  components: { baseTip },
  data() {
    return {
      countries,
      holiday: cloneDeep(this.holidayToEdit)
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    submitForm() {
      const holidays = this.profileToUpdate.holiday,
            index = holidays.findIndex(item => item.country === this.holidayToEdit.country && item.leftUk === this.holidayToEdit.leftUk);
      
      this.holiday.days = this.calculateDays(this.holiday.leftUk, this.holiday.returnedUk)
      holidays[index] = this.holiday

      this.$store.dispatch('prCalc/editHoliday', holidays)
      .then(() => this.$emit('closeModal'))
    },
    deleteHoliday() {
      const holidays = this.profileToUpdate.holiday,
            index = holidays.findIndex(item => item.country === this.holiday.country && item.leftUk === this.holiday.leftUk);

      holidays.splice(index, 1)

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('closeModal'))
    },
    calculateDays(start, end) {
      const dt1 = new Date(start),
            dt2 = new Date(end);

      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)) - 2
    },
    // Validations
    customDateDeparture({ value }) {
      if(this.holiday.leftUk && this.holiday.returnedUk) {
        return value < this.holiday.returnedUk
      } else {
        return true
      }
    },
    customDateArrival({ value }) {
      if(this.holiday.returnedUk && this.holiday.leftUk) {
        return value > this.holiday.leftUk
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.holiday.length && this.holiday.leftUk && this.holiday.returnedUk) {
        this.holiday.forEach(holiday => {
          if(this.holiday.leftUk < holiday.leftUk && holiday.leftUk < this.holiday.returnedUk) {
            valid = false
          }

          if(this.holiday.leftUk < holiday.returnedUk && holiday.returnedUk < this.holiday.returnedUk) {
            valid = false
          }

          if(holiday.leftUk < this.holiday.leftUk && this.holiday.returnedUk < holiday.returnedUk) {
            valid = false
          }
        })
      }

      return valid
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1,
.tertiary {
  color: white;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tertiary {
  color: white;
  font-size: 20px;
}

.primary {
  border: 3px solid white;

  &:hover {
    background: white;
    color: $red;
  }
}
</style>
