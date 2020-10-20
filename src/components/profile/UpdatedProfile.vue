<template>
  <section class="page padding top bottom">
    <h1 class="content margin-s bottom">Profile</h1>

    <profile-card :user="user" />

    <div class="content status-title margin-m top">
      <h2>{{ statusText }}</h2>

      <button
        v-if="user.profile.nextVisa"
        @click="toggleModal"
        class="none">
        <img src="@/assets/icons/edit.svg" alt="">
      </button>
    </div>
    
    <div
      v-if="!user.profile.nextVisa"
      class="content button-center">
      <button
        @click="toggleModal"
        class="margin-l top bottom primary">
        Choose my next visa
      </button>
    </div>

    <div v-else class="content margin-s bottom" >
      <status-timeline :user="user" />
    </div>

    <transition name="dialog" mode="out-in">
      <visa-choices
        v-if="modalIsOpen"
        @closeModal="confirmingClose = true"
        @submitModal="saveVisa" />
    </transition>

    <visa-dates-card :user="user" />

    <h2 class="content margin-m top">Tools</h2>

    <tools :user="user" />

    <!-- Alerts -->
    <transition name="dialog" mode="out-in">
      <close-alert
        v-if="confirmingClose"
        @confirm="confirmClose"
        @cancel="confirmingClose = false" />
    </transition>

    <transition name="dialog" mode="out-in">
      <change-alert
        v-if="confirmingChange"
        @confirm="confirmChange"
        @cancel="confirmingChange = false"
        :user="user"
        :profileToUpdate="profileToUpdate" />
    </transition>
  </section>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard'
import visaDatesCard from '@/components/profile/VisaDatesCard'
import visaChoices from '@/components/modals/VisaChoices'
import statusTimeline from '@/components/profile/StatusTimeline'
import tools from '@/components/profile/Tools'

import closeAlert from '@/components/alerts/visaChoices/Close'
import changeAlert from '@/components/alerts/visaChoices/Change'

import { documentChecklist } from '@/assets/js/documentChecklist'

export default {
  props: { user: { required: true, type: Object } },
  components: {
    profileCard,
    visaDatesCard,
    visaChoices,
    statusTimeline,
    tools,
    closeAlert,
    changeAlert
  },
  data() {
    return {
      modalIsOpen: false,
      confirmingClose: false,
      confirmingChange: false,
      documentChecklist
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    },
    statusText() {
      if(this.user.profile.nextVisa) {
        return 'My Status'
      } else {
        return 'My Visa'
      }
    }
  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
    saveVisa(form) {
      if(form.nextVisa) {
        this.profileToUpdate.nextVisa = {}
        this.profileToUpdate.nextVisa.name = form.nextVisa

        const checklistObj = this.documentChecklist.find(item => item.name === form.nextVisa)
        this.profileToUpdate.nextVisa.documentChecklist = checklistObj.checklist

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

<style lang="scss" scoped>
.status-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>