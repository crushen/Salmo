<template>
  <section class="content">
    <h1>Complete your profile</h1>

    <FormulateForm @submit="submitForm">
      <FormulateInput
        v-model="form.name"
        type="text"
        label="full name"
        validation="required" />

      <FormulateInput
        v-model="form.birthday"
        type="date"
        label="birthday"
        validation="bail|required|date" />

      <FormulateInput
        v-model="form.nationality"
        type="select"
        :options="makeOptions(countries)"
        label="nationality"
        validation="required"
        placeholder="Select an option" />

      <FormulateInput
        v-model="form.currentVisa.name"
        type="select"
        :options="makeOptions(visaOptions)"
        label="current visa"
        validation="required"
        placeholder="Select an option" />

      <FormulateInput
        v-model="form.currentVisa.start"
        type="date"
        label="start"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value < form.currentVisa.end}"
        :validation-messages="{customDate: 'Start date must be before end date'}"
        error-behavior="submit" />

      <FormulateInput
        v-model="form.currentVisa.end"
        type="date"
        label="end"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value > form.currentVisa.start}"
        :validation-messages="{customDate: 'End date must be after start date'}"
        error-behavior="submit" />

      <FormulateInput
        v-model="form.dependants"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="do you have dependants?"
        validation="required" />

      <FormulateInput
        type="submit"
        label="Next"/>
    </FormulateForm>
  </section>
</template>

<script>
import { countries } from '@/assets/js/countries'
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  props: { form: { type: Object, required: true } },
  data() {
    return {
      user: this.$store.state.auth.user,
      countries,
      visaOptions
    }
  },
  watch: {
    'form.birthday'(date) { 
      this.form.age = this.calculateAge(new Date(date))
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    makeOptions(array) {
      return Object.assign({}, ...array.map(key => ({[key]: key})))
    },
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age-- }
      this.age = age

      return age
    },
    submitForm() {
      this.profileToUpdate.name = this.form.name
      this.profileToUpdate.birthday = this.form.birthday
      this.profileToUpdate.age = this.form.age
      this.profileToUpdate.nationality = this.form.nationality
      this.profileToUpdate.dependants = this.form.dependants
      this.profileToUpdate.currentVisa = this.form.currentVisa

      this.$store.commit('auth/setUserProfile', this.profileToUpdate)
      this.$emit('nextStage')

      window.scrollTo(0, 0)
    }
  }
}
</script>
