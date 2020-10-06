<template>
  <section class="content">
    <h1>Profile</h1>

    <profile-card :user="user" />

    <h2>My Status</h2>
    
    <button @click="toggleModal">Choose my next visa</button>

    <visa-choices
      v-if="modalIsOpen"
      @closeModal="toggleModal"
      @submitModal="saveVisa" />

    <visa-dates-card class="dates-card" :user="user" />

    <h2>Tools</h2>

    <tools :user="user" />
  </section>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard'
import visaDatesCard from '@/components/profile/VisaDatesCard'
import visaChoices from '@/components/modals/VisaChoices'
import tools from '@/components/profile/Tools'

export default {
  props: { user: { required: true, type: Object } },
  components: { profileCard, visaDatesCard, visaChoices, tools },
  data() {
    return {
      modalIsOpen: false
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
      this.profileToUpdate.nextVisa = form.nextVisa

      if(form.interestedVisas) {
        this.profileToUpdate.interestedVisas = form.interestedVisas
      }

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.toggleModal()
    }
  }
}
</script>
