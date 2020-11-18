<template>
  <section class="user-profile content">
    <div class="title">
      <h1>Complete your profile</h1>
    </div>

    <FormulateForm>
      <FormulateInput
        v-model="form.name"
        type="text"
        label="full name"
        validation="required"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.birthday"
        type="date"
        label="birthday"
        validation="bail|required|date"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.nationality"
        type="select"
        :options="makeOptions(countries)"
        label="nationality"
        validation="required"
        placeholder="select an option"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.currentVisa.name"
        type="select"
        :options="visaOptions"
        label="current visa name"
        placeholder="select an option"
        validation="required"
        class="grey-label user-info" />


      <FormulateInput
        v-model="form.currentVisa.start"
        type="date"
        label="valid from"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value < form.currentVisa.end}"
        :validation-messages="{customDate: 'Start date must be before end date'}"
        error-behavior="submit"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.currentVisa.end"
        type="date"
        label="valid to"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value > form.currentVisa.start}"
        :validation-messages="{customDate: 'End date must be after start date'}"
        error-behavior="submit"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.currentVisa.appliedDate"
        type="date"
        label="date applied (the day you submitted your application online)"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value < form.currentVisa.start}"
        :validation-messages="{customDate: 'Applied date must be before start date'}"
        error-behavior="submit"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.currentVisa.locationApplied"
        type="select"
        :options="makeOptions(countries)"
        label="where did you apply?"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="grey-label user-info" />

      <FormulateInput
        v-model="form.currentVisa.entryDate"
        type="date"
        label="date entered the UK (only if you applied for your visa from your home country)"
        error-behavior="submit"
        class="grey-label user-info" />

      <div class="margin-top">
        <FormulateInput
          v-model="form.dependants"
          type="radio"
          :options="{yes: 'yes', no: 'no'}"
          label="do you have dependants?"
          validation="required"
          class="grey-label user-info" />
      </div>
    </FormulateForm>

    <div class="button">
      <button @click="submitForm" class="outline submit">
        Next
      </button>
    </div>
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
