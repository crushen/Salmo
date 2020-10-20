<template>
  <section class="content page padding top">
    <h1 class="margin-s bottom">Profile</h1>

    <profile-card :user="user" />

    <h2 class="margin-s top">{{ statusText }}</h2>
    
    <div
      v-if="!user.profile.nextVisa"
      class="button-center">
      <button
        @click="toggleModal"
        class="margin-l top bottom primary">
        Choose my next visa
      </button>
    </div>

    <div v-else>
      <p>You're Here</p>
    </div>

    <transition name="dialog" mode="out-in">
      <visa-choices
        v-if="modalIsOpen"
        @closeModal="confirmingClose = true"
        @submitModal="saveVisa" />
    </transition>

    <visa-dates-card class="dates-card" :user="user" />

    <h2 class="margin-s top">Tools</h2>

    <tools :user="user" />

    <button @click="showLogoutAlert = true">
      Sign Out
    </button>

    <!-- Alerts -->
    <div id="overlay" />

    <transition name="dialog" mode="out-in">
      <logout-alert
        v-if="showLogoutAlert"
        @confirm="handleLogout"
        @cancel="showLogoutAlert = false" />
    </transition>

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
import tools from '@/components/profile/Tools'

import logoutAlert from '@/components/alerts/logout/ConfirmLogout'
import closeAlert from '@/components/alerts/visaChoices/Close'
import changeAlert from '@/components/alerts/visaChoices/Change'

import { documentChecklist } from '@/assets/js/documentChecklist'

export default {
  props: { user: { required: true, type: Object } },
  components: {
    profileCard,
    visaDatesCard,
    visaChoices,
    tools,
    logoutAlert,
    closeAlert,
    changeAlert
  },
  data() {
    return {
      modalIsOpen: false,
      confirmingClose: false,
      confirmingChange: false,
      showLogoutAlert: false,
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
    },
    handleLogout() {
      this.showLogoutAlert = false

      setTimeout(() => {
        this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$store. commit('auth/setLoggedOut')
          this.$store.commit('wave/setWaveAway', false)
          this.$store.commit('wave/setFullScreen', false)
          this.$store.dispatch('wave/handleTransition')

          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
      }, 800)
    }
  }
}
</script>
