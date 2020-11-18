<template>
  <base-modal @closeModal="closeModal">
    <h1>Edit Account</h1>

    <FormulateForm @submit="handleSubmit" class="margin-m top">
      <FormulateInput
        v-model="form.name"
        type="text"
        label="Full Name"
        validation="required"
        class="grey-label" />

      <FormulateInput
        v-model="form.username"
        type="text"
        label="username"
        validation="bail|required|min:6|max:10"
        class="grey-label" />

      <FormulateInput
        v-model="form.birthday"
        type="date"
        label="birthday"
        validation="bail|required|date"
        class="grey-label" />

      <FormulateInput
        v-model="form.currentVisa.name"
        type="select"
        :options="visaOptions"
        label="current visa name"
        placeholder="select an option"
        validation="required"
        class="grey-label" />


      <FormulateInput
        v-model="form.currentVisa.start"
        type="date"
        label="valid from"
        validation="bail|required|date|customDate|afterPastVisas"
        :validation-rules="{
          customDate: ({ value }) => value < form.currentVisa.end,
          afterPastVisas: ({ value }) => value >= user.profile.pastVisas[user.profile.pastVisas.length -1].end 
        }"
        :validation-messages="{
          customDate: 'Start date must be before end date',
          afterPastVisas: 'Current visa must be after past visas'
        }"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.currentVisa.end"
        type="date"
        label="valid to"
        validation="bail|required|date|customDate|afterPastVisas"
        :validation-rules="{
          customDate: ({ value }) => value > form.currentVisa.start,
          afterPastVisas: ({ value }) => value > user.profile.pastVisas[user.profile.pastVisas.length -1].end 
        }"
        :validation-messages="{
          customDate: 'End date must be after start date',
          afterPastVisas: 'Current visa must be after past visas'
        }"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.currentVisa.appliedDate"
        type="date"
        label="date applied (the day you submitted your application online)"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value < form.currentVisa.start}"
        :validation-messages="{customDate: 'Applied date must be before start date'}"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.currentVisa.locationApplied"
        type="select"
        :options="makeOptions(countries)"
        label="where did you apply?"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.currentVisa.entryDate"
        type="date"
        label="date entered the UK (only if you applied for your visa from your home country)"
        error-behavior="submit"
        class="grey-label" />

      <FormulateInput
        v-model="form.dependants"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="do you have dependants?"
        validation="required"
        class="grey-label" />

      <FormulateInput
        type="submit"
        label="Save"
        class="button margin-m top" />
    </FormulateForm>
  </base-modal>
</template>

<script>
import baseModal from '@/components/modals/BaseModal'
import { countries } from '@/assets/js/countries'
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  props: {
    profileToUpdate: { required: true, type: Object },
    user: { required: true, type: Object }
  },
  components: { baseModal },
  data() {
    return {
      countries,
      visaOptions,
      form: {
        name: this.profileToUpdate.name,
        username: this.profileToUpdate.username,
        birthday: this.profileToUpdate.birthday,
        currentVisa: this.profileToUpdate.currentVisa,
        dependants: this.profileToUpdate.dependants
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  text-align: right;
}
</style>
