<template>
  <main class="content padding top">
    <h1>Terms and Conditions</h1>

    <section class="scroll-container">
      <terms />
    </section>
    
    <FormulateForm @submit="acceptTerms" class="form">
      <FormulateInput
        v-model="accepted"
        type="checkbox"
        label="I accept the terms and conditions listed above."
        validation="required"
        class="terms" />

      <FormulateInput
        type="submit"
        label="Next"
        class="button" />
    </FormulateForm>
  </main>
</template>

<script>
import terms from '@/components/TermsAndConditions'

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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  min-height: 110vh;
}

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 330px;
  right: 0;
}

.scroll-container {
  overflow: scroll;
  border-radius: 0.5em;
  width: 100%;
  height: 250px;
  color: $light-font; 
}

.form {
  position: absolute;
  bottom: 60px;
  left: 0;
}

.button {
  text-align: right;
}

@media screen and (min-width: 370px) {
  .content {
    min-height: 100vh;
  }
}
</style>
