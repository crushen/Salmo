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
        <p class="margin-s top">Please list out your previous visas if you already had some. Otherwise, please click 'Save'. </p>

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
            validation="customDateStart"
            :validation-rules="{customDateStart}"
            :validation-messages="{customDateStart: 'Start date must be before end date'}"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.end"
            type="date"
            label="end"
            validation="customDateEnd"
            :validation-rules="{customDateEnd}"
            :validation-messages="{customDateEnd: 'End date must be after start date'}"
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

        <div class="btn-container">
          <button
            :class="pastVisas.length ? 'margin-m' : 'margin-s'"
            class="top primary">
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
      visaOptions
    }
  },
  computed: {
    sortByDate() {
      const array = this.pastVisas
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse()
    }
  },
  methods: {
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
    addVisaToList() {
      this.pastVisas.push(this.form.pastVisa)
      this.form.pastVisa = { name: null, start: null, end: null }
    },
    deleteVisa(index) {
      this.pastVisas.splice(index, 1)
    },
    date(date) {
      return date.split('-').reverse().join('/')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
