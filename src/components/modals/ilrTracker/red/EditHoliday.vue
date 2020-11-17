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
        class="grey-label" />

      <FormulateInput
        v-model="holiday.city"
        type="text"
        label="destination city (optional):"
        error-behavior="submit"
        class="grey-label" />

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
        class="grey-label" />

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
        class="grey-label" />

      <button class="tertiary margin-m top">
        Delete This Trip
      </button>

      <div class="buttons">
        <FormulateInput
          type="submit"
          label="Save"
          error-behavior="submit"
          class="primary-button margin-m top" />

        <button
          @click.prevent="cancel"
          class="outline">
          Cancel
        </button>
      </div>
    </FormulateForm>
  </base-tip>
</template>

<script>
import baseTip from '@/components/modals/ilrTracker/red/BaseTip'
import { countries } from '@/assets/js/countries'

export default {
  props: {
    holiday: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  components: { baseTip },
  data() {
    return {
      countries
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    submitForm() {
      const holidays = this.profileToUpdate.holiday,
            index = holidays.findIndex(item => item.country === this.holiday.country && item.leftUk === this.holiday.leftUk);
      
      this.holiday.days = this.calculateDays(this.holiday.leftUk, this.holiday.returnedUk)
      holidays[index] = this.holiday

      this.$store.dispatch('prCalc/editHoliday', holidays)
      .then(() => this.$emit('closeModal'))
    },
    calculateDays(start, end) {
      const dt1 = new Date(start),
            dt2 = new Date(end);
            
      // -2 to take off the two travel days
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

</style>
