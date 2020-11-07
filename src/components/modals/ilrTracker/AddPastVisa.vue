<template>
  <base-modal @closeModal="closeModal">
    <h1>Add Visa</h1>

    <FormulateForm @submit="handleSubmit" class="margin-m top">
      <FormulateInput
        v-model="visa.name"
        type="select"
        :options="visaOptions"
        label="visa name"
        placeholder="select an option"
        class="grey-label" />

      <FormulateInput
        v-model="visa.start"
        type="date"
        label="start"
        validation="customDateStart|overlappedDates|overlappedWithCurrentVisa"
        :validation-rules="{customDateStart, overlappedDates, overlappedWithCurrentVisa}"
        :validation-messages="{
          customDateStart: 'Start date must be before end date',
          overlappedDates: 'Past visas can not overlap',
          overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
        }"
        class="grey-label" />

      <FormulateInput
        v-model="visa.end"
        type="date"
        label="end"
        validation="customDateEnd|overlappedDates|overlappedWithCurrentVisa"
        :validation-rules="{customDateEnd, overlappedDates, overlappedWithCurrentVisa}"
        :validation-messages="{
          customDateEnd: 'End date must be after start date',
          overlappedDates: 'Past visas can not overlap',
          overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
        }"
        class="grey-label" />

      <div class="btn-container">
        <FormulateInput
          type="submit"
          label="Save"
          class="button margin-s top" />
      </div>
    </FormulateForm>
  </base-modal>
</template>

<script>
import { visaOptions } from '@/assets/js/visaOptions'
import baseModal from '@/components/modals/BaseModal'

export default {
  props: {
    user: { type: Object, required: true }
  },
  components: { baseModal },
  data() {
    return {
      visaOptions,
      visa: {
        name: null,
        start: null,
        end: null
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.visa)
    },
    customDateStart({ value }) {
      if(this.visa.start && this.visa.end) {
        return value < this.visa.end
      } else {
        return true
      }
    },
    customDateEnd({ value }) {
      if(this.visa.end && this.visa.start) {
        return value > this.visa.start
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.user.profile.pastVisas.length && this.visa.end && this.visa.start) {
        this.user.profile.pastVisas.forEach(visa => {
          if(this.visa.start < visa.start && visa.start < this.visa.end) {
            valid = false
          }

          if(this.visa.start < visa.end && visa.end < this.visa.end) {
            valid = false
          }

          if(visa.start < this.visa.start && this.visa.end < visa.end) {
            valid = false
          }
        })
      }

      return valid
    },
    overlappedWithCurrentVisa() {
      let valid = true

      if(this.visa.start < this.user.profile.currentVisa.start && this.user.profile.currentVisa.start < this.visa.end) {
        valid = false
      }

      if(this.visa.start < this.user.profile.currentVisa.end && this.user.profile.currentVisa.end < this.visa.end) {
        valid = false
      }

      if(this.user.profile.currentVisa.start < this.visa.start && this.visa.end < this.user.profile.currentVisa.end) {
        valid = false
      }

      return valid
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.button {
  text-align: right;
}
</style>
