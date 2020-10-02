<template>
  <section class="content">
    <h1>What is your plan in the UK?</h1>

    <FormulateForm @submit="submitForm">
      <FormulateInput
        v-model="form.planningTo"
        type="checkbox"
        :options="{study: 'study', work: 'work', business: 'start a business', notSure: 'not sure yet! see how it goes'}"
        label="I'm planning to...(you can choose as many as you want!)" />

      <FormulateInput
        v-model="form.permanentResidency"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="Get permanent residency?"
        validation="required" />

      <FormulateInput
        type="submit"
        label="Next"/>
    </FormulateForm>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      form: {
        planningTo: [],
        permanentResidency: null
      }
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    submitForm() {
      this.profileToUpdate.permanentResidency = this.form.permanentResidency
      this.profileToUpdate.planningTo = this.form.planningTo

      this.$store.commit('auth/setUserProfile', this.profileToUpdate)
      this.$emit('nextStage')

      window.scrollTo(0, 0)
    }
  }
}
</script>
