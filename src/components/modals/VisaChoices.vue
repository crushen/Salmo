<template>
  <modal-base @closeModal="closeModal">
    <h1>My visa choices</h1>

    <FormulateForm @submit="handleSubmit">
      <FormulateInput
        v-model="form.visa"
        type="select"
        :options="makeOptions(visaOptions)"
        label="Choose your next visa:"
        placeholder="visa name" />

      <FormulateInput
        v-model="form.interested"
        type="select"
        :options="makeOptions(removeVisa)"
        label="Are you considering other visas? Select your interests below and they will be added into your Visa Book!"
        placeholder="visa name"
        :disabled="!form.visa" />

      <ul v-if="interestedVisas.length">
        <li
          v-for="visa in interestedVisas"
          :key="visa">
          {{ visa }}
          <span>
            <button @click="removeFromList(visa)">X</button>
          </span>
        </li>
      </ul>

      <FormulateInput
        type="submit"
        label="Save"/>
    </FormulateForm>
  </modal-base>
</template>

<script>
import modalBase from '@/components/modals/ModalBase'
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  components: { modalBase },
  data() {
    return {
      visaOptions,
      interestedVisas: [],
      form: {
        visa: null,
        interested: null
      }
    }
  },
  watch: {
    'form.interested'(visa) {
      if(this.interestedVisas.indexOf(visa) === -1) {
        this.interestedVisas.push(visa)
      }
    }
  },
  computed: {
    removeVisa() {
      return this.visaOptions.filter(visa => visa !== this.form.visa)
    }
  },
  methods: {
    removeFromList(visa) {
      this.interestedVisas.splice(this.interestedVisas.indexOf(visa), 1)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.form)
    }
  }
}
</script>
