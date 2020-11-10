<template>
  <section class="user-profile content">
    <div class="title">
      <h1>What is your plan in the UK? <br>(1/2)</h1>
    </div>

    <FormulateForm>
      <FormulateInput
        v-model="form.planningTo"
        type="checkbox"
        :options="{study: 'study', work: 'work', business: 'start a business', notSure: 'not sure yet! see how it goes'}"
        label="I'm planning to..."
        class="grey-label user-info" />

      <div class="margin-top">
        <FormulateInput
          v-if="form.planningTo.length"
          v-model="form.permanentResidency"
          type="radio"
          :options="{yes: 'yes', no: 'no'}"
          label="Get permanent residency?"
          validation="required"
          class="grey-label user-info" />
      </div>
    </FormulateForm>

    <div v-if="form.permanentResidency" class="button">
      <button @click="submitForm" class="outline submit">
        Next
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
      this.profileToUpdate.permanentResidency = this.form.permanentResidency
      this.profileToUpdate.planningTo = this.form.planningTo

      this.$store.commit('auth/setUserProfile', this.profileToUpdate)
      this.$emit('nextStage')

      window.scrollTo(0, 0)
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
