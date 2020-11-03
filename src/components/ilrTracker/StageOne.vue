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
        <p class="margin-s top">Please list out your previous visas if you already had some. Otherwise, please click “No”. </p>

        <FormulateForm @submit="submitForm" class="margin-m top">

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
            validation="bail|date|customDate"
            :validation-rules="{customDate: ({ value }) => value < form.currentVisa.end}"
            :validation-messages="{customDate: 'Start date must be before end date'}"
            error-behavior="submit"
            class="grey-label" />

          <FormulateInput
            v-model="form.pastVisa.end"
            type="date"
            label="end"
            validation="bail|date|customDate"
            :validation-rules="{customDate: ({ value }) => value > form.pastVisa.start}"
            :validation-messages="{customDate: 'End date must be after start date'}"
            error-behavior="submit"
            class="grey-label" />

          <div class="button-center">
            <FormulateInput
              type="submit"
              label="Save"
              class="button margin-s top" />
          </div>
        </FormulateForm>

        <ul v-if="pastVisas.length" class="past-visa-list">
          <li
            v-for="visa in pastVisas"
            :key="visa.name">
            <p>{{ visa.name }} - {{ visa.start }} to {{ visa.end }}</p>
          </li>
        </ul>
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
  methods: {
    submitForm() {
      console.log('hello')
    }
  }
}
</script>
