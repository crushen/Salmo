<template>
  <!-- <div>
    <transition name="dialog" mode="out-in">
      <edit-preferences
        v-if="editingPrefs"
        @closeModal="editingPrefs = false"
        @submitModal="handleEdit"
        @add-past-visa="addingPastVisa = true"
        @edit-past-visa="editPastVisa"
        @delete-past-visa="deletePastVisa"
        :profileToUpdate="profileToUpdate"
        :user="user" />
    </transition>

    <transition name="dialog" mode="out-in">
      <add-past-visa
        v-if="addingPastVisa"
        @closeModal="addingPastVisa = false"
        @submitModal="handleAddVisa"
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

    <travel-log :user="user" :profileToUpdate="profileToUpdate" />

    <results class="margin-m top" />

    <pr-calc />
  </div> -->




  

  <div>
    <transition name="dialog" mode="out-in">
      <delete-alert
        v-if="deletingVisa"
        @confirm="deleteVisa(deleteIndex), deletingVisa = false"
        @cancel="deletingVisa = false, deleteIndex = null" />
    </transition>

    <div class="tools-card">
      <h2 v-if="!pastVisas.length">Do you have any past visas?</h2>
      <h2 v-else>Here are your past visas :</h2>

      <div class="inner">
        <p v-if="!pastVisas.length" class="margin-s top">Please list out your previous visas if you already had some. Otherwise, please click 'Save' at the bottom of the page. </p>

        <div v-else>
          <ul class="past-visa-list margin-m top">
            <li
              v-for="(visa, index) in sortByDate"
              :key="visa.name">
              <div class="text">
                <p><b>{{ visa.name }}</b></p>
                <p>{{ date(visa.start) }} to {{ date(visa.end) }}</p>
              </div>

              <div class="buttons">
                <button @click="deletingVisa = true, deleteIndex = index" class="none">
                  <img src="@/assets/icons/red/cross.svg" alt="">
                </button>
              </div>
            </li>
          </ul>

          <button @click="showForm = true" class="none">
            <img src="@/assets/icons/red/plus.svg" alt="">
          </button>
        </div>


        <FormulateForm
          @submit="addVisa"
          v-if="showForm || !pastVisas.length"
          class="margin-m top">

          <FormulateInput
            v-model="form.pastVisa.name"
            type="select"
            :options="visaOptions"
            label="visa name"
            placeholder="select an option"
            validation="required"
            error-behavior="submit"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.start"
            type="date"
            label="valid from"
            validation="bail|required|customDateStart|overlappedDates|overlappedWithCurrentVisa"
            :validation-rules="{customDateStart, overlappedDates, overlappedWithCurrentVisa}"
            :validation-messages="{
              customDateStart: 'Start date must be before end date',
              overlappedDates: 'Past visas can not overlap',
              overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
            }"
            error-behavior="submit"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.end"
            type="date"
            label="valid to"
            validation="bail|required|customDateEnd|overlappedDates|overlappedWithCurrentVisa"
            :validation-rules="{customDateEnd, overlappedDates, overlappedWithCurrentVisa}"
            :validation-messages="{
              customDateEnd: 'End date must be after start date',
              overlappedDates: 'Past visas can not overlap',
              overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
            }"
            error-behavior="submit"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.appliedDate"
            type="date"
            label="date applied (the day you submitted your application online)"
            validation="bail|required|beforeStartDate"
            :validation-rules="{beforeStartDate}"
            :validation-messages="{
              beforeStartDate: 'Date must be before valid from date'
            }"
            error-behavior="submit"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.locationApplied"
            type="select"
            :options="makeOptions(countries)"
            label="where did you apply?"
            placeholder="select an option"
            validation="required"
            error-behavior="submit"
            class="grey-label" />

          <div class="margin-l top">
            <FormulateInput
              v-model="form.pastVisa.entryDate"
              type="date"
              label="date entered the UK (only if you applied for your visa from your home country)"
              error-behavior="submit"
              class="grey-label" />
          </div>

          <div class="btn-container">
            <FormulateInput
              type="submit"
              label="Add Visa"
              error-behavior="submit"
              class="button margin-m top" />
          </div>
        </FormulateForm>
      </div>
    </div>

    <div class="content btn-container margin-m top">
      <button @click="submitForm" class="primary">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { visaOptions } from '@/assets/js/visaOptions'
import { countries } from '@/assets/js/countries'
import deleteAlert from '@/components/alerts/ilrTracker/Delete'

