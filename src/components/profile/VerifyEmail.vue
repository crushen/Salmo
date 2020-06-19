<template>
  <section>
    <div class="content terms" v-if="terms.show">
      <h1>Just one more thing...</h1>

      <p>Please accept our terms and conditions to continue.</p>

      <section class="scroll-container">
        <terms-and-conditions />
      </section>

      <div class="field">
        <label class="container" for="terms">I accept the terms and conditions listed above.</label>

        <pretty-check 
          v-model="terms.accepted"
          id="terms"
          class="p-icon p-smooth" 
          color="danger">
          <i slot="extra" class="icon fa fa-check"></i>
        </pretty-check>
      </div>

      <div class="button">
        <button 
          @click="acceptTerms"
          :class="terms.accepted ? 'pink' : 'disabled'">
          Continue
        </button>
      </div>
    </div>

    <div v-else>
      <div class="content">
        <h1>Verify your email.</h1>
        <h3>We've sent you an email to {{ user.email }} to verify your address.</h3>
        <p>Please click on the link in your email to begin setting up your account. Don't forget to check your junk/spam folders!</p>
        <p>If you've clicked the link and still see this message, try refreshing the page.</p>

        <img 
          src="@/assets/illustrations/alternateStates/phone.svg" 
          alt="an illustration of a person getting a notification on their phone">

        <p>Once you’ve completed your profile, you’ll unlock new features such as the Permanent Residency helper and Doucmentaion Checklist.</p>
      </div>

      <settings />
    </div>
  </section>
</template>

<script>
import termsAndConditions from '@/components/profile/TermsAndConditions';
import prettyCheck from 'pretty-checkbox-vue/check';
import settings from '@/components/profile/Settings';

export default {
  props: {
    user: { required: true, type: Object }
  },
  components: {
    termsAndConditions,
    prettyCheck,
    settings
  },
  data() {
    return {
      terms: {
        show: true,
        accepted: false
      }
    }
  },
  methods: {
    acceptTerms() {
      this.terms.show = false;
      window.scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

section {
  position: relative;
  z-index: 5;
}

.terms {
  padding-bottom: $spacing*10;

  .scroll-container {
    overflow: scroll;
    background: $background;
    padding: $spacing*2;
    border: 3px solid $light-grey;
    border-radius: 4px;
    width: 100%;
    height: 40vh; 
    margin: $spacing*4 0;
  }
}

h1 {
  margin-bottom: $spacing*4;
}

h3, p {
  margin-bottom: $spacing*2;
}

img {
  display: block;
  width: 45vw;
  max-width: 250px;
  margin: $spacing*6 auto;
}

.field {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: $spacing;
  font-size: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  label {
    @include font(16px, 300);
    color: $dark-font;
    width: 100%;
  }

  &:not(:first-of-type) {
    margin-top: $spacing*2;
  }
}

.button {
  margin-top: $spacing*4;
  text-align: center;
  
  button {
    transition: 0.3s;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .content {
    margin-top: $spacing*20;
  }

  .terms {
    .scroll-container {
      height: 25vh; 
    }
  }
}
</style>