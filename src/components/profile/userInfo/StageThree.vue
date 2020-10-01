<template>
  <section>
    <h1>Let's talk about your visa.</h1>

    <form @submit.prevent="validateForm">
      <div>
        <h2>Are you looking to apply, extend, or switch to a new visa?</h2>

        <div>
          <pretty-radio
            v-model="newVisaOptions"
            value="yes"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            yes
          </pretty-radio>

          <pretty-radio
            v-model="newVisaOptions"
            value="no"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            no
          </pretty-radio>

          <pretty-radio
            v-model="newVisaOptions"
            value="not-sure"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            not sure yet
          </pretty-radio>
        </div>
      </div>

      <div v-if="newVisaOptions === 'yes'">
        <h2>Do you already know which visa you want to apply to?</h2>

        <div>
          <pretty-radio
            v-model="whichVisa"
            value="yes"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            yes
          </pretty-radio>

          <pretty-radio
            v-model="whichVisa"
            value="no"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            no
          </pretty-radio>
        </div>
      </div>

      <input type="submit" value="Next">
    </form>

    <p v-if="error">You must select an option.</p>
  </section>
</template>

<script>
import prettyRadio from 'pretty-checkbox-vue/radio'

export default {
  components: {
    prettyRadio
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      newVisaOptions: null,
      whichVisa: null,
      error: null
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    validateForm() {
      if(this.newVisaOptions !== null) {
        this.profileToUpdate.newVisaOptions = this.newVisaOptions
        if(this.whichVisa) {
          this.profileToUpdate.whichVisa = this.whichVisa
        }
        
        this.$store.commit('auth/setUserProfile', this.profileToUpdate)
        this.$emit('nextStage')
      } else {
        this.error = true
      }
    }
  }
}
</script>
