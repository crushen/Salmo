<template>
  <section class="user-profile">
    <div class="title content">
      <h1>What is your plan in the UK? (1/2)</h1>
    </div>

    <FormulateForm
      @submit="submitForm"
      class="content">
      <FormulateInput
        v-model="form.planningTo"
        type="checkbox"
        :options="{study: 'study', work: 'work', business: 'start a business', notSure: 'not sure yet! see how it goes'}"
        label="I'm planning to..." />

      <FormulateInput
        v-model="form.permanentResidency"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="Get permanent residency?"
        validation="required" />

      <FormulateInput
        type="submit"
        label="Next"
        class="button" />
    </FormulateForm>
  </section>
</template>

<script>
export default {
  props: { form: { type: Object, required: true } },
  data() {
    return { user: this.$store.state.auth.user }
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
