<template>
  <section class="user-profile content">
    <div class="title">
      <h1>Let's talk about your visa. <br>(2/2)</h1>
    </div>
    
    <FormulateForm>
      <FormulateInput
        v-model="form.newVisaOptions"
        type="radio"
        :options="{yes: 'yes', no: 'no', notSure: 'not sure yet'}"
        label="Are you looking to apply, extend, or switch to a new visa?"
        validation="required"
        class="grey-label user-info" />

      <div class="margin-top">
        <FormulateInput
          v-if="form.newVisaOptions === 'yes'"
          v-model="form.whichVisa"
          type="radio"
          :options="{yes: 'yes', no: 'no'}"
          label="Do you already know which visa you want to apply to?"
          validation="required"
          class="grey-label user-info" />
      </div>
    </FormulateForm>

    <div v-if="form.newVisaOptions" class="button">
      <button @click="submitForm" class="outline submit">
        Save
      </button>
    </div>
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

<style lang="scss" scoped>
br {
  display: none;
}

@media screen and (min-width: 700px) {
  br {
    display: block;
  }
}
</style>
