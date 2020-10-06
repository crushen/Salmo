<template>
  <base-modal @closeModal="closeModal">
    <h1>Edit Account</h1>

    <FormulateForm @submit="handleSubmit">
      <FormulateInput
        v-model="form.name"
        type="text"
        label="Full Name"
        validation="required" />

      <FormulateInput
        v-model="form.username"
        type="text"
        label="username"
        validation="bail|required|min:6|max:10" />

      <FormulateInput
        type="submit"
        label="Save"/>
    </FormulateForm>
  </base-modal>
</template>

<script>
import baseModal from '@/components/modals/BaseModal'

export default {
  props: {
    profileToUpdate: { required: true, type: Object },
    user: { required: true, type: Object }
  },
  components: { baseModal },
  data() {
    return {
      form: {
        name: this.profileToUpdate.name,
        username: this.profileToUpdate.username
      }
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
