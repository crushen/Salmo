<template>
  <base-modal @closeModal="closeModal">
    <h1>My visa choices</h1>

    <FormulateForm @submit="handleSubmit" class="margin-s top">
      <FormulateInput
        v-model="form.nextVisa"
        type="select"
        :options="visaOptions"
        label="Choose your next visa:"
        placeholder="visa name"
        class="grey-label" />

      <FormulateInput
        v-model="interested"
        type="select"
        :options="removeVisa"
        label="Are you considering other visas? Select your interests below and they will be added into your Visa Book!"
        placeholder="visa name"
        :disabled="!form.nextVisa"
        class="grey-label" />

      <ul v-if="form.interestedVisas.length" class="margin-m top">
        <li
          v-for="visa in form.interestedVisas"
          :key="visa"
          class="interested">
          <p>{{ visa }}</p>

          <button @click="removeFromList(visa)" class="none">
            <img src="@/assets/icons/grey/cross.svg" alt="">
          </button>
        </li>
      </ul>
      
      <FormulateInput
        type="submit"
        label="Save"
        class="margin-m top button" />
    </FormulateForm>
  </base-modal>
</template>

<script>
import baseModal from '@/components/modals/BaseModal'
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  components: { baseModal },
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
      return this.visaOptions.filter(visa => visa.value !== this.form.nextVisa)
    }
  },
  methods: {
    removeFromList(visa) {
      this.form.interestedVisas.splice(this.form.interestedVisas.indexOf(visa.value), 1)
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

<style lang="scss" scoped>
.button {
  text-align: right;
}

.interested {
  display: flex;
  align-items: center;

  p {
    padding-bottom: 0.2em;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5em;
  }

  &:not(:first-of-type) {
    margin-top: 0.5em;
  }
}


</style>