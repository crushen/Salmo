<template>
  <section>
    <terms />

    <h1>Terms and Conditions</h1>

    <FormulateForm @submit="acceptTerms">
      <FormulateInput
        v-model="accepted"
        type="checkbox"
        label="I accept the terms and conditions listed above."
        validation="required" />

      <FormulateInput
        type="submit"
        label="Next"/>
    </FormulateForm>
  </section>
</template>

<script>
import terms from '@/components/profile/TermsAndConditions'

export default {
  components: { terms },
  data() {
    return { accepted: false }
  },
  methods: {
    acceptTerms() {
      if(this.accepted) {
        this.$router.push({ name: 'verify-email' })
      }
    }
  }
}
</script>
