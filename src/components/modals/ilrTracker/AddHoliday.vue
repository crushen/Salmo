<template>
  <base-modal @closeModal="closeModal">
    <h1>Add Holiday</h1>

    <FormulateForm @submit="handleSubmit" class="margin-m top">
      <FormulateInput
        v-model="holiday.location.country"
        type="text"
        label="country"
        class="grey-label"
        validation="required" />

      <FormulateInput
        v-model="holiday.location.city"
        type="text"
        label="city"
        class="grey-label"
        validation="required" />

      <FormulateInput
        v-model="holiday.start"
        type="date"
        label="start"
        validation="required"
        class="grey-label" />

      <FormulateInput
        v-model="holiday.end"
        type="date"
        label="end"
        validation="required"
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
      holiday: {
        location: {
          country: null,
          city: null
        },
        start: null,
        end: null,
        days: null
      }
    }
  },
  methods: {
    calculateDays(start, end) {
      const dt1 = new Date(start),
            dt2 = new Date(end);

      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
    },
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.holiday.days = this.calculateDays(this.holiday.start, this.holiday.end)
      this.$emit('submitModal', this.holiday)
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
