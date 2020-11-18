<template>
  <FormulateForm @submit="submitForm" class="margin-s top">
    <FormulateInput
      v-model="form.pastVisa.name"
      type="select"
      :options="visaOptions"
      label="visa name"
      placeholder="select an option"
      validation="required"
      error-behavior="submit"
      class="grey-label" />

    <FormulateInput
      v-model="form.pastVisa.start"
      type="date"
      label="valid from"
      validation="bail|required|customDateStart|overlappedDates|overlappedWithCurrentVisa"
      :validation-rules="{customDateStart, overlappedDates, overlappedWithCurrentVisa}"
      :validation-messages="{
        customDateStart: 'Valid from must be before valid to date',
        overlappedDates: 'Past visas can not overlap',
        overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
      }"
      error-behavior="submit"
      class="grey-label" />

    <FormulateInput
      v-model="form.pastVisa.end"
      type="date"
      label="valid to"
      validation="bail|required|customDateEnd|overlappedDates|overlappedWithCurrentVisa"
      :validation-rules="{customDateEnd, overlappedDates, overlappedWithCurrentVisa}"
      :validation-messages="{
        customDateEnd: 'Valid to date must be after valid from date',
        overlappedDates: 'Past visas can not overlap',
        overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
      }"
      error-behavior="submit"
      class="grey-label" />

    <FormulateInput
      v-model="form.pastVisa.appliedDate"
      type="date"
      label="date applied (the day you submitted your application online)"
      validation="bail|required|beforeStartDate"
      :validation-rules="{beforeStartDate}"
      :validation-messages="{
        beforeStartDate: 'Date applied must be before valid from date'
      }"
      error-behavior="submit"
      class="grey-label" />

    <FormulateInput
      v-model="form.pastVisa.locationApplied"
      type="select"
      :options="makeOptions(countries)"
      label="where did you apply?"
      placeholder="select an option"
      validation="required"
      error-behavior="submit"
      class="grey-label" />

    <div class="margin-l top">
      <FormulateInput
        v-model="form.pastVisa.entryDate"
        type="date"
        label="date entered the UK (only if you applied for your visa from your home country)"
        error-behavior="submit"
        class="grey-label" />
    </div>

    <div class="btn-container">
      <FormulateInput
        type="submit"
        label="Add Visa"
        error-behavior="submit"
        class="primary-button margin-m top" />

      <button @click="$emit('cancel')" class="outline">
        Cancel
      </button>
    </div>
  </FormulateForm>
</template>

<script>
import { visaOptions } from '@/assets/js/visaOptions'
import { countries } from '@/assets/js/countries'

export default {
  props: {
    profileToUpdate: { type: Object, required: true }
  },
  data() {
    return {
      visaOptions,
      countries,
      form: {
        pastVisa: {
          name: null,
          start: null,
          end: null,
          appliedDate: null,
          locationApplied: null,
          entryDate: null
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.profileToUpdate.pastVisas.push(this.form.pastVisa)
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('cancel'))
    },
    // Validations
    customDateStart({ value }) {
      if(this.form.pastVisa.start && this.form.pastVisa.end) {
        return value < this.form.pastVisa.end
      } else {
        return true
      }
    },
    customDateEnd({ value }) {
      if(this.form.pastVisa.end && this.form.pastVisa.start) {
        return value > this.form.pastVisa.start
      } else {
        return true
      }
    },
    beforeStartDate({ value }) {
      if(this.form.pastVisa.appliedDate) {
        return value < this.form.pastVisa.start
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.profileToUpdate.pastVisas.length && this.form.pastVisa.end && this.form.pastVisa.start) {
        this.profileToUpdate.pastVisas.forEach(visa => {
          if(this.form.pastVisa.start < visa.start && visa.start < this.form.pastVisa.end) {
            valid = false
          }

          if(this.form.pastVisa.start < visa.end && visa.end < this.form.pastVisa.end) {
            valid = false
          }

          if(visa.start < this.form.pastVisa.start && this.form.pastVisa.end < visa.end) {
            valid = false
          }
        })
      }

      return valid
    },
    overlappedWithCurrentVisa() {
      let valid = true

      if(this.form.pastVisa.start < this.profileToUpdate.currentVisa.start && this.profileToUpdate.currentVisa.start < this.form.pastVisa.end) {
        valid = false
      }

      if(this.form.pastVisa.start < this.profileToUpdate.currentVisa.end && this.profileToUpdate.currentVisa.end < this.form.pastVisa.end) {
        valid = false
      }

      if(this.profileToUpdate.currentVisa.start < this.form.pastVisa.start && this.form.pastVisa.end < this.profileToUpdate.currentVisa.end) {
        valid = false
      }

      return valid
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.btn-container {
  text-align: right;

  button {
    min-width: 120px;
  }
}
</style>