<template>
  <section class="page padding top bottom">
    <h1 class="content margin-s bottom">Profile</h1>

    <profile-card :user="user" />

    <div class="content status-title margin-m top">
      <h2>My Visa</h2>

      <button
        v-if="user.profile.nextVisa.name"
        @click="visaEditIsOpen = true"
        class="none">
        <img src="@/assets/icons/red/edit.svg" alt="">
      </button>

      <transition name="dialog" mode="out-in">
        <visa-edit
          v-if="visaEditIsOpen"
          @closeModal="confirmingClose = true"
          @submitModal="saveNextVisa"
          :profileToUpdate="profileToUpdate" />
      </transition>
    </div>
    
    <div
      v-if="!user.profile.nextVisa.name"
      class="content button-center">
      <button
        @click="visaSelectIsOpen = true"
        class="margin-l top bottom primary">
        Choose my next visa
      </button>
    </div>

    <div v-else class="timeline">
      <status-timeline 
        :user="user"
        :prepDate="prepDate" />
    </div>

    <transition name="dialog" mode="out-in">
      <visa-select
        v-if="visaSelectIsOpen"
        @closeModal="confirmingClose = true"
        @submitModal="saveNextVisa"
        :profileToUpdate="profileToUpdate" />
    </transition>

    <visa-dates-card
      :endDate="endDate"
      :daysLeft="daysLeft" />

    <h2 class="content margin-m top">Tools</h2>

    <tools :user="user" />

    <!-- Alerts -->
    <transition name="dialog" mode="out-in">
      <close-alert
        v-if="confirmingClose"
        @confirm="confirmClose"
        @cancel="confirmingClose = false" />
    </transition>
  </section>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard'
import visaDatesCard from '@/components/profile/VisaDatesCard'
import statusTimeline from '@/components/profile/StatusTimeline'
import tools from '@/components/profile/Tools'

import visaSelect from '@/components/modals/visa-choices/Select'
import visaEdit from '@/components/modals/visa-choices/Edit'
import closeAlert from '@/components/alerts/visaChoices/Close'

import { documentChecklist } from '@/assets/js/documentChecklist'

export default {
  props: { user: { required: true, type: Object } },
  components: {
    profileCard,
    visaDatesCard,
    statusTimeline,
    tools,
    visaSelect,
    visaEdit,
    closeAlert
  },
  data() {
    return {
      visaSelectIsOpen: false,
      visaEditIsOpen: false,
      confirmingClose: false,
      confirmingChange: false,
      nextVisa: null,
      documentChecklist
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    },
    endDate() {
      const date = this.user.profile.currentVisa.end.split('-'),
            year = date[0].split('').slice(-2).join('');

      date[0] = year
      return date.reverse().join('/')
    },
    prepDate() {
      const timeStamp =  new Date(this.user.profile.currentVisa.end),
            minusThreeMonths = timeStamp.setMonth(timeStamp.getMonth() - 3),
            date = new Date(minusThreeMonths);

      return date
    },
    daysLeft() {
      const date1 = new Date(),
            date2 = new Date(this.prepDate);
      
      const Difference_In_Time = date2.getTime() - date1.getTime(),
            Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Math.floor(Difference_In_Days)
    }
  },
  methods: {
    saveNextVisa(selected) {
      this.profileToUpdate.nextVisa.name = selected

      const checklistObj = this.documentChecklist.find(item => item.name === selected)
      this.profileToUpdate.nextVisa.documentChecklist = checklistObj.checklist

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.visaSelectIsOpen = false
      this.visaEditIsOpen = false
    },
    confirmClose() {
      this.visaSelectIsOpen = false
      this.visaEditIsOpen = false
      this.confirmingClose = false
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

.timeline {
  overflow: visible;
}
</style>