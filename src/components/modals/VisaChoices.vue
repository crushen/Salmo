<template>
  <modal-base @closeModal="closeModal">
    <h1>My visa choices</h1>

    <FormulateForm @submit="handleSubmit">
      <FormulateInput
        v-model="form.visa"
        type="select"
        :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
        label="Choose your next visa:"
        placeholder="visa name" />

      <FormulateInput
        v-model="form.interested"
        type="select"
        :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
        label="Are you considering other visas? Select your interests below and they will be added into your Visa Book!"
        placeholder="visa name" />

      <ul v-if="interestedVisas.length">
        <li
          v-for="visa in interestedVisas"
          :key="visa">
          {{ visa }}
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

export default {
  components: { modalBase },
  data() {
    return {
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
      // else {
      //   this.interestedVisas.splice(this.interestedVisas.indexOf(visa), 1)
      // }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.form)
    }
  }
}
</script>
