<template>
  <section>
    <h1>What is your plan in the uk?</h1>

    <form @submit.prevent="validateForm">
      <div>
        <h2 for="planning-to">
          I'm planning to...
          <span>(you can chose as many as you want!)</span>
        </h2>

        <div class="field">
          <label class="container" for="study">study</label>

          <pretty-check 
            v-model="planningTo.study"
            id="study"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>

        <div class="field">
          <label class="container" for="work">work</label>

          <pretty-check 
            v-model="planningTo.work"
            id="work"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>

        <div class="field">
          <label class="container" for="business">start a business</label>

          <pretty-check 
            v-model="planningTo.startBusiness"
            id="business"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>

        <div class="field">
          <label class="container" for="love">find love</label>

          <pretty-check 
            v-model="planningTo.findLove"
            id="love"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>

        <div class="field">
          <label class="container" for="not-sure">not sure yet! see how it goes</label>

          <pretty-check 
            v-model="planningTo.notSure"
            id="not-sure"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>
      </div>

      <div>
        <h2>Get permanent residency?</h2>

        <div>
          <pretty-radio
            v-model="permanentResidency"
            value="yes"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            yes
          </pretty-radio>

          <pretty-radio
            v-model="permanentResidency"
            value="no"
            class="p-smooth p-default p-round radio"
            color="primary-o">
            no
          </pretty-radio>
        </div>
      </div>

      <input type="submit" value="Next">
    </form>

    <p v-if="error">Must select if you're planning for permanent residency</p>

  </section>
</template>

<script>
import prettyRadio from 'pretty-checkbox-vue/radio'
import prettyCheck from 'pretty-checkbox-vue/check'

export default {
  components: {
    prettyRadio,
    prettyCheck
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      planningTo: {
        study: false,
        work: false,
        startBusiness: false,
        findLove: false,
        notSure: false
      },
      permanentResidency: null,
      error: false
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    validateForm() {
      if(this.permanentResidency) {
        this.profileToUpdate.permanentResidency = this.permanentResidency

        const planningArray = Object.keys(this.planningTo).filter(val => this.planningTo[val] !== false)
        if(planningArray.length) {
          this.profileToUpdate.planningTo = planningArray
        }

        this.$store.commit('auth/setUserProfile', this.profileToUpdate)
        this.$emit('nextStage')
        window.scrollTo(0, 0)
      } else {
        this.error = true
      }
    }
  }
}
</script>
