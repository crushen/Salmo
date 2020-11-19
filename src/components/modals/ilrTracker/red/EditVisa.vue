<template>
  <base-tip @closeModal="closeModal">
    <h1>Edit This Visa</h1>

    <FormulateForm @submit="submitForm" class="margin-s top">
      <FormulateInput
        v-model="visa.name"
        type="select"
        :options="visaOptions"
        label="visa name"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="visa.start"
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
        class="white-label" />

      <FormulateInput
        v-model="visa.end"
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
        class="white-label" />

      <FormulateInput
        v-model="visa.appliedDate"
        type="date"
        label="date applied (the day you submitted your application online)"
        validation="bail|required|beforeStartDate"
        :validation-rules="{beforeStartDate}"
        :validation-messages="{
          beforeStartDate: 'Date applied must be before valid from date'
        }"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="visa.type"
        type="select"
        :options="{extension: 'Extension', switch: 'Switch', new: 'New Visa'}"
        label="was this an extension, switch or a new visa?"
        validation="required"
        placeholder="select an option"
        class="white-label" />

      <FormulateInput
        v-model="visa.locationApplied"
        type="select"
        :options="makeOptions(countries)"
        label="where did you apply?"
        placeholder="select an option"
        validation="required"
        error-behavior="submit"
        class="white-label" />

      <FormulateInput
        v-model="visa.entryDate"
        type="date"
        label="date entered the UK (only if you applied for your visa from your home country)"
        error-behavior="submit"
        class="white-label" />

      <!-- Only show delete for past visas -->
      <button
        v-if="new Date(visa.end) < new Date()"
        @click.prevent="deleteVisa"
        class="tertiary margin-s top">
        Delete This Visa
      </button>

      <div class="buttons">
        <FormulateInput
          type="submit"
          label="Save"
          error-behavior="submit"
          class="white margin-m top" />

        <button
          @click.prevent="closeModal"
          class="primary">
          Cancel
        </button>
      </div>
    </FormulateForm>
  </base-tip>
</template>

<script>
import baseTip from '@/components/modals/ilrTracker/red/BaseTip'
import { visaOptions } from '@/assets/js/visaOptions'
import { countries } from '@/assets/js/countries'

export default {
  props: {
    visa: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  components: { baseTip },
  data() {
    return {
      visaOptions,
      countries
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    submitForm() {
      const pastVisas = this.profileToUpdate.pastVisas,
            index = pastVisas.findIndex(item => item.name === this.visa.name && item.start === this.visa.start);
      
      pastVisas[index] = this.visa

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('closeModal'))
    },
    deleteVisa() {
      const pastVisas = this.profileToUpdate.pastVisas,
            index = pastVisas.findIndex(item => item.name === this.visa.name && item.start === this.visa.start);
      
      pastVisas.splice(index, 1)

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('closeModal'))
    },
    // Validations
    customDateStart({ value }) {
      if(this.visa.start && this.visa.end) {
        return value < this.visa.end
      } else {
        return true
      }
    },
    customDateEnd({ value }) {
      if(this.visa.end && this.visa.start) {
        return value > this.visa.start
      } else {
        return true
      }
    },
    beforeStartDate({ value }) {
      if(this.visa.appliedDate) {
        return value < this.visa.start
      } else {
        return true
      }
    },
    overlappedDates() {
      let valid = true

      if(this.profileToUpdate.pastVisas.length && this.visa.end && this.visa.start) {
        this.profileToUpdate.pastVisas.forEach(visa => {
          if(this.visa.start < visa.start && visa.start < this.visa.end) {
            valid = false
          }

          if(this.visa.start < visa.end && visa.end < this.visa.end) {
            valid = false
          }

          if(visa.start < this.visa.start && this.visa.end < visa.end) {
            valid = false
          }
        })
      }

      return valid
    },
    overlappedWithCurrentVisa() {
      let valid = true

      if(this.visa.start < this.profileToUpdate.currentVisa.start && this.profileToUpdate.currentVisa.start < this.visa.end) {
        valid = false
      }

      if(this.visa.start < this.profileToUpdate.currentVisa.end && this.profileToUpdate.currentVisa.end < this.visa.end) {
        valid = false
      }

      if(this.profileToUpdate.currentVisa.start < this.visa.start && this.visa.end < this.profileToUpdate.currentVisa.end) {
        valid = false
      }

      return valid
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1,
.tertiary {
  color: white;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tertiary {
  color: white;
  font-size: 20px;
}

.primary {
  border: 3px solid white;

  &:hover {
    background: white;
    color: $red;
  }
}
</style>