export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  components: { deleteAlert },
  data() {
    return {
      visaOptions,
      countries,
      deletingVisa: false,
      deleteIndex: null,
      pastVisas: [],
      showForm: true,
      form: {
        pastVisa: {
          name: null,
          start: null,
          end: null,
          appliedDate: null,
          locationApplied: null,
          entryDate: null
        }
      }
    }
  },
  computed: {
    sortByDate() {
      const array = this.pastVisas
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse()
    }
  },
  methods: {
    date(date) {
      return date.split('-').reverse().join('/')
    },
    addVisa() {
      this.pastVisas.push(this.form.pastVisa)
      this.form.pastVisa = { name: null, start: null, end: null }
      this.showForm = false
    },
    deleteVisa(index) {
      this.pastVisas.splice(index, 1)
    },
    submitForm() {
      if(this.pastVisas) {
        this.profileToUpdate.pastVisas = this.pastVisas
        this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      }

      this.$emit('next-stage')
    },
    // Validations
    customDateStart({ value }) {
      if(this.form.pastVisa.start && this.form.pastVisa.end) {
        return value < this.form.pastVisa.end
      } else {
        return true
      }
    },
    customDateEnd({ value }) {
      if(this.form.pastVisa.end && this.form.pastVisa.start) {
        return value > this.form.pastVisa.start
      } else {
        return true
      }
    },
    beforeStartDate({ value }) {
      if(this.form.pastVisa.appliedDate) {
        return value < this.form.pastVisa.start
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.pastVisas.length && this.form.pastVisa.end && this.form.pastVisa.start) {
        this.pastVisas.forEach(visa => {
          if(this.form.pastVisa.start < visa.start && visa.start < this.form.pastVisa.end) {
            valid = false
          }

          if(this.form.pastVisa.start < visa.end && visa.end < this.form.pastVisa.end) {
            valid = false
          }

          if(visa.start < this.form.pastVisa.start && this.form.pastVisa.end < visa.end) {
            valid = false
          }
        })
      }

      return valid
    },
    overlappedWithCurrentVisa() {
      let valid = true

      if(this.form.pastVisa.start < this.user.profile.currentVisa.start && this.user.profile.currentVisa.start < this.form.pastVisa.end) {
        valid = false
      }

      if(this.form.pastVisa.start < this.user.profile.currentVisa.end && this.user.profile.currentVisa.end < this.form.pastVisa.end) {
        valid = false
      }

      if(this.user.profile.currentVisa.start < this.form.pastVisa.start && this.form.pastVisa.end < this.user.profile.currentVisa.end) {
        valid = false
      }

      return valid
    }
  }
}




// import travelLog from '@/components/ilrTracker/TravelLog'
// import results from '@/components/ilrTracker/Results'
// import editPreferences from '@/components/modals/ilrTracker/EditPreferences'
// import editPastVisa from '@/components/modals/ilrTracker/EditPastVisa'
// import addPastVisa from '@/components/modals/ilrTracker/AddPastVisa'
// import deleteAlert from '@/components/alerts/ilrTracker/Delete'

// import prCalc from '@/components/profile/prCalc/PrCalculator'

//export default {
  // // components: { travelLog, results, editPreferences, addPastVisa, editPastVisa, deleteAlert, prCalc },
  // data() {
  //   return {
  //     addingPastVisa: false,
  //     editingPrefs: false,
  //     editingPastVisa: false,
  //     visaToEdit: null,
  //     visaIndex: null,
  //     deletingVisa: false,
  //     deleteIndex: null
  //   }
  // },
  // computed: {
  //   user() {
  //     return this.$store.state.auth.user
  //   },
  //   profileToUpdate() { 
  //     return {...this.user.profile} 
  //   }
  // },
  // methods: {
  //   handleAddVisa(visa) {
  //     this.profileToUpdate.pastVisas.push(visa)
  //     this.$store.dispatch('auth/updateProfile', this.profileToUpdate)

  //     this.addingPastVisa = false
  //   },
  //   handleEdit(form) {
  //     this.editingPrefs = false
  //     this.profileToUpdate.ilrPlan = form.selectedPlan

  //     this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
  //   },
  //   handleEditVisa(visa) {
  //     this.profileToUpdate.pastVisas[this.visaIndex] = visa
  //     this.$store.dispatch('auth/updateProfile', this.profileToUpdate)

  //     this.editingPastVisa = false
  //     this.visaToEdit = null
  //     this.visaIndex = null
  //   },
  //   editPastVisa(index) {
  //     this.visaToEdit = this.user.profile.pastVisas[index]
  //     this.editingPastVisa = true
  //     this.visaIndex = index
  //   },
  //   deletePastVisa(index) {
  //     this.deleteIndex = index
  //     this.deletingVisa = true
  //   },
  //   handleDelete(index) {
  //     this.profileToUpdate.pastVisas.splice(index, 1)
  //     this.$store.dispatch('auth/updateProfile', this.profileToUpdate)

  //     this.deletingVisa = false
  //     this.deleteIndex = null
  //   }
  // }
//}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.btn-container {
  text-align: right;

  button {
    min-width: 120px;
  }
}

.past-visa-list {
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $med-blue;

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    p {
      margin: 0;
    }
  }
}
</style>
