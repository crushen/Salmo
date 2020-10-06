<template>
  <modal-base @closeModal="closeModal">
    <h1>My visa choices</h1>

    <FormulateForm @submit="handleSubmit">
      <FormulateInput
        v-model="form.nextVisa"
        type="select"
        :options="makeOptions(visaOptions)"
        label="Choose your next visa:"
        placeholder="visa name" />

      <FormulateInput
        v-model="interested"
        type="select"
        :options="makeOptions(removeVisa)"
        label="Are you considering other visas? Select your interests below and they will be added into your Visa Book!"
        placeholder="visa name"
        :disabled="!form.nextVisa" />

      <ul v-if="form.interestedVisas.length">
        <li
          v-for="visa in form.interestedVisas"
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
      interested: null,
      form: {
        nextVisa: null,
        interestedVisas: []
      }
    }
  },
  watch: {
    'interested'(visa) {
      if(this.form.interestedVisas.indexOf(visa) === -1) {
        this.form.interestedVisas.push(visa)
      }
    }
  },
  computed: {
    removeVisa() {
      return this.visaOptions.filter(visa => visa !== this.form.nextVisa)
    }
  },
  methods: {
    removeFromList(visa) {
      this.form.interestedVisas.splice(this.form.interestedVisas.indexOf(visa), 1)
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
