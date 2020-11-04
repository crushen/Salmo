<template>
  <div>
    <div class="tools-card margin-m bottom">
      <h2>What is ILR?</h2>

      <div class="inner">
        <p class="margin-s top">ILR (Indefinite Leave to Remain) is the term for permanent residency in the United Kingdom. You can apply ILR after living in the country for a certain amount of time.</p>

        <p class="margin-s top">However, ILR is famous for restrictions, it can be like walking on a minefield. This is why we designed this feature to help you get through this journey!</p>

        <p class="margin-s top">You will need to fill out some details before we organise your tracker:</p>
      </div>
    </div>

    <div class="tools-card">
      <h2>Do you have any past visas?</h2>

      <div class="inner">
        <p class="margin-s top">Please list out your previous visas if you already had some. Otherwise, please click 'Save' at the bottom of the page. </p>

        <FormulateForm @submit="addVisaToList" class="margin-m top">

          <FormulateInput
            v-model="form.pastVisa.name"
            type="select"
            :options="visaOptions"
            label="visa name"
            placeholder="select an option"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.start"
            type="date"
            label="start"
            validation="customDateStart|overlappedDates|overlappedWithCurrentVisa"
            :validation-rules="{customDateStart, overlappedDates, overlappedWithCurrentVisa}"
            :validation-messages="{
              customDateStart: 'Start date must be before end date',
              overlappedDates: 'Past visas can not overlap',
              overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
            }"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.end"
            type="date"
            label="end"
            validation="customDateEnd|overlappedDates|overlappedWithCurrentVisa"
            :validation-rules="{customDateEnd, overlappedDates, overlappedWithCurrentVisa}"
            :validation-messages="{
              customDateEnd: 'End date must be after start date',
              overlappedDates: 'Past visas can not overlap',
              overlappedWithCurrentVisa: 'Past visa can not overlap current visa'
            }"
            class="grey-label" />

          <div class="btn-container">
            <FormulateInput
              type="submit"
              label="Add Visa"
              class="button margin-s top" />
          </div>
        </FormulateForm>

        <ul v-if="pastVisas.length" class="past-visa-list margin-m top">
          <li
            v-for="(visa, index) in sortByDate"
            :key="visa.name">
            <div class="text">
              <p><b>{{ visa.name }}</b></p>
              <p>{{ date(visa.start) }} to {{ date(visa.end) }}</p>
            </div>

            <div class="buttons">
              <button @click="deleteVisa(index)" class="none">
                <img src="@/assets/icons/red/cross.svg" alt="">
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tools-card margin-m top">
      <h2>Which ILR plan to go for?</h2>

      <div class="inner">
        <p class="margin-s top">There are two options to ILR, 5 year plan and 10 year plan. But they can be a bit complicated. Be sure to take a look at our <a>Help Centre Article</a> before making your decision!</p>

        <div class="plan-btns margin-s top">
          <button @click="selectPlan" class="none">
            <img
              :class="selectedPlan === '5 year plan' ? 'border' : ''"
              src="@/assets/illustrations/ilr-tracker/5.svg"
              alt="">
            5 year plan
          </button>

          <button @click="selectPlan" class="none margin-s top">
            <img
              :class="selectedPlan === '10 year plan' ? 'border' : ''"
              src="@/assets/illustrations/ilr-tracker/10.svg"
              alt="">
            10 year plan
          </button>
        </div>
        
        <p v-if="error && !selectedPlan" class="error margin-s top bottom">{{ error }}</p>

        <div class="btn-container margin-m top">
          <button @click="saveDetails" class="primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  data() {
    return {
      form: {
        pastVisa: {
          name: null,
          start: null,
          end: null
        }
      },
      pastVisas: [],
      selectedPlan: null,
      error: null,
      visaOptions
    }
  },
  computed: {
    sortByDate() {
      const array = this.pastVisas
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse()
    }
    // removeDuplicateVisas() {
    //   const removeCurrent = this.visaOptions.filter(visa => visa.label !== this.user.profile.currentVisa.name);

    //   if(this.pastVisas.length) {
    //     const pastVisaNames = this.pastVisas.map(visa => visa.name)
    //     return removeCurrent.filter(visa => !pastVisaNames.includes(visa.label))
    //   } else {
    //     return removeCurrent
    //   }
    // }
  },
  methods: {
    date(date) {
      return date.split('-').reverse().join('/')
    },
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
    },
    addVisaToList() {
      this.pastVisas.push(this.form.pastVisa)
      this.form.pastVisa = { name: null, start: null, end: null }
    },
    deleteVisa(index) {
      this.pastVisas.splice(index, 1)
    },
    selectPlan(event) {
      this.selectedPlan = event.target.parentElement.textContent.trim()
    },
    saveDetails() {
      if(this.selectedPlan) {
        if(this.pastVisas.length) {
          this.profileToUpdate.pastVisas = this.sortByDate
        }

        this.profileToUpdate.ilrPlan = this.selectedPlan

        this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      } else {
        this.error = 'Please select a plan to continue'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

a {
  color: $dark-font;
  font-weight: 500;
  text-decoration: underline;
}

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

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    p {
      margin: 0;
    }
  }
}

.buttons button {
  margin-left: 0.5rem;
}

.plan-btns {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border: 4px solid transparent;
      border-radius: 100%;

      &.border {
        border: 4px solid $red;
      }
    }
  }
}

.error {
  text-align: center;
}
</style>
