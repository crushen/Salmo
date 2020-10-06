<template>
  <section class="content">
    <h1>Profile</h1>

    <profile-card :user="user" />

    <h2>My Status</h2>
    
    <button @click="toggleModal">Choose my next visa</button>

    <visa-choices
      v-if="modalIsOpen"
      @closeModal="confirmingClose = true"
      @submitModal="saveVisa" />

    <visa-dates-card class="dates-card" :user="user" />

    <h2>Tools</h2>

    <tools :user="user" />

    <!-- Alerts -->
    <close-alert
      v-if="confirmingClose"
      @confirm="confirmClose"
      @cancel="confirmingClose = false" />

    <change-alert
      v-if="confirmingChange"
      @confirm="confirmChange"
      @cancel="confirmingChange = false"
      :user="user"
      :profileToUpdate="profileToUpdate" />
  </section>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard'
import visaDatesCard from '@/components/profile/VisaDatesCard'
import visaChoices from '@/components/modals/VisaChoices'
import tools from '@/components/profile/Tools'

import closeAlert from '@/components/alerts/visaChoices/Close'
import changeAlert from '@/components/alerts/visaChoices/Change'

export default {
  props: { user: { required: true, type: Object } },
  components: { profileCard, visaDatesCard, visaChoices, tools, closeAlert, changeAlert },
  data() {
    return {
      modalIsOpen: false,
      confirmingClose: false,
      confirmingChange: false
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
    saveVisa(form) {
      if(form.nextVisa) {
        this.profileToUpdate.nextVisa = form.nextVisa

        if(form.interestedVisas) {
          this.profileToUpdate.interestedVisas = form.interestedVisas
        }

        if(this.user.profile.nextVisa) {
          this.confirmingChange = true
        } else {
          this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
          this.toggleModal()
        }
      }
    },
    confirmClose() {
      this.toggleModal()
      this.confirmingClose = false
    },
    confirmChange() {
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.toggleModal()
      this.confirmingChange = false
    }
  }
}
</script>
