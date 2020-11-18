<template>
  <div>
    <transition name="dialog" mode="out-in">
      <delete-alert
        v-if="deletingVisa"
        @confirm="deleteVisa(deleteIndex), deletingVisa = false"
        @cancel="deletingVisa = false, deleteIndex = null" />
    </transition>

    <div class="tools-card">
      <h2 v-if="!pastVisas.length">Do you have any past visas? (1/3)</h2>
      <h2 v-else>Here are your past visas :</h2>

      <div class="inner">
        <p v-if="!pastVisas.length" class="margin-s top">Please list out your previous visas if you already had some. Otherwise, please click 'Save' at the bottom of the page. </p>

        <div v-else>
          <ul class="past-visa-list margin-m top">
            <li
              v-for="(visa, index) in sortByDate"
              :key="visa.name">
              <div class="inner-text">
                <p><b>{{ visa.name }}</b></p>

                <p><b>Valid from {{ date(visa.start) }} to {{ date(visa.end) }}</b></p>

                <p class="margin-s top">Applied on <b>{{ date(visa.appliedDate) }}</b> in <b>{{ visa.locationApplied }}</b></p>

                <p>Entered the UK on <b>{{ date(visa.entryDate) }}</b></p>
              </div>

              <div class="buttons">
                <button @click="deletingVisa = true, deleteIndex = index" class="none delete">
                  <img src="@/assets/icons/red/cross.svg" alt="">
                </button>
              </div>
            </li>
          </ul>

          <button @click="showForm = true" class="none margin-m top">
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
              customDateStart: 'Valid from must be before valid to date',
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
              customDateEnd: 'Valid to date must be after valid from date',
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
              beforeStartDate: 'Date applied must be before valid from date'
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
    background: $light-blue;
    border-radius: $radius;
    padding: 0.5rem;
    position: relative;

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    p:first-of-type {
      // margin-top: 1rem;
      font-size: 18px;
    }

    b {
      font-weight: 500;
    }

    .delete {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;

      img {
        width: 20px;
      }
    }
  }
}
</style>
