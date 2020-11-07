<template>
  <div>
    <transition name="dialog" mode="out-in">
      <edit-preferences
        v-if="editingPrefs"
        @closeModal="editingPrefs = false"
        @submitModal="handleEdit"
        @add-past-visa="addPastVisa"
        @edit-past-visa="editPastVisa"
        @delete-past-visa="deletePastVisa"
        :profileToUpdate="profileToUpdate"
        :user="user" />
    </transition>

    <transition name="dialog" mode="out-in">
      <edit-past-visa
        v-if="editingPastVisa"
        @closeModal="editingPastVisa = false, visaToEdit = null, visaIndex = null"
        @submitModal="handleEditVisa"
        :visa="visaToEdit"
        :user="user" />
    </transition>

    <transition name="dialog" mode="out-in">
      <delete-alert
        v-if="deletingVisa"
        @confirm="handleDelete"
        @cancel="deletingVisa = false, deleteIndex = null" />
    </transition>

    <div class="tools-card first">
      <div class="header">
        <h2>10 Year Plan</h2>

        <button @click="editingPrefs = true" class="none">
          <img src="@/assets/icons/red/edit.svg" alt="">
        </button>
      </div>
      
      <div class="inner">
        <p>This tracker will help you record your travel days outside the UK and does the maths to let you know how many days left you can travel.</p> 

        <p class="margin-s top small">Indefinite Leave to Remain requires the applicant to only leave the country for certain amount of days within either 5 or 10 years.</p>
      </div>
    </div>

    <travel-log />

    <results class="margin-m top" />

    <pr-calc />
  </div>
</template>

<script>
import travelLog from '@/components/ilrTracker/TravelLog'
import results from '@/components/ilrTracker/Results'
import editPreferences from '@/components/modals/ilrTracker/EditPreferences'
import editPastVisa from '@/components/modals/ilrTracker/EditPastVisa'
import deleteAlert from '@/components/alerts/ilrTracker/Delete'

import prCalc from '@/components/profile/prCalc/PrCalculator'

export default {
  components: { travelLog, results, prCalc, editPreferences, editPastVisa, deleteAlert },
  data() {
    return {
      user: this.$store.state.auth.user,
      editingPrefs: false,
      editingPastVisa: false,
      visaToEdit: null,
      visaIndex: null,
      deletingVisa: false,
      deleteIndex: null
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    handleEdit(form) {
      this.editingPrefs = false
      this.profileToUpdate.ilrPlan = form.selectedPlan

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
    },
    handleEditVisa(visa) {
      this.profileToUpdate.pastVisas[this.visaIndex] = visa
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)

      this.editingPastVisa = false
      this.visaToEdit = null
      this.visaIndex = null
    },
    addPastVisa() {
      console.log('add')
    },
    editPastVisa(index) {
      this.visaToEdit = this.user.profile.pastVisas[index]
      this.editingPastVisa = true
      this.visaIndex = index
    },
    deletePastVisa(index) {
      this.deleteIndex = index
      this.deletingVisa = true
    },
    handleDelete(index) {
      this.profileToUpdate.pastVisas.splice(index, 1)
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)

      this.deletingVisa = false
      this.deleteIndex = null
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.tools-card {
  &.first {
    background: transparent;
  }
}
</style>
