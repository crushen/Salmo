<template>
  <section class="content">
    <h1>Let's talk about your visa.</h1>

    <FormulateForm @submit="submitForm">
      <FormulateInput
        v-model="form.newVisaOptions"
        type="radio"
        :options="{yes: 'yes', no: 'no', notSure: 'not sure yet'}"
        label="Are you looking to apply, extend, or switch to a new visa?"
        validation="required"  />

      <FormulateInput
        v-if="form.newVisaOptions === 'yes'"
        v-model="form.whichVisa"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="Do you already know which visa you want to apply to?"
        validation="required" />

      <FormulateInput
        type="submit"
        label="Save"/>
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
      this.profileToUpdate.newVisaOptions = this.form.newVisaOptions
      
      if(this.form.whichVisa) {
        this.profileToUpdate.whichVisa = this.form.whichVisa
      }

      this.$store.commit('auth/setUserProfile', this.profileToUpdate)
      this.$emit('nextStage')
    }
  }
}
</script>
