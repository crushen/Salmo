<template>
  <div class="margin-s top">
    <p>Please base the following details by the official announcements of the airports on the day of your travel!</p>

    <FormulateForm @submit="submitForm" class="margin-m top">
      <FormulateInput
        v-model="form.country"
        type="select"
        :options="makeOptions(countries)"
        label="destination country:"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.city"
        type="text"
        label="destination city (optional):"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.leftUk"
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
        v-model="form.returnedUk"
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
  </div>
</template>

<script>
import { countries } from '@/assets/js/countries'

export default {
  props: {
    profileToUpdate: { type: Object, required: true }
  },
  data() {
    return {
      countries,
      holiday: this.profileToUpdate.holiday,
      form: {
        country: null,
        city: null,
        leftUk: null,
        returnedUk: null,
        days: null,
        overstayDays: null,
        within_28: null,
        reason: {
          haveReason: null,
          reason: null,
          note: null
        }
      }
    }
  },
  methods: {
    calculateDays(start, end) {
      const dt1 = new Date(start),
            dt2 = new Date(end),
            days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
            
      return days - 1
    },
    submitForm() {
      this.form.days = this.calculateDays(this.form.leftUk, this.form.returnedUk)
      this.profileToUpdate.holiday.push(this.form)

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('cancel'))
    },
    cancel() {
      this.$emit('cancel')
    },
    // Validations
    customDateDeparture({ value }) {
      if(this.form.leftUk && this.form.returnedUk) {
        return value < this.form.returnedUk
      } else {
        return true
      }
    },
    customDateArrival({ value }) {
      if(this.form.returnedUk && this.form.leftUk) {
        return value > this.form.leftUk
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.holiday.length && this.form.leftUk && this.form.returnedUk) {
        this.holiday.forEach(holiday => {
          if(this.form.leftUk < holiday.leftUk && holiday.leftUk < this.form.returnedUk) {
            valid = false
          }

          if(this.form.leftUk < holiday.returnedUk && holiday.returnedUk < this.form.returnedUk) {
            valid = false
          }

          if(holiday.leftUk < this.form.leftUk && this.form.returnedUk < holiday.returnedUk) {
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

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 105px;
  }
}
</style>