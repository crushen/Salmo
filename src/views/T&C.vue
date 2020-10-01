<template>
  <section>
    <terms />

    <h1>Terms and Conditions</h1>

    <div class="field">
      <label class="container" for="terms">I accept the terms and conditions listed above.</label>

      <pretty-check 
        v-model="accepted"
        id="terms"
        class="p-icon p-smooth" 
        color="danger">
        <i slot="extra" class="icon fa fa-check"></i>
      </pretty-check>
    </div>

    <div class="button">
      <button 
        @click="acceptTerms"
        :class="accepted ? 'pink' : 'disabled'">
        Next
      </button>
    </div>
  </section>
</template>

<script>
import terms from '@/components/profile/TermsAndConditions';
import prettyCheck from 'pretty-checkbox-vue/check';

export default {
  components: {
    terms,
    prettyCheck
  },
  data() {
    return {
      accepted: false
    }
  },
  methods: {
    acceptTerms() {
      if(this.accepted) {
        this.$store.dispatch('auth/sendEmailVerification')
        this.$router.push({ name: 'verify-email' })
      }
    }
  }
}
</script>
