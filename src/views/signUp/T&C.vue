<template>
  <main class="content page padding top">
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
  min-height: 115vh;
}

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 370px;
  right: 0;
}

.scroll-container {
  overflow-y: scroll;
  border-radius: 0.5em;
  width: 100%;
  height: 250px;
  color: $light-font;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: $light-font, $alpha: 0.8);
    border-radius: 5px;
  }
}

.form {
  width: 100%;
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

@media screen and (min-width: 700px) {
  h1 {
    top: 480px;
  }

  .scroll-container {
    height: 350px;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }
  }

  .button {
    margin-top: 4rem;
  }
}

@media screen and (min-width: 1200px) {
  h1 {
    top: 440px;
  }

  .page {
    &.padding {
      &.top {
        padding-top: 80px;
      }
    }
  }

  .scroll-container {
    height: 300px;
  }

  form {
    max-width: none;
  }
}
</style>
